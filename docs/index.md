---
layout: default
title: 職務経歴書
description: データエンジニア・データアナリスト 山下慶倫の職務経歴書
permalink: /
---

<div class="hero-card">
  <div class="hero-card__name">山下 慶倫 / Yoshinori Yamashita</div>
  <div class="hero-card__role">データエンジニア・データアナリスト</div>
  <ul class="hero-card__meta">
    <li>押上在住</li>
    <li>35歳</li>
  </ul>
  <div class="hero-card__links">
    <a href="https://x.com/50kaitenzlove" target="_blank" rel="noopener">X（@50kaitenzlove）</a>
    <a href="https://github.com/yoshinori77" target="_blank" rel="noopener">GitHub（@yoshinori77）</a>
  </div>
</div>

<nav class="resume-nav" aria-label="資料を選ぶ">
  <a href="/career/short/">短縮版の職務経歴書</a>
  <a href="/career/commerce-insights/">動くデモを見る（ログイン不要）</a>
  <a href="https://github.com/yoshinori77/career/raw/refs/heads/main/README.pdf">詳細PDFを保存</a>
</nav>

## プロフィール

データ基盤の設計・構築・移行から、分析用データモデル、BI、機械学習システムの運用まで対応するデータエンジニアです。2016年からソフトウェア開発に携わり、Pythonは2017年から実務で使用しています。

BigQuery・Snowflake・dbt・Dataformを中心に、データ基盤の立ち上げ・移行・性能改善を担当してきました。既存構成の課題を整理し、移行方針や処理方式を設計して実装・運用まで進めています。事業部・分析担当・インフラ担当と要件・仕様を調整し、担当領域の開発をリードできます。

AI領域では、実務でレコメンド・推論API・MLOpsを経験。個人開発ではRAG、指標ツール連携、権限制御、検索・回答品質の評価まで実装し、データ基盤とAIアプリケーションの両面から課題に取り組んでいます。

### ご相談いただける業務

- **データ基盤の設計・構築・移行**：BigQuery・Snowflakeを使ったDWH、ETL/ELT、dbt・Dataformのモデル設計、既存パイプラインの再構築
- **データ活用・品質・運用改善**：データマート、共通指標、BI、処理性能の改善、品質テスト、再読込防止、復旧手順・設計書の整備
- **Python・機械学習・AIアプリ開発**：データ加工、モデルの学習・推論パイプライン、API、RAG・根拠付き回答・評価基盤の試作

### 主な実務実績

- **データ連携の処理時間を約90%削減**：物流案件のCSV連携パイプラインをIcebergで再構築し、従来のデータロードを省略
- **100人以上が使う出版業務ツールの基盤整備**：データ取込からDataformのモデル設計、書籍売上の可視化、開発・運用を担当
- **数億レコード規模のデータ処理・機械学習運用**：Sparkによる分散処理、レコメンドパイプライン、AWSからGCPへの移行に従事
- **類似度計算を約1/100の処理時間に短縮**：協調フィルタリングのコサイン類似度計算をNumPyの行列演算で最適化

### 主要スキル

- **言語・API**：Python（2017年〜実務使用）、SQL、Scala、TypeScript、FastAPI、Flask
- **DWH・データモデリング**：BigQuery、Snowflake、dbt、Dataform、Iceberg、スタースキーマ、データマート、データ品質・リネージ
- **処理・機械学習基盤**：Airflow、Cloud Composer、Dataflow、Apache Beam、Spark、Dataproc、Vertex AI Pipelines
- **クラウド・開発運用**：Google Cloud、AWS、Terraform、Docker、GitHub Actions、CI/CD、監視・脆弱性検査
- **分析・可視化**：Streamlit、Looker Studio、QuickSight、Tableau、scikit-learn、特徴量設計、レコメンド
- **生成AI・評価（個人開発）**：OpenAI API、LangChain、Qdrant、Hybrid検索、指標ツール連携、認可、DuckDB・MetricFlow

---

## 職務経歴

<section class="career-entry" markdown="block">

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版のDX案件：データ基盤の立ち上げ・売上可視化

