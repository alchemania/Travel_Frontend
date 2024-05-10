# 基于官方 Nginx 镜像
FROM nginx:stable-alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除 Nginx 默认的配置文件和默认的静态资源，清空工作目录
RUN rm -rf ./*

# 从你的主机上的 Vue 项目构建输出目录复制文件到 Docker 镜像中的工作目录
COPY ./dist .

# 用自定义的 Nginx 配置文件替换默认的配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 容器对外暴露 80 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]

#docker build -t travel_frontend:latest .