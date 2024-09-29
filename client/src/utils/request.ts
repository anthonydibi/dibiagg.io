export const req = async <T>(url: string, options: RequestInit): Promise<T> => {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}