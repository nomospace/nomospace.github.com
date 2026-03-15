---
layout: post
title: "两天六个项目：我的前端开发实战记录"
date: 2026-03-15 23:59:59 +0800
categories: [frontend]
tags: [Angular, Vue, Canvas, 游戏, 部署]
author: 金大虾
---

这两天在服务器上部署了六个前端项目，从 Angular 企业应用到纯 Canvas 小游戏，技术栈各不相同。记录一下项目概览和开发心得。

---

## 📊 项目一览

| 端口 | 项目 | 技术栈 | 特点 |
|------|------|--------|------|
| 3000 | 酒馆战棋攻略 | Angular 17 | 企业级 SPA |
| 3001 | 宝贝英语小课堂 | Angular 17 | 教育应用 |
| 3002 | WeSeeWe 跳跃方块 | 纯 Canvas | 无依赖游戏 |
| 3003 | Fotoshop | - | 在线图片处理 |
| 3005 | 三国杀 Mini | 纯 JS + Webpack | 卡牌游戏 |
| 3006 | 连连看 | 纯 JS | 休闲游戏 |

**访问地址**: http://47.102.199.24:端口号

---

## 🎮 项目详解

### 1. 酒馆战棋攻略 (3000)

炉石传说酒馆战棋攻略网站，提供英雄查询、流派分析等功能。

**技术要点**:
- Angular 17 + TypeScript
- SSR 预渲染优化
- Nginx SPA 路由配置

### 2. 宝贝英语小课堂 (3001)

面向儿童的英语学习应用，课本同步、玩中学。

**技术要点**:
- Angular 17 响应式设计
- 童趣化 UI 设计
- 家长管控功能

### 3. WeSeeWe 跳跃方块 (3002)

纯 Canvas 实现的跳跃类休闲游戏，约 1500 行代码。

**技术要点**:
```javascript
// 游戏核心循环
function gameLoop() {
    update();  // 更新逻辑
    render();  // 渲染画面
    requestAnimationFrame(gameLoop);
}
```

**经验**: 休闲游戏用纯 Canvas 足够，无需游戏引擎。

### 4. 三国杀 Mini (3005)

三国杀文字版，32 武将 + 108 卡牌，纯 DOM 实现。

**技术要点**:
- Webpack 5 构建
- 状态机管理回合流程
- 卡牌响应机制

**踩坑**: 
- `togglePause()` 状态检查逻辑错误导致无法继续
- 构建时需要给 JS 加时间戳避免缓存

### 5. 连连看 (3006)

重构 2012 年的老项目，完成所有 TODO 功能。

**完成的功能**:
- ✅ 最短路径提示（Canvas 绘制连线）
- ✅ 无解/死锁处理（自动检测并重排）
- ✅ 不规则 n*m 矩阵支持
- ✅ 计时/音效（Web Audio API）

**技术要点**:
```javascript
// 路径查找：直线 → 1拐角 → 2拐角
findPath(r1, c1, r2, c2) {
    return this.checkDirectPath() || 
           this.checkOneCorner() || 
           this.checkTwoCorners();
}
```

---

## 🛠️ 技术选型心得

### 游戏开发

| 游戏类型 | 推荐方案 | 理由 |
|---------|---------|------|
| 休闲跳跃类 | 纯 Canvas | 无依赖、加载快 |
| 卡牌对战类 | 纯 DOM/CSS | 易布局、易调试 |
| 复杂动作类 | Phaser/Pixi.js | 物理引擎支持 |

### 前端框架

- **企业级应用**: Angular（完整生态、TypeScript 友好）
- **快速原型**: Vue（上手快、灵活）
- **轻量游戏**: 纯 JS（无依赖、体积小）

---

## 🚀 部署经验

### Nginx 配置模板

```nginx
server {
    listen 3000;
    root /var/www/project;
    
    # HTML 禁用缓存
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # SPA 路由
    location / {
        try_files $uri $uri/ /index.html =404;  # 必须有 =404
    }
}
```

### 缓存解决方案

构建时给静态资源加时间戳：

```javascript
// scripts/add-timestamp.js
const timestamp = Date.now();
html = html.replace(/\.js"/g, `.js?v=${timestamp}"`);
```

---

## 📝 总结

1. **技术选型要匹配项目复杂度** - 简单游戏不需要重型框架
2. **部署时注意缓存策略** - HTML 禁缓存，JS 加时间戳
3. **Nginx 配置要完整** - `try_files` 必须有最终返回码
4. **状态机设计要严谨** - 卡牌游戏每个操作都要考虑状态流转

---

*代码是最好的文档，实践是最好的老师。*