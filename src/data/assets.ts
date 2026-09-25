// Registre des photographies officielles et authentiques fournies par l'Association ASJY
// STRICTEMENT AUCUNE IMAGE IA OU GÉNÉRIQUE N'EST CONSERVÉE OU GÉNÉRÉE.

export interface AsjyPhotoItem {
  id: string;
  src: string;
  alternateSrc?: string;
  filename: string;
  title: string;
  description: string;
  category: 'Chantier' | 'Nettoyage' | 'Ramadan' | 'Vie Associative' | 'Embellissement';
  region: string;
  date: string;
}

export const ASJY_OFFICIAL_PHOTOS: Record<string, AsjyPhotoItem> = {
  grandChantierTapisRouge: {
    id: 'photo-asjy-1',
    src: '/photos/IMG_20260915_103349.jpg',
    alternateSrc: '/photos/grand_chantier_tapis_rouge.jpg',
    filename: 'IMG_20260915_103349.jpg',
    title: 'Grand Chantier : Balayage et dépoussiérage du grand tapis rouge',
    description: 'Volontaires en gilets fluorescents officiels ASJY mobilisés sous le grand lustre pour le dépoussiérage méticuleux des rangées de prière.',
    category: 'Chantier',
    region: 'Grande Mosquée',
    date: 'Chantier Bimensuel'
  },
  lavageEsplanadeCour: {
    id: 'photo-asjy-2',
    src: '/photos/IMG_20260915_103341.jpg',
    alternateSrc: '/photos/nettoyage_esplanade_mosquee.jpg',
    filename: 'IMG_20260915_103341.jpg',
    title: 'Lavage et raclage de l’esplanade et cour extérieure',
    description: 'Bénévoles féminines et masculins équipés de raclettes et balais-brosses pour le nettoyage à grande eau du dallage sous les arcades.',
    category: 'Nettoyage',
    region: 'Esplanade Mosquée',
    date: 'Dimanche de Propreté'
  },
  depoussierageTapisVert: {
    id: 'photo-asjy-3',
    src: '/photos/IMG_20260915_103330.jpg',
    alternateSrc: '/photos/depoussierage_tapis_vert.jpg',
    filename: 'IMG_20260915_103330.jpg',
    title: 'Alignement des volontaires sur le grand tapis vert de prière',
    description: 'Balayage coordonné et dépoussiérage en profondeur de la moquette verte pour offrir un espace sain aux fidèles.',
    category: 'Chantier',
    region: 'Salle de Prière',
    date: 'Chantier ASJY'
  },
  sectionThiesGiletsBassine: {
    id: 'photo-asjy-4',
    src: '/photos/IMG_20260913_165551.jpg',
    alternateSrc: '/photos/section_thies_femmes_gilets.jpg',
    filename: 'IMG_20260913_165551.jpg',
    title: 'Bénévoles de la Section Thiès en gilets officiels',
    description: 'Mobilisation des sœurs d’ASJY Section Thiès portant les gilets officiels numérotés (77 757 87 89 / 76 440 14 41) avec bassines de nettoyage.',
    category: 'Vie Associative',
    region: 'Thiès',
    date: 'Activité de Terrain'
  },
  equipeTerrainSourire: {
    id: 'photo-asjy-5',
    src: '/photos/IMG_20260913_165055.jpg',
    alternateSrc: '/photos/benevoles_terrain_masques.jpg',
    filename: 'IMG_20260913_165055.jpg',
    title: 'Équipe de terrain engagée : protection et fraternité',
    description: 'Jeunes volontaires équipées de masques, gilets de sécurité et gants de protection lors des opérations sanitaires.',
    category: 'Vie Associative',
    region: 'Thiès & National',
    date: 'Mobilisation Jeunesse'
  },
  ndogouBassinePreparation: {
    id: 'photo-asjy-6',
    src: '/photos/IMG_20260913_165006.jpg',
    alternateSrc: '/photos/ndogou_preparation_bassine.jpg',
    filename: 'IMG_20260913_165006.jpg',
    title: 'Opération Ramadan : Préparation et acheminement du Ndogou',
    description: 'Deux bénévoles féminines acheminant la grande bassine bleue remplie de kits de rupture du jeûne pour les passants et jeûneurs.',
    category: 'Ramadan',
    region: 'Thiès & Carrefours',
    date: 'Mois Sacré de Ramadan'
  },
  ndogouThermosBenevole: {
    id: 'photo-asjy-7',
    src: '/photos/Screenshot_2026-09-13-16-49-22-828_com.instagram.android.jpg',
    alternateSrc: '/photos/ndogou_thermos_thies.jpg',
    filename: 'Screenshot_2026-09-13-16-49-22-828_com.instagram.android.jpg',
    title: '1re Édition Distribution de Ndogous - Section Thiès',
    description: 'Volontaire au thermos servant du café chaud et boissons revigorantes à l’heure précise de la rupture du jeûne.',
    category: 'Ramadan',
    region: 'Thiès',
    date: 'Ramadan Solidaire'
  },
  ndogouServiceAutomobiliste: {
    id: 'photo-asjy-8',
    src: '/photos/IMG_20260913_165017.jpg',
    alternateSrc: '/photos/ndogou_service_auto.jpg',
    filename: 'IMG_20260913_165017.jpg',
    title: 'Service direct aux automobilistes bloqués dans la circulation',
    description: 'Bénévole de dos en gilet Section Thiès servant du café chaud au volant avant le crépuscule.',
    category: 'Ramadan',
    region: 'Thiès & Grands Axes',
    date: 'Rupture du Jeûne'
  },
  lavageMobilierGantsRouges: {
    id: 'photo-asjy-9',
    src: '/photos/IMG_20260913_165121.jpg',
    alternateSrc: '/photos/lavage_mobilier_gants_rouges.jpg',
    filename: 'IMG_20260913_165121.jpg',
    title: 'Lessivage soigné et récurage du mobilier à l’eau savonneuse',
    description: 'Bénévole en gants étanches nettoyant méticuleusement les bancs et tables servant aux fidèles de la mosquée.',
    category: 'Nettoyage',
    region: 'Espace Ablutions & Cour',
    date: 'Chantier Quinzaine'
  },
  ndogouSacsRosesBus: {
    id: 'photo-asjy-10',
    src: '/photos/IMG_20260913_165106.jpg',
    alternateSrc: '/photos/ndogou_sacs_roses_bus.jpg',
    filename: 'IMG_20260913_165106.jpg',
    title: 'Rassemblement des équipes féminines avec les packs de Ndogou',
    description: 'Les bénévoles mobilisées autour des sachets de dons alimentaires préparés pour les jeûneurs et transporteurs.',
    category: 'Ramadan',
    region: 'Point de Ralliement',
    date: 'Ramadan 2026'
  },
  roulageTapisThies: {
    id: 'photo-asjy-11',
    src: '/photos/Screenshot_2026-09-13-16-47-07-363_com.instagram.android.jpg',
    alternateSrc: '/photos/roulage_tapis_thies.jpg',
    filename: 'Screenshot_2026-09-13-16-47-07-363_com.instagram.android.jpg',
    title: 'Évacuation, battage et roulage des tapis - Section Thiès',
    description: 'Deux jeunes volontaires de l’ASJY en plein effort pour rouler et sortir les tapis au soleil avant récurage du sol.',
    category: 'Chantier',
    region: 'Thiès',
    date: 'Activité de Chantier'
  }
};

// Aliases pour la compatibilité
export const ASJY_PHOTOS = {
  heroMosque: ASJY_OFFICIAL_PHOTOS.grandChantierTapisRouge.src,
  nettoyageTapis: ASJY_OFFICIAL_PHOTOS.depoussierageTapisVert.src,
  lavageBanc: ASJY_OFFICIAL_PHOTOS.lavageEsplanadeCour.src,
  ndogouRue: ASJY_OFFICIAL_PHOTOS.ndogouServiceAutomobiliste.src,
  volontairesEntree: ASJY_OFFICIAL_PHOTOS.sectionThiesGiletsBassine.src,
  distributionSacs: ASJY_OFFICIAL_PHOTOS.ndogouSacsRosesBus.src
};
