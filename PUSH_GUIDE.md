# 📝 博客文章推送指南

## 文章位置

博客文章已保存在：
```
/home/admin/.openclaw/workspace/nomospace.github.com/_posts/2026-03-14-48hours-game-dev.md
```

## 推送到 GitHub 的步骤

### 方法一：使用 Git 命令（推荐）

```bash
# 1. 进入博客仓库
cd /home/admin/.openclaw/workspace/nomospace.github.com

# 2. 检查文章
ls -la _posts/
# 应该能看到：2026-03-14-48hours-game-dev.md

# 3. 添加文件到 git
git add _posts/2026-03-14-48hours-game-dev.md

# 4. 提交
git commit -m "🦞 添加新博客：48 小时开发实录 - 从酒馆战棋到三国杀"

# 5. 推送
git push origin master
# 或者
git push origin main
```

### 方法二：使用 GitHub 网页

1. 打开 https://github.com/nomospace/nomospace.github.com
2. 点击 `_posts` 目录（如果没有就创建）
3. 点击 "Add file" → "Upload files"
4. 拖入文件：`/home/admin/.openclaw/workspace/blog-post-48hours.md`
5. 重命名为：`2026-03-14-48hours-game-dev.md`
6. 填写提交信息，点击 "Commit changes"

### 方法三：使用 GitHub CLI

```bash
# 如果安装了 gh
cd /home/admin/.openclaw/workspace/nomospace.github.com
gh repo sync  # 同步最新代码
git add _posts/2026-03-14-48hours-game-dev.md
git commit -m "🦞 添加新博客"
gh push
```

## 博客预览

文章标题：**《48 小时开发实录：从酒馆战棋到三国杀，我的 Web 游戏开发之旅》**

文章内容包括：
- ✅ 项目概览（酒馆战棋 + 三国杀）
- ✅ 技术选型与架构设计
- ✅ 核心功能实现（代码示例）
- ✅ 遇到的坑与解决方案
- ✅ 开发数据对比
- ✅ 经验总结与建议

## 博客配置检查

### 1. 检查 _config.yml

确保你的 Jekyll 配置正确：

```yaml
# _config.yml
title: 金大虾的博客
description: 记录技术与生活
theme: minima  # 或其他主题

# 确保包含 _posts 目录
include:
  - _posts
```

### 2. 检查 Front Matter

博客文章开头已有正确的 Front Matter：

```yaml
---
layout: post
title: "48 小时开发实录：从酒馆战棋到三国杀，我的 Web 游戏开发之旅"
date: 2026-03-14 23:59:59 +0800
categories: [游戏开发，Web 技术，项目总结]
tags: [Angular, Vue, Node.js, WebSocket, 游戏开发]
author: 金大虾
---
```

### 3. GitHub Pages 设置

1. 打开仓库 Settings
2. 进入 Pages 设置
3. Source 选择 `main` 分支（或 `master`）
4. 保存后等待几分钟
5. 访问 `https://nomospace.github.io` 查看博客

## 常见问题

### Q: 推送时权限错误？

**A:** 使用 HTTPS 方式推送：
```bash
git remote set-url origin https://github.com/nomospace/nomospace.github.com.git
git push origin master
```

### Q: 博客不显示？

**A:** 检查：
1. Front Matter 格式是否正确（--- 不能少）
2. 文件名格式：`YYYY-MM-DD-title.md`
3. _config.yml 配置是否正确
4. GitHub Pages 是否启用

### Q: 图片不显示？

**A:** 图片需要放在仓库中，并使用相对路径：
```markdown
![图片说明](/assets/images/xxx.png)
```

## 后续优化建议

### 1. 添加图片

在文章中插入项目截图：
```markdown
![酒馆战棋首页](/assets/images/hearthstone-home.png)
![三国杀游戏界面](/assets/images/sanguosha-game.png)
```

### 2. 添加项目链接

在文章底部添加项目链接：
```markdown
## 📦 项目地址

- [酒馆战棋攻略 H5](http://47.102.199.24/heroes)
- [微杀杀 - 三国杀 Web 版](http://localhost:80)
```

### 3. 添加评论区

如果使用 Disqus：
```html
<div id="disqus_thread"></div>
<script>
  var disqus_config = function () {
    this.page.url = 'https://nomospace.github.io/48hours-game-dev/';
  };
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://your-disqus-shortname.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
```

---

_准备好了吗？开始推送吧！_ 🚀
