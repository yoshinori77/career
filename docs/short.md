---
layout: default
title: 職務経歴書（短縮版）
description: データ基盤・分析・AI活用の主要経験をまとめた職務経歴書
permalink: /short/
---

## プロフィール

データ基盤の設計・構築・運用を軸に、分析・可視化や機械学習システムの開発を経験してきたデータエンジニアです。BigQuery、Snowflake、Dataform、dbtなどを用いたデータ連携・変換、既存基盤の移行、データ品質管理・運用改善を担当してきました。

個人開発では、GA4公開データを用い、データ基盤・分析ダッシュボード・根拠付きLLM回答・会社別のアクセス制御を組み合わせた「Commerce Insights」を開発しました。指標定義や閲覧権限を守ってデータをAIにつなぐ構成を、実装とテストで検証しています。

### 主要スキル

- **データ基盤・運用**: Snowflake、BigQuery、dbt、Dataform、Iceberg、Airflow、DuckDB（個人開発）
- **クラウド・開発環境**: Google Cloud、AWS、Terraform、Docker、GitHub Actions
- **開発言語**: Python、SQL、Scala、TypeScript
- **分析・可視化**: Data Studio、QuickSight、Tableau、Streamlit
- **AI・データアプリ（個人開発）**: OpenAI API、RAG、BM25・Dense・Hybrid、文書のアクセス制御、LangChain、Qdrant

### 代表成果（実務）

- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt 経由へ移行し、データ変換時間を約90%削減
- GCS→GCS Parquet→BigQuery のETL設計、動的スキーマ変化への前処理、再読込防止テーブル管理を実装
- Dataform / dbt を用いたデータモデリング、メタデータ管理、データ品質・保守性向上の方針整理を推進
- Airflow、CI/CD、データリネージ、データ品質テストを含むデータ基盤運用改善を経験

---

## 個人開発（データ基盤・分析・生成AI）

### EC分析・根拠付きAI・会社別BI「Commerce Insights」

- 公開GA4の92日・約430万イベントをDuckDB・dbtで整備。月次16指標をOSS MetricFlowで定義・照合し、6つの分析事例で数値の根拠から施策案・評価方法まで提示
- BM25・Dense・Hybridの検索と、指標ツールの数値・文書を引用するLLM回答を実装。会社・役割・文書権限をAPI・検索・AI入力・キャッシュへ適用
- 検索評価、数値・引用・保留／拒否のテスト、トークン数・費用・応答時間の記録と、GitHub Actionsのテスト・SAST・秘密情報検査を実装

公開サンプル・合成データによる個人開発。[公開デモ・分析6事例](https://yoshinori77.github.io/career/commerce-insights/)。ほかにLangChain・Qdrant・StreamlitによるPDF検索／質問応答、要約・株価分析アプリを試作。

---

## 職務経歴

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版のDX案件
- アプリケーションDB・CSVからのデータ連携、Dataformによるデータ変換、Data Studioでの書籍売上可視化を担当
- 100人以上が使用する社内ツールの開発・運用を行い、書籍売上のDX化に貢献
- Cloud Run による動的スキーマ変化への前処理、GCS→Parquet→BigQuery のETL、Dataformを用いたスタースキーマ設計を実施

#### 物流のDX案件
- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt 経由に移行
- CSVデータ連携をIceberg化し、データロードを省略する構成にリプレイス
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
