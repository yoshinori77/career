'use strict';
const $ = id => document.getElementById(id);
function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function section(title, paragraphs) { const n = el('section', 'case-section'); n.append(el('h3', '', title)); paragraphs.forEach(p => n.append(el('p', '', p))); return n; }
let cases;
function renderCase() {
  const [slug, anchor] = location.hash.slice(1).split('@');
  const c = cases.find(c => c.id === slug) || (!slug ? cases[0] : null);
  const host = $('case-detail'); host.replaceChildren();
  document.querySelectorAll('#case-links a').forEach(a => a.setAttribute('aria-current', a.hash === '#' + c?.id ? 'page' : 'false'));
  if (!c) { host.append(el('h2', '', '事例が見つかりません'), el('p', '', '上の一覧から事例を選んでください。')); return; }
  document.title = c.title + ' | Commerce Insights';
  const heading = el('div', 'case-heading'); heading.append(el('span', 'eyebrow', c.number + ' / ' + c.theme), el('h2', '', c.title), el('p', 'case-lead', c.conclusion)); host.append(heading);
  const problem = el('div', 'case-solution'); problem.append(section('顧客が抱える課題', [c.question]), section('用意したソリューション', [c.solution])); host.append(problem);
  host.append(section('判断の前提', [c.boundary]));
  const evidence = section('観測した事実と引用', ['各値は配信中の集計JSONへ結び付いています。NULLは「算出不可/未取得」、実測0は0です。']);
  const grid = el('div', 'evidence-grid');
  c.facts.forEach(f => {
    const item = el('div', 'evidence-item'); item.id = f.id;
    const a = el('a', 'evidence-ref', '[' + f.id + ']'); a.href = '#' + c.id + '@' + f.id;
    item.append(a, el('span', '', f.label), el('strong', '', Casebook.format(f)), el('small', '', f.month + ' / ' + f.field));
    const details = el('details'); details.append(el('summary', '', '引用元の位置'), el('code', '', 'ga4-aggregates.json#' + f.pointer)); item.append(details); grid.append(item);
  }); evidence.append(grid); host.append(evidence);
  const steps = section('調査｜何を、どの順で確かめるか', []), list = el('ol'); c.investigate.forEach(t => list.append(el('li', '', t))); steps.append(list); host.append(steps);
  host.append(section('判断｜言えることと、保留すること', [c.judgment]));
  const action = section('施策案｜未実行', [c.action.plan]); action.append(el('p', 'muted', '相談先：' + c.action.owner), el('h4', '', '受入条件・効果の確かめ方'), el('p', '', c.action.acceptance)); host.append(action);
  const needs = section('次に必要なデータ', []), ul = el('ul'); c.needs.forEach(t => ul.append(el('li', '', t))); needs.append(ul); host.append(needs);
  host.append(section('再現するためのモデル', [c.models.join(' → ')]));
  const link = el('a', 'text-link', '概況の集計・定義を確認する →'); link.href = 'index.html'; host.append(link);
  if (anchor && c.facts.some(f => f.id === anchor)) requestAnimationFrame(() => $(anchor).scrollIntoView({block: 'center'}));
}
fetch('ga4-aggregates.json').then(r => { if (!r.ok) throw new Error('集計を取得できません'); return r.json(); }).then(d => {
  cases = Casebook.build(d); cases.forEach(c => { const a = el('a', 'case-tile'); a.href = '#' + c.id; a.append(el('small', '', c.number + ' / ' + c.theme), el('strong', '', c.title)); $('case-links').append(a); });
  window.addEventListener('hashchange', renderCase); renderCase(); document.documentElement.dataset.ready = 'true';
}).catch(e => { $('case-error').hidden = false; $('case-error').textContent = e.message; });
