/* Executable local semantic layer. Public aggregate inputs only; no arbitrary SQL or expressions. */
(function(root) {
  'use strict';
  const dimensions = ['device','os','country','region','first_user_source','first_user_medium','first_user_campaign'];
  const monthlyFields = ['events','purchase_events','purchase_revenue_usd','missing_purchase_revenue_events','mau','buyers','previous_month_buyers','previous_month_buyer_rate','observed_buyer_rate','identifiable_sessions','url_sessions','multi_url_sessions','url_session_coverage','browsing_rate','view_sessions','cart_sessions','checkout_sessions','purchase_sessions','tied_funnel_sessions','period_boundary_sessions'];
  const productFields = ['item_rows','item_revenue_usd','quantity','missing_item_revenue_rows','missing_quantity_rows','nonfinite_item_revenue_rows','negative_item_revenue_rows','negative_quantity_rows'];
  const qualityFields = ['events','invalid_user_events','missing_session_param_events','duplicate_session_param_events','invalid_session_id_events','unidentifiable_session_events','missing_page_param_events','duplicate_page_param_events','unusable_page_view_events','invalid_date_events','date_suffix_mismatch_events','missing_timestamp_events','missing_purchase_revenue_events','nonfinite_purchase_revenue_events','negative_purchase_revenue_events','unidentifiable_purchase_events','unidentifiable_purchase_revenue_usd','missing_transaction_purchase_events','itemless_purchase_events','refund_events','duplicate_transaction_purchase_events','conflicting_transaction_purchase_events','repeated_event_key_excess_rows','missing_item_id_rows','missing_item_quantity_rows','missing_item_revenue_rows','negative_item_quantity_rows','negative_item_revenue_rows','item_ids_with_multiple_names'];
  const datasets = {
    month: {dataset:'monthly',fields:monthlyFields,keys:[]},
    day: {dataset:'daily',fields:['events','purchase_events','purchase_revenue_usd'],keys:['day']},
    product: {dataset:'products',fields:productFields,keys:['item_id','item_name','item_category']},
    attribute: {dataset:'attributes',fields:['events','users','purchase_events','purchase_revenue_usd','null_label_events','placeholder_label_events'],keys:['dimension','label']},
    attribute_quality: {dataset:'attribute_quality',fields:['observed_users','users_with_multiple_labels','observed_sessions','sessions_with_multiple_labels'],keys:['dimension']},
    quality: {dataset:'quality',fields:qualityFields,keys:[]}
  };
  const ratios = {previous_month_buyer_rate:['previous_month_buyers','buyers'],observed_buyer_rate:['buyers','mau'],url_session_coverage:['url_sessions','identifiable_sessions'],browsing_rate:['multi_url_sessions','url_sessions']};
  const descriptions = {
    purchase_revenue_usd:'purchaseイベント金額のUSD合計。欠損IDを保持し、取引を重複除去しない。NULLは0にしない。商品金額とは別粒度。',
    purchase_events:'purchaseイベント件数。注文数とは呼ばない。',
    mau:'任意イベントを観測した有効な匿名IDの月内distinct。実人数・GA4 UI Active usersとは異なり、月をまたいで加算できない。',
    buyers:'有効匿名IDの当月purchase観測数。月をまたいで加算できない。',
    previous_month_buyer_rate:'当月購入者のうち以前の観測暦月にも購入した匿名IDの割合。同月再購入は含めず、全3か月履歴を先に参照。初月NULL。',
    observed_buyer_rate:'当月購入者ID / 当月イベント観測匿名ID。',
    browsing_rate:'URL利用可能sessionのうち2種類以上の完全URL文字列を観測した割合。query違いも別URL。',
    url_session_coverage:'有効URLのpage_viewを観測したsession / 識別可能session。',
    users:'イベント属性値別の匿名ID distinct。同じIDが複数区分に現れるため区分をまたいで非加算。',
    item_revenue_usd:'purchase itemsのUSD合計。イベント売上を明細に複製しない。NULLは未取得。',
    quantity:'purchase itemsの観測数量。NULLと実測0を区別。',
    view_sessions:'同一の有効匿名ID/session内にview_itemを観測。session月は最初の観測日。',
    cart_sessions:'view_itemより後のadd_to_cartを観測。同時刻の順序は補完しない。',
    checkout_sessions:'厳密順序でview→cart→checkoutまで到達。',
    purchase_sessions:'厳密順序でview→cart→checkout→purchaseに到達。商品は同一とは限らない。'
  };
  function fail(message) { throw new Error(message); }
  function definition(metric, grain) {
    const ds = datasets[grain];
    if (!ds || !ds.fields.includes(metric)) fail('この指標と粒度の組合せは未対応です。');
    const ratio = ratios[metric] ?? null;
    const session = /sessions$|^url_session_coverage$|^browsing_rate$/.test(metric) && ['month'].includes(grain);
    return {metric,grain,dataset:ds.dataset,dimensions:ds.keys,allowed_dimensions:['attribute','attribute_quality'].includes(grain)?dimensions:[],
      unit: /_rate$|_coverage$/.test(metric)?'ratio':metric.endsWith('_usd')?'USD':'count',
      definition:descriptions[metric]??'保存済みdbt集計の観測値。定義・観測限界はDATA_CONTRACTと品質診断に従う。',
      month_basis:session?'first_observed_session_event_date':'export_event_date',
      numerator:ratio?.[0]??null,denominator:ratio?.[1]??null,
      cross_month_aggregation:'not_supported',cross_dimension_aggregation:metric==='users'||/users/.test(metric)||ratio?'non_additive':'not_supported',
      null_policy:metric==='previous_month_buyer_rate'||metric==='previous_month_buyers'?'observation_start_month_or_no_denominator':'no_observed_value_is_not_zero'};
  }
  function catalog() { return Object.entries(datasets).flatMap(([grain,d])=>d.fields.map(metric=>definition(metric,grain))); }
  function query(data, request) {
    if (!request || typeof request!=='object' || Array.isArray(request)) fail('指標queryはobjectで指定してください。');
    if (Object.keys(request).some(k=>!['metric','grain','month','dimension'].includes(k))) fail('任意式・集計・未定義のfilterは許可していません。');
    const {metric,grain,month,dimension}=request;
    if (typeof metric!=='string'||typeof grain!=='string') fail('metricとgrainを指定してください。');
    const def=definition(metric,grain),ds=datasets[grain];
    if (!/^\d{4}-\d{2}$/.test(month??'') || !data.monthly.some(r=>r.month===month)) fail('観測範囲内の単一月をYYYY-MMで指定してください。');
    const needsDimension=['attribute','attribute_quality'].includes(grain);
    if (needsDimension ? !dimensions.includes(dimension) : dimension!==undefined) fail('この粒度の許可済みdimensionを指定してください。');
    const rows=[];
    data[ds.dataset].forEach((r,index)=>{
      if(r.month!==month || (needsDimension && r.dimension!==dimension))return;
      const value=r[metric];if(value!==null && (typeof value!=='number'||!Number.isFinite(value)))fail('集計に非有限または未定義の値があります。');
      const pair=ratios[metric];
      rows.push({month,value,reason:value===null?(month===data.monthly[0].month && metric.startsWith('previous_month_')?'observation_start_month':pair && !r[pair[1]]?'zero_denominator':'no_observed_value'):null,
        numerator:pair?r[pair[0]]:null,denominator:pair?r[pair[1]]:null,
        dimensions:Object.fromEntries(ds.keys.map(k=>[k,r[k]])),
        citation:{dataset:ds.dataset,month,field:metric,pointer:'/'+ds.dataset+'/'+index+'/'+metric}});
    });
    return {contract_version:1,metric,grain,month,definition:def,rows};
  }
  function monthRow(data, month) {
    return Object.fromEntries([['month',month],...monthlyFields.map(metric=>[metric,query(data,{metric,grain:'month',month}).rows[0].value])]);
  }
  function datasetRows(data,grain,month,dimension) {
    const ds=datasets[grain];if(!ds)fail('未対応の粒度です。');
    const requests=ds.fields.map(metric=>query(data,{metric,grain,month,...(dimension===undefined?{}:{dimension})}));
    return requests[0].rows.map((r,i)=>Object.assign({month,...r.dimensions},Object.fromEntries(requests.map(q=>[q.metric,q.rows[i].value]))));
  }
  function fact(data,dataset,match,field) {
    const grain=Object.keys(datasets).find(g=>datasets[g].dataset===dataset);if(!grain)fail('許可された集計ではありません。');
    const original=data[dataset].find(match);if(!original)fail('根拠がありません。');
    const result=query(data,{metric:field,grain,month:original.month,...(['attribute','attribute_quality'].includes(grain)?{dimension:original.dimension}:{})});
    const row=result.rows.find(r=>data[dataset][Number(r.citation.pointer.split('/')[2])]===original);
    if(!row)fail('引用元が解決できません。');return row;
  }
  const api={query,catalog,definition,monthRow,datasetRows,fact};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Metrics=api;
})(globalThis);
