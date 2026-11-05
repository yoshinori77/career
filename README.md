# 職務経歴書

目的に合わせて、次の入口からご覧ください。

| 確認したいこと | 資料 |
|---|---|
| 相談できる業務・主な実績を短時間で確認 | [職務経歴書・短縮版（Web）](https://yoshinori77.github.io/career/short/) ／ [短縮版（PDF・2ページ）](職務経歴書_短縮版.pdf) |
| 実際の画面と分析事例を試す | [Commerce Insights：公開デモ・分析6事例](https://yoshinori77.github.io/career/commerce-insights/)（ログイン不要） |
| 根拠付きAIの動作・検索と生成の評価を確認 | [AIの表示例・評価一覧](https://yoshinori77.github.io/career/commerce-insights/ai.html)（ログイン不要・API呼出なし） |
| 担当範囲・技術・職務経歴を詳しく確認 | [詳細版（Web）](https://yoshinori77.github.io/career/) ／ [詳細PDF](README.pdf) |

<details>
<summary>このリポジトリの更新・検証手順</summary>

## 運用方針

- GitHub Pages の公開元は `main:/docs` です。
- 公開内容の正本は `docs/index.md` です。
- 短縮版の正本は `docs/short.md` です。
- `README.md` は案内と運用メモのみを置き、職務経歴本文は持ちません。

## 更新手順

1. `docs/index.md` を編集する
2. 必要ならローカルで build する
3. Pull Request を作成する
4. `main` へマージして GitHub Pages の反映を待つ

## ローカル確認

Ruby 3.3 系を使います。`rbenv` や `mise` を使う場合は `.ruby-version` を参照してください。

```bash
bundle install
bundle exec jekyll build --source docs --destination _site
bundle exec jekyll serve --source docs --livereload
```

## PDF 生成

添付用 PDF は、Web 表示をそのまま印刷せず、Markdown から印刷向けレイアウトを生成します。
詳細版 `職務経歴書.pdf` / `README.pdf` と、短縮版 `職務経歴書_短縮版.pdf` を同時に生成します。

```bash
node scripts/build-resume-pdf.mjs
```

## 補足

- GitHub Pages 側の build は GitHub 管理 workflow `pages-build-deployment` で実行されます。
- PR 時点の build 検証は `.github/workflows/jekyll-check.yml` で行います。

## 公開ポートフォリオの配信範囲と費用

[Commerce Insights](https://yoshinori77.github.io/career/commerce-insights/) は、公開GA4の集計・分析6事例と、合成データによるAIの表示例・選別済み評価集計を配信する静的デモです。AI/API・BigQueryの呼出、入力送信、追跡、会社文書・本人データ・Secret・原票を含めません。認証付きAI・文書管理Siteは招待制のままです。

公開ファイルは10点・約1MBです。`node scripts/validate-public-demo.mjs` でallowlist、原集計hash、明細ID/秘密情報、リンク、外部API/追跡/入力送信を検査し、PR CIでも実行します。CSPを適用し、表示はtextContentで組み立てます。検査の成功は全ての将来の脆弱性がないことの保証ではありません。

2026-11-05時点の[GitHub Pagesの条件](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)では、公開repoのPagesをGitHub Freeで利用でき、サイト上限1GB・月間帯域100GB（soft limit）です。無圧縮で約1MB/閲覧とすれば、月1,000閲覧で約1GB、10,000閲覧で約10GBが目安です。キャッシュや圧縮、閲覧ページ数で転送量は変わります。

[public repoの標準GitHub-hosted runnerは無料](https://docs.github.com/en/billing/concepts/product-billing/github-actions)です。今回の配信に追加の常駐サーバーやLLM/API料金はありません。独自ドメイン・大きなrunner・保存artifact/cacheの超過、既存招待制SiteやOpenAI APIの費用は別です。アカウント全体や将来の料金まで無料と保証するものではありません。

</details>
