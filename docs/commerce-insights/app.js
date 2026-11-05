/* Aggregate-only dashboard. Labels always use textContent, never HTML insertion. */
'use strict';
let DATA, page = 0;
const $ = id => document.getElementById(id);
const num = value => value == null ? '未取得' : new Intl.NumberFormat('ja-JP', {maximumFractionDigits: 0}).format(value);
const money = value => value == null ? '未取得' : new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 2}).format(value);
const pct = value => value == null ? '算出不可' : (value * 100).toFixed(1) + '%';
const sumNullable = (rows, key) => {
  const values = rows.map(row => row[key]).filter(value => value != null);
  return values.length ? values.reduce((a, b) => a + b, 0) : null;
};
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}
function clear(id) { $(id).replaceChildren(); return $(id); }
function card(title, value, note) {
  const node = el('article', 'kpi');
  node.append(el('div', 'kpi-title', title), el('div', 'value', value), el('small', '', note));
  return node;
}
function barRow(label, value, width, detail = '') {
  const node = el('div', 'product-row');
  const heading = el('div', 'product-label');
  heading.append(el('span', '', label), el('strong', '', value));
  const track = el('div', 'track'), fill = el('div', 'fill');
  fill.style.width = Math.max(0, Math.min(100, width)) + '%';
  track.append(fill); node.append(heading, track);
  if (detail) node.append(el('small', 'muted', detail));
  return node;
}
function renderDaily(month) {
  const host = clear('daily'), rows = Metrics.datasetRows(DATA, 'day', month);
  const max = Math.max(1, ...rows.map(row => row.purchase_revenue_usd ?? 0));
  const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 620 190'); svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', month + 'の日別purchase売上USD');
  const title = document.createElementNS(ns, 'title'); title.textContent = month + 'の日別purchase売上USD'; svg.append(title);
  const line = document.createElementNS(ns, 'polyline');
  // NULL is a gap, never a fabricated zero. Separate segments preserve this distinction.
  let segment = [];
  function flush() {
    if (!segment.length) return;
    const path = line.cloneNode(); path.setAttribute('points', segment.join(' '));
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', '#167c69'); path.setAttribute('stroke-width', '2.5');
    svg.append(path); segment = [];
  }
  rows.forEach((row, index) => {
    if (row.purchase_revenue_usd == null) { flush(); return; }
    const x = 25 + index * 570 / Math.max(1, rows.length - 1), y = 145 - row.purchase_revenue_usd / max * 115;
    segment.push(x + ',' + y);
    const dot = document.createElementNS(ns, 'circle'); dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', '3'); dot.setAttribute('fill', '#167c69');
    const tip = document.createElementNS(ns, 'title'); tip.textContent = row.day + ' / ' + money(row.purchase_revenue_usd); dot.append(tip); svg.append(dot);
  }); flush();
  [0, Math.floor((rows.length - 1) / 2), rows.length - 1].forEach(index => {
    if (!rows[index]) return;
    const t = document.createElementNS(ns, 'text'); t.setAttribute('x', 25 + index * 570 / Math.max(1, rows.length - 1)); t.setAttribute('y', '178'); t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#63766e'); t.setAttribute('font-size', '12'); t.textContent = rows[index].day.slice(5); svg.append(t);
  });
  host.append(svg);
  const comparison = clear('monthly-comparison');
  DATA.monthly.map(row => Metrics.monthRow(DATA, row.month)).forEach(row => {
    const node = el('div', row.month === month ? 'month-mini selected' : 'month-mini');
    node.append(el('small', '', row.month), el('strong', '', money(row.purchase_revenue_usd))); comparison.append(node);
  });
}
function renderProducts() {
  const month = $('month').value, query = $('product-search').value.trim().toLowerCase();
  const all = Metrics.datasetRows(DATA, 'product', month);
  const rows = all.filter(row => [row.item_name, row.item_category].some(value => String(value ?? '').toLowerCase().includes(query)))
    .sort((a, b) => (b.item_revenue_usd ?? -Infinity) - (a.item_revenue_usd ?? -Infinity) || String(a.item_name).localeCompare(String(b.item_name)));
  const pages = Math.max(1, Math.ceil(rows.length / 10)); page = Math.min(page, pages - 1);
  const tbody = $('products').querySelector('tbody'); tbody.replaceChildren();
  rows.slice(page * 10, page * 10 + 10).forEach(row => {
    const tr = el('tr');
    [row.item_name ?? '名称未取得', row.item_category ?? 'カテゴリ未取得', money(row.item_revenue_usd), num(row.quantity), num(row.item_rows)]
      .forEach(value => tr.append(el('td', '', value)));
    tbody.append(tr);
  });
  if (!rows.length) { const tr = el('tr'), td = el('td', '', '該当する商品はありません。'); td.colSpan = 5; tr.append(td); tbody.append(tr); }
  $('previous').disabled = page === 0; $('next').disabled = page + 1 >= pages;
  $('product-page').textContent = num(rows.length) + '区分 / ' + (page + 1) + '・' + pages + 'ページ';
  const m = Metrics.monthRow(DATA, month), itemSum = sumNullable(all, 'item_revenue_usd');
  $('product-reconciliation').textContent = 'イベント売上 ' + money(m.purchase_revenue_usd) + ' / 商品売上 ' + money(itemSum) + ' / 差額 ' + money(m.purchase_revenue_usd == null || itemSum == null ? null : m.purchase_revenue_usd - itemSum) + '。差は観測値として残します。';
}
function renderAttributes() {
  const month = $('month').value, dimension = $('dimension').value;
  const rows = Metrics.datasetRows(DATA, 'attribute', month, dimension)
    .sort((a, b) => (b.purchase_revenue_usd ?? -Infinity) - (a.purchase_revenue_usd ?? -Infinity) || b.events - a.events);
  const shown = rows.slice(0, 10), rest = rows.slice(10);
  if (rest.length) shown.push({label: 'その他（' + rest.length + '区分）', events: rest.reduce((n, row) => n + row.events, 0), users: null, purchase_events: rest.reduce((n, row) => n + row.purchase_events, 0), purchase_revenue_usd: sumNullable(rest, 'purchase_revenue_usd')});
  const aq = Metrics.datasetRows(DATA, 'attribute_quality', month, dimension)[0];
  $('attribute-diagnostics').textContent = aq ? '当月内に複数の記録値を持つ匿名ID ' + num(aq.users_with_multiple_labels) + ' / ' + num(aq.observed_users) + '、複合session ' + num(aq.sessions_with_multiple_labels) + ' / ' + num(aq.observed_sessions) + '。単一属性へ割り当てず、イベントごとの値を集計しています。' : '属性の観測母集団なし';
  const host = clear('attributes'), max = Math.max(1, ...shown.map(row => Math.abs(row.purchase_revenue_usd ?? 0)));
  shown.forEach(row => host.append(barRow(
    row.label == null ? 'NULL（未記録）' : row.label === '' ? '空文字' : row.label,
    row.purchase_events === 0 ? '購入イベントなし' : money(row.purchase_revenue_usd),
    Math.abs(row.purchase_revenue_usd ?? 0) / max * 100,
    num(row.events) + 'イベント / ' + (row.users == null ? 'その他のユーザー数は非加算のため合算しません' : num(row.users) + '匿名ID（区分をまたいで非加算）'))));
}
function render() {
  const month = $('month').value, m = Metrics.monthRow(DATA, month), q = Metrics.datasetRows(DATA, 'quality', month)[0];
  clear('kpis').append(
    card('purchase売上 / USD', money(m.purchase_revenue_usd), num(m.purchase_events) + ' purchaseイベント・欠損金額 ' + num(m.missing_purchase_revenue_events)),
    card('月次のイベント観測匿名ID', num(m.mau), 'MAU：実人数・GA4 UI Active usersとは異なります'),
    card('過去月にも購入した当月購入者率', m.previous_month_buyer_rate == null ? '算出対象外' : pct(m.previous_month_buyer_rate), m.previous_month_buyers == null ? '11月は観測開始月。過去月の履歴なし' : num(m.previous_month_buyers) + ' / ' + num(m.buyers) + '購入者ID'),
    card('回遊率 / URL文字列基準', pct(m.browsing_rate), num(m.multi_url_sessions) + ' / ' + num(m.url_sessions) + ' URL利用可能session'));
  const counts = clear('counts');
  [num(m.events) + ' イベント', num(m.buyers) + ' 購入者ID', num(m.identifiable_sessions) + ' 識別可能session', 'URL利用可能率 ' + pct(m.url_session_coverage)]
    .forEach(text => counts.append(el('span', '', text)));
  $('scope').textContent = month + ' / イベント・売上はevent_date月、session指標は最初の観測月。購入履歴は全3か月を参照。';
  renderDaily(month);
  const funnel = clear('funnel'), stages = [['商品閲覧', m.view_sessions], ['カート追加', m.cart_sessions], ['決済開始', m.checkout_sessions], ['購入', m.purchase_sessions]];
  stages.forEach(([label, count], index) => {
    const row = el('div', 'funnel-row'), text = el('div');
    text.append(el('span', '', label), el('small', 'stage-rate', index ? '前段比 ' + pct(stages[index - 1][1] ? count / stages[index - 1][1] : null) : 'view_item到達session'));
    const track = el('div', 'track'), fill = el('div', 'fill'); fill.style.width = (m.view_sessions ? count / m.view_sessions * 100 : 0) + '%'; track.append(fill);
    row.append(text, track, el('strong', '', num(count))); funnel.append(row);
  });
  $('funnel-summary').textContent = '閲覧→購入の到達率 ' + pct(m.view_sessions ? m.purchase_sessions / m.view_sessions : null) + ' / 同時刻に複数段階を観測したsession ' + num(m.tied_funnel_sessions);
  const repeats = clear('repeat');
  DATA.monthly.map(row => Metrics.monthRow(DATA, row.month)).forEach(row => repeats.append(barRow(row.month, row.previous_month_buyer_rate == null ? '算出対象外' : pct(row.previous_month_buyer_rate), (row.previous_month_buyer_rate ?? 0) * 100,
    row.previous_month_buyers == null ? '観測開始月・過去月の購入履歴なし' : num(row.previous_month_buyers) + ' / ' + num(row.buyers) + ' 購入者ID')));
  clear('browsing').append(barRow('URL利用可能session', pct(m.url_session_coverage), (m.url_session_coverage ?? 0) * 100, num(m.url_sessions) + ' / ' + num(m.identifiable_sessions)), barRow('うち2種類以上のURL', pct(m.browsing_rate), (m.browsing_rate ?? 0) * 100, num(m.multi_url_sessions) + ' / ' + num(m.url_sessions)));
  renderProducts(); renderAttributes();
  const quality = clear('quality');
  [['識別不可user/sessionのイベント', q.unidentifiable_session_events], ['URL利用不可のpage_view', q.unusable_page_view_events], ['重複sessionパラメータ', q.duplicate_session_param_events], ['重複pageパラメータ', q.duplicate_page_param_events], ['金額NULLのpurchase', q.missing_purchase_revenue_events], ['識別不可でも保持したpurchase', q.unidentifiable_purchase_events], ['transaction未記録のpurchase', q.missing_transaction_purchase_events], ['重複transactionに属するpurchase', q.duplicate_transaction_purchase_events], ['内容が異なるtransactionのpurchase', q.conflicting_transaction_purchase_events], ['同じ観測キーの余剰イベント候補', q.repeated_event_key_excess_rows], ['期間端に触れるsession', m.period_boundary_sessions], ['商品配列が空のpurchase', q.itemless_purchase_events], ['商品ID未記録の明細', q.missing_item_id_rows], ['商品数量NULLの明細', q.missing_item_quantity_rows], ['商品売上NULLの明細', q.missing_item_revenue_rows], ['複数名称を持つ商品ID', q.item_ids_with_multiple_names], ['非有限のpurchase金額', q.nonfinite_purchase_revenue_events], ['負数のpurchase金額', q.negative_purchase_revenue_events], ['refundイベント（返品件数とは別）', q.refund_events]]
    .forEach(([label, value]) => quality.append(el('dt', '', label), el('dd', '', num(value))));
}
async function init() {
  const response = await fetch('ga4-aggregates.json'); if (!response.ok) throw new Error('集計ファイルを読み込めません。');
  DATA = await response.json(); if (!DATA.monthly?.length) throw new Error('月次集計がありません。');
  DATA.monthly.map(row => Metrics.monthRow(DATA, row.month)).forEach(row => { const option = el('option', '', row.month); option.value = row.month; $('month').append(option); });
  $('month').value = DATA.monthly.at(-1).month;
  const labels = {mau: 'MAU', repeat: '過去月観測購入者率', browsing: '回遊率', funnel: '購入ファネル', months: '月の帰属', money: '売上・数量', attributes: '属性', limits: '出典・制約'};
  const definitions = clear('definitions'); Object.entries(DATA.metadata.definitions).forEach(([key, value]) => definitions.append(el('dt', '', labels[key] || key), el('dd', '', value)));
  $('validation').textContent = 'dbt ' + DATA.metadata.dbt_version + ' / DuckDB ' + DATA.metadata.duckdb_version + '。モデル構築と検証 ' + DATA.metadata.dbt_checks_passed + '件が成功。集計生成 ' + DATA.metadata.generated_utc.slice(0, 10) + ' UTC。';
  $('footer-status').textContent = '全期間 ' + num(DATA.metadata.period_observed_users) + ' 観測匿名ID（月次MAUは非加算） / 公開サンプル・集計のみ';
  $('month').addEventListener('change', () => { page = 0; render(); });
  $('dimension').addEventListener('change', renderAttributes);
  $('product-search').addEventListener('input', () => { page = 0; renderProducts(); });
  $('previous').addEventListener('click', () => { page--; renderProducts(); });
  $('next').addEventListener('click', () => { page++; renderProducts(); });
  render(); document.documentElement.dataset.ready = 'true';
}
init().catch(error => { $('error').hidden = false; $('error').textContent = error.message; $('scope').textContent = '集計の読み込みに失敗しました。'; });