**担当範囲**：データ基盤の立ち上げ、取込・前処理と分析用モデルの設計実装、BI・業務アプリ、運用設計・ドキュメント整備。

- **取込・再処理方式の設計**：アプリケーションDB・CSVを対象に、GCS→Parquet→BigQueryのETLを設計・実装。CSVロードの冗長化と復旧手順を考慮し、処理済みファイルをテーブル管理して再読込を防止
- **スキーマ変化への対応**：Cloud Runで入力データの前処理を実装。Protocol/Mixinを使って処理を分離し、変更時に影響範囲を追いやすい構成を整備
- **DWH・データマートの設計**：Dataformでスタースキーマを設計し、取込データを分析に使えるモデルへ変換。メタデータとE-R図・設計書を整備
- **データ活用・業務アプリ**：Looker Studioで書籍売上ランキングやマーケティング情報を可視化。Streamlitによる業務アプリ開発とAI活用の検討を担当
- **成果・連携**：データ取込・モデル・可視化をつなぎ、100人以上が使う社内ツールの開発・運用を担当。業務要件に合わせたデータ活用方針を提案し、運用・引継ぎに必要な設計情報を整備

**技術**：Python、SQL、BigQuery、Dataform、Cloud Run、Cloud Storage、Looker Studio、Streamlit

#### 物流のDX案件：Snowflake・dbtへの移行とパイプライン改善

**担当範囲**：既存構成の見直し、移行方式の検討、データ連携・変換の実装、基盤管理、ダッシュボード改善。

- **移行・処理構成の設計**：AWS RDSからQuickSightへ直接接続していた構成を見直し、Snowflake＋dbtを経由する構成へ段階的に移行
- **変換・データ提供**：アプリケーションDBからデータを連携し、dbtで分析用データへ変換。QuickSightの物流ダッシュボード改善に対応
- **Icebergによるパイプライン再構築**：CSV連携をIcebergに置き換え、従来のデータロードを省略する方式を実装。対象パイプラインの処理時間を約90%削減
- **基盤の管理・運用改善**：Terraform・AWSを使った基盤改善と、構成変更に伴う運用の見直しを担当
- **品質・保守性**：dbtテスト拡充の方針を整理。段階的な移行、性能改善、データ品質・オブザーバビリティを考慮して開発を推進

**技術**：Python、SQL、TypeScript、Snowflake、dbt、Iceberg、Terraform、AWS（Glue Data Catalog、RDS、S3、ECS、Lambda、CDK）、QuickSight

</section>

---

<section class="career-entry" markdown="block">

### 2023/8 - 2024/7：ココナラ（データエンジニア）

**担当範囲**：データ基盤開発のリード、ワークフロー移行、データマネジメント、CI/CD・運用改善、チーム間連携。R&Dグループ：エンジニア3名・PM1名。

- **パイプライン構築・移行**：BigQueryを中心としたデータ基盤開発をリード。Airflowのワークフロー構築と2系移行、Looker Studioのダッシュボード開発・運用を担当
- **品質・依存関係の管理**：データ品質テスト、メタデータ管理、リネージを導入し、データフローと処理の依存関係を可視化
- **開発・リリースの自動化**：GitHub Actionsでテスト、脆弱性チェック、デプロイを自動化。チケットテンプレートも整備し、開発・運用の進め方を改善
- **機械学習の運用**：Vertex AI Pipelinesを用いたMLOpsと、ベクトル近傍探索に関する開発を担当
- **要件調整・運用対応**：インフラチームとの連携フローを定義。インシデント対応・ポストモーテム、コスト・開発承認を含む関係者との調整に対応

**技術**：Python、SQL、BigQuery、Airflow、Embulk、Cloud Storage、Cloud Monitoring、Docker、GitHub Actions、Vertex AI Pipelines

</section>

---

<section class="career-entry" markdown="block">

### 2023/1 - 2023/7：アスタミューゼ（データエンジニア）

**担当範囲**：バッチ・ワークフロー開発、データ加工、権限管理、監視・セキュリティ・開発環境整備。エンジニア3名・PM1名。

