---
layout: default
title: 職務経歴書
description: データエンジニア・データアナリスト 山下慶倫の職務経歴書
permalink: /
---

<div class="hero-card">
  <div class="hero-card__name">Yoshinori Yamashita</div>
  <div class="hero-card__role">データエンジニア・データアナリスト</div>
  <ul class="hero-card__meta">
    <li>押上在住</li>
    <li>34歳</li>
  </ul>
  <div class="hero-card__links">
    <a href="https://x.com/50kaitenzlove" target="_blank" rel="noopener">X（@50kaitenzlove）</a>
    <a href="https://github.com/yoshinori77" target="_blank" rel="noopener">GitHub（@yoshinori77）</a>
  </div>
</div>

## プロフィール

データ基盤の設計・構築から分析まで一貫して対応できるデータエンジニアです。GCP、AWS、Snowflake、dbtなどを活用し、**安くて速いデータパイプライン構築**が得意です。また、機械学習モデルの構築やビジネス課題の解決にも対応可能です。フリーランスとして複数のDX案件を手がけ、データ変換時間を90%削減するなど成果を出しています。

### 主要スキル

- **データ基盤**: GCP（BigQuery、Dataform）、AWS、Snowflake、dbt、Iceberg
- **開発言語**: Python（6年）、SQL（5年）、TypeScript（2年）
- **BI・可視化**: Streamlit、Looker Studio、QuickSight、Tableau
- **その他**: Git、Docker、Terraform、CI/CD

---

## 職務経歴

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版のDX案件
- アプリケーションDB・CSVからのデータ連携、Dataformによるデータ変換、Looker Studioでの書籍売上可視化（ランキング、マーケ情報連携など）を担当
- 100人以上が使用する社内ツールの開発・運用を行い、書籍売上のDX化に貢献（基盤構築・立ち上げフェーズ）
- 今後はAI導入やWebアプリケーション開発（Streamlit）などの拡張フェーズを推進予定

##### スキルセット
- Python、SQL
- Google Cloud（BigQuery、Dataform、Cloud Run、Cloud Storage、Looker Studio）

##### 主な取り組み
- CSVロードの冗長化と復旧手順を見据えたETL設計（GCS→GCS Parquet→BigQuery）
- Cloud Run による動的スキーマ変化への前処理、Protocol/Mixinを活用した疎結合設計
- 処理済みファイルのテーブル管理による再読込防止
- Dataformを用いたスタースキーマ設計とメタデータ管理
- E-R図や設計書などドキュメント整備、データ活用方針提案

#### 物流のDX案件
- アプリケーションDBからデータ連携、dbtによるデータ変換、QuickSightでの物流DXダッシュボード改善を担当
- AWS RDS から直接 QuickSight に接続していた構成を、Snowflake＋dbt経由に移行しデータ変換時間を約90%削減
- CSVデータ連携をIceberg化し、データロードを省略する構成にリプレイス
- 今後はdbtテスト拡充によるデータ品質・保守性向上を推進予定

##### スキルセット
- Python、TypeScript、SQL
- Snowflake、dbt、Terraform
- AWS（Glue Data Catalog、RDS、S3、ECS、Lambda、AWS CDK）

##### 主な経験
- レガシーシステムの段階的移行戦略の策定と実行
- アーキテクチャレベルの改善による性能最適化
- Iceberg、Snowflake などモダンデータ技術の導入経験
- データエンジニアリングにおけるテスト駆動・オブザーバビリティの実践

---

### 2023/8 - 2024/7：ココナラ（データエンジニア）

- Airflow（Cloud Composer）のワークフロー構築と 2 系移行
- データリネージ・データ品質テスト導入（データマネジメント）
- ダッシュボードの開発・運用（Looker Studio）
- DevSecOps（CI/CD）による開発効率化
- MLOps（Vertex AI Pipelines）で機械学習の運用強化
- チーム間の連携強化、業務フロー改善

**開発規模**
- R&Dグループ
- エンジニア 3名
- PM 1名

**主なスキル**
- Python、SQL
- ワークフロー構築（Cloud Composer、Apache Airflow、Embulk）
- GCP（BigQuery、Cloud Composer、Cloud Storage、Cloud Monitoring など）
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

---

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
- ワークフロー構築（Cloud Composer、Apache Airflow）
- スケーラブルなバッチジョブ開発（Dataflow、Apache Beam）
- Spark によるビッグデータ処理
- GCP（Cloud Composer、Cloud Storage、Artifact Registry、Dataproc など）
- Docker
- CI/CD（GitLab Runner）

**経験**
- エンジニアの離脱など不安定な体制の中で、開発を維持しながら立て直した経験を積みました。
- Python の型ヒント、GCP 各サービス、CI/CD、Docker、Kubernetes などモダンな環境での実務経験を得ました。
- パフォーマンス監視や脆弱性診断ツールの導入を通じて、開発と運用の効率化を推進しました。
- 人の入れ替わりが激しい環境でも引き継ぎしやすいように、ドキュメント作成やデータリネージ、ER 図整備を重視しました。

---

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
- 学習・推論パイプラインの構築（Cloud Composer、シェルスクリプト）
- Terraform によるシステム構築の自動化
- Scala、Spark によるビッグデータ処理
- GCP（Vertex AI、Cloud Composer、Cloud Storage、Artifact Registry、Dataproc など）
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

---

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

---

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

---

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

---

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

---

## その他

- Kaggle: [プロフィール](https://www.kaggle.com/yamashita)
- 参加コンペ
  - JPX Tokyo Stock Exchange Prediction（2022） — [GitHub](https://github.com/yoshinori77/jpx_tokyo_market_prediction)
  - Santander Customer Transaction Prediction（2019） — 銅メダル（549/8751、上位7%）

<div class="print-note">
  PDF 印刷の際はブラウザの「背景のグラフィックを印刷」オプションを有効化するとデザインが反映されます。
</div>
