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

- Airflow（Cloud Composer）のワークフロー構築と次期バージョン移行
- データリネージ・データ品質テスト導入（データマネジメント）
- Looker Studio を用いたダッシュボード開発・運用
- DevSecOps（CI/CD）による開発効率化
- Vertex AI Pipelines を活用したMLOps基盤の運用強化
- チーム間連携と業務フロー改善

**開発規模**
- R&Dグループ: エンジニア3名、PM1名

**主なスキル**
- Python
- 構造化データの前処理・特徴量エンジニアリング
- 不均衡データ対策（Over-sampling、Under-sampling、Calibration）
- BigQuery
- Keras、scikit-learn

---

### 2018/11 - 2019/9：フリーランス（データアナリスト）

#### 住宅価格査定ロジック構築
- 物件価格査定の自動化に向けた機械学習モデルを構築
- 従来より高精度なモデルを開発し信頼性を向上
- Treasure Data などを利用しETLを担当

**開発規模**
- エンジニア2名、PM1名

**主なスキル**
- Python
- 構造化データの前処理・特徴量エンジニアリング
- Treasure Data、Digdag、Embulk
- scikit-learn
- チーム開発

---

### 2017/11 - 2018/10：DATUM STUDIO株式会社（データアナリスト）

#### レコメンドシステム構築／Web API開発
- アンケートデータをもとにユーザーの求めるアイテムをレコメンドしサービス価値を向上
- 前処理、機械学習（分類）、協調フィルタリング、Web API構築、ダッシュボード開発を担当

**主なスキル**
- Python
- Amazon EC2、RDS（MariaDB）、S3
- Flask を用いた Web API 構築
- scikit-learn、Tableau
- チーム開発

**学び・成果**
- 業務で初めてAWSを活用しクラウド基盤構築を経験

---

### 2016/11 - 2017/10：株式会社モノゴコロ（サーバーサイドエンジニア／データアナリスト）

#### チャットアプリ開発（2016/11 - 2017/4）
- WebSocket を用いたリアルタイムチャットアプリを Ruby on Rails で実装

#### 画像認識を用いたサッカー動画解析（2017/5 - 2017/10）
- YOLO による物体検出でサッカー動画から選手チームを自動判別するプロトタイプを構築
- 応用として人検知による自動交通量調査アプリケーションを開発

**主なスキル**
- Python、JavaScript、Ruby
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
