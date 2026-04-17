import type { GNewsResponse, NewsArticle, RSSFeedResponse } from '@/types/news.types'

const GNEWS_BASE = 'https://gnews.io/api/v4'
const RSS2JSON_BASE = 'https://api.rss2json.com/v1/api.json'

export const RSS_FEEDS = {
  autosport: 'https://www.autosport.com/rss/f1/news',
  bbc: 'https://feeds.bbci.co.uk/sport/formula1/rss.xml',
  theRace: 'https://the-race.com/feed/',
  motorsport: 'https://www.motorsport.com/rss/f1/news/',
} as const

export async function fetchGNews(max = 10): Promise<NewsArticle[]> {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY
  if (!apiKey) return []

  const params = new URLSearchParams({
    q: 'Formula 1 OR F1 OR Grand Prix',
    lang: 'en',
    max: String(max),
    token: apiKey,
  })

  const response = await fetch(`${GNEWS_BASE}/search?${params}`)
  if (!response.ok) throw new Error(`GNews error: ${response.status}`)

  const data: GNewsResponse = await response.json()
  return data.articles
}

export async function fetchRSSFeed(feedUrl: string): Promise<NewsArticle[]> {
  const params = new URLSearchParams({ rss_url: feedUrl })
  const response = await fetch(`${RSS2JSON_BASE}?${params}`)
  if (!response.ok) throw new Error(`RSS error: ${response.status}`)

  const data: RSSFeedResponse = await response.json()
  if (data.status !== 'ok') return []

  return data.items.map((item) => ({
    title: item.title,
    description: item.description,
    content: item.content,
    url: item.link,
    image: item.thumbnail || null,
    publishedAt: item.pubDate,
    source: {
      name: data.feed.title,
      url: data.feed.link,
    },
  }))
}

// Combina GNews + RSS, deduplica por URL y ordena por fecha
export async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled([
    fetchGNews(),
    fetchRSSFeed(RSS_FEEDS.autosport),
    fetchRSSFeed(RSS_FEEDS.bbc),
  ])

  const articles = results
    .filter((r): r is PromiseFulfilledResult<NewsArticle[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)

  // Deduplica por URL
  const seen = new Set<string>()
  return articles
    .filter((a) => {
      if (seen.has(a.url)) return false
      seen.add(a.url)
      return true
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
