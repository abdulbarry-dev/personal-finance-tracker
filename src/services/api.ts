// API Configuration
const API_BASE_URL = 'http://localhost:3002'

// Types
export interface User {
  id: number
  username: string
  email: string
  name: string
  createdAt: string
}

export interface Transaction {
  id: number
  userId: number
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  createdAt: string
}

export interface Category {
  id: number
  name: string
  type: 'income' | 'expense'
  color: string
  icon: string
}

export interface Budget {
  id: number
  userId: number
  categoryId: number
  amount: number
  period: 'monthly' | 'yearly'
  startDate: string
  endDate: string
  createdAt: string
}

export interface CreateTransactionDto {
  userId: number
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}

// HTTP Client
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return {} as T
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

const apiClient = new ApiClient(API_BASE_URL)

// API Services
export const authApi = {
  async login(email: string, password: string): Promise<User> {
    // For demo purposes, just return the first user
    const users = await apiClient.get<User[]>('/users')
    const user = users.find(u => u.email === email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
    }
    return apiClient.post<User>('/users', newUser)
  },
}

export const transactionApi = {
  async getAll(userId?: number): Promise<Transaction[]> {
    const endpoint = userId ? `/transactions?userId=${userId}` : '/transactions'
    return apiClient.get<Transaction[]>(endpoint)
  },

  async getById(id: number): Promise<Transaction> {
    return apiClient.get<Transaction>(`/transactions/${id}`)
  },

  async create(data: CreateTransactionDto): Promise<Transaction> {
    const newTransaction = {
      ...data,
      createdAt: new Date().toISOString(),
    }
    return apiClient.post<Transaction>('/transactions', newTransaction)
  },

  async update(id: number, data: UpdateTransactionDto): Promise<Transaction> {
    return apiClient.patch<Transaction>(`/transactions/${id}`, data)
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/transactions/${id}`)
  },

  async getByDateRange(
    startDate: string,
    endDate: string,
    userId?: number
  ): Promise<Transaction[]> {
    let endpoint = `/transactions?date_gte=${startDate}&date_lte=${endDate}`
    if (userId) {
      endpoint += `&userId=${userId}`
    }
    return apiClient.get<Transaction[]>(endpoint)
  },

  async getByCategory(category: string, userId?: number): Promise<Transaction[]> {
    let endpoint = `/transactions?category=${category}`
    if (userId) {
      endpoint += `&userId=${userId}`
    }
    return apiClient.get<Transaction[]>(endpoint)
  },
}

export const categoryApi = {
  async getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories')
  },

  async getByType(type: 'income' | 'expense'): Promise<Category[]> {
    return apiClient.get<Category[]>(`/categories?type=${type}`)
  },

  async create(data: Omit<Category, 'id'>): Promise<Category> {
    return apiClient.post<Category>('/categories', data)
  },
}

export const budgetApi = {
  async getAll(userId?: number): Promise<Budget[]> {
    const endpoint = userId ? `/budgets?userId=${userId}` : '/budgets'
    return apiClient.get<Budget[]>(endpoint)
  },

  async create(data: Omit<Budget, 'id' | 'createdAt'>): Promise<Budget> {
    const newBudget = {
      ...data,
      createdAt: new Date().toISOString(),
    }
    return apiClient.post<Budget>('/budgets', newBudget)
  },

  async update(id: number, data: Partial<Budget>): Promise<Budget> {
    return apiClient.patch<Budget>(`/budgets/${id}`, data)
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/budgets/${id}`)
  },
}

// Utility functions
export const apiUtils = {
  isServerRunning: async (): Promise<boolean> => {
    try {
      await fetch(`${API_BASE_URL}/categories`)
      return true
    } catch {
      return false
    }
  },

  getApiBaseUrl: () => API_BASE_URL,
}

export default apiClient
