(async () => {
const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

// ▼ ディレクトリ設定
const ROOT = process.cwd();
const PAGE_DIR = path.join(ROOT, "pages");
const ARTICLE_DIR = path.join(ROOT, "articles");
const OUT_DIR = path.join(ROOT, "docs");

// ▼ テンプレート
const NEWS_LIST_TEMPLATE = path.join(PAGE_DIR, "template", "newslist_template.html");
const ARTICLE_TEMPLATE = path.join(PAGE_DIR, "template", "article_template.html");

// ▼ 出力ディレクトリ初期化
fs.removeSync(OUT_DIR);
fs.mkdirpSync(OUT_DIR);

// 細かい設定の入力
const settings = JSON.parse(fs.readFileSync(path.join(ROOT, "setting.json"), "utf8"));

let GROBAL_contributors_html = "";
let footer_html = fs.readFileSync(
  path.join(PAGE_DIR, "template", "footer_template.html"),
  "utf8"
);
footer_html = footer_html.replaceAll("{{github_url}}", settings.github_url);
footer_html = footer_html.replaceAll("{{discord_url}}", settings.discord_url);
footer_html = await GetContributors(footer_html);

// ============================================================================
// 1. /pages 配下の “news 以外を全部” コピー
// ============================================================================
async function copyExceptNews(src, dest, settings) {
  fs.mkdirpSync(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // news フォルダはコピーしない（テンプレ用途のため）
    if (entry.name === "news") continue;

    if (entry.isDirectory()) {
      await copyExceptNews(srcPath, destPath, settings);
    } else {
      if (entry.name.endsWith(".html")) {
        // HTMLなら置換してコピー
        let content = fs.readFileSync(srcPath, "utf8");

        // settings.json に合わせて {{key}} を置換
        for (const [key, value] of Object.entries(settings)) {
          content = content.replaceAll(`{{${key}}}`, value);
        }

        if (content.includes("</body>")) {
          content = content.replace(/<\/body>/i, `${footer_html}\n</body>`);
        }

        //contributorsが要素内にあれば置き換え(footerは先にもうやってる)
        if (content.includes("{{contributors}}")) {
          content = await GetContributors(content);
        }

        fs.writeFileSync(destPath, content, "utf8");
      } else {
        // HTML以外は通常コピー
        fs.copySync(srcPath, destPath);
      }
    }
  }
}

function contributionColor(count, maxCount) {
  const ratio = count / maxCount;

  const r = Math.round(255 + (212 - 255) * ratio);
  const g = Math.round(255 + (93 - 255) * ratio);
  const b = Math.round(255 + (75 - 255) * ratio);

  return `rgb(${r},${g},${b})`;
}

async function GetContributors(html) {
  if(GROBAL_contributors_html == ""){
    GROBAL_contributors_html = await fetchContributors();
  }

  return html.replace("{{contributors}}", GROBAL_contributors_html);
}

async function fetchContributors() {
  const url = `https://api.github.com/repos/Rust-Developers-JP/official_site/contributors`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const data = await res.json();
  if (data.length === 0) return "";

  const maxCount = Math.max(...data.filter(c => !c.login.endsWith('[bot]')).map(c => c.contributions));

  let contributors_list_html = "";

  for (const contributor of data) {
    if (!contributor.login.endsWith('[bot]')) {
      const bgColor = contributionColor(contributor.contributions, maxCount);

      contributors_list_html += `
        <a class="contributor_item" href="${contributor.html_url}" style="background-color:${bgColor}">
          <img class="contributor_img" src="${contributor.avatar_url}" alt="${contributor.login}'s icon" />
          <p class="contributor_name">${contributor.login}</p>
        </a>
      `;
    }
  }

  return contributors_list_html;
}

await copyExceptNews(PAGE_DIR, OUT_DIR, settings);

// ============================================================================
// 2. 記事（/articles/*.md）読み込み
// ============================================================================
const articles = fs
  .readdirSync(ARTICLE_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((filename) => {
    const raw = fs.readFileSync(path.join(ARTICLE_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    if (!data.title || !data.date) {
      throw new Error(`Front matter の必須項目不足: ${filename}`);
    }

    const slug = filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

    const htmlBody = marked.parse(content);

    return {
      slug,
      date: data.date,
      title: data.title,
      description: data.description || "",
      tags: data.tags || [],
      htmlBody,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// ============================================================================
// 3. 記事詳細ページ生成
// ============================================================================
articles.forEach((article) => {
  const outDir = path.join(OUT_DIR, "news", "article", article.slug);
  fs.mkdirpSync(outDir);

  const template = fs.readFileSync(ARTICLE_TEMPLATE, "utf8");

  // tags → HTML 文字列（空なら ""）
  const tagsHtml = (article.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join(" ");

  const html = template
    .replace(/{{title}}/g, article.title)
    .replace(/{{date}}/g, article.date)
    .replace(/{{body}}/g, article.htmlBody)
    .replace(/{{description}}/g, article.description)
    .replace(/{{tags}}/g, tagsHtml)
    .replace(/<\/body>/i, `${footer_html}\n</body>`);

  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
});

// ============================================================================
// 4. 記事一覧ページ生成
// ============================================================================
{
  const template = fs.readFileSync(NEWS_LIST_TEMPLATE, "utf8");

  const listHtml = articles
    .map((a) =>
      `
    <hr>
    <article class="news-item">
      <a href="./article/${a.slug}/">
        <h3>${a.title}</h3>
        <p class="date">${a.date}</p>
        <p class="desc">${a.description}</p>
      </a>
    </article>
  `.trim()
    )
    .join("\n");

  let final = template.replace("{{articles}}", listHtml);

  final = final.replace(/<\/body>/i, `${footer_html}\n</body>`);

  const outDir = path.join(OUT_DIR, "news");
  fs.mkdirpSync(outDir);
  fs.writeFileSync(path.join(outDir, "index.html"), final, "utf8");
}
// ============================================================================
// 5, トップページも改変
// ============================================================================
{
  const template = fs.readFileSync(path.join(OUT_DIR, "index.html"), "utf8");

  const listHtml = articles
    .slice(0, 3)
    .map((a) =>
      `
      <hr>
      <article class="news-item">
        <a href="./news/article/${a.slug}/">
          <h3>${a.title}</h3>
          <p class="date">${a.date}</p>
          <p class="desc">${a.description}</p>
        </a>
      </article>
    `.trim()
    )
    .join("\n");

    const final = template.replace("{{articles}}", listHtml);

  const outDir = OUT_DIR;
  fs.mkdirpSync(outDir);
  fs.writeFileSync(path.join(outDir, "index.html"), final, "utf8");
}

console.log("Build completed.");
})();