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

データ基盤の設計・移行から、分析用データモデルとBIの整備までを担当しているデータエンジニアです。BigQuery・Snowflake・dbt・Dataformを用いたデータ連携、品質管理、運用改善を経験してきました。

AI活用では、根拠付き回答と会社別の閲覧権限を備えた「Commerce Insights」を個人開発し、検索・回答品質まで検証しています。

### ご相談いただける業務

- **データ基盤の整備・移行**：データの取込・変換、分析用モデル、品質テスト、再処理・運用手順の設計と実装
- **分析・BIの改善**：共通指標の定義、ダッシュボード、数字の不一致や集計負荷の調査
- **RAG・生成AIの検証**：文書検索・指標連携の試作、引用と回答品質の評価、会社・文書単位のアクセス制御

### 主な実務実績

- 物流案件のCSV連携パイプラインをIcebergで再構築し、処理時間を約90%削減
- 100人以上が使う出版業務ツールで、データ連携と書籍売上の可視化を担当
- 数億レコード規模のデータを、Spark・Scala・Pythonで分散処理

### 主要スキル

- **データ基盤・運用**: BigQuery、Snowflake、Dataform、dbt、Iceberg、Airflow、データ品質管理、DuckDB（個人開発）
- **クラウド・開発環境**: Google Cloud、AWS、Terraform、Docker、Git、CI/CD
- **開発言語**: Python（6年）、SQL（5年）、Scala、TypeScript（2年）
- **分析・可視化**: Streamlit、Data Studio、QuickSight、Tableau
- **AI・データアプリ（個人開発）**: OpenAI API、RAG（BM25・Dense・Hybrid）、指標ツール連携、文書のアクセス制御、LangChain、Qdrant

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

---

## 職務経歴

<section class="career-entry" markdown="block">

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版のDX案件
- アプリケーションDB・CSVからのデータ連携、Dataformによるデータ変換、Data Studioでの書籍売上可視化（ランキング、マーケ情報連携など）を担当
- 100人以上が使用する社内ツールの開発・運用を行い、書籍売上のDX化に貢献（基盤構築・立ち上げフェーズ）
- Streamlit による業務アプリ開発、AI 活用の検討を担当

##### スキルセット
- Python、SQL
- Google Cloud（BigQuery、Dataform、Cloud Run、Cloud Storage、Data Studio）

##### 主な取り組み
- CSVロードの冗長化と復旧手順を見据えたETL設計（GCS→GCS Parquet→BigQuery）
- Cloud Run による動的スキーマ変化への前処理、Protocol/Mixinを活用した疎結合設計
- 処理済みファイルのテーブル管理による再読込防止
- Dataformを用いたスタースキーマ設計とメタデータ管理
- E-R図や設計書などのドキュメント整備、業務要件に合わせたデータ活用方針提案

#### 物流のDX案件
- アプリケーションDBからデータ連携、dbtによるデータ変換、QuickSightでの物流DXダッシュボード改善を担当
- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt経由へ移行
- CSV連携のデータパイプラインをIcebergで再構築し、データロードを省略。処理時間を約90%削減
- dbtテスト拡充によるデータ品質・保守性向上の方針整理

##### スキルセット
- Python、TypeScript、SQL
- Snowflake、dbt、Terraform
- AWS（Glue Data Catalog、RDS、S3、ECS、Lambda、AWS CDK）

##### 主な経験
- レガシーシステムの段階的移行戦略の策定と実行
- アーキテクチャレベルの改善による性能最適化
- Iceberg、Snowflake などモダンデータ技術の導入経験
- データエンジニアリングにおけるテスト駆動・オブザーバビリティの実践

</section>

---

<section class="career-entry" markdown="block">

### 2023/8 - 2024/7：ココナラ（データエンジニア）

- Airflowのワークフロー構築と 2 系移行
- データリネージ・データ品質テスト導入（データマネジメント）
- ダッシュボードの開発・運用（Data Studio）
- DevSecOps（CI/CD）による開発効率化
- MLOps（Vertex AI Pipelines）で機械学習の運用強化
- チーム間の連携強化、業務フロー改善

