export async function onRequest(context) {
  // context 包含了请求信息和环境变量（包括你的 Service Binding）
  const { request, env } = context;

  try {
    // 检查绑定的 Worker 是否存在（防止环境变量未生效导致报错）
    if (!env.fenbuqi) {
      return new Response("Service Binding 'fenbuqi' not found.", { status: 500 });
    }

    // 将接收到的请求直接转发给名为 fenbuqi 的 Worker
    // 这会将原始的 HTTP 方法（GET/POST等）、Headers 和 Body 一并传递过去
    const response = await env.fenbuqi.fetch(request);
    
    // 返回 Worker 处理后的结果给前端
    return response;
    
  } catch (error) {
    // 如果调用过程中出现网络或内部错误，捕获并返回 500 状态码
    return new Response(`Error communicating with Worker: ${error.message}`, { status: 500 });
  }
}