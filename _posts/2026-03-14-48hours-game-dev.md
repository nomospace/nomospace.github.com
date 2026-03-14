---
layout: post
title: "48 小时开发实录：从酒馆战棋到三国杀，我的 Web 游戏开发之旅"
date: 2026-03-14 23:59:59 +0800
categories: [游戏开发，Web 技术，项目总结]
tags: [Angular, Vue, Node.js, WebSocket, 游戏开发]
author: 金大虾
---

## 📖 前言

过去的 48 小时，我完成了一次高强度的 Web 游戏开发挑战：从零开始实现了两个完整的卡牌对战游戏——**酒馆战棋攻略 H5** 和 **微杀杀（三国杀 Web 版）**。

这篇文章将记录整个开发过程、技术选型、遇到的坑以及解决方案。希望能给同样想做 Web 游戏的你一些参考。

---

## 🎯 项目概览

### 项目一：酒馆战棋攻略 H5

一个炉石传说酒馆战棋的攻略网站，提供英雄查询、技能展示、比赛集锦等功能。

**技术栈：**
- 前端：Angular 17 + TypeScript
- 部署：Nginx + 一键部署脚本

**核心功能：**
- 英雄列表与详情页
- 技能展示与卡牌配合
- 每日推荐（带运势系统）
- 比赛集锦页面

**访问地址：** http://47.102.199.24/heroes

### 项目二：微杀杀（WeSeeWe）- 三国杀 Web 版

一个多人在线的三国杀游戏，支持本地对战和在线联机。

**技术栈：**
- 前端：Vue 3 + Vite + TypeScript + Pinia + TailwindCSS
- 后端：Node.js + Express + Socket.IO
- 部署：Docker + Nginx

**核心功能：**
- 12 个基础武将（魏蜀吴群四大势力）
- 完整牌库（95 张卡牌）
- 身份局模式（主公/忠臣/反贼/内奸）
- 实时在线对战

**访问地址：** http://localhost:80

---

## 🛠️ 技术选型与架构设计

### 为什么选择这些技术？

#### Angular 17（酒馆战棋）

选择 Angular 的原因：
1. **Signals 响应式**：Angular 17 的 Signals 让状态管理变得简单
2. **TypeScript 原生支持**：类型安全，开发体验好
3. **SSR 支持**：有利于 SEO（虽然攻略站不太需要）
4. **成熟的生态**：路由、表单、HTTP 客户端一应俱全

```typescript
// 使用 Signals 管理英雄筛选状态
readonly tierFilterSignal = signal<string>('all');
readonly filteredHeroes = computed(() => {
  let result = [...this.heroesSignal()];
  const tier = this.tierFilterSignal();
  if (tier !== 'all') {
    result = result.filter(hero => hero.tier === tier);
  }
  return result;
});
```

#### Vue 3 + Socket.IO（三国杀）

选择 Vue 3 的原因：
1. **轻量灵活**：比 Angular 更轻量，上手快
2. **组合式 API**：逻辑复用更方便
3. **Pinia 状态管理**：比 Vuex 更简洁
4. **TailwindCSS**：原子化 CSS，开发效率高

```typescript
// Pinia 游戏状态管理
export const useGameStore = defineStore('game', {
  state: () => ({
    players: [],
    currentPlayer: null,
    gameState: 'waiting' as 'waiting' | 'playing' | 'ended',
    deck: [],
    discardPile: []
  }),
  actions: {
    drawCards(count: number) {
      for (let i = 0; i < count; i++) {
        const card = this.deck.pop();
        if (card) this.discardPile.push(card);
      }
    }
  }
});
```

### 项目架构对比

| 特性 | 酒馆战棋 | 三国杀 |
|------|----------|--------|
| 前端框架 | Angular 17 | Vue 3 |
| 状态管理 | Signals | Pinia |
| 样式方案 | 自定义 CSS | TailwindCSS |
| 后端服务 | 无（静态站） | Node.js + Socket.IO |
| 部署方式 | Nginx | Docker + Nginx |

---

## 💻 核心功能实现

### 1. 数据结构设计

#### 酒馆战棋 - 英雄数据

