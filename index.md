---
layout: home
title: "Wind Graham"
---

<!-- Hero -->
<section class="hero">
  <div class="container hero-inner">
    <img class="avatar" src="/头像.jpg" alt="Wind Graham">
    <div>
      <h1>Wind Graham</h1>
      <p class="tagline">杏花疏影里，吹笛到天明。</p>
      <div class="quick-links">
        <a href="/about/" class="card">关于</a>
        <a href="/portfolio/" class="card">项目</a>
        <a href="/posts/" class="card">博客</a>
        <a href="/friends/" class="card">友链</a>
      </div>
    </div>
  </div>
</section>

<div class="container">
  <!-- Intro text -->
  <section style="margin-top: 3rem; max-width: 720px;">
    <p class="intro-text">
      一个学生的个人页面。
    </p>
  </section>
  
    <!-- Projects preview -->
    <section class="section-projects">
      <div class="section-header">
        <h2>一些做过的东西</h2>
        <a href="/portfolio/" class="view-all">全部项目 →</a>
      </div>
      <div class="portfolio-grid">
        {% for p in site.data.portfolio %}
        <a href="{{ p.url }}" class="project-card-link">
          <article class="project-card" style="--card-bg: {{ p.color }}">
            <div class="card-content">
              <h3>{{ p.title }}</h3>
              <p>{{ p.summary }}</p>
              {% if p.tags %}
              <div class="tags">
                {% for tag in p.tags %}
                <span>{{ tag }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </div>
          </article>
        </a>
        {% endfor %}
      </div>
    </section>

  <!-- Recent Posts -->
  <section class="section-posts">
    <div class="section-header">
      <h2>最近文章</h2>
      <a href="/posts/" class="view-all">全部文章 →</a>
    </div>
    <div class="post-grid">
      {% for post in site.posts limit:5 %}
      <article class="post-card">
        <div class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</div>
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 90 }}</p>
        <a href="{{ post.url }}" class="read-more">阅读全文</a>
      </article>
      {% endfor %}
    </div>
  </section>
</div>
