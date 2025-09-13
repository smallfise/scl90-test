# SCL-90 测评（一次性链接 + 新样式）

- 前端：HTML/CSS/JS
- 后端：Vercel Serverless Function (`/api/token`)
- 数据库：Supabase (表 `tokens`)

## 部署步骤
1. 上传本仓库到 GitHub。
2. Vercel 导入仓库，设置环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Redeploy 即可。

## 使用
生成链接：`https://你的域名/?t=<token>`
首次可用，提交后自动核销，再次访问提示失效。