```typescript
export interface Hero {
  // 基础信息
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  
  // 强度评级
  tier: 'T0' | 'T1' | 'T2' | 'T3';
  difficulty: '简单' | '中等' | '困难';
  stats: HeroStats;
  
  // 玩法风格
  playstyle: string[];
  bestBuilds: string[];
  description: string;
  
  // 技能
  ability: HeroAbility;
  
  // 配合体系
  synergies: HeroCard[];
  tavernSynergies?: string[];
  
  // 克制关系
  counters?: string[];
  counteredBy?: string[];
  
  // 强势期
  powerSpikes?: string[];
}
```

**设计思路：**
- 将统计数据独立为 `HeroStats` 对象，便于扩展
- 克制关系使用英雄 ID 数组，方便关联查询
- 所有字段可选，保证兼容性

#### 三国杀 - 武将技能系统

```typescript
class Character {
  constructor(name, kingdom, hp, skills = []) {
    this.name = name;
    this.kingdom = kingdom;  // wei, shu, wu, qun
    this.hp = hp;
    this.skills = skills;
  }
  
  // 受到伤害时的技能触发
  onDamage(amount, source) {
    const result = { amount, prevented: false };
    
    this.skills.forEach(skill => {
      if (skill.trigger === 'damage' && skill.handler) {
        const skillResult = skill.handler(this, { amount, source });
        if (skillResult.prevented) result.prevented = true;
        if (skillResult.amount) result.amount = skillResult.amount;
      }
    });
    
    return result;
  }
}

// 曹操 - 奸雄
const caocao = new Character('曹操', 'wei', 4, [
  {
    name: '奸雄',
    description: '受到伤害后，可以获得对该角色造成伤害的牌',
    trigger: 'damage',
    handler: (player, event) => {
      console.log('⚔️ 曹操发动【奸雄】');
      // 获得伤害来源的牌
      return { gained: true };
    }
  }
]);
```

**设计亮点：**
- 技能系统采用**策略模式**，每个技能是独立的处理器
- 触发器（trigger）机制：`damage`、`turn_start`、`turn_end` 等
- 技能返回值统一格式，便于组合

### 2. 游戏流程引擎

#### 三国杀 - 回合流程

```typescript
class GameEngine {
  // 完整回合流程
  startTurn(player: Player) {
    console.log(`\n========== ${player.name} 的回合 ==========`);
    
    // 1. 判定阶段
    this.judgementPhase(player);
    
    // 2. 摸牌阶段
    this.drawPhase(player);
    
    // 3. 出牌阶段
    this.playPhase(player);
    
    // 4. 弃牌阶段
    this.discardPhase(player);
    
    // 5. 回合结束
    this.endTurn();
  }
  
  // 判定阶段：处理乐不思蜀、兵粮寸断
  judgementPhase(player: Player) {
    player.judgement.forEach(card => {
      const result = this.deck.judge();
      
      if (card.name === '乐不思蜀') {
        if (result.suit === 'heart') {
          player.skipPhase('play');  // 跳过出牌阶段
        }
      }
      
      if (card.name === '兵粮寸断') {
        if (result.number > 9) {
          player.skipPhase('draw');  // 跳过摸牌阶段
        }
      }
    });
  }
  
  // 摸牌阶段：基础摸 2 张 + 武将技能
  drawPhase(player: Player) {
    let drawCount = 2;
    
    // 周瑜 - 英姿：多摸一张
    if (player.character === '周瑜') {
      drawCount += 1;
    }
    
    player.drawCards(drawCount);
  }
}
```

**设计经验：**
- 阶段化设计，每个阶段独立函数
- 支持跳过阶段（乐不思蜀、兵粮寸断）
- 武将技能在对应阶段自动触发

### 3. WebSocket 实时通信

#### 房间管理

```typescript
// server/index.js
const rooms = {};

io.on('connection', (socket) => {
  // 加入房间
  socket.on('join_room', (data) => {
    const { roomId, playerName } = data;
    
    if (!rooms[roomId]) {
      rooms[roomId] = {
        id: roomId,
        players: [],
        gameState: 'waiting'
      };
    }
    
    rooms[roomId].players.push({
      id: socket.id,
      name: playerName,
      ready: false
    });
    
    socket.join(roomId);
    io.to(roomId).emit('room_update', rooms[roomId]);
  });
  
  // 出牌同步
  socket.on('play_card', (data) => {
    const { roomId, card, targets } = data;
    socket.to(roomId).emit('card_played', {
      playerId: socket.id,
      card,
      targets
    });
  });
});
```

**踩坑记录：**
1. **房间清理**：玩家断开后要检查房间是否为空，为空则删除
2. **状态同步**：每次状态变化都要广播给房间内所有玩家
3. **断线重连**：需要实现重连机制（待完善）

