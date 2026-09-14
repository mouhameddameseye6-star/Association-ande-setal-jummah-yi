import React, { useState } from 'react';
import { PageId, ArticleData } from '../types';
import { ARTICLES_DATA } from '../data/content';
import {
  Newspaper,
  Calendar,
  MapPin,
  Search,
  ArrowRight,
  X,
  Share2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ActualitesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ActualitesPage: React.FC<ActualitesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<ArticleData | null>(null);
  const [shared, setShared] = useState(false);

  const categories = ['Toutes', 'Chantier', 'Solidarité', 'Organisation', 'Ramadan'];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCat = selectedCategory === 'Toutes' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShareWhatsApp = (art: ArticleData) => {
    const text = encodeURIComponent(`*${art.title}*\n\n${art.summary}\n\nRetrouvez toute l'actualité de l'Association Andeu Setal Jummah Yi (ASJY) sur notre site officiel.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="actualites-page">
      {/* Header */}
      <div className="border-b border-[#0D3823]/10 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3823]/10 text-xs font-bold text-[#0D3823] uppercase tracking-wider">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Communiqués & Bilans</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#19241C] uppercase tracking-tight">
          Actualités de l'ASJY
        </h1>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
          Suivez les récits de nos chantiers, les bilans financiers des opérations et les annonces officielles de nos coordinations régionales.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0D3823] text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0D3823] focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl border border-[#0D3823]/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
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
                className="text-xs font-bold text-[#0D3823] hover:underline flex items-center gap-1.5"
              >
                <span>Lire l'article complet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleShareWhatsApp(art)}
                className="p-2 rounded-lg text-gray-400 hover:text-[#25D366] hover:bg-gray-50 transition-colors"
                title="Partager sur WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0D3823]/10 text-[#0D3823] font-extrabold uppercase">
                  {readingArticle.category}
                </span>
                <span className="text-gray-500 font-medium">{readingArticle.date}</span>
              </div>

              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#19241C]">
              {readingArticle.title}
            </h2>

            <div className="rounded-2xl overflow-hidden aspect-[16/9]">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#0D3823]/15 text-xs text-gray-700 italic">
              Région : <strong>{readingArticle.region}</strong> • Publication officielle ASJY
            </div>

            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-4">
              {readingArticle.content}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleShareWhatsApp(readingArticle)}
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20b858] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Partager sur WhatsApp</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="text-xs text-gray-500 hover:text-gray-800 font-bold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
