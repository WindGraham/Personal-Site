---
layout: page
title: 联系
permalink: /contact/
---

<div class="contact-wrapper">
  <div class="contact-info">
    <p>这里是联系页面示例内容。请在此处简要说明他人如何联系你，例如通过邮箱、社交账号或联系表单。</p>
    
    <ul class="contact-links">
      <li>
        <span class="label">Email</span>
        <a href="mailto:your-email@example.com">your-email@example.com</a>
      </li>
      <li>
        <span class="label">GitHub</span>
        <a href="https://github.com/your-github">https://github.com/your-github</a>
      </li>
      <!-- 如不需要社交链接，可删除该列表或自行添加 -->
    </ul>
  </div>

  <!-- 如需使用第三方表单服务，请将 action 换成你自己的表单提交地址 -->
  <form class="contact-form" action="https://example.com/your-form-endpoint" method="POST" enctype="multipart/form-data">
    <div class="form-group">
      <label for="name">姓名</label>
      <input type="text" id="name" name="name" placeholder="你的名字" required>
    </div>
    <div class="form-group">
      <label for="email">邮箱</label>
      <input type="email" id="email" name="email" placeholder="example@mail.com" required>
    </div>
    <div class="form-group">
      <label for="message">留言</label>
      <textarea id="message" name="message" rows="5" placeholder="想说点什么..." required></textarea>
    </div>

    <!-- 防机器人 Honeypot 字段（Getform 官方推荐） -->
    <input type="hidden" name="_gotcha" style="display:none !important">

    <button type="submit" class="btn btn-primary">发送消息</button>
  </form>
</div>
