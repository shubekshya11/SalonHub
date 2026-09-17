const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Custom API Error class for better error handling
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Generic request handler with error handling
 * @param {string} endpoint 
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses (e.g., 204 No Content)
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    let data;
    if (isJson) {
      data = await response.json();
    }

    // Handle successful responses
    if (response.ok) {
      return data;
    }

    // Handle error responses
    const errorMessage = data?.message || data?.detail || `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status, data);
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new ApiError('Network error. Please check your connection.', 0, null);
    }

    // Handle other errors
    throw new ApiError('An unexpected error occurred', 0, null);
  }
}

/**
 * HTTP GET request
 */
export async function get(endpoint) {
  return request(endpoint, { method: 'GET' });
}

/**
 * HTTP POST request
 */
export async function post(endpoint, data) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP PUT request
 */
export async function put(endpoint, data) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP PATCH request
 */
export async function patch(endpoint, data) {
  return request(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * HTTP DELETE request
 */
export async function del(endpoint) {
  return request(endpoint, { method: 'DELETE' });
}

export { ApiError };
export default { get, post, put, patch, del, ApiError };
