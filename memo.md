# トップページ

- Discord招待[（私のプロフにあります）](https://discord.com/invite/KDCDNtxzB9)
- コミュニティ概要

# コミュニティ紹介ページ

- サーバー設立の経緯
- なぜDiscordなのか
- 活動目的
- 管理チーム紹介

# ガイドライン

<#1447147141058400328> をそのまま貼る

# お知らせページ

改変が楽なようにしてください

# FAQ

後述

・設立の経緯
日本の有名なRust言語コミュニティとしてrust-jpがあるが、Discordに活動拠点がないことに気づいたKaiTomotakeがrust-jpのDiscord版として設立した。

・なぜDiscordなのか？
Discordは洗練されたUI、Botも含めた多くの機能、特に高品質な通話機能があり、非常にコミュニティ運営の場として適している。プログラミングができるDiscordユーザーも多く存在し、そのような人たちが集える場所があれば、よりRustが活発になる。

・活動目的
日本語で Rust の知見を共有し、OSS への参加や新しいツール・クレート開発が生まれる場をつくり、Rustへの参入者を増やす。

・FAQ
初心者でも参加できますか？ -> はい、参加していただいて大丈夫です。
Rustをよく知らないのですが大丈夫でしょうか？ -> 大丈夫です。ほかの言語のユーザーでも、プログラミングの知見を共有してくださる方は歓迎します。
プロジェクト紹介はしていい？ -> 問題ありません。cratesチャンネルもしくはlinksチャンネルにて紹介・宣伝可能です。

# The Rust Programming Language Japan Community - サーバールール

ようこそ、The Rust Programming Language Japan Community へ！  
このサーバーは Rust プログラミング言語に関心のあるすべての日本語話者のためのコミュニティです。  
初心者から上級者まで、誰でも歓迎します。

このサーバーは Rust の公式組織・団体とは提携していませんが、Rust に関する健全な交流の場を目指しています。

当サーバーに参加するにあたり、Discordの利用規約／ガイドラインに加えて、以下のルールに同意してください。

---

## 1️⃣ Rust の行動規範に従う

Rust Code of Conduct に準拠します。  
https://www.rust-lang.org/policies/code-of-conduct

不当な差別、攻撃的な言動、嫌がらせなどは認められません。

---

## 2️⃣ お互いを尊重する

このサーバーは「誰もが安心して話せる場」であることを大切にします。  
以下の行為は禁止されます（例を含みますが、これに限りません）：

- 侮辱・煽り・トロール・ハラスメント
- 特定技術・言語への悪意ある誹謗
- 過度な押しつけや高圧的な言動
- 不毛な議論を長引かせる行為
- 過剰に挑発的な発言や baiting

調子が悪い時は、無理せず休みましょう。

---

## 3️⃣ 不適切なコンテンツは禁止

Discord Community Guidelines に従います。

次の内容は禁止です：

- 差別的・憎悪表現
- 暴力的・成人向け・性的内容
- 過度な罵倒や不快な発言
- スパム（大量投稿・大量画像・過度なミーム）
- 過剰にアテンションを引く行為
- 不適切なユーザー名・アイコン・ステータス
- 不正行為、ハッキング、ゲームチートの共有

---

## 4️⃣ 宣伝・勧誘・営利目的は禁止

以下は禁止します：

- サーバー/サービスの広告
- 求人の投稿
- 有償依頼の募集/提供
- 無関係なリンクのばらまき

ただし、会話の文脈上必要なリンクであれば可とします。  
判断はモデレーターの裁量となります。

---

## 5️⃣ Rust（ゲーム）の話題は禁止

このサーバーは **プログラミング言語 Rust** のコミュニティです。  
ゲーム「Rust」を目的とした参加者は、状況に応じてキックまたはBANされることがあります。

---

## 6️⃣ モデレーターの指示に従う

モデレーターはサーバーを安全に保つために存在します。

- 問題があれば <@&1447146779706523759> を呼んでください
- モデレーターの対応時は、終了指示があるまで横入りしないでください
- モデレーターのなりすましは禁止
- 注意を受けたにもかかわらず従わない場合、より厳しい措置が行われます

---

## 7️⃣ Discord 利用規約とコミュニティガイドラインを遵守

すべての参加者は、Discordの以下の規約を必ず守ってください：

- Discord 利用規約（Terms of Service）
- Discord Community Guidelines

違反は、本サーバーでの処罰に加えて Discord 全体からの制裁対象にもなります。

---

## 8️⃣ 健全で協力的な Rust コミュニティを目指しましょう

質問・相談・議論・雑談などは歓迎です。  
初心者にも優しく、学び合い、助け合う場を作りましょう。

---

## ルール違反への対応

違反内容の重大性に応じて、以下の措置が行われる場合があります：

- 注意
- 一時的なミュート
- 一時的な参加停止
- キック
- BAN

---

このコミュニティが、Rust を学び、楽しみ、成長できる場所になることを願っています！

了解。**出力専用ブランチ `gh-pages` を使う方式**に切り替えるなら、
構成・フロー・GitHub Actions の全部を “その方式に最適化した形” でまとめるよ。

以下は **実用性・メンテ性・GitHub Pages の制限**を踏まえた構成。

---

# ✔️ 最終構成（強推奨）

```
main（開発ブランチ）
│
├─ /src        ← 元データ（Markdown・テンプレート・画像）
├─ /scripts    ← Node.js SSG（自作ビルドスクリプト）
└─ package.json
```

```
gh-pages（出力専用ブランチ）
│
└─ ここに dist されたファイルが自動で push され続ける
```

理由：

1. **main と出力物が完全に分離される**
   → 開発ブランチが綺麗なまま

2. **GitHub Pages の仕組みに完全準拠**
   → `gh-pages` ブランチをそのまま公開に設定できる

3. **デプロイ履歴が汚れない（生成物だけのブランチに閉じる）**

4. **古い Pages 設定と新しい Artifact 方式のどちらでも対応できる**

---

# ✔️ 流れ（実運用）

1. main に Markdown or テンプレを push
2. GitHub Actions が自動ビルド
3. dist/ を生成
4. dist/ の中身だけを `gh-pages` に force push
5. GitHub Pages は `gh-pages` を配信

**本番公開＝`gh-pages`**
**開発＝main**

この二層構造が一番壊れにくい。

---

# ✔️ GitHub Pages 側の設定

GitHub → リポジトリ → _Settings_ → _Pages_

- **Source：Deploy from branch**
- **Branch：gh-pages / root**

これでOK。

---

# ✔️ GitHub Actions（`gh-pages` ブランチ出力方式の最適版）

`.github/workflows/deploy.yml`

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - run: npm ci

      # /scripts/build.js で dist/ を生成する想定
      - run: node scripts/build.js

      # dist を gh-pages に強制 push
      - name: Deploy to gh-pages
        run: |
          cd dist
          git init
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add .
          git commit -m "Deploy"
          git push --force https://github.com/${{ github.repository }} HEAD:gh-pages
```

ポイントの根拠：

- gh-pages は生成物専用なので **force push が安全**
- Actions 内で **自前の mini-repo** を作って push する方式が一番安定
- “dist/ をそのまま push” するので GitHub Pages と完璧に連携できる

---

# ✔️ 推奨するディレクトリ構成（SSG として整理）

```
main
├── src/
│   ├── markdown/
│   │     ├── a.md
│   │     └── b.md
│   ├── layouts/
│   │     ├── base.html
│   │     └── article.html
│   └── assets/
│
└── scripts/
    ├── build.js
    ├── renderMarkdown.js
    └── generateIndex.js

gh-pages
└──（生成された index.html / articles / assets など）
```

---

# ✔️ まとめ

- “gh-pages に生成物を push” 方式は **GitHub Pages で昔から最も安定**
- main は素材とコードだけ → **クリーンで保守性高い**
- GitHub Actions で dist を push → **完全自動化**

---

必要なら、次のどれも作れる：

- `/scripts/build.js` の最小実装（Markdown → HTML + layout適用）
- `generateIndex.js`（記事一覧HTML自動生成）
- Markdown パーサのおすすめ（remark / marked / custom）

どれ作る？
