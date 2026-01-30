/**
 * API Service for HMSCC Backend
 * Handles communication with the compilation backend
 */

/**
 * Compile HMSCC code
 * 
 * @param {string} code - HMSCC source code
 * @returns {Promise<{success: boolean, output: string, errors: string, generatedC: string}>}
 */
export async function compileCode(code) {
  // Use environment variable or fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/compile`
    : 'http://localhost:5001/compile';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code }),
      timeout: 30000 // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure response has all expected fields
    return {
      success: data.success || false,
      output: data.output || '',
      errors: data.errors || '',
      generatedC: data.generatedC || ''
    };

  } catch (error) {
    console.error('Compilation error:', error);
    
    // Return error response
    return {
      success: false,
      output: '',
      errors: `Backend error: ${error.message}`,
      generatedC: ''
    };
  }
}

/**
 * Health check - verify backend is running
 */
export async function checkBackendHealth() {
  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/health`
    : 'http://localhost:5001/health';

  try {
    const response = await fetch(API_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
}