- **バッチ・加工処理**：Python・Dataflow・Apache Beamでバッチジョブを開発。Airflow DAGの構築・整備と、BigQueryの前処理・リバースETLを担当
- **実行・開発環境**：IAM権限管理、Docker、GitLab Runnerを用いたCI/CDを整備。Spark・Dataprocによるデータ処理も経験
- **監視・セキュリティ**：Cloud Profiler・Logging、Snyk・SAST、データリネージの導入を進め、性能調査・脆弱性検査・運用改善に対応
- **運用継続・引継ぎ**：メンバー交代のある体制で開発を維持。設計書・E-R図・データフローを整え、仕様を共有・引継ぎできる状態を整備

**技術**：Python、SQL、Airflow、Dataflow、Apache Beam、Spark、Dataproc、Cloud Storage、Artifact Registry、Docker、GitLab Runner

</section>

---

<section class="career-entry" markdown="block">

### 2020/6 - 2022/12：パーソルキャリア株式会社（データエンジニア／データサイエンティスト）

#### 大規模レコメンドシステムの運用保守・AWSからGCPへの移行

**担当範囲**：大規模データ処理、レコメンドモデル、学習・推論パイプライン、クラウド移行・運用。エンジニア6名・PM1名。

- **データ処理**：数億レコード規模のテーブルをSpark・Scala・Pythonで分散処理し、学習・推論に用いる集計・前処理を実装
- **モデル・パイプライン**：Item2Vecのモデル構築からパイプライン開発・運用を担当。複数モデルを使うレコメンド処理をAirflow・シェルスクリプトで運用
- **性能改善**：協調フィルタリングのコサイン類似度計算をNumPyの行列演算で最適化し、処理時間を約1/100に短縮
- **クラウド移行・構成管理**：AWS（EMR・S3）からGCPへの移行に従事。Dataprocなどの処理基盤とTerraformによる構成管理・自動化を経験
- **安定運用**：リリース・障害時の調査、切り戻しを含む運用保守に対応

**技術**：Python、Scala、Spark、NumPy、Airflow、Terraform、Google Cloud（Vertex AI、Cloud Storage、Artifact Registry、Dataproc）、AWS（EMR、S3）

#### 適正年収の自動査定サービス：推論システム・API開発

**担当範囲**：モデル推論部分のシステム構築、API、インフラ構築、ログ環境、リリース。エンジニア3名・データサイエンティスト1名・PM1名。

- 転職市場の情報とユーザー属性から職種別のグレード・年収を推定するサービスで、モデル推論部分とAPIの開発を担当
- API Gateway・Lambda・EFSを組み合わせた推論処理と、CloudFormationによるインフラ構築、CloudWatch Logsによるログ環境を実装
- 形態素解析・TF-IDFなどの自然言語処理を活用。担当した推論・API部分は、自ら実装を進めてリリースまで対応

**技術**：Python、AWS（API Gateway、Lambda、EFS、CloudFormation、CloudWatch Logs）、自然言語処理

</section>

---

<section class="career-entry" markdown="block">

### 2019/9 - 2020/5：フリーランス（データアナリスト）

#### ECサービスの顧客分析・NPS予測

- 顧客満足度（NPS）を機械学習で予測し、顧客ごとの販売促進施策を検討するプロジェクトに参画
- BigQueryを使ったデータ分析と、構造化データの前処理・特徴量エンジニアリングを担当
- scikit-learn・Kerasによるモデル開発で、Over-sampling・Under-sampling・Calibrationなど、不均衡データへの対策を実施

**体制・技術**：エンジニア1名・PM1名／Python、SQL、BigQuery、scikit-learn、Keras

</section>

---

<section class="career-entry" markdown="block">

### 2018/11 - 2019/9：フリーランス（データアナリスト）

#### 住宅価格査定の機械学習モデル・ETL構築

- 人手査定・既存予測の改善を目的に、物件価格査定の機械学習モデルを構築
- 構造化データの前処理・特徴量設計と、scikit-learnを用いたモデル開発を担当
- Treasure Data・Embulkによるデータ転送・ETLと、Digdagによるワークフローを構築

**体制・技術**：エンジニア2名・PM1名／Python、Treasure Data、Digdag、Embulk、scikit-learn

</section>

---

<section class="career-entry" markdown="block">

