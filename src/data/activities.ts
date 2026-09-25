import { ActivityConfig, ActivityKey } from '../types';

export const ACTIVITIES_CONFIG: Record<ActivityKey, ActivityConfig> = {
  nettoyage: {
    key: 'nettoyage',
    title: 'Nettoyage & Dépoussiérage des Mosquées',
    shortTitle: 'Nettoyage',
    icon: '🧹',
    categoryLabel: 'Nettoyage',
    description: 'Chantiers de dépoussiérage des tapis, lavage à grande eau des esplanades et désinfection minutieuse des salles de prière et d’ablution.'
  },
  embellissement: {
    key: 'embellissement',
    title: 'Embellissement & Espaces Verts',
    shortTitle: 'Embellissement',
    icon: '🌱',
    categoryLabel: 'Embellissement',
    description: 'Plantation d’arbres d’ombrage (neems, flamboyants), aménagement paysager des cours de mosquées et valorisation des abords.'
  },
  entretien: {
    key: 'entretien',
    title: 'Entretien & Équipements',
    shortTitle: 'Entretien',
    icon: '🔧',
    categoryLabel: 'Entretien',
    description: 'Remplacement des bouilloires (satala), réparation de la plomberie, vérification des haut-parleurs et dotation en nattes et matériel d’hygiène.'
  },
  social: {
    key: 'social',
    title: 'Actions Sociales & Solidarité',
    shortTitle: 'Actions Sociales',
    icon: '🤝',
    categoryLabel: 'Actions Sociales',
    description: 'Soutien aux Daaras (écoles coraniques), accompagnement bienveillant des aînés et des gardiens de mosquées bénévoles.'
  },
  ramadan: {
    key: 'ramadan',
    title: 'Ramadan & Distributions de Ndogou',
    shortTitle: 'Ramadan & Ndogou',
    icon: '🌙',
    categoryLabel: 'Ramadan',
    description: 'Préparation et distribution solidaire de paniers de rupture du jeûne (Ndogou) aux carrefours et parvis de mosquées à Dakar, Thiès et en régions.'
  },
  autres: {
    key: 'autres',
    title: 'Autres Activités & Vie Associative',
    shortTitle: 'Autres Activités',
    icon: '📦',
    categoryLabel: 'Autres',
    description: 'Sensibilisation civique, assemblées générales de sections, réunions de quartier et mobilisation de la jeunesse musulmane.'
  }
};

export const ACTIVITIES_LIST = Object.values(ACTIVITIES_CONFIG);

export const MAX_PHOTOS_PER_ACTIVITY = 50;
