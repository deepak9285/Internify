const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiError extends Error {
    constructor(status, message, errors) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.errors = errors
    }
}

async function request(endpoint, method = 'GET', config = {}) {
    const { params, data, headers: customHeaders, ...customConfig } = config

    const url = new URL(`${BASE_URL}${endpoint}`)
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value)
        })
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...customHeaders,
    })

    try {
        const response = await fetch(url.toString(), {
            method,
            credentials: 'include',
            headers,
            body: data ? JSON.stringify(data) : undefined,
            ...customConfig,
        })

        if (response.status === 204) {
            return {}
        }

        const responseData = await response.json()

        if (!response.ok) {
            throw new ApiError(
                response.status,
                responseData.message || 'An error occurred',
                responseData.errors
            )
        }

        return responseData
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                window.location.href = '/login'
            }
            throw error
        }

        throw new ApiError(
            500,
            error instanceof Error ? error.message : 'Network error occurred'
        )
    }
}

const api = {
    get: (endpoint, config) =>
        request(endpoint, 'GET', config),

    post: (endpoint, data, config) =>
        request(endpoint, 'POST', { ...config, data }),

    put: (endpoint, data, config) =>
        request(endpoint, 'PUT', { ...config, data }),

    patch: (endpoint, data, config) =>
        request(endpoint, 'PATCH', { ...config, data }),

    delete: (endpoint, config) =>
        request(endpoint, 'DELETE', config),
}

export default api
export { ApiError }