export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = {
    async get(endpoint: string) {
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                headers: { 'Content-Type': 'application/json' },
                // @ts-ignore
                credentials: 'include'
            });
            return await res.json();
        } catch (e) {
            console.error("API GET Error:", e);
            return null;
        }
    },
    async post(endpoint: string, data: any) {
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                // @ts-ignore
                credentials: 'include'
            });
            return await res.json();
        } catch (e) {
            console.error("API POST Error:", e);
            return null;
        }
    },
    async put(endpoint: string, data: any) {
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                // @ts-ignore
                credentials: 'include'
            });
            return await res.json();
        } catch (e) {
            console.error("API PUT Error:", e);
            return null;
        }
    },
    async delete(endpoint: string) {
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                // @ts-ignore
                credentials: 'include'
            });
            return await res.json();
        } catch (e) {
            console.error("API DELETE Error:", e);
            return null;
        }
    }
};
