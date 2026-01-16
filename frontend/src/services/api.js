export async function compileCode(code) {
  const response = await fetch('http://localhost:3000/compile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })

  if (!response.ok) {
    throw new Error('Failed to compile code')
  }

  return response.json()
}
