---
layout: page
title: 出版物
permalink: /publications/
---

## 论文与出版物

{% if site.data.publications %}
<ul class="publication-list">
  {% for pub in site.data.publications %}
  <li class="publication-item">
    <div class="pub-title">{{ pub.title }}</div>
    <div class="pub-authors">{{ pub.authors }}</div>
    <div class="pub-venue">
      <em>{{ pub.venue }}</em>, {{ pub.year }}.
      {% if pub.doi %}<a href="https://doi.org/{{ pub.doi }}">DOI</a>{% endif %}
      {% if pub.pdf %}<a href="{{ pub.pdf }}">PDF</a>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% else %}
<p>暂无出版物数据。请在 <code>_data/publications.yml</code> 中添加。</p>
{% endif %}

## 演讲与教学

{% if site.data.talks %}
<ul>
  {% for talk in site.data.talks %}
  <li>
    <strong>{{ talk.title }}</strong><br>
    {{ talk.event }}, {{ talk.date | date: "%Y-%m-%d" }}
  </li>
  {% endfor %}
</ul>
{% endif %}
