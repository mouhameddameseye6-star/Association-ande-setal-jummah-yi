export type PageId =
  | 'accueil'
  | 'association'
  | 'actions'
  | 'histoire'
  | 'impact'
  | 'realisations'
  | 'sections'
  | 'ramadan'
  | 'chartes'
  | 'rejoindre'
  | 'soutenir'
  | 'operations'
  | 'actualites'
  | 'contact';

export interface ArticleData {
  id: string;
  title: string;
  date: string;
  category: string;
  region: string;
  summary: string;
  content: string;
  image: string;
}

export interface RealisationPhoto {
  id: string;
  title: string;
  category: 'Nettoyage' | 'Embellissement' | 'Actions Sociales' | 'Ramadan' | 'Vie Associative';
  location: string;
  region: string;
  date: string;
  image: string;
  description: string;
}

export interface OperationEvent {
  id: string;
  mosqueName: string;
  region: string;
  location: string;
  date: string;
  time: string;
  volunteersRegistered: number;
  description: string;
  status: 'upcoming' | 'completed';
}

export interface CharteItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  fullText: string;
  rules?: string[];
}

export interface SanctionItem {
  level: string;
  description: string;
  impact: string;
}

export interface SectionData {
  id: string;
  name: string;
  activeSince: string;
  mosquesCleaned: number;
  membersCount: number;
  description: string;
  coordinatorContact: string;
  communes: string[];
}

export interface AdhesionFormData {
  fullName: string;
  phone: string;
  email: string;
  region: string;
  city: string;
  motivation: string;
  acceptChartes: boolean;
  acceptCotisation: boolean;
}

export interface DonationOption {
  id: string;
  amount: number;
  title: string;
  impact: string;
}
