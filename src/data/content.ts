import {
  ArticleData,
  CharteItem,
  DonationOption,
  OperationEvent,
  RealisationPhoto,
  SectionData
} from '../types';
import { ASJY_PHOTOS, ASJY_OFFICIAL_PHOTOS } from './assets';

export const OFFICIAL_SOCIALS = {
  youtube: {
    handle: '@associationandeusetaljumma5761',
    url: 'https://www.youtube.com/@associationandeusetaljumma5761',
    label: 'YouTube Officiel'
  },
  instagram: {
    handle: 'andeu_setal_jummah_yi',
    url: 'https://www.instagram.com/andeu_setal_jummah_yi?stkn=ZmcwdDJ2MnFwNWIw',
    label: 'Instagram Officiel'
  },
  tiktok: {
    handle: '@andeusetaljummahyi',
    url: 'https://www.tiktok.com/@andeusetaljummahyi?_r=1&_t=ZS-99hMGYEGcku',
    label: 'TikTok Officiel'
  }
};

export const OFFICIAL_CONTACT = {
  phone: '+221 77 757 87 89 / +221 76 440 14 41',
  phone1: '+221 77 757 87 89',
  phone1Raw: '+221777578789',
  phone2: '+221 76 440 14 41',
  phone2Raw: '+221764401441',
  phoneRaw: '+221777578789',
  whatsapp: '+221 77 757 87 89',
  whatsappRaw: '221777578789',
  whatsapp2: '+221 76 440 14 41',
  whatsapp2Raw: '221764401441',
  whatsappDisplay: '+221 77 757 87 89 / +221 76 440 14 41',
  waveNumber: '+221 77 757 87 89',
  waveNumber2: '+221 76 440 14 41',
  orangeMoneyNumber: '+221 77 757 87 89',
  orangeMoneyNumber2: '+221 76 440 14 41',
  email: 'contact@andeusetaljummahyi.sn',
  headquarters: 'Dakar, Sénégal (Siège National)',
  scheduleNotice: 'Opérations organisées par quinzaine de dimanche (deux dimanches par mois)'
};

