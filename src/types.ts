export type PageId =
  | 'accueil'
  | 'association'
  | 'actions'
  | 'histoire'
  | 'impact'
  | 'sections'
  | 'ramadan'
  | 'chartes'
  | 'rejoindre'
  | 'soutenir'
  | 'operations'
  | 'actualites'
  | 'contact'
  | 'admin';

export type ActivityKey =
  | 'nettoyage'
  | 'embellissement'
  | 'entretien'
  | 'social'
  | 'ramadan'
  | 'autres';

export interface ActivityConfig {
  key: ActivityKey;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  categoryLabel: string;
}

export interface UserPhoto {
  id: string;
  activityKey: ActivityKey;
  dataUrl: string;
  name: string;
  title?: string;
  location?: string;
  description?: string;
  date: string;
  size: number;
  addedAt: number;
}

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
  category: 'Nettoyage' | 'Embellissement' | 'Entretien' | 'Actions Sociales' | 'Ramadan' | 'Vie Associative' | 'Autres';
  location: string;
  region: string;
  date: string;
  image: string;
  alternateSrc?: string;
  filename?: string;
  description: string;
  isUserPhoto?: boolean;
}

export interface HomepagePhoto {
  id: string;
  title: string;
  category: 'Chantier' | 'Nettoyage' | 'Embellissement' | 'Entretien' | 'Ramadan' | 'Vie Associative';
  location: string;
  region: string;
  date: string;
  image: string;
  alternateSrc?: string;
  filename?: string;
  description: string;
  isUserAdded?: boolean;
  addedAt?: number;
}

export interface MembershipApplication {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  cityRegion: string;
  motivation: string;
  status: 'en_attente' | 'acceptee' | 'refusee';
  submittedAt: number;
  notes?: string;
}

export interface SiteInfoSettings {
  name: string;
  slogan: string;
  subtitle: string;
  presentation: string;
  creationDate: string;
  phone1: string;
  phone2: string;
  email: string;
  headquarters: string;
  scheduleNotice: string;
  cotisationAmount: string;
  zonesIntervention: string;
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

export interface SectionData {
  id: string;
  name: string;
  region: string;
  activeSince: string;
  status: 'active' | 'en_developpement';
  description: string;
  coordinatorContact: string;
  communes: string[];
}

export interface AdhesionFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  cityRegion: string;
  motivation: string;
}

export interface DonationOption {
  id: string;
  amount: number;
  title: string;
  impact: string;
}
