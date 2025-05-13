'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [urlData, setUrlData] = useState([])

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('urlData');
      if (savedData) {
        setUrlData(JSON.parse(savedData));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShortUrl(null)
    setLoading(true)

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      if (res.ok) {
        setShortUrl(data.shortUrl)
        const savedUrls = JSON.parse(localStorage.getItem('urlData')) || [];
        savedUrls.push({ original: url, short: data.shortUrl });
        localStorage.setItem('urlData', JSON.stringify(savedUrls));
        setUrlData(savedUrls)
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (err) {
      alert('Network error or unexpected issue')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (indexToRemove) => {
    const updated = urlData.filter((_, i) => i !== indexToRemove);
    setUrlData(updated);
    localStorage.setItem('urlData', JSON.stringify(updated));
  };

  return (
    <main className="flex flex-col items-center justify-center w-full align-middle min-h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          🔗 URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Paste a long URL here..."
            className="text-black flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>

        {loading && (
          <div className="mt-6 text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-blue-600 font-medium">Shortening your URL...</p>
          </div>
        )}

        {!loading && shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-lg font-medium">Your short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-xl font-semibold underline break-words"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {urlData.length > 0 ? (
          <div className='max-h-100 overflow-y-auto'>
          <table className="min-w-full table-auto">
            <thead>
              <tr className='sticky top-0 z-10 bg-white'>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Original URL</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700">Short URL</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {urlData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4 text-gray-800 max-w-2 truncate">{item.original}</td>
                  <td className="px-6 py-4 text-blue-600 max-w-2 truncate">
                    <a href={item.short} target="_blank" rel="noopener noreferrer" className="underline">
                      {item.short}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="text-center text-gray-700">No URL data available.</p>
        )}
      </div>
    </main>
  )
}
