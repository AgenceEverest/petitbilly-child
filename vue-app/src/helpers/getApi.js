export async function getApiData(route, params = { method: "get" }) {
  const data = await fetch(route, {
    method: params.method,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const body = data.json();
  return body;
}
