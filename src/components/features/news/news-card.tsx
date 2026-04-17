import { ExternalLink, Clock } from 'lucide-react'
import type { NewsArticle } from '@/types/news.types'
import { truncate } from '@/utils/format'
import { formatRelativeTime } from '@/utils/date'

type NewsCardProps = {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col bg-[#111111] border border-[#222222] rounded-xl overflow-hidden hover:border-[#333333] transition-colors duration-200 cursor-pointer group"
    >
      {/* Imagen */}
      {article.image && (
        <div className="aspect-video overflow-hidden bg-[#1a1a1a] shrink-0">
          <img
            src={article.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="font-heading font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#e10600] transition-colors duration-200">
          {article.title}
        </p>

        {article.description && (
          <p className="text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
            {truncate(article.description, 120)}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#1a1a1a]">
          <span className="text-xs text-[#52525b] font-medium">{article.source.name}</span>
          <div className="flex items-center gap-1 text-xs text-[#52525b]">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {formatRelativeTime(article.publishedAt)}
            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          </div>
        </div>
      </div>
    </a>
  )
}