**開発規模**
- R&Dグループ
- エンジニア 3名
- PM 1名

**主なスキル**
- Python、SQL
- ワークフロー構築（Apache Airflow、Embulk）
- GCP（BigQuery、Cloud Storage、Cloud Monitoring など）
- Docker
- CI/CD（GitHub Actions）
- Vertex AI Pipelines
- ベクトル近傍探索
- データマネジメント

**経験**
- 多くのユーザーに利用されるサービスの開発を通して、データマネジメント、インシデント対応、ポストモーテム、アジャイル開発、コスト・開発承認、プロジェクト推進、チーム間の連携など様々な学びがありました。
- 特にデータマネジメントでは、データ品質管理、メタデータ管理、リネージによるデータフローの可視化などを行いました。
- データ基盤開発をリードしつつ、チケットテンプレートの整備や CI/CD によるテスト、脆弱性チェック、デプロイ自動化を進めました。
- インフラチームとの連携フローを定義し、グループ間で効率的に協働できるように改善しました。

</section>

---

<section class="career-entry" markdown="block">

### 2023/1 - 2023/7：アスタミューゼ（データエンジニア）

- Pythonでバッチジョブのロジックを開発（Dataflow）
- Airflow の DAG を構築・整備
- BigQuery で前処理・リバース ETL を実施
- Cloud Profiler、Logging、Snyk、SAST、データリネージなどの導入を推進
- IAM の権限管理、Docker、CI/CD などチーム開発環境の整備

**開発規模**
- エンジニア 3名
- PM 1名

**主なスキル**
- Python、SQL
- ワークフロー構築（Apache Airflow）
- スケーラブルなバッチジョブ開発（Dataflow、Apache Beam）
- Spark によるビッグデータ処理
- GCP（Cloud Storage、Artifact Registry、Dataproc など）
- Docker
- CI/CD（GitLab Runner）

**経験**
- エンジニアの離脱など不安定な体制の中で、開発を維持しながら立て直した経験を積みました。
- Python の型ヒント、GCP 各サービス、CI/CD、Docker、Kubernetes などモダンな環境での実務経験を得ました。
- パフォーマンス監視や脆弱性診断ツールの導入を通じて、開発と運用の効率化を推進しました。
- 人の入れ替わりが激しい環境でも引き継ぎしやすいように、ドキュメント作成やデータリネージ、ER 図整備を重視しました。

</section>

---

<section class="career-entry" markdown="block">

### 2020/6 - 2022/12：パーソルキャリア株式会社（データエンジニア／データサイエンティスト）

#### 大規模レコメンドシステムの運用保守・AWS から GCP への移行
- 数億レコード規模のテーブルを Spark で分散処理し、集計や前処理を実施
- 複数モデルを用いたレコメンドパイプラインをシェルスクリプトで運用
- Item2Vec のモデル構築、パイプライン開発、運用を担当

**開発規模**
- エンジニア 6名
- PM 1名

**使用言語**
- Python
- Scala

**主なスキル**
- 学習・推論パイプラインの構築（Airflow、シェルスクリプト）
- Terraform によるシステム構築の自動化
- Scala、Spark によるビッグデータ処理
- GCP（Vertex AI、Cloud Storage、Artifact Registry、Dataproc など）
- AWS（EMR、S3 など）
- Numpy の行列演算を活用し、協調フィルタリングのコサイン類似度計算を約 1/100 に高速化

**経験**
- 多くのユーザーに利用されるサービスの運用保守を通して、障害対応や切り戻しを含む実践的な経験を積みました。
- 深夜対応やリリース障害対応も含め、運用の厳しさと耐障害性の重要性を学びました。
- AWS と GCP の両方で開発を経験し、クラウド横断での設計力を高めました。

#### 適正年収の自動査定サービス
- 転職市場の情報とユーザー属性をもとに、職種ごとのグレードと年収を推定するサービスを開発
- モデル推論部分のシステム構築と API 開発を担当

**開発規模**
- エンジニア 3名
- データサイエンティスト 1名
- PM 1名

**使用言語**
- Python

**主なスキル**
- 推論システムの構築
- 形態素解析、TF-IDF など基本的な自然言語処理
- AWS CloudFormation によるシステム構築の自動化
- Amazon API Gateway と AWS Lambda を利用した API 構築
- AWS Lambda と Amazon EFS の連携
- Amazon CloudWatch Logs を利用したログ環境整備

**経験**
- アプリケーション開発経験が少ない状態から、一人で実装を進めてリリースまで担当しました。
- 最終的には本採用しなかったものの、SQS、SageMaker、Step Functions など周辺サービスにも触れました。

</section>

---

<section class="career-entry" markdown="block">

### 2019/9 - 2020/5：フリーランス（データアナリスト）

#### ECサービスの顧客分析
- 顧客満足度（NPS）を機械学習で予測し、販売促進施策の改善につなげるプロジェクトに従事
- 一律のマスマーケティングから、ユーザーごとに施策を変えるターゲットマーケティングへの移行を支援

**開発規模**
- エンジニア 1名
- PM 1名

**使用言語**
- Python

**主なスキル**
- 構造化データの前処理・特徴量エンジニアリング
- 不均衡データへの対策（Over-sampling、Under-sampling、Calibration）
- BigQuery
- Keras
- scikit-learn

</section>

---

<section class="career-entry" markdown="block">

### 2018/11 - 2019/9：フリーランス（データアナリスト）

#### 住宅価格査定ロジック構築
- このプロジェクトでは物件価格査定の自動化が目的でした。
- 従来は人手査定か精度の低い機械学習予測に依存していたため、より高精度な機械学習モデルを構築しました。
- Treasure Data などを活用して ETL も担当しました。

**開発規模**
- エンジニア 2名
- PM 1名

**主なスキル**
- Python
- 構造化データの前処理・特徴量エンジニアリング
- Treasure Data
- Digdag を利用したワークフロー構築
- Embulk を利用したデータ転送
- scikit-learn を用いた機械学習処理
- チーム開発

</section>

---

<section class="career-entry" markdown="block">

### 2017/11 - 2018/10：DATUM STUDIO株式会社（データアナリスト）

#### レコメンドシステム構築／Web API開発
- アンケートデータからユーザーの求めるアイテムをレコメンドし、サービス価値向上に貢献しました。
- 前処理、機械学習（分類）、協調フィルタリング、Web API 構築、ダッシュボード開発を担当しました。

**開発規模**
- エンジニア 2名
- PM 1名

**使用言語**
- Python

**主なスキル**
- Amazon EC2 上へのレコメンドシステム構築
- Flask を用いた Web API 構築
- Amazon RDS（MariaDB）
- Amazon S3
- scikit-learn
- Tableau
- チーム開発

**学び・成果**
- 業務で AWS を使用したのは初めてで、クラウド基盤構築の実務経験を得ました。

</section>

---

<section class="career-entry" markdown="block">

### 2016/11 - 2017/10：株式会社モノゴコロ（サーバーサイドエンジニア／データアナリスト）

#### チャットアプリ開発（2016/11 - 2017/4）
- WebSocket を用いたリアルタイムチャットアプリを Ruby on Rails で実装

#### 画像認識を用いたサッカー動画解析（2017/5 - 2017/10）
- YOLO による物体検出でサッカー動画から選手チームを自動判別するプロトタイプを構築
- 応用として人検知による自動交通量調査アプリケーションを開発

**開発規模**
- エンジニア 1名
- PM 1名

**使用言語**
- Python
- JavaScript
- Ruby

**主なスキル**
- Ruby on Rails、PostgreSQL
- 画像認識、OpenCV、D3.js
- Git

**経験**
- Rails や Git など開発の基本を習得
- 画像認識・データ分析に触れるきっかけとなった案件

</section>

<div class="print-note">
  PDF 印刷の際はブラウザの「背景のグラフィックを印刷」オプションを有効化するとデザインが反映されます。
</div>
