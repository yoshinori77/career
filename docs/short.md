---
layout: default
title: 職務経歴書（短縮版）
description: データ基盤・分析・AI活用の主要経験をまとめた職務経歴書
permalink: /short/
---

<div class="hero-card">
  <div class="hero-card__name">山下 慶倫 / Yoshinori Yamashita</div>
  <div class="hero-card__role">データ基盤・分析・AI活用の検証 / 要約版</div>
</div>
<nav class="resume-nav" aria-label="資料を選ぶ">
  <a href="/career/">詳しい職務経歴</a>
  <a href="/career/commerce-insights/">動くデモを見る（ログイン不要）</a>
  <a href="https://github.com/yoshinori77/career/raw/refs/heads/main/%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8_%E7%9F%AD%E7%B8%AE%E7%89%88.pdf">短縮PDFを保存</a>
</nav>

## プロフィール

データ基盤の設計・移行から、分析用データモデルとBIの整備までを担当しているデータエンジニアです。BigQuery・Snowflake・dbt・Dataformを用いたデータ連携、品質管理、運用改善を経験してきました。

### ご相談いただける業務

- **基盤整備・移行**：Snowflake・BigQuery、dbt・Dataformを使ったデータ連携・変換、品質テスト、運用改善
- **分析・BI**：指標定義と分析用モデル、QuickSight・Streamlit等の画面整備、集計の不一致・負荷の調査
- **AI活用の検証**：RAG・根拠付き回答・検索評価・文書権限（OpenAI API、BM25・Dense・Hybrid）

開発環境：Python・SQL・TypeScript、AWS・Google Cloud、Terraform・GitHub Actions。

### 主な実務実績

- 物流案件のCSV連携パイプラインをIcebergで再構築し、処理時間を約90%削減
- 100人以上が使う出版業務ツールで、データ連携と書籍売上の可視化を担当
- 数億レコード規模のデータを、Spark・Scala・Pythonで分散処理


---

## 個人開発（データ基盤・分析・生成AI）

### EC分析・根拠付きAI・会社別BI「Commerce Insights」

- 公開GA4の92日・約430万イベントをDuckDB・dbtで整備。月次16指標をOSS MetricFlowで定義・照合し、6つの分析事例で数値の根拠から施策案・評価方法まで提示
- BM25・Dense・Hybridの検索と、指標ツールの数値・文書を引用するLLM回答を実装。会社・役割・文書権限をAPI・検索・AI入力・キャッシュへ適用
- 検索評価、数値・引用・保留／拒否のテスト、トークン数・費用・応答時間の記録と、GitHub Actionsのテスト・SAST・秘密情報検査を実装

公開サンプル・合成データによる個人開発。[公開デモ・分析6事例](https://yoshinori77.github.io/career/commerce-insights/) ／ [AIの動作・評価（図解）](https://yoshinori77.github.io/career/commerce-insights/ai.html)。ほかにLangChain・Qdrant・StreamlitによるPDF検索／質問応答、要約・株価分析アプリを試作。

---

## 職務経歴

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版のDX案件
- アプリケーションDB・CSVからのデータ連携、Dataformによるデータ変換、Data Studioでの書籍売上可視化を担当
- 100人以上が使用する社内ツールの開発・運用を行い、書籍売上のDX化に貢献
- Cloud Run による動的スキーマ変化への前処理、GCS→Parquet→BigQuery のETL、Dataformを用いたスタースキーマ設計を実施

#### 物流のDX案件
- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt 経由に移行
- CSV連携のデータパイプラインをIcebergで再構築し、データロードを省略。処理時間を約90%削減
- Terraform / AWS / dbt を用いた基盤改善、dbtテスト拡充によるデータ品質・保守性向上の方針整理を担当

### 2023/8 - 2024/7：ココナラ（データエンジニア）

- Airflowのワークフロー構築と2系移行
- BigQuery を中心としたデータ基盤開発、ダッシュボード開発・運用（Data Studio）を担当
- データリネージ、データ品質テスト、メタデータ管理などのデータマネジメント施策を導入
- CI/CD、チケットテンプレート、脆弱性チェック、デプロイ自動化など開発効率化を推進

### 2023/1 - 2023/7：アスタミューゼ（データエンジニア）

- Python / Dataflow / Apache Beam によるスケーラブルなバッチジョブ開発
- Airflow の DAG 整備、BigQuery での前処理・リバースETLを担当
- Cloud Profiler、Logging、Snyk、SAST、データリネージなどを導入し、開発・運用の効率化を推進

### 2020/6 - 2022/12：パーソルキャリア（データエンジニア／データサイエンティスト）

- 数億レコード規模のテーブルを Spark / Scala / Python で分散処理し、集計・前処理を担当
- AWS から GCP への移行、Dataproc、Terraform を用いた基盤運用を経験
- Item2Vec、協調フィルタリング、推論APIなど、機械学習モデルの構築・運用も担当
