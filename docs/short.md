## プロフィール

データ基盤の設計・構築・運用を軸に、分析・可視化や機械学習システムの開発を経験してきたデータエンジニアです。BigQuery、Snowflake、Dataform、dbtなどを用いたデータ連携・変換、既存基盤の移行、データ品質管理・運用改善を担当してきました。

個人開発では、LangChainやOpenAI APIを用いたRAG・要約・分析アプリをStreamlitで試作しています。データ処理からLLMとの連携、画面実装まで経験しています。

### 主要スキル

- **データ基盤・運用**: Snowflake、BigQuery、dbt、Dataform、Iceberg、Airflow
- **クラウド・開発環境**: Google Cloud、AWS、Terraform、Docker、GitHub Actions
- **開発言語**: Python、SQL、Scala、TypeScript
- **分析・可視化**: Data Studio、QuickSight、Tableau、Streamlit
- **AI・LLM（個人開発・学習）**: LangChain、OpenAI API、Qdrant、RAG、要約・分析アプリ

### 代表成果（実務）

- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt 経由へ移行し、データ変換時間を約90%削減
- GCS→GCS Parquet→BigQuery のETL設計、動的スキーマ変化への前処理、再読込防止テーブル管理を実装
- Dataform / dbt を用いたデータモデリング、メタデータ管理、データ品質・保守性向上の方針整理を推進
- Airflow、CI/CD、データリネージ、データ品質テストを含むデータ基盤運用改善を経験

---

## 個人開発・学習（RAG・LLMアプリ）

- LangChain、OpenAI API、QdrantによるPDF検索・質問応答（RAG）を実装。PDFのテキスト抽出・分割からベクトル検索、参照文書を返す回答生成、Streamlit画面まで作成
- YouTube字幕・Webページの要約アプリ、外部データの取得・Pythonによる指標計算・LLMによる文章分析を組み合わせた株価分析アプリを試作

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
