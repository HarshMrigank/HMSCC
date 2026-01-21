// api.js - Add better error handling
export async function compileCode(code) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://hmscc-backend.onrender.com/compile'
    : 'http://localhost:3000/compile';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors', // Explicitly set CORS mode
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}