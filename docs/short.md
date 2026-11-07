---
layout: default
title: 職務経歴書（短縮版）
description: データ基盤・分析・AI活用の主要経験をまとめた職務経歴書
permalink: /short/
---

<div class="hero-card">
  <div class="hero-card__name">山下 慶倫 / Yoshinori Yamashita</div>
  <div class="hero-card__role">データ基盤・分析・AI活用の検証 / 短縮版</div>
</div>
<nav class="resume-nav" aria-label="資料を選ぶ">
  <a href="/career/">詳しい職務経歴</a>
  <a href="/career/commerce-insights/">動くデモを見る（ログイン不要）</a>
  <a href="https://github.com/yoshinori77/career/raw/refs/heads/main/%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8_%E7%9F%AD%E7%B8%AE%E7%89%88.pdf">短縮PDFを保存</a>
</nav>

## プロフィール

BigQuery・Snowflake・dbt・Dataformを用いたデータ基盤の設計・構築・移行、データマート、品質管理・運用改善を担当するデータエンジニアです。Pythonは2017年から実務で使用。関係者との要件整理・仕様調整から、担当領域の設計・実装・運用まで自走できます。

### ご相談いただける業務

- **データ基盤・連携**：DWH、ETL/ELT、dbt・Dataformのモデル設計、移行・性能改善、品質テスト・運用整備
- **分析・データアプリ**：データマート、指標定義、BI、Python API・Streamlit、機械学習パイプライン
- **生成AIの開発・検証**：RAG・指標ツール連携・根拠付き回答・アクセス制御・検索評価（個人開発）

**技術**：Python・SQL・Scala・TypeScript／BigQuery・Snowflake・dbt・Dataform・Iceberg・Airflow・Spark／Google Cloud・AWS・Terraform・Docker・GitHub Actions

### 主な実務実績

- 物流のCSV連携パイプラインをIcebergで再構築し、処理時間を約90%削減
- 100人以上が使う出版業務ツールで、データ取込・モデル設計・売上可視化を担当
- 数億レコード規模の分散処理とレコメンド運用。類似度計算を行列演算で約1/100の処理時間に短縮

---

## 職務経歴

<section class="career-entry" markdown="block">

### 2024/8 - 現在：フリーランス（データエンジニア）

#### 出版DX：基盤立ち上げ・データ活用

- **取込・前処理**：DB・CSV→GCS→Parquet→BigQueryのETL、Cloud Runのスキーマ変化対応、処理済みファイル管理による再読込防止を設計・実装
- **モデリング・活用**：Dataformのスタースキーマ、メタデータ・E-R図・設計書を整備。Looker Studioの売上可視化、Streamlit業務アプリ、100人以上が使う社内ツールの開発・運用を担当

#### 物流DX：基盤移行・パイプライン改善

- **移行・変換**：RDS→QuickSightの直接接続からSnowflake＋dbt経由へ移行。データ連携・変換、Terraform・AWSの基盤改善、ダッシュボード改善を担当
- **性能・品質**：CSV連携をIcebergで再構築し、ロードを省略して処理時間を約90%削減。dbtテスト拡充・保守性向上の方針を整理

</section>

<section class="career-entry" markdown="block">

### 2023/8 - 2024/7：ココナラ（データエンジニア）

- BigQueryの基盤開発、Airflowワークフロー構築・2系移行、データ品質テスト・リネージ・メタデータ管理を担当
- GitHub Actionsでテスト・脆弱性検査・デプロイを自動化。Vertex AI PipelinesによるMLOps、インフラチームとの連携フロー整備、障害対応・運用改善に従事

</section>

<section class="career-entry" markdown="block">

### 2023/1 - 2023/7：アスタミューゼ（データエンジニア）

- Python・Dataflow・Apache Beamのバッチ開発、Airflow DAG、BigQueryの前処理・リバースETLを担当
- IAM・Docker・CI/CD、性能監視・SAST・リネージを整備。メンバー交代時も開発を維持し、仕様・設計情報の共有と引継ぎを実施

</section>

<section class="career-entry" markdown="block">

### 2020/6 - 2022/12：パーソルキャリア（データエンジニア／データサイエンティスト）

- 数億レコードをSpark・Scala・Pythonで分散処理。Item2Vec・協調フィルタリング、学習・推論パイプライン、AWS→GCP移行・Terraformを使った基盤運用を担当
- 年収査定サービスの推論APIをAPI Gateway・Lambda・EFSで構築し、CloudFormation・ログ環境の実装からリリースまで対応

</section>

**以前の経歴**：2018/11〜2020/5 フリーランス（EC顧客分析・住宅価格査定・ETL）／2017/11〜2018/10 DATUM STUDIO（レコメンド・Flask API・Tableau）／2016/11〜2017/10 モノゴコロ（Rails・動画解析）

---

## 個人開発（データ基盤・分析・生成AI）

### Commerce Insights：EC分析・根拠付きAI・会社別BI

- **基盤・分析**：公開GA4の92日・約430万イベントをDuckDB・dbtで整備。月次16指標をMetricFlowで定義・照合し、6つの分析事例で施策案・評価方法まで提示
- **AI・権限・評価**：BM25・Dense・Hybrid検索、指標ツール・文書を引用するLLM回答、会社・役割・文書単位の認可を実装。検索・回答品質のテスト、費用・応答時間の記録、CIでの検証を実施

公開サンプル・合成データによる個人開発。[公開デモ・分析6事例](https://yoshinori77.github.io/career/commerce-insights/) ／ [AIの動作・評価](https://yoshinori77.github.io/career/commerce-insights/ai.html)。ほかにLangChain・Qdrant・StreamlitのPDF検索／質問応答・要約・株価分析アプリを試作。
