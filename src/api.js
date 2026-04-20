const API_URL = import.meta.env.VITE_API_URL

const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
      ...options.headers,
    },
  })
  return response
}

export default apiFetch