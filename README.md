# 職務経歴書

## 山下慶倫
<div style="background: url(/Users/rasuharu/Documents/SDIM1593.jpeg) 50% 50% no-repeat; background-size:cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
  <div style="background: rgba(0,0,0,0.5); padding: 30px 40px; font-size: 3.0em; color: #fff;">Yoshinori Yamashita</div>
</div>

<div style="page-break-after: always;"></div>

# プロフィール

## 山下慶倫（Yoshinori Yamashita）

**データエンジニア・データアナリスト** | 34歳 | 押上在住

### 自己紹介

データ基盤の設計・構築から分析まで一貫して対応できるデータエンジニアです。GCP、AWS、Snowflake、dbtなどを活用し、**安くて速いデータパイプライン構築**が得意です。また、機械学習モデルの構築やビジネス課題の解決にも対応可能です。フリーランスとして複数のDX案件を手がけ、データ変換時間を90%削減するなど成果を出しています。

### 連絡先

- X：[らすはる](https://x.com/50kaitenzlove)
- GitHub: [yoshinori77](https://github.com/yoshinori77)

### 主要スキル

- **データ基盤**: GCP（BigQuery、Dataform）、AWS、Snowflake、dbt、Iceberg
- **開発言語**: Python（6年）、SQL（5年）、TypeScript（2年）
- **BI・可視化**: Streamlit、Looker Studio、QuickSight、Tableau
- **その他**: Git、Docker、Terraform、CI/CD

<div style="page-break-after: always;"></div>

# 職務経歴

## 2024/8 - 現在：フリーランス

### ポジション

- データエンジニア

### 業務内容

#### 出版のDX案件

- アプリケーションDB・csvからデータ連携、Dataformによるデータ変換、LookerStudioで書籍売上の可視化（ランキング、マーケ情報連携など）を担当
- 100人以上が使用する社内ツールの開発・運用を行い、書籍売上のDX化に貢献（基盤構築・立ち上げフェーズ）
- 今後はAI導入やwebアプリケーション開発（Streamlit）などの拡張フェーズを推進する予定

#### 物流のDX案件

- アプリケーションDBからデータ連携、dbtによるデータ変換、QuickSightで物流DXダッシュボードのブラッシュアップを担当
- 既存のサービスはQuickSightからAWS RDSに直接アクセスしていて、パフォーマンスの良い設計ではありませんでしたが、半年ほどかけて、AWS RDS -> Snowflake（dbt） -> QuickSightという構成に移行し、データ変換にかかる時間を約90%減少
- csvのデータ連携をIceberg化し、データロードを省略するモダンな構成にリプレイス
- 今後はdbtのテストを拡充し、データ品質や保守性の向上を推進する予定

### スキル

#### 出版のDX案件

- Python、SQL
- Google Cloud（BigQuery、Dataform、Cloud Run、Cloud Storage、LookerStudio）

#### 物流のDX案件

- Python、TypeScript、SQL
- Snowflake、dbt、Terraform
- AWS（Glue Data Catalog、RDS、S3、ECS、Lambda、AWS CDK）

<div style="page-break-after: always;"></div>

### 経験

#### 出版のDX案件
- csvファイルのBQロードではいくつか工夫しました。
  - データ基盤をリカバリしやすいように設計しました。csvファイルのETL（BQロード）の際に、GCS(csv) -> GCS（前処理済みparquet） -> BQロードの順に処理を行うことで万一BQのデータが消えても復旧できるようにしました。
  - csvファイルのカラム名が動的に変更される仕様だったためCloud Runで前処理を実施しました。PythonのProtocolでインターフェースによる疎結合な設計、Mixinによる共通部分の集約を心がけました。
  - 処理済みのファイル名をテーブルで管理し、ロード済みファイルを読み込まないようにしました。
- Dataformによるデータモデリングを行いました。スタースキーマを意識したテーブル設計、メタデータ管理を通して使いやすいデータ基盤を心がけました。
- E-R図・設計書等のドキュメント作成、データ活用の方針提案を行い、顧客に寄り添ったデータ基盤・ダッシュボードの構築を行いました。

#### 物流のDX案件

- レガシーシステムの課題を理解し、段階的な移行戦略を立案・実行する経験を得ました。既存システムの制約を理解しながら、ビジネス影響を最小限に抑えた移行計画を立てる重要性を学びました。
- パフォーマンス改善では、単純な最適化ではなく、アーキテクチャレベルでの根本的な見直しが重要であることを実感しました。90%の時間削減という成果を通じて、データ基盤設計の重要性を再認識しました。
- モダンなデータ技術（Iceberg、Snowflake）の導入を通じて、データエンジニアリングの進化を肌で感じ、継続的な学習と技術キャッチアップの必要性を実感しました。
- テスト駆動開発やオブザーバビリティの考え方をデータエンジニアリングに適用することの価値を学びました。

<div style="page-break-after: always;"></div>

## 2023/8 - 2024/7：ココナラ

### ポジション

- データエンジニア

### 業務内容

- Airflow（Cloud Composer）のワークフローを構築・2系移行
- データリネージ・データ品質テストの導入（データマネジメント）
- ダッシュボードの開発・運用（Looker Studio）
- DevSecOps（CI/CD）で開発効率化
- MLOps（Vertex AI Pipelines）で機械学習の運用強化
- チーム間の連携強化、業務フロー改善

### 開発規模

- R&Dグループ
  - エンジニア 3名
  - PM 1名

### スキル

- Python、SQL
- ワークフロー構築（Cloud Composer、Apache Airflow、Embulk）
- GCP（BigQuery、Cloud Composer、Cloud Storage、Cloud Monitoring...）
- Docker
- CI/CD（GitHub Actions）
- Vertex AI Pipelines
- ベクトル近傍探索
- データマネジメント

### 経験

- 多くのユーザーに利用されるサービスの開発を通して、データマネジメント、インシデント対応、ポストモーテム、アジャイル開発、コスト・開発承認、プロジェクト推進、チーム間の連携など様々な学びがありました。
- 特にデータマネジメントではデータ品質管理、メタデータ管理、リネージによるデータフローの可視化などを行いました。
- データ基盤などの開発をリードしつつ、開発効率化に向けてチケットのテンプレートを作成したり、CI/CDでテスト・脆弱性チェック・デプロイを自動化しました。
- 技術以外の部分も改善しました。インフラチームと私が所属しているグループの間でタスクの連携がスムーズにできていなかったので、業務フローを決めて効率的に連携できるようにしました。

<div style="page-break-after: always;"></div>

## 2023/1 - 2023/7：アスタミューゼ

### ポジション

- データエンジニア

### 業務内容

- Pythonでバッチジョブのロジックを開発（Dataflow）
- AirflowのDAGを構築・整備
- BigQueryで前処理・リバースETLを実施
- Cloud Profiler、Logging、Snyk、SAST、データリネージなど便利ツールの導入（モニタリング、脆弱性診断ツールなど）
- IAMの権限管理、Docker・CI/CDなどチームの開発環境の整備

### 開発規模

- エンジニア 3名
- PM 1名

### スキル

- Python、SQL
- ワークフローの構築（Cloud Composer、Apache Airflow）
- スケーラブルなバッチジョブでデータ処理（Dataflow、Apache Beam）
- Sparkのビッグデータ処理
- GCP（Cloud Composer、Cloud Storage、Artifact Registry、Dataproc...）
- Docker
- CI/CD（GitLab Runner）

### 経験

- エンジニアの離脱など不安定な体勢の中、ピンチを乗り切った経験で人間としてもエンジニアとしても成長しました。
- Pythonの型ヒント、GCPの各サービス、CI/CD、Docker、K8sなどモダンな環境で得られた経験値は非常に学びに繋がりました。
- パフォーマンスのモニタリングツール導入や、脆弱性診断ツールを取り入れるなど積極的に効率化を図りました。
- 人の入れ替わりが激しい職場なので、ドキュメントを書く習慣を心がけ、さらにデータリネージやER図などを取り入れてデータの流れが誰でもわかるようにしました。

<div style="page-break-after: always;"></div>

## 2020/6 - 2022/12：パーソルキャリア株式会社

### ポジション
- データエンジニア
- データサイエンティスト

### 業務内容1：大規模レコメンドシステムの運用保守 & AWS -> GCP移行
- 数億レコードのテーブルを分散処理（Spark）で集計などを行う前処理を実施
- 複数のモデルを用いてレコメンドし、パイプラインをシェルスクリプトで管理
- Item2Vecのモデル構築・パイプライン構築・運用

### 開発規模
- エンジニア 6名
- PM 1名

### 使用言語
- Python
- Scala

### スキル
- 学習・推論パイプラインの構築（Cloud Composer、シェルスクリプト）
- Terraformによるシステム構築の自動化
- Scala・Sparkのビッグデータ処理
- GCP（Vertex AI、Cloud Composer、Cloud Storage、Artifact Registry、Dataproc...）
- AWS（EMR、S3...）
- Python（Numpy）で協調フィルタリングのコサイン類似度を算出する際に、行列演算で処理時間を約1/100に高速化

### 経験
- 多くのユーザーに利用されるサービスの運用保守を通して様々な学びがありました。
- 深夜対応、開発の切り戻しなどがあり精神的にも鍛えられました。
- AWSとGCP両方の開発を経験し、スキルアップにつながりました。

<div style="page-break-after: always;"></div>

### 業務内容2：適正年収の自動査定サービス
- 転職市場の情報とユーザーの職種、業種、年齢などを照らし合わせて、職種におけるグレード・年収を推定することで適正年収の指標を提供しました。
- モデルの推論部分のシステム構築（API開発）

### 開発規模
- エンジニア 3名
- データサイエンティスト 1人
- PM 1名

### 使用言語
- Python

### スキル
- 推論システムの構築
- 形態素解析、IF-IDFなど基本的な自然言語処理
- AWS CloudFormationによるシステム構築の自動化
- Amazon API Gateway & AWS Lambdaを利用したAPI構築
- AWS LambdaとAmazon EFSの連携（学習済みの機械学習モデルを配置）
- AWS Cloud Watch Logs を利用したログ環境の整備

### 経験
- アプリケーションの開発経験が少ない中、一人で開発を進めてリリースしました。
- 最終的には使用しませんでしたが、SQS、SageMaker、Step Functionsなどにも触れました。

<div style="page-break-after: always;"></div>

## 2019/9 - 2020/5：フリーランス

### ポジション
- データアナリスト

### ECサービスの顧客分析
- 顧客満足度（NPS）を機械学習で予測して、サービスの改善（特に販売促進）をすることが目的でした。
- これまでのユーザー全てに同じ施策を打つマスマーケティングから、ユーザーごとに施策を分けるターゲットマーケティングへのきっかけをサポートしました。

### 開発規模
- エンジニア 1名
- PM 1名

### 使用言語
- Python

### スキル
- 構造化データの前処理・特徴量エンジニアリング
- 不均衡データへの対策（Over-sampling、Under-sampling、Calibration）
- BigQuery
- Keras
- scikit-learn

<div style="page-break-after: always;"></div>

## 2018/11 - 2019/9：フリーランス

### ポジション
- データアナリスト

### 住宅価格査定ロジック構築
- このプロジェクトでは物件の価格査定を自動化することが目的でした。
- これまでは人が価格査定をするか、機械学習で予測していても精度が低く信頼性が低い問題がありました。
- 以前よりも精度の高い機械学習モデルを構築しました。
- Treasure Data等を利用してETLを行いデータエンジニアリングも行いました。

### 開発規模
- エンジニア 2名
- PM 1名

### 使用言語
- Python

### スキル
- 構造化データの前処理・特徴量エンジニアリング
- Treasure Data
- Digdagを利用したワークフロー構築
- Embulkを利用したデータ転送
- scikit-learnを用いた機械学習処理
- チーム開発

<div style="page-break-after: always;"></div>

## 2017/11 - 2018/10：DATUM STUDIO株式会社

### ポジション
- データアナリスト

### レコメンドシステム構築/WebAPI開発
- アンケートデータからユーザーの求めるアイテムをレコメンドすることで、サービスの価値向上に貢献しました。
- 特に実装フェーズでは前処理、機械学習（分類）、協調フィルタリング、WebAPI構築などを担当しました。
- またダッシュボードの構築も行いました。

### 開発規模
- エンジニア 2名
- PM 1名

### 使用言語
- Python

### スキル
- Amazon EC2上にレコメンドシステムを構築
- Flaskを利用したWebAPI構築
- Amazon RDS（MariaDB）
- Amazon S3
- scikit-learn
- Tableau
- チーム開発

### 経験
- 業務でAWSを使用したのは初めてだったので勉強になりました。

<div style="page-break-after: always;"></div>

## 2016/11 - 2017/10：株式会社モノゴコロ

### ポジション
- サーバーサイドエンジニア
- データアナリスト

### 業務内容

#### チャットアプリ（2016/11 - 2017/4）
- WebSocketを用いてリアルタイムチャットアプリを実装しました。Ruby on Railsを使用しました。

#### 画像認識を用いたサッカー動画解析（2017/5 - 2017/10）
- YOLOというディープラーニングアルゴリズムを用いて物体検出を行いサッカー動画から自動で選手のチームを判別するアプリケーションのプロトタイプを作成しました。
- この技術の発展版として、人を検知することで自動で交通量を調査するアプリケーションを構築しました。

### 開発規模
- エンジニア 1名  
- PM 1名

### 使用言語
- Python
- JavaScript
- Ruby

### スキル
- Ruby on Rails
- PostgreSQL
- 画像認識
- OpenCV
- D3.js
- Git

### 経験
- Railsの使い方やGitなど開発の基本を学びました。
- 画像認識やデータ分析に触れるきっかけになりました。

<!-- 
<div style="page-break-after: always;"></div>

# 個人活動

## Kaggle

[プロフィール](https://www.kaggle.com/yamashita)

### 参加コンペ

- JPX Tokyo Stock Exchange Prediction（2022）
  - [GitHub](https://github.com/yoshinori77/jpx_tokyo_market_prediction)
  - 途中で挫折しました...
- Santander Customer Transaction Prediction（2019）
  - 銅メダルでした。 549/8751（7%） -->