### 4. 一键部署脚本

#### Nginx 部署脚本

```bash
#!/bin/bash
# deploy.sh

PROJECT_NAME="weseewe"
NGINX_ROOT="/var/www/${PROJECT_NAME}"

echo "🦞 开始部署 ${PROJECT_NAME}..."

# 1. 清理旧部署
sudo rm -rf ${NGINX_ROOT}/*

# 2. 同步文件
sudo cp -r ./dist/* ${NGINX_ROOT}/

# 3. 设置权限
sudo chown -R nginx:nginx ${NGINX_ROOT}
sudo chmod -R 755 ${NGINX_ROOT}

# 4. 创建 Nginx 配置
sudo tee /etc/nginx/conf.d/${PROJECT_NAME}.conf > /dev/null << 'EOF'
server {
    listen 80;
    root /var/www/weseewe;
    index index.html;

    location ~* \.(js|css|png|jpg)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# 5. 重载 Nginx
sudo nginx -t && sudo nginx -s reload

# 6. 验证部署
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)
if [ "$HTTP_CODE" = "200" ]; then
    echo "🎉 部署成功！"
else
    echo "❌ 部署失败"
    exit 1
fi
```

**使用体验：**
```bash
./deploy.sh
# 🦞 开始部署 weseewe...
# 🧹 清理旧部署...
# 📦 同步文件...
# 🔐 设置权限...
# 📝 创建 Nginx 配置...
# 🔄 重载 Nginx...
# ✅ 验证部署...
# 🎉 部署成功！
```

---

## 🐛 遇到的坑与解决方案

### 坑 1：Angular 路由参数传递

**问题：** 从首页点击热门英雄，无法正确传递 heroId

**错误代码：**
```html
<a [routerLink]="'/heroes/' + hero.id">  <!-- 这样写也可以，但不推荐 -->
```

**正确写法：**
```html
<a [routerLink]="['/heroes', hero.id]">  <!-- 推荐：数组形式 -->
```

**原因：** 数组形式更安全，会自动处理 URL 编码

### 坑 2：Git 历史中移除大文件

**问题：** `node_modules` 被提交到 git，导致仓库体积巨大

**解决方案：**
```bash
# 从 git 历史中移除 node_modules
git rm -r --cached node_modules
git commit -m "🦞 清理 node_modules 从 git 历史"
git push origin main

# 更新 .gitignore
echo "node_modules/" >> .gitignore
```

### 坑 3：Nginx SPA 路由 404

**问题：** 刷新页面后出现 404

**原因：** SPA 是前端路由，Nginx 不知道这些路由

**解决：** 配置 `try_files`
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**原理：** 所有未知路径都返回 `index.html`，由前端路由器接管

### 坑 4：WebSocket 断线重连

**问题：** 网络波动导致连接断开

**临时方案：**
```typescript
// 前端重连逻辑
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

function connect() {
  socket = io('http://localhost:3000');
  
  socket.on('connect', () => {
    console.log('✅ 连接成功');
    reconnectAttempts = 0;
  });
  
  socket.on('disconnect', () => {
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      console.log(`🔄 尝试重连 (${reconnectAttempts}/${maxReconnectAttempts})`);
      setTimeout(connect, 2000 * reconnectAttempts);
    }
  });
}
```

### 坑 5：图片加载失败

**问题：** 外部 CDN 图片可能失效

**解决方案：** 添加 fallback
```typescript
handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  const parent = img.parentElement;
  if (parent) {
    parent.style.background = 'rgba(243, 156, 18, 0.3)';
    parent.innerHTML = '🦸';  // emoji 替代
  }
}
```

---

## 📊 开发数据对比

| 指标 | 酒馆战棋 | 三国杀 |
|------|----------|--------|
| 开发时间 | 6 小时 | 14 小时 |
| 代码行数 | ~800 行 | ~2400 行 |
| 组件数量 | 7 个 | 12 个 |
| API 接口 | 0 个（静态站） | 5 个 |
| 部署时间 | 30 秒 | 2 分钟 |
| 构建大小 | 78KB | 156KB |

---

## 🎓 经验总结

### 1. 技术选型建议

**小项目（攻略站、展示页）：**
- 选择 **Angular** 或 **Vue** 都可以
- 不需要后端，直接部署静态文件
- 使用 CDN 加载图片，减少服务器压力