export const CHARTES_DATA: CharteItem[] = [
  {
    id: 'C1',
    code: 'C1',
    title: 'Slogan Fondateur & Rejet de l’Ostentation',
    summary: 'Fondée sur « jeff té YALLA rek takh » — Banni à tout membre faisant d’acte ostentatoire (« nguisteul »)',
    fullText: `L'association est fondée sur ce slogan : « jeff té YALLA rek takh ». Il sera banni à tout membre faisant d'acte ostentatoire (« nguisteul ») et toutes autres choses semblables.`,
    rules: [
      "Fondement exclusif : « jeff té YALLA rek takh »",
      "Bannissement strict de tout acte ostentatoire (« nguisteul »)",
      "Sincérité totale sans recherche d'apparence"
    ]
  },
  {
    id: 'C2',
    code: 'C2',
    title: 'Neutralité Politique Absolue',
    summary: 'Rejet total de la politisation — Participation libre sous réserve de respecter nos chartes',
    fullText: `L'association n'est pas aussi basée sur la politique c'est-à-dire la politisation de l'association ou de promouvoir les acteurs politiques. L'association punit tout acte politique. Toute personne voulant nous rejoindre est libre de participer pour que nous puissions mener nos activités à condition de respecter nos chartes.

Rappel : notre slogan « jeff té YALLA rek takh ».`,
    rules: [
      "Interdiction formelle de politiser l'association",
      "Interdiction de promouvoir des acteurs politiques",
      "Adhésion libre sous condition stricte de respecter nos chartes"
    ]
  },
  {
    id: 'C3',
    code: 'C3',
    title: 'Participation des Femmes & Pudeur (« Yiw »)',
    summary: 'Habits pudiques (« yiw »), seuls visage et mains visibles, pas de rassemblement mixte',
    fullText: `Les femmes peuvent rejoindre l'association. Mais il est impératif qu'elles portent des habits pudiques (« yiw »). C'est-à-dire seul le visage et les mains doivent apparaître. De même il est interdit aux femmes et aux hommes de se rassembler sauf en cas de questions ou d'éventuelles recommandations lors du nettoyage.`,
    rules: [
      "Les femmes sont bienvenues au sein de l'association",
      "Port obligatoire d'habits pudiques (« yiw ») : seuls visage et mains visibles",
      "Interdiction de rassemblement mixte sauf questions ou recommandations nécessaires"
    ]
  },
  {
    id: 'C4',
    code: 'C4',
    title: 'Cotisations Mensuelles Obligatoires',
    summary: 'Fixées à 1 000 FCFA obligatoires par membre — Permis de donner plus',
    fullText: `Les cotisations mensuelles fixées à 1000 FCFA sont obligatoires. Donc il est impératif que tout membre le respecte.

NB : C'est permis de donner plus que 1000 FCFA pour les cotisations mensuelles.`,
    rules: [
      "Cotisations mensuelles fixées obligatoirement à 1 000 FCFA",
      "Respect impératif par chaque membre actif",
      "Liberté et permission de contribuer au-delà de 1 000 FCFA"
    ]
  },
  {
    id: 'C5',
    code: 'C5',
    title: 'Règles du Groupe WhatsApp de l’Association',
    summary: 'Interdiction des publications, vidéos, photos, questions ou discussions diverses',
    fullText: `Il est interdit de faire des publications, d'envoyer des photos ou vidéos, de poser des questions, de faire des discussions ou divers dans le groupe WhatsApp de l'association.`,
    rules: [
      "Interdiction formelle de faire des publications",
      "Interdiction d'envoyer des photos ou vidéos",
      "Interdiction de poser des questions ou de mener des discussions diverses"
    ]
  },
  {
    id: 'C6',
    code: 'C6',
    title: 'Discipline & Respect des Recommandations',
    summary: 'S’abstenir de tout ce qui est interdit et respecter les recommandations',
    fullText: `Toute personne membre de l'association doit s'abstenir de tout ce qui est interdit et respecter les recommandations.`,
    rules: [
      "Abstention stricte de tout ce qui est interdit",
      "Respect rigoureux de l'ensemble des recommandations",
      "Exemplarité et loyauté envers l'association"
    ]
  },
  {
    id: 'C7',
    code: 'C7',
    title: 'Ponctualité & Gestion des Absences',
    summary: 'Respect de l’heure fixé primordial — Signaler toute absence bien avant le nettoyage',
    fullText: `Le respect de l'heure fixée pour les nettoyages est primordial. Ainsi, tout membre qui inscrit son nom sur la liste des présents pour le nettoyage et qui prévoit d'être absent doit le signaler bien avant le jour du nettoyage.`,
    rules: [
      "Respect impératif et primordial de l'heure fixée",
      "Inscription formelle sur la liste des présents",
      "Signalement obligatoire de toute absence bien avant le jour du nettoyage"
    ]
  },
  {
    id: 'C8',
    code: 'C8',
    title: 'Organisation des Nettoyages par Quinzaine',
    summary: 'Activités faites par quinzaines de dimanche (deux nettoyages par mois)',
    fullText: `Les activités (nettoyages) seront faites par quinzaines de dimanche c'est-à-dire les dimanches seront alternés de telle sorte à faire deux nettoyages par mois.`,
    rules: [
      "Nettoyages organisés par quinzaines de dimanche",
      "Alternance des dimanches pour équilibrer repos et engagement",
      "Deux nettoyages complets par mois"
    ]
  }
];

export const CHARTES_CONCLUSION = "En définitive nous tenons à dire que nos chartes ont comme objet de faire cette association, une association juste et loyale. Merci de bien vouloir les respecter.";

export const SECTIONS_DATA: SectionData[] = [
  {
    id: 'dakar',
    name: 'Section Dakar (Siège National)',
    region: 'Dakar',
    activeSince: '2022',
    status: 'active',
    description: "Section pionnière et siège de l'association. Coordonne les interventions dans les départements de Dakar, Pikine, Guédiawaye et Rufisque selon le rythme par quinzaine de dimanche.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Dakar-Plateau', 'Médina', 'Grand Yoff', 'Parcelles Assainies', 'Pikine', 'Guédiawaye', 'Rufisque']
  },
  {
    id: 'thies',
    name: 'Section Thiès',
    region: 'Thiès',
    activeSince: '2023',
    status: 'active',
    description: "Section active assurant les chantiers de nettoyage, le dépoussiérage des tapis et la réhabilitation des espaces d'ablution dans la région de Thiès.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Thiès-Nord', 'Thiès-Sud', 'Mbour', 'Tivaouane']
  },
  {
    id: 'diourbel',
    name: 'Section Diourbel / Mbacké',
    region: 'Diourbel',
    activeSince: '2023',
    status: 'active',
    description: "Section active au cœur du bassin religieux du Baol. Nettoyage et entretien régulier des lieux de prière, approvisionnement en matériel d'hygiène et bouilloires neuves.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Diourbel Commune', 'Mbacké', 'Périphérie Touba']
  },
  {
    id: 'fatick',
    name: 'Section Fatick',
    region: 'Fatick',
    activeSince: '2024',
    status: 'active',
    description: "Section active dédiée au soutien et à l'entretien régulier des mosquées avec dotation en matériel de nettoyage durable.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Fatick Commune', 'Diofior', 'Gossas']
  }
];

