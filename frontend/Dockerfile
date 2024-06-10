# 使用指定的基礎映像
FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# ENV DEBIAN_FRONTEND=noninteractive
# 設定工作目錄
WORKDIR /frontend

# 複製 package.json 和相關文件
COPY . .

RUN apt-get update 
RUN npm install
# 開放端口
EXPOSE 5173

# 指定啟動命令
CMD ["npm", "run", "dev"]
