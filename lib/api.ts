import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: any) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
};

export const projects = {
  getAll: (params?: any) => apiClient.get('/projects', { params }),
  getOne: (id: string) => apiClient.get(`/projects/${id}`),
  create: (data: any) => apiClient.post('/projects', data),
  update: (id: string, data: any) => apiClient.put(`/projects/${id}`, data),
  delete: (id: string) => apiClient.delete(`/projects/${id}`),
  addMember: (id: string, data: any) => apiClient.post(`/projects/${id}/members`, data),
  removeMember: (id: string, userId: string) => apiClient.delete(`/projects/${id}/members/${userId}`),
  getMembers: (id: string) => apiClient.get(`/projects/${id}/members`),
};

export const tasks = {
  getByProject: (projectId: string) => apiClient.get(`/tasks/projects/${projectId}`),
  getOne: (id: string) => apiClient.get(`/tasks/${id}`),
  create: (data: any) => apiClient.post('/tasks', data),
  update: (id: string, data: any) => apiClient.put(`/tasks/${id}`, data),
  delete: (id: string) => apiClient.delete(`/tasks/${id}`),
};

export const sprints = {
  getByProject: (projectId: string) => apiClient.get(`/sprints/projects/${projectId}`),
  getOne: (id: string) => apiClient.get(`/sprints/${id}`),
  create: (projectId: string, data: any) => apiClient.post(`/sprints/projects/${projectId}`, data),
  update: (id: string, data: any) => apiClient.put(`/sprints/${id}`, data),
  delete: (id: string) => apiClient.delete(`/sprints/${id}`),
};

export const comments = {
  getByTask: (taskId: string) => apiClient.get(`/comments/tasks/${taskId}`),
  create: (taskId: string, data: any) => apiClient.post(`/comments/tasks/${taskId}`, data),
  update: (id: string, data: any) => apiClient.put(`/comments/${id}`, data),
  delete: (id: string) => apiClient.delete(`/comments/${id}`),
};

export const documents = {
  getByProject: (projectId: string) => apiClient.get(`/documents/projects/${projectId}`),
  getByTask: (taskId: string) => apiClient.get(`/documents/tasks/${taskId}`),
  create: (data: any) => apiClient.post('/documents', data),
  update: (id: string, data: any) => apiClient.put(`/documents/${id}`, data),
  delete: (id: string) => apiClient.delete(`/documents/${id}`),
};

export const activity = {
  getProjectActivity: (projectId: string, params?: any) =>
    apiClient.get(`/activity/projects/${projectId}`, { params }),
  getTaskActivity: (taskId: string, params?: any) => apiClient.get(`/activity/tasks/${taskId}`, { params }),
};

export default apiClient;
