/* Curated cases: every numeric fact resolves to the aggregate, never raw events. */
(function (root) {
  'use strict';
  const n = x => x == null ? '算出不可' : x.toLocaleString('ja-JP', {maximumFractionDigits: 0});
  const p = x => x == null ? '算出不可' : (100 * x).toFixed(1) + '%';
  const usd = x => x == null ? '未取得' : '$' + x.toLocaleString('en-US', {maximumFractionDigits: 2});
  const metrics = typeof module !== 'undefined' && module.exports ? require('./metrics.js') : root.Metrics;
  function build(data) {
    function fact(id, label, dataset, match, field, unit = 'count') {
      const f = metrics.fact(data, dataset, match, field);
      return {id, label, dataset, field, month:f.month, pointer:f.citation.pointer, value:f.value, unit};
    }
    const monthly = (id, label, month, field, unit) => fact(id, label, 'monthly', r => r.month === month, field, unit);
    const quality = (id, label, field) => fact(id, label, 'quality', r => r.month === '2021-01', field);
    const dec = metrics.monthRow(data, '2020-12'), jan = metrics.monthRow(data, '2021-01');
    if (!dec || !jan) throw new Error('比較対象月がありません');
    return [
      {id: 'revenue', number: '01', theme: '売上分析', title: '売上が落ちたとき、何から調べるか',
        question: '売上の減少を、集客・購入行動・商品構成に分けて調べたい。',
        solution: '同じ31日間の月次比較から入り、日別・商品別の内訳を確認する売上診断。',
        conclusion: '12月から1月のpurchase売上は' + p(1 - jan.purchase_revenue_usd / dec.purchase_revenue_usd) + '減少。まず購入イベント数と金額の動きを分け、商品別の差分を調べます。',
        facts: [monthly('rev-dec', '12月のpurchase売上', '2020-12', 'purchase_revenue_usd', 'usd'), monthly('rev-jan', '1月のpurchase売上', '2021-01', 'purchase_revenue_usd', 'usd'), monthly('purchase-dec', '12月のpurchaseイベント', '2020-12', 'purchase_events'), monthly('purchase-jan', '1月のpurchaseイベント', '2021-01', 'purchase_events'), monthly('mau-dec', '12月の観測匿名ID', '2020-12', 'mau'), monthly('mau-jan', '1月の観測匿名ID', '2021-01', 'mau')],
        boundary: '売上はevent_date月のpurchase金額。欠損IDも保持し、取引を重複除去していません。難読化・季節性がある公開サンプルで、売上減の因果や実注文数は確定できません。',
        investigate: ['日別の変化点と月別のpurchaseイベント数を確認する。', 'purchase itemsの金額・数量を商品名とカテゴリで比較する。イベント売上とは別粒度で扱う。', '計測変更・販促日程・価格・欠品履歴を追加し、構成変化と計測変化の仮説を照合する。'],
        judgment: '購入イベント数も減っています。集客だけを原因と決めず、観測匿名ID・購入行動・商品構成を順に切り分けます。広告費や注文原票なしにROAS・客単価を断定しません。',
        action: {owner: 'EC運営・分析担当', plan: '減少寄与の大きい商品候補を運営と確認し、在庫と販促の記録を照合してから、導線・販促の検証対象を決める。', acceptance: '同一定義の日別・商品別差分表を共有。施策は対照群と評価期間を先に決め、購入率と売上に加え欠品・値引きの影響も確認する。'},
        needs: ['注文/明細・価格・値引き', '商品在庫・欠品履歴', '販促・広告費・計測変更履歴'], models: ['mart_ga4_daily', 'mart_ga4_monthly', 'mart_ga4_products']},
      {id: 'funnel', number: '02', theme: '購入導線', title: '購入前のどこを優先して調べるか',
        question: '商品を見た後、購入まで進まない箇所を絞りたい。',
        solution: '順序を推測しないsessionファネルと、計測の限界を併せた導線調査。',
        conclusion: '1月の商品閲覧からカート追加への到達は' + p(jan.cart_sessions / jan.view_sessions) + '。この区間を調査の起点にし、計測と画面操作の両面で確認します。',
        facts: [monthly('funnel-view', '1月 商品閲覧に到達', '2021-01', 'view_sessions'), monthly('funnel-cart', '1月 順序どおりカート追加', '2021-01', 'cart_sessions'), monthly('funnel-checkout', '1月 順序どおり決済開始', '2021-01', 'checkout_sessions'), monthly('funnel-purchase', '1月 順序どおり購入', '2021-01', 'purchase_sessions'), monthly('funnel-tied', '1月 同時刻に複数段階を観測', '2021-01', 'tied_funnel_sessions'), monthly('funnel-boundary', '1月 観測期間端に触れるsession', '2021-01', 'period_boundary_sessions')],
        boundary: '同一の有効匿名ID＋sessionで、各段階の時刻が厳密に増加する経路。sessionの月は最初の観測日。同時刻は順序不明で、商品は同一とは限りません。未到達が操作上の離脱とは限りません。',
        investigate: ['view_item → add_to_cart → begin_checkout → purchase の到達数と前段比を確認する。', '同時刻イベントと期間端の打切りを確認し、欠測・順序不明をユーザー離脱と混同しない。', '実サイトなら端末別操作テストと計測QAを行い、商品単位の経路にはitem単位の紐付けを追加する。'],
        judgment: '観測上は閲覧→カートの件数差が大きく、優先調査の候補です。UI不具合や価格が原因とは、この集計だけでは言えません。',
        action: {owner: 'EC運営・フロントエンド・計測担当', plan: 'カート操作の計測と表示を確認した後、商品詳細の情報・購入ボタンなどを仮説に沿って一つずつ検証する。', acceptance: '操作とイベントの対応がQAで一致。改善はA/Bテスト等で評価し、カート率・購入・売上とエラー率を確認する。'},
        needs: ['実画面・操作テスト', '計測仕様・実装変更履歴', 'エラーログ・item単位の経路'], models: ['ga4_sessions macro', 'int_ga4_sessions', 'mart_ga4_monthly']},
      {id: 'buyers', number: '03', theme: '顧客理解', title: '継続購入を、観測できる範囲から測る',
        question: '当月の購入者に、過去にも買った人がどの程度いるか知りたい。',
        solution: '全履歴を先に参照し、観測開始月と未観測期間を明示する購入者指標。',
        conclusion: '1月の当月購入者' + n(jan.buyers) + '匿名IDのうち、過去の観測暦月にも購入したのは' + n(jan.previous_month_buyers) + 'ID（' + p(jan.previous_month_buyer_rate) + '）。CRM施策の効果判定には顧客履歴を追加します。',
        facts: [monthly('buyers-jan', '1月の購入者匿名ID', '2021-01', 'buyers'), monthly('buyers-prior', '1月購入者のうち過去月にも購入', '2021-01', 'previous_month_buyers'), monthly('buyers-rate', '1月 過去月観測購入者率', '2021-01', 'previous_month_buyer_rate', 'rate'), monthly('buyers-dec-rate', '12月 過去月観測購入者率', '2020-12', 'previous_month_buyer_rate', 'rate'), monthly('buyers-nov-rate', '11月 過去月観測購入者率', '2020-11', 'previous_month_buyer_rate', 'rate')],
        boundary: '分母は有効匿名IDの当月購入者。過去とは観測範囲内の以前の暦月で、同月の複数購入は含めません。11月はNULL。実人数・生涯の新規/既存・30日継続率ではなく、月ごとに参照できる履歴長も異なります。',
        investigate: ['月フィルタ前に全3か月の購入履歴を作り、当月購入者と以前の暦月の購入を照合する。', '初月を0%に置き換えず、匿名IDの変更と期間前の購入が分からない点を確認する。', '実案件では同意・利用目的に沿う顧客キーと長期注文履歴を使い、購入コホート別の再購入を測る。'],
        judgment: '過去月購入の観測があるIDを示せますが、この割合だけで継続購入が悪いとは判断できません。12月と1月の差にも、履歴長の違いが混ざります。',
        action: {owner: 'CRM・分析担当', plan: '長期履歴と顧客キーを整備し、対象商品の購入間隔を見て、同意のある顧客への再購入施策を設計する。', acceptance: '同じ追跡期間のコホートで比較。対照群を置き、再購入・売上と配信解除を確認する。今回の匿名サンプルから顧客への連絡はしない。'},
        needs: ['同意と利用目的を確認した顧客キー', 'より長期の注文履歴', '配信・施策対象/対照群'], models: ['int_ga4_user_months', 'ga4_buyers macro', 'mart_ga4_monthly']},
      {id: 'browsing', number: '04', theme: '回遊設計', title: '回遊の低下と、観測範囲の変化を分ける',
        question: 'ページを見比べずに終わる訪問が増えていないか調べたい。',
        solution: 'URLを観測できるsessionの割合と、複数URLを見る割合を並べた回遊診断。',
        conclusion: 'URL文字列基準の回遊率は12月' + p(dec.browsing_rate) + 'から1月' + p(jan.browsing_rate) + 'へ低下。一方、URL利用可能率は上昇しており、観測対象と導線を分けて確認します。',
        facts: [monthly('browse-dec', '12月の回遊率', '2020-12', 'browsing_rate', 'rate'), monthly('browse-jan', '1月の回遊率', '2021-01', 'browsing_rate', 'rate'), monthly('browse-multi', '1月 2種類以上の完全URLを観測', '2021-01', 'multi_url_sessions'), monthly('browse-url', '1月 URL利用可能session', '2021-01', 'url_sessions'), monthly('coverage-dec', '12月 URL利用可能率', '2020-12', 'url_session_coverage', 'rate'), monthly('coverage-jan', '1月 URL利用可能率', '2021-01', 'url_session_coverage', 'rate')],
        boundary: '有効user/sessionのpage_viewで、有効な完全URL文字列を1種類以上観測したsessionが分母、2種類以上が分子。query違いも別URL。URL内容は配信せず、興味・満足度やページの意味を直接測る指標ではありません。',
        investigate: ['回遊率とURL利用可能率を同時に比較する。', '端末構成や入口の変化を確認する。URL正規化やページ種別を定義し直す場合は、既存指標と別指標として扱う。', '実案件ではページ種別・入口/出口・検索操作を追加し、購入目的を満たした単一ページ訪問と迷いを分ける。'],
        judgment: 'URLを観測できるsessionの割合は上昇しています。観測範囲の縮小以外の要因を調べます。ただし回遊を増やすだけで購入が増えるとも言えません。',
        action: {owner: 'UX・EC運営・計測担当', plan: 'ページ種別で調査対象を絞り、関連商品・比較導線の仮説を検証する。目的を満たした短い訪問を悪化扱いしない。', acceptance: '新指標のURL/ページ定義と欠測率を固定。導線変更は購入到達・売上と操作負荷も併せて評価する。'},
        needs: ['ページ種別・URL正規化ルール', '入口/出口・サイト内検索', '導線変更の対象/対照群'], models: ['ga4_normalize macro', 'int_ga4_sessions', 'mart_ga4_monthly']},
      {id: 'attributes', number: '05', theme: 'セグメント分析', title: '獲得元の数字を、広告効果と混同しない',
        question: '端末・地域・獲得元ごとの売上を、比較できる形で把握したい。',
        solution: 'イベントに記録された7属性の内訳と、同じ匿名IDの属性変動を示す分析。',
        conclusion: '1月は初回獲得sourceが月内に複数値を持つ匿名IDも観測されています。一人一属性を仮定せず、イベント粒度で比較するところから始めます。',
        facts: [fact('attr-multi', '1月 sourceが複数値の匿名ID', 'attribute_quality', r => r.month === '2021-01' && r.dimension === 'first_user_source', 'users_with_multiple_labels'), fact('attr-observed', '1月 source診断の観測匿名ID', 'attribute_quality', r => r.month === '2021-01' && r.dimension === 'first_user_source', 'observed_users'), fact('attr-session-multi', '1月 sourceが複数値の複合session', 'attribute_quality', r => r.month === '2021-01' && r.dimension === 'first_user_source', 'sessions_with_multiple_labels')],
        boundary: '属性はイベント記録値。区分別匿名ID数は非加算で、接続地域は居住地ではありません。初回獲得元はsession流入・広告の因果効果ではなく、難読化も考慮が必要です。',
        investigate: ['端末/OS/接続国/地域/初回source/medium/campaignの売上とイベント数を確認する。', 'NULL・空文字・placeholderと、同じ匿名IDが複数区分を持つ頻度を分けて見る。', '広告評価には媒体費・campaignキー・適切な流入/コンバージョン定義を追加し、照合の範囲を決める。'],
        judgment: 'セグメントの構成と観測売上は確認できますが、この内訳だけで広告予算の増減は決められません。',
        action: {owner: 'マーケティング・計測・分析担当', plan: '比較対象の母集団と属性の定義を合意し、広告費を含む媒体データと照合してから施策候補を決める。', acceptance: '各属性の売上合計がイベント売上と整合。非加算のユーザー数を合算しない。予算配分の評価は追加データと実験設計をそろえて行う。'},
        needs: ['媒体費・campaign対応表', 'session流入の計測仕様', '実験または効果検証の設計'], models: ['mart_ga4_attributes', 'mart_ga4_attribute_quality']},
      {id: 'quality', number: '06', theme: '品質保証', title: '数字が合わないとき、補正より先に境界を確かめる',
        question: 'イベント売上と商品売上の差や、重複をどう扱えばよいか。',
        solution: '転送・元集計照合・指標境界・配布検査を分け、未解決の差を残す品質設計。',
        conclusion: '元データとの照合に合格しても、取引ID欠損や重複候補は残ります。観測値を保持し、注文原票と照合するまで売上を推測で補正しません。',
        facts: [quality('quality-missing', '1月 transaction未記録のpurchase', 'missing_transaction_purchase_events'), quality('quality-duplicate', '1月 重複transactionに属するpurchase', 'duplicate_transaction_purchase_events'), quality('quality-item-null', '1月 商品売上NULLの明細', 'missing_item_revenue_rows'), quality('quality-refund', '1月 refundイベント', 'refund_events'), monthly('quality-event-usd', '1月 イベント売上', '2021-01', 'purchase_revenue_usd', 'usd')],
        boundary: '重複候補は実注文の重複とは限らず、同一transactionの内容違いもあります。原イベントを削除していません。refundイベント0から返品なし・返品率0%は導けません。NULL金額と実測0を分けます。',
        investigate: ['31ファイルのchecksumとschemaを確認し、保存した元BigQueryの1,465区分で件数・商品要素数・USD売上を照合する。', 'イベント売上とpurchase items売上を別々に集計し、差と欠損・重複候補を残す。', '順序同時刻・月跨ぎ・欠損ID・NULL/0のfixtureと、配信JSONのallowlistを検査する。'],
        judgment: 'この実装の転送・集計の一致は検証できています。業務上の正しい注文・返品・純売上の確定は、注文原票などの追加照合が必要です。',
        action: {owner: 'データ基盤・経理/EC運営・計測担当', plan: '注文/明細/返品の照合表を作り、取引キーの欠損・重複ルールを合意する。補正する場合は原値と補正理由を追跡できる形にする。', acceptance: '原票への追跡と差額の説明が可能。欠損を0にせず、補正前後を再現できる。品質閾値を合意し、未解決差を隠さない。'},
        needs: ['注文・返品・決済原票', '取引キーと重複の業務定義', '金額の税/送料/値引き仕様'], models: ['source_controls_match test', 'metric_boundaries test', 'mart_ga4_quality']}
    ];
  }
  function format(fact) { return fact.unit === 'usd' ? usd(fact.value) : fact.unit === 'rate' ? p(fact.value) : n(fact.value); }
  const api = {build, format};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Casebook = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
