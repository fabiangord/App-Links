import { LoginType } from "@/types/types"

export async function GET(url: string) {
    return await fetch(url)
}

export async function POST(url: string, data: any) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data)
    })

    return await res.json()
}