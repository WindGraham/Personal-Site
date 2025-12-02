部署到 Ubuntu 虚拟机（示例）

下面是把静态站点部署到你的 Ubuntu 服务器并用 Nginx + Certbot 管理 TLS 的步骤。假设你有 `www.windgraham.art` 域名且 DNS 已指向该服务器。

1) 安装 Nginx 与 Certbot

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo ufw allow 'Nginx Full'
```

2) 在服务器上构建或上传 `_site`

# 如果在服务器上构建（推荐在服务器上或按 CI 输出 artifact 上传）：
cd /path/to/your/blog
bundle install
bundle exec jekyll build

# 复制到 webroot（以 /var/www/windgraham.art 为例）
sudo mkdir -p /var/www/windgraham.art
sudo cp -r _site/* /var/www/windgraham.art/
sudo chown -R www-data:www-data /var/www/windgraham.art
```

3) 创建 Nginx 站点配置

在 `/etc/nginx/sites-available/windgraham.art` 创建文件，内容参考：

```nginx
server {
    listen 80;
    server_name www.windgraham.art windgraham.art;

    root /var/www/windgraham.art;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

启用并重载 nginx：

```bash
sudo ln -s /etc/nginx/sites-available/windgraham.art /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4) 获取 TLS 证书（Certbot）

```bash
sudo certbot --nginx -d windgraham.art -d www.windgraham.art
```

5) 自动化：

- 使用 `cron` 或 GitHub Actions 将构建产物 rsync 到服务器。
- 或在服务器上设置 `systemd` 服务来在变更时自动重建并复制。
