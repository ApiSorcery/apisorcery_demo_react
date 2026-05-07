#!/bin/bash

# 设置变量
REMOTE_HOST="tx01"
REMOTE_PATH="/var/projects/demo/frontend/vue3"
ARCHIVE_NAME="dist-$(date +%Y%m%d-%H%M%S).tar.gz"

echo "开始构建生产环境..."

# 构建生产环境
npm run build

if [ $? -ne 0 ]; then
    echo "构建失败，退出部署"
    exit 1
fi

echo "构建完成，开始打包..."

# 创建压缩包（直接压缩dist文件夹）
tar -czf $ARCHIVE_NAME --exclude='.DS_Store' --exclude='__MACOSX' dist

if [ $? -ne 0 ]; then
    echo "打包失败，退出部署"
    exit 1
fi

echo "打包完成: $ARCHIVE_NAME"

# 上传到服务器
echo "开始上传到服务器 $REMOTE_HOST..."

# 确保远程目录存在
ssh $REMOTE_HOST "mkdir -p $REMOTE_PATH"

# 上传压缩包
scp $ARCHIVE_NAME $REMOTE_HOST:$REMOTE_PATH/

if [ $? -ne 0 ]; then
    echo "上传失败，退出部署"
    exit 1
fi

echo "上传完成，开始部署..."

# 在远程服务器上执行部署操作
ssh $REMOTE_HOST << EOF
    cd $REMOTE_PATH

    # 移除原有的 dist 目录（如果存在）
    if [ -d "dist" ]; then
        echo "移除原有 dist 目录..."
        rm -rf dist
    fi

    # 解压缩dist文件夹
    echo "解压缩文件..."
    tar -xzf $ARCHIVE_NAME --warning=no-unknown-keyword

    # 设置权限
    chmod -R 755 dist/

    # 清理压缩包，保留最新的和最近两次的
    echo "清理旧压缩包，保留最新的和最近两次的..."
    ls -t dist-*.tar.gz 2>/dev/null | tail -n +4 | xargs -r rm -f

    echo "部署完成！"
EOF

if [ $? -ne 0 ]; then
    echo "远程部署失败"
    exit 1
fi

# 清理本地压缩包
rm -f $ARCHIVE_NAME

echo "部署完成！"
echo "应用已部署到: $REMOTE_HOST:$REMOTE_PATH/dist/"
