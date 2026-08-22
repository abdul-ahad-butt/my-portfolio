import axios from 'axios'
import { API_BASE_URL, ADMIN_API_KEY } from '../config'

// ── Public Axios instance (for portfolio contact form) ───────────────────────
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ── Admin Axios instance (for dashboard — includes auth header) ───────────────
export const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Admin-Key': ADMIN_API_KEY,
  },
  timeout: 10000,
})

// Response interceptor — global error logging
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.data ?? error.message)
    return Promise.reject(error)
  },
)

export default adminApi
