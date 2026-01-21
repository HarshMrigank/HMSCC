export async function compileCode(code) {
  const API_URL = `${import.meta.env.VITE_API_URL}/compile`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
