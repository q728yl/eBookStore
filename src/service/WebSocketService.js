export const waitOrderInfo = (userId) => {
    // 创建WebSocket连接
    const socket = new WebSocket('ws://localhost:8080/websocket/' + userId);
    // 连接建立时触发
    socket.onopen = () => {
        console.log('WebSocket连接已建立');
    };
    // 接收到消息时触发
    // 接收到消息时触发
    socket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log('接收到消息：', receivedMessage);

        if (receivedMessage.success) {
            console.log('订单处理成功');
            // 在此处执行成功状态的操作，例如页面跳转
            const targetURL = `http://localhost:3000/shopcard/allorders`;
            window.location.href = targetURL;
            console.log("跳转到" + targetURL);
        } else {
            console.log('订单处理失败: ' + receivedMessage.message);
            // 在此处执行失败状态的操作，例如显示错误消息给用户
            // receivedMessage.message 包含了订单处理失败的具体错误消息
            alert('订单处理失败: ' + receivedMessage.message);
            window.location.reload();
        }
    };

    // 连接关闭时触发
    socket.onclose = () => {
        console.log('WebSocket连接已关闭');
    };
};

