// App Router: POST /api/shorten
export async function POST(req) {
    try {
        const { url } = await req.json()

        if (!url || !url.startsWith('http')) {
            return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400 })
        }

        const tinyRes = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`)

        if (!tinyRes.ok) {
            return new Response(JSON.stringify({ error: 'Failed to shorten URL' }), { status: 500 })
        }

        const shortUrl = await tinyRes.text()
        return new Response(JSON.stringify({ shortUrl }), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 })
    }
}
