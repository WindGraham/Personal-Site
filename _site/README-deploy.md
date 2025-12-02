# 部署与更新说明（Nginx + 静态站点）

本项目使用 Jekyll 生成静态网站，在服务器上通过 Nginx 托管。下面是从本地开发到线上更新的完整流程。

## 一、本地开发

本地开发时，可以使用 Jekyll 自带的开发服务器：

```bash
cd /home/ubuntu/blog
bundle exec jekyll serve --livereload
```

访问 `http://127.0.0.1:4000` 即可预览。

> 注意：**线上服务器不建议长时间运行 `jekyll serve`**，会占用较多内存。线上环境请使用下面的“静态构建 + Nginx”方案。

## 二、构建静态文件

无论是在本地还是服务器上，更新网站前都需要先构建静态文件：

```bash
cd /home/ubuntu/blog
bundle exec jekyll build
```

构建完成后，生成的静态页面位于：

```text
/home/ubuntu/blog/_site/
```

## 三、Nginx 配置（已配置好时可略过）

当前服务器 Nginx 有一个站点 `blog`，配置文件路径：

```text
/etc/nginx/sites-available/blog
```

使用的配置（供参考）：

```nginx
server {
    listen 80;
    server_name windgraham.art www.windgraham.art;

    # 托管静态文件根目录
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

启用站点（只需做一次）：

```bash
# 确保有从 sites-available 到 sites-enabled 的软链接
sudo ln -sf /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog

# 检查配置是否正确
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

## 四、将构建结果部署到 Nginx

**每次修改博客内容并构建后，需要把 `_site` 拷贝到 Nginx 的根目录。**

完整更新流程：

```bash
cd /home/ubuntu/blog

# 1. 重新构建站点
bundle exec jekyll build

# 2. 用构建结果替换 Nginx 根目录内容
sudo rm -rf /var/www/html/*
sudo cp -r _site/* /var/www/html/

# 3. 可选：重载 Nginx（通常不需要，除非改了配置）
sudo systemctl reload nginx
```

完成后，访问：

```text
http://windgraham.art
http://www.windgraham.art
```

即可看到最新内容。

## 七、留言板后端（Flask API）

为了让文章列表页底部的留言板可以「实时显示」留言，本机运行了一个很小的 Flask 后端，提供：

- `GET /api/comments`：返回最近的留言列表（JSON）；
- `POST /api/comments`：接收新留言并写入本地 `comments.json` 文件。

### 1. 后端代码位置

后端代码位于：

```text
/home/ubuntu/comment-api/app.py
```

数据文件保存在：

```text
/home/ubuntu/comment-api/comments.json
```

### 2. 手动启动后端（开发或调试时）

在服务器上可以这样运行（仅当前会话有效）：

```bash
cd /home/ubuntu/comment-api
python3 -m venv venv
source venv/bin/activate
pip install flask gunicorn
python app.py
```

默认监听在 `127.0.0.1:5000`。

### 3. Nginx 反向代理 /api/

在 `/etc/nginx/sites-available/blog` 中，除了静态文件配置外，增加：

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:5000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

修改后记得：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

这样，前端页面访问 `https://windgraham.art/api/comments` 就会打到本机的 Flask 后端，留言板可以实时读取和写入留言。

## 五、排查常见问题

### 1. 访问 502 Bad Gateway

如果访问域名出现 `502 Bad Gateway`，常见原因：

- Nginx 配置仍然是 `proxy_pass http://127.0.0.1:4000;`，但 `jekyll serve` 没有在跑；
- 或其他上游服务未启动。

解决办法（当前方案）：

- 确认 `/etc/nginx/sites-available/blog` 使用的是上面的“静态托管”配置（`root /var/www/html;` + `try_files`）。
- 测试 Nginx 配置：

  ```bash
  sudo nginx -t
  sudo systemctl reload nginx
  ```

- 本机验证：

  ```bash
  curl -I http://127.0.0.1/
  ```

  返回 `200 OK` 即正常。

### 2. 内存占用过高

- 不要在服务器上长期运行：

  ```bash
  bundle exec jekyll serve --livereload
  ```

- 使用上面的“构建 + Nginx 静态托管”流程，线上只需要 Nginx 常驻，内存占用会非常低（几十 MB 级）。

- 如需查看占用内存最多的进程，可使用：

  ```bash
  ps aux --sort=-%mem | head -n 15
  ```

## 六、主题切换与闪屏说明（可选）

本博客使用 `body[data-theme="light"|"dark"]` 控制明暗模式，并在 `_includes/head.html` 中加入了一小段内联脚本，从 `localStorage('wind-theme')` 读取上次选择的主题，尽早应用，减少页面在暗色模式下切换时的“白闪”现象。

这一部分逻辑不影响部署，只要按上面的构建与拷贝流程更新 `_site` 即可。
