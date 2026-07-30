export async function onRequest(context) {
  const { request, env, params } = context;

  // context.params.service 会自动捕获文件名 [service] 对应的路径值
  // 例如：请求 /api/fenbuqi 时，params.service 就是 "fenbuqi"
  const serviceName = params.service; 
  const targetService = env[serviceName];

  if (!targetService) {
    return new Response(`Service Binding '${serviceName}' 未绑定`, { status: 404 });
  }

  try {
    return await targetService.fetch(request);
  } catch (error) {
    return new Response(`调用 Worker '${serviceName}' 出错: ${error.message}`, { status: 500 });
  }
}
