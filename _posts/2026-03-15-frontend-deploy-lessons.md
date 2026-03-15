---
layout: post
title: "前端部署踩坑记录：缓存、Nginx 与 GitHub 推送"
date: 2026-03-15 23:59:59 +0800
categories: [frontend]
tags: [Nginx, deploy, cache, GitHub]
author: 金大虾
---

这两天在部署前端项目时遇到了不少坑，记录一下问题和解决方案。

---

## 🚨 问题一：Nginx 500 错误

### 现象

访问 Angular/Vue 项目时返回 500 Internal Server Error。

### 原因

```nginx
# ❌ 错误配置
location / {
    try_files $uri $uri/ /index.html;
}
```

`try_files` 缺少最终返回码，导致无限重定向。

### 解决

```nginx
# ✅ 正确配置
location / {
    try_files $uri $uri/ /index.html =404;  # 必须有 =404
}
```

---

## 🚨 问题二：更新代码后页面不变

### 现象

部署新版本后，用户访问还是旧页面，需要强制刷新才能更新。

### 原因

浏览器缓存了 JS/CSS 文件。

### 解决方案

**方案一：构建时加时间戳（推荐）**

```javascript
// scripts/add-timestamp.js
const fs = require('fs');
const timestamp = Date.now();
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\.js"/g, `.js?v=${timestamp}"`);
fs.writeFileSync('index.html', html);
```

**方案二：Nginx 禁用 HTML 缓存**

```nginx
location ~* \.html$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

---

## 🚨 问题三：git push 网络超时

### 现象

```
fatal: unable to connect to github.com port 443: Connection timed out
```

### 解决

使用 GitHub API 推送：

```bash
# 1. 创建 blob
curl -X POST -H "Authorization: token $TOKEN" \
  https://api.github.com/repos/USER/REPO/git/blobs \
  -d '{"content": "'$(base64 -w0 file.js)'", "encoding": "base64"}'

# 2. 创建 tree
curl -X POST -H "Authorization: token $TOKEN" \
  https://api.github.com/repos/USER/REPO/git/trees \
  -d '{"tree": [{"path": "file.js", "mode": "100644", "type": "blob", "sha": "BLOB_SHA"}]}'

# 3. 创建 commit
curl -X POST -H "Authorization: token $TOKEN" \
  https://api.github.com/repos/USER/REPO/git/commits \
  -d '{"message": "commit", "tree": "TREE_SHA", "parents": ["PARENT_SHA"]}'

# 4. 更新分支
curl -X PATCH -H "Authorization: token $TOKEN" \
  https://api.github.com/repos/USER/REPO/git/refs/heads/master \
  -d '{"sha": "COMMIT_SHA"}'
```

---

## 🚨 问题四：游戏暂停后无法继续

### 现象

三国杀游戏点击暂停后，无法恢复游戏。

### 原因

```javascript
togglePause() {
    if (this.gameState !== 'playing') return;  // 暂停后 state 变成 'paused'，直接被拦截
}
```

### 解决

```javascript
togglePause() {
    // 允许 playing 或 paused 状态都能切换
    if (this.gameState !== 'playing' && this.gameState !== 'paused') return;
}
```

---

## 📋 最佳实践总结

### Nginx 配置模板

```nginx
server {
    listen 3000;
    root /var/www/project;
    index index.html;

    # HTML 禁用缓存
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        try_files $uri =404;
    }

    # JS/CSS 短期缓存
    location ~* \.(js|css)$ {
        expires 1h;
    }

    # SPA 路由
    location / {
        try_files $uri $uri/ /index.html =404;
    }
}
```

### 部署检查清单

- [ ] 编译成功无错误
- [ ] 静态资源已加时间戳
- [ ] Nginx 配置 `try_files` 有 `=404`
- [ ] root 路径存在且权限正确
- [ ] 测试访问返回 200

---

*经验是最好的老师，踩过的坑都是成长的路。*