### 2017/11 - 2018/10：DATUM STUDIO株式会社（データアナリスト）

#### レコメンドシステム・Web API・ダッシュボード開発

- アンケートデータの前処理、分類モデル、協調フィルタリングによるレコメンド処理を実装
- FlaskでWeb APIを構築し、Amazon EC2・RDS（MariaDB）・S3を使ったシステム開発に対応
- Tableauによるダッシュボード開発を担当

**体制・技術**：エンジニア2名・PM1名／Python、Flask、scikit-learn、Tableau、AWS

</section>

---

<section class="career-entry" markdown="block">

### 2016/11 - 2017/10：株式会社モノゴコロ（サーバーサイドエンジニア／データアナリスト）

- **チャットアプリ（2016/11 - 2017/4）**：Ruby on Rails・WebSocketでリアルタイムチャットを実装
- **動画解析（2017/5 - 2017/10）**：Python・YOLOでサッカー動画から選手チームを判別するプロトタイプを構築。人検知を使った自動交通量調査アプリも開発

**体制・技術**：エンジニア1名・PM1名／Python、Ruby、JavaScript、Rails、PostgreSQL、OpenCV、D3.js、Git

</section>

---

## 個人開発（データ基盤・分析・生成AI）

### EC分析・根拠付きAI・会社別BI「Commerce Insights」（2026年11月）

「画面とAIで数字の意味が違う」「分析結果から次の行動が決まらない」「会社の文書を権限に沿ってAIに渡したい」という課題を想定し、データ整備から画面・生成AI・認可まで実装したサンプルアプリです。

- **データ基盤・共通指標**：GA4公開サンプル92日・約430万イベントをParquetで取得し、DuckDB・dbtで整備。月次16指標をOSS MetricFlowで定義し、既存集計と照合。共通指標を画面・分析事例・AIの指標ツールで共有
- **分析から施策の検討**：売上変動・ファネル・継続購入など6課題について、観測した事実、追加調査、判断、未実行の施策案、評価方法を示す画面を作成
- **RAG・生成AI**：用語検索（BM25）、意味ベクトル検索（Dense）、両者を組み合わせたHybridを質問に応じて切替。LLMの回答には、許可した指標関数の数値と参照文書を引用
- **認証・認可**：ログインした本人の会社・役割・文書権限をサーバーで確認し、API・検索・AI入力・キャッシュへ適用。権限失効後に古い結果を返さない処理を実装
- **評価・運用**：固定した文書・質問セットでHit@1・Recall@5などの検索評価を実施。回答の数値・引用・情報不足時の保留・他社要求の拒否をテストし、トークン数・費用・応答時間を記録。GitHub Actionsでテスト・ビルド・SAST・依存関係／秘密情報の検査を実施

公開サンプルと合成データを使った個人開発です。

[公開デモ：ダッシュボードと分析6事例](https://yoshinori77.github.io/career/commerce-insights/) ／ [AIの動作・評価（図解）](https://yoshinori77.github.io/career/commerce-insights/ai.html) ／ [認証付きAI・文書管理デモ（招待制）](https://rasuharu-commerce-insights.rasuharu.chatgpt.site/tenant.html)

### PDF検索・質問応答と要約アプリ

- LangChain、OpenAI API、Qdrantを用い、PDFのテキスト抽出・分割、ベクトル検索、検索文書を参照した回答生成（RAG）を実装
- 回答とともに参照文書を返す処理、PDFアップロード・質問入力のStreamlit画面を作成
- YouTube字幕やWebページを取得し、LLMで要約するアプリを試作

### 外部データとLLMを組み合わせた株価分析アプリ

- 外部APIによる株価・財務情報・ニュースの取得、Pythonによる指標計算、OpenAI APIによる文章分析を組み合わせた処理フローを実装
- Streamlitで銘柄・分析条件の選択と結果表示を実装し、非同期処理や画面の状態保持に対応
- データ取得や例外処理など、一部の機能について、pytestによる正常系・異常系テストを作成

<div class="print-note">
  PDF 印刷の際はブラウザの「背景のグラフィックを印刷」オプションを有効化するとデザインが反映されます。
</div>
