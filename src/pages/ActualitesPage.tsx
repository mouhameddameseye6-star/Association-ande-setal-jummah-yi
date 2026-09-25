import React, { useState } from 'react';
import { PageId, ArticleData } from '../types';
import { ARTICLES_DATA, OFFICIAL_SOCIALS } from '../data/content';
import { AsjyImage } from '../components/AsjyImage';
import {
  Newspaper,
  Calendar,
  MapPin,
  Search,
  ArrowRight,
  X,
  Share2,
  ExternalLink
} from 'lucide-react';

interface ActualitesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ActualitesPage: React.FC<ActualitesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<ArticleData | null>(null);

  const categories = ['Toutes', 'Chantier', 'Solidarité', 'Organisation', 'Ramadan'];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCat = selectedCategory === 'Toutes' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="actualites-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Communiqués & Chantiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Actualités de l'ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Suivez les informations officielles, les rapports de chantiers et les bilans d'activité de l'Association Andeu Setal Jummah Yi.
        </p>
      </div>

      {/* Articles or Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-dashed border-gray-300 text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0D3823]/10 text-[#0D3823] flex items-center justify-center">
            <Newspaper className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-[#19241C]">
              Aucun communiqué pour le moment
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Les récits de nos chantiers de quinzaine, les vidéos de nos équipes et les actualités en direct sont partagés sur nos canaux officiels :
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <a
              href={OFFICIAL_SOCIALS.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#FF0000]/10 text-[#C4302B] hover:bg-[#FF0000]/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>YouTube Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#E1306C]/10 text-[#C13584] hover:bg-[#E1306C]/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Instagram Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OFFICIAL_SOCIALS.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-black/10 text-black hover:bg-black/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>TikTok Officiel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-[#0D3823]/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                  <AsjyImage
                    src={art.image}
                    alt={art.title}
                    fallbackTitle={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D3823]/80 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-semibold text-[#0D3823]">
                      <MapPin className="w-3.5 h-3.5" />
                      {art.region}
                    </span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#19241C] group-hover:text-[#0D3823] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setReadingArticle(art)}
                  className="text-xs font-bold text-[#0D3823] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
