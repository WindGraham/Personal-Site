---
layout: page
title: 作品集
permalink: /portfolio/
---

<p class="intro-text">这里展示的是你的项目或作品示例，涵盖 Web 应用、移动端、工具或其他任何你想展示的内容。</p>

<div class="portfolio-grid">
  {% for p in site.data.portfolio %}
  <article class="project-card" style="--card-bg: {{ p.color }}">
    <div class="card-content">
      <h3><a href="{{ p.url }}">{{ p.title }}</a></h3>
      <p>{{ p.summary }}</p>
      <div class="tags">
        {% for tag in p.tags %}
        <span>{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
  </article>
  {% endfor %}
</div>
