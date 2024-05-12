export default async function getServerData(url: string) {
    // The return value is *not* serialized

    const response = await fetch(process.env.SERVER_URL + url, {method: 'GET'})
    if (!response.ok) {
        throw new Error(`Failed to fetch data. HTTP status: ${response.status}`)
    }
    return response.json()
}