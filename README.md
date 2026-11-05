# 職務経歴書

公開版はこちらです。

- GitHub Pages: [https://yoshinori77.github.io/career/](https://yoshinori77.github.io/career/)
- PDF（詳細版）: [README.pdf](README.pdf)
- PDF（短縮版）: `職務経歴書_短縮版.pdf`

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
