# Jekyll 个人主页模板使用指南

本仓库是一个 Jekyll 驱动的个人主页 / 博客模板，适合个人简介、博客、作品集、出版物列表等场景。你可以 Fork / Clone 后，按步骤替换为自己的信息并部署到 GitHub Pages 或自己的服务器。

## 1. 仓库结构概览

- `_config.yml`：站点全局配置（标题、网址、分页等）
- `_data/`：作者信息、导航、作品集、出版物等数据
- `_layouts/`：页面布局模板
- `_includes/`：可复用片段（`head`、`header`、`footer` 等）
- `_posts/`：博客文章（Markdown）
- `about.md`、`contact.md` 等：独立页面
- `assets/`：样式、脚本和图片

## 2. 安装与本地预览

前提：已在本机安装 Ruby（推荐 2.7+）和 Bundler。

```bash
bundle install
bundle exec jekyll serve
```

然后在浏览器中访问 `http://localhost:4000` 预览。

## 3. 填写你的站点信息

编辑 `_config.yml`：

- 将 `title` 改成你的站点标题，例如：`"张三的个人主页"`
- 将 `email` 改成你的邮箱
- 将 `description` 改成你的站点简介
- 将 `url` 改为你的域名或 GitHub Pages 地址，例如：`"https://yourname.github.io"`

## 4. 填写你的个人信息

编辑 `_data/authors.yml`：

- `name`：你的名字或昵称
- `affiliation`：你的学校、公司或组织（可选）
- `bio`：一段简短个人介绍
- `github`：你的 GitHub 用户名
- `twitter`：你的 Twitter/X 用户名（可选，没有可留空或删除）

如果需要多位作者，可以参考现有结构增加更多键值。

## 5. 导航与页面

### 5.1 导航菜单

在 `_data/navigation.yml` 中配置顶部导航栏，例如：主页、关于、博客、作品集、联系等。你可以：

- 修改菜单名称
- 修改链接到对应页面路径
- 增加或删除菜单项

### 5.2 独立页面

根目录下的 `about.md`、`contact.md`、`friends.md`、`portfolio.md`、`publications.md` 等是独立页面：

- 打开这些文件，将示例文字替换为你的内容
- 如果不需要某些页面，可以删除对应文件并从导航中去掉链接

## 6. 博客与文章

### 6.1 新建文章

在 `_posts/` 中按 Jekyll 约定创建 Markdown 文件：

`YYYY-MM-DD-标题-slug.md`

示例：`2025-01-01-hello-world.md`

文件顶部需要 YAML Front Matter，如：

```markdown
---
layout: post
title: "我的第一篇博客"
date: 2025-01-01 10:00:00 +0800
categories: blog
---

这里是正文内容。
```

### 6.2 删除示例文章

仓库中的 `_posts/` 目录下可能带有示例文章，你可以直接删除这些文件，或者将内容改为你自己的文章。

## 7. 作品集与出版物

### 7.1 作品集

编辑 `_data/portfolio.yml`：

- 为每个作品添加标题、描述、链接、时间等字段
- 页面 `portfolio.md` 会自动读取并展示这些条目

### 7.2 出版物

编辑 `_data/publications.yml`：

- 按类别或年份列出你的论文/作品
- 页面 `publications.md` 会自动展示

## 8. 头像和图片

在 `assets/images/` 中放置你自己的头像图片（例如：`avatar.jpg`），并在相关布局或页面中引用。如果你不需要头像，可以直接删除对应的引用。

你可以使用任意文件名图片，只需保证模板中引用路径与之对应。

## 9. 部署到 GitHub Pages

### 9.1 使用 GitHub Pages（推荐简单方式）

1. 将此仓库推送到 GitHub，例如仓库名为 `yourname.github.io`
2. 在 GitHub 仓库的 `Settings -> Pages` 中，选择部署分支为 `main`（或你使用的分支）
3. 等待 GitHub 构建完成后，即可通过 `https://yourname.github.io` 访问

如果使用的是非 `yourname.github.io` 的普通仓库，请在 `_config.yml` 中设置 `baseurl` 并按 GitHub Pages 文档说明调整。

### 9.2 自行构建后上传静态文件

也可以在本地运行：

```bash
bundle exec jekyll build
```

然后将生成的 `_site/` 目录中的内容上传到任意静态服务器或对象存储（如 Nginx、Netlify、Vercel 等）。

## 10. 自定义样式与脚本

- 修改 `assets/css/main.scss` 以及 `assets/css/partials/_variables.scss` 调整颜色、字体、间距等
- 修改 `assets/js/main.js` 增加交互逻辑

修改后重新运行 `bundle exec jekyll build` 或 `bundle exec jekyll serve` 即可看到效果。

---

如果你在使用或定制过程中遇到问题，可以在 Issues 中反馈，或阅读 Jekyll 官方文档以获得更多高级用法。
