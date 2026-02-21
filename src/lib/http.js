export async function http(url, { method = "GET", headers, body } = {}) {
  console.groupCollapsed(`HTTP ${method} → ${url}`);

  if (body) {
    console.log("Request body:", body);
  }

  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log("Status:", res.status);

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  console.log("Response data:", data);

  if (!res.ok) {
    console.error("HTTP ERROR:", data);
    console.groupEnd();

    const message =
      (data && typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status}`;

    throw new Error(message);
  }

  console.groupEnd();
  return data;
}