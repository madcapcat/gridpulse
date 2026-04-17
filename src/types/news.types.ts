// Tipos para las fuentes de noticias de F1

export interface NewsArticle {
  title: string
  description: string
  content: string
  url: string
  image: string | null
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

export interface GNewsResponse {
  totalArticles: number
  articles: NewsArticle[]
}

// Respuesta de rss2json para feeds RSS
export interface RSSFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    description: string
    image: string
  }
  items: RSSItem[]
}

export interface RSSItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  categories: string[]
}