export const ARTICLES_DATA: ArticleData[] = [];

export const OPERATIONS_DATA: OperationEvent[] = [];

export const REALISATIONS_GALLERY: RealisationPhoto[] = [
  {
    id: 'photo-1',
    title: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.title,
    category: 'Nettoyage',
    location: 'Grande Mosquée',
    region: 'Sénégal',
    date: 'Chantier Officiel',
    image: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.filename,
    description: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.description
  },
  {
    id: 'photo-2',
    title: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.title,
    category: 'Nettoyage',
    location: 'Esplanade & Cour',
    region: 'Mosquée',
    date: 'Dimanche de Chantier',
    image: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.filename,
    description: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.description
  },
  {
    id: 'photo-3',
    title: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.title,
    category: 'Nettoyage',
    location: 'Salle de Prière',
    region: 'Section Thiès & Régions',
    date: 'Opération Quinzaine',
    image: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.filename,
    description: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.description
  },
  {
    id: 'photo-4',
    title: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.title,
    category: 'Vie Associative',
    location: 'Mosquée de Quartier',
    region: 'Section Thiès',
    date: 'Chantier Quinzaine',
    image: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.filename,
    description: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.description
  },
  {
    id: 'photo-5',
    title: ASJY_OFFICIAL_PHOTOS.equipeTerrainSourire.title,
    category: 'Vie Associative',
    location: 'Terrain & Mosquées',
    region: 'National',
    date: 'Engagement Jeunesse',
    image: ASJY_OFFICIAL_PHOTOS.equipeTerrainSourire.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.equipeTerrainSourire.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.equipeTerrainSourire.filename,
    description: ASJY_OFFICIAL_PHOTOS.equipeTerrainSourire.description
  },
  {
    id: 'photo-6',
    title: ASJY_OFFICIAL_PHOTOS.ndogouBassinePreparation.title,
    category: 'Ramadan',
    location: 'Rues & Carrefours',
    region: 'Thiès & Régions',
    date: 'Ramadan Solidaire',
    image: ASJY_OFFICIAL_PHOTOS.ndogouBassinePreparation.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.ndogouBassinePreparation.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.ndogouBassinePreparation.filename,
    description: ASJY_OFFICIAL_PHOTOS.ndogouBassinePreparation.description
  },
  {
    id: 'photo-7',
    title: ASJY_OFFICIAL_PHOTOS.ndogouThermosBenevole.title,
    category: 'Ramadan',
    location: '1re Édition Ndogou',
    region: 'Section Thiès',
    date: 'Ramadan Béni',
    image: ASJY_OFFICIAL_PHOTOS.ndogouThermosBenevole.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.ndogouThermosBenevole.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.ndogouThermosBenevole.filename,
    description: ASJY_OFFICIAL_PHOTOS.ndogouThermosBenevole.description
  },
  {
    id: 'photo-8',
    title: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.title,
    category: 'Ramadan',
    location: 'Axe Routier',
    region: 'Thiès',
    date: 'Rupture du Jeûne',
    image: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.filename,
    description: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.description
  },
  {
    id: 'photo-9',
    title: ASJY_OFFICIAL_PHOTOS.lavageMobilierGantsRouges.title,
    category: 'Nettoyage',
    location: 'Cour & Sanitaires',
    region: 'Chantier Quinzaine',
    date: 'Hygiène & Entretien',
    image: ASJY_OFFICIAL_PHOTOS.lavageMobilierGantsRouges.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.lavageMobilierGantsRouges.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.lavageMobilierGantsRouges.filename,
    description: ASJY_OFFICIAL_PHOTOS.lavageMobilierGantsRouges.description
  },
  {
    id: 'photo-10',
    title: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.title,
    category: 'Ramadan',
    location: 'Point de Distribution',
    region: 'Thiès & National',
    date: 'Mois Sacré',
    image: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.filename,
    description: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.description
  },
  {
    id: 'photo-11',
    title: ASJY_OFFICIAL_PHOTOS.roulageTapisThies.title,
    category: 'Nettoyage',
    location: 'Cour Ensoleillée',
    region: 'Section Thiès',
    date: 'Grand Dépoussiérage',
    image: ASJY_OFFICIAL_PHOTOS.roulageTapisThies.src,
    alternateSrc: ASJY_OFFICIAL_PHOTOS.roulageTapisThies.alternateSrc,
    filename: ASJY_OFFICIAL_PHOTOS.roulageTapisThies.filename,
    description: ASJY_OFFICIAL_PHOTOS.roulageTapisThies.description
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: '2021',
    badge: 'La Genèse',
    title: 'Naissance de l’Idée',
    description: "Trois jeunes effectuaient régulièrement des opérations spontanées de nettoyage dans la mosquée de leur quartier. En constatant que cette tâche noble reposait trop souvent sur de vénérables personnes âgées et qu'aucune structure n'encadrait la jeunesse, ils mûrissent l'idée d'un mouvement dédié et organisé.",
    quote: '« Pourquoi la jeunesse ne prendrait-elle pas le relais pour honorer la maison d’Allah ? »'
  },
  {
    year: '2022',
    badge: 'Fondation',
    title: 'Création Officielle & Premiers Chantiers',
    description: "Tenue de la première Assemblée Générale constitutive. Mise en place du premier bureau, adoption des 8 chartes fondatrices et lancement des premiers chantiers officiels de nettoyage par quinzaine de dimanche.",
    quote: 'Adoption officielle du slogan : « Jeff té YALLA rek takh ».'
  },
  {
    year: '2023',
    badge: 'Croissance',
    title: 'Développement à Dakar & Ramadan Ndogou',
    description: "L'association élargit ses interventions dans les quatre départements de Dakar (Dakar, Pikine, Guédiawaye, Rufisque). Naissance de l'opération solidaire de distribution de Ndogou pendant le mois béni de Ramadan pour soutenir les jeûneurs et fidèles.",
    quote: 'Structuration des binômes, acquisition de matériel de lavage semi-professionnel.'
  },
  {
    year: '2024',
    badge: 'Expansion Régionale',
    title: 'Ouverture des Sections Régionales & Volet Social',
    description: "L'élan se propage au-delà de Dakar : structuration des sections actives à Thiès, Diourbel et Fatick. Parallèlement, l'association intègre les actions sociales (soutien daaras, embellissement arboré, réparation d'équipements).",
    quote: 'Une dynamique régionale unie autour de la propreté et de la fraternité.'
  },
  {
    year: 'Aujourd’hui',
    badge: 'Rayonnement',
    title: 'Un Réseau de Sections Actives au Sénégal',
    description: "Présente à travers ses sections actives avec des chantiers réguliers par quinzaine de dimanche, l'Association Andeu Setal Jummah Yi poursuit sa mission, fidèle à sa devise et animée par une jeunesse engagée.",
    quote: 'Objectif : des mosquées propres, belles et accueillantes partout au Sénégal.'
  }
];

export const DONATION_OPTIONS: DonationOption[] = [
  {
    id: 'don-500',
    amount: 500,
    title: 'Suggestion 500 FCFA',
    impact: "Participe à l'achat des éponges, savons et sacs poubelles pour les nettoyages."
  },
  {
    id: 'don-1000',
    amount: 1000,
    title: 'Suggestion 1 000 FCFA',
    impact: "Finance les produits détergents et désinfectants de base pour un chantier."
  },
  {
    id: 'don-2500',
    amount: 2500,
    title: 'Suggestion 2 500 FCFA',
    impact: "Finance l'achat de bouilloires neuves et de raclettes professionnelles."
  },
  {
    id: 'don-5000',
    amount: 5000,
    title: 'Suggestion 5 000 FCFA',
    impact: "Finance les produits de désinfection complète pour un chantier de mosquée."
  },
  {
    id: 'don-10000',
    amount: 10000,
    title: 'Suggestion 10 000 FCFA',
    impact: "Prend en charge un pack complet d'hygiène et fournitures pour une mosquée."
  }
];