**中等项目（联机游戏、实时应用）：**
- 前端：**Vue 3 + Pinia**（轻量灵活）
- 后端：**Node.js + Socket.IO**（实时通信）
- 部署：**Docker**（便于迁移）

### 2. 代码组织原则

**单一职责：** 每个组件/类只做一件事
```typescript
// ❌ 错误：一个组件做太多事
class HeroComponent {
  loadHeroes() { }
  filterHeroes() { }
  sortHeroes() { }
  exportHeroes() { }  // 这应该单独成一个服务
}

// ✅ 正确：职责分离
class HeroService {
  loadHeroes() { }
  filterHeroes() { }
  sortHeroes() { }
}

class HeroExportService {
  exportHeroes() { }
}
```

**数据与逻辑分离：**
```typescript
// 数据层
const CharactersDB = {
  caocao: { name: '曹操', skills: [...] },
  guanyu: { name: '关羽', skills: [...] }
};

// 逻辑层
class GameEngine {
  useSkill(characterId: string) {
    const character = CharactersDB[characterId];
    // 处理技能逻辑
  }
}
```

### 3. 部署最佳实践

**一键部署：**
- 写一个脚本，自动化所有步骤
- 包含验证环节，确保部署成功
- 失败时回滚到上一个版本

**Nginx 配置：**
- 开启 Gzip 压缩
- 配置静态资源缓存
- 隐藏 Nginx 版本号（安全）

**Docker 化：**
- 多阶段构建，减小镜像体积
- 使用 Alpine 基础镜像
- 配置健康检查

### 4. 性能优化技巧

**前端：**
- 懒加载路由
- 图片懒加载
- 虚拟滚动（长列表）

**后端：**
- WebSocket 连接池
- 数据库查询缓存
- 限流与防刷

**部署：**
- CDN 加速静态资源
- Nginx 反向代理
- Gzip/Brotli 压缩

---

## 🚀 下一步计划

### 酒馆战棋
- [ ] 添加用户登录系统
- [ ] 实现收藏功能
- [ ] 添加数据统计（访问数、热门英雄）
- [ ] 配置 HTTPS

### 三国杀
- [ ] 完善 UI 界面
- [ ] 实现所有武将技能
- [ ] 添加卡牌插画
- [ ] 实现 AI 对手
- [ ] 添加游戏音效

### 通用
- [ ] 建立 CI/CD 流程
- [ ] 添加单元测试
- [ ] 性能监控与告警
- [ ] 用户反馈系统

---

## 📚 参考资源

### 技术文档
- [Angular 官方文档](https://angular.io/docs)
- [Vue 3 官方文档](https://vuejs.org/)
- [Socket.IO 文档](https://socket.io/docs/)
- [Nginx 配置指南](https://nginx.org/en/docs/)

### 游戏开发
- [Cocos Creator](https://www.cocos.com/)
- [Phaser.js](https://phaser.io/)
- [Pixi.js](https://pixijs.com/)

### 部署运维
- [Docker 文档](https://docs.docker.com/)
- [GitHub Actions](https://github.com/features/actions)

---

## 💬 结语

48 小时，两个项目，从技术选型到部署上线，这是一次完整的全栈开发实践。

最大的收获不是代码本身，而是：
1. **快速学习能力**：新技术现学现用
2. **问题解决能力**：遇到 bug 不慌张，逐步排查
3. **工程化思维**：不仅要能跑，还要好维护、好部署

游戏开发是一条充满挑战的路，但看到自己做的游戏能跑起来，那种成就感是无与伦比的。

**最后，送给大家一句话：**

> 不要只当救火队员，要当防火设计师！
> 
> 每次解决问题不应该是一次性的手动操作，而应该：
> 1. **自动化** - 脚本代替手工
> 2. **文档化** - 记录每个步骤
> 3. **可复用** - 下次直接套用
> 4. **防御性** - 预检机制避免问题

---

_感谢阅读！如果你觉得这篇文章对你有帮助，欢迎 star 我的项目！_

**项目地址：**
- [酒馆战棋攻略 H5](https://github.com/nomospace/hearthstone-battlegrounds)
- [微杀杀 - 三国杀 Web 版](https://github.com/nomospace/weseewe)
- [三国杀 Mini](https://github.com/nomospace/sanguosha-mini)

_作者：金大虾_  
_时间：2026 年 3 月 14 日_  
_地点：上海杨浦_
