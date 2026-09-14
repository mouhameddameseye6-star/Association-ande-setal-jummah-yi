import {
  ArticleData,
  CharteItem,
  DonationOption,
  OperationEvent,
  RealisationPhoto,
  SanctionItem,
  SectionData
} from '../types';
import { ASJY_PHOTOS } from './assets';

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
    title: 'Objet de l’Association & Slogan Fondateur',
    summary: 'Servir la maison d’Allah sans contrepartie : « Jeff té YALLA rek takh »',
    fullText: `L'Association Andeu Setal Jummah Yi a pour objet exclusif l'entretien régulier, le nettoyage approfondi, l'embellissement paysager, la réhabilitation des équipements sanitaires et l'action sociale au profit des mosquées du Sénégal.

Chaque membre doit impérativement agir avec sincérité d'intention (Niyyah). Notre devise officielle et immuable est : « Jeff té YALLA rek takh » (Agir uniquement pour l'amour d'Allah). Aucune recherche de gloire personnelle, d'avantage matériel ou de visibilité individuelle n'est acceptée.`,
    rules: [
      "Pureté d'intention absolue (Ikhlas)",
      "Action entièrement bénévole et désintéressée",
      "Priorité au bien-être des fidèles et à la sacralité des mosquées"
    ]
  },
  {
    id: 'C2',
    code: 'C2',
    title: 'Neutralité Politique Absolue',
    summary: 'Interdiction stricte de toute politique partisane au sein de l’ASJY',
    fullText: `L'association Andeu Setal Jummah Yi n'est pas basée sur la politique. Elle préserve une indépendance totale et intransigeante à l'égard de tout parti, coalition ou personnalité politique.

La politisation de l'association ou la promotion d'acteurs politiques est formellement interdite au sein des groupes et lors des activités. Aucun tee-shirt partisan, fanion, discours électoral ou tract ne peut être introduit lors des chantiers ou sur nos canaux de communication. L'association appartient à toute la communauté des croyants.`,
    rules: [
      "Aucune promotion politique autorisée",
      "Stricte neutralité sur les canaux de communication officiels",
      "Ouverture à tout musulman de bonne volonté acceptant la charte"
    ]
  },
  {
    id: 'C3',
    code: 'C3',
    title: 'Tenue Décente et Respect Mutuel',
    summary: 'Respect des préceptes islamiques, pudeur, courtoisie et séparation respectueuse',
    fullText: `Les membres des deux sexes peuvent participer aux chantiers dans le respect scrupuleux des normes de pudeur et de décence islamiques.

Les hommes et les femmes sont tenus de porter des tenues couvrantes, sobres et respectueuses de la sainteté de la mosquée. Le langage doit demeurer en tout temps courtois, fraternel et empreint de modestie. Les espaces réservés aux femmes (mezzanines, cours intérieures) sont prioritairement entretenus par les sœurs bénévoles.`,
    rules: [
      "Tenue vestimentaire couvrante et décente",
      "Courtoisie et fraternité dans les échanges",
      "Respect des sensibilités des imams et comités de mosquée"
    ]
  },
  {
    id: 'C4',
    code: 'C4',
    title: 'Cotisation Mensuelle Obligatoire',
    summary: '1 000 FCFA par mois pour financer le matériel et assurer l’autonomie',
    fullText: `Conformément aux statuts constitutifs, chaque membre actif adhérant s'engage à s'acquitter d'une cotisation mensuelle modique et obligatoire fixée à 1 000 FCFA.

Cette cotisation garantit l'indépendance financière de l'association. Elle sert exclusivement à l'achat régulier des produits d'entretien (détergents désinfectants, javel, savon liquide), du matériel de lavage (balais, raclettes professionnelles, serpillières), et au renouvellement des bouilloires (satala) et de la robinetterie défectueuse.`,
    rules: [
      "Montant fixé à 1 000 FCFA par mois et par membre",
      "Paiement avant le 10 de chaque mois via trésorerie ou Mobile Money",
      "Transparence financière intégrale et reddition régulière des comptes"
    ]
  },
  {
    id: 'C5',
    code: 'C5',
    title: 'Discipline et Procédure de Sanctions',
    summary: 'Rappels fraternels, avertissements, suspensions et exclusions en cas de faute',
    fullText: `Pour préserver l'harmonie, la discipline et la réputation de l'ASJY, tout manquement grave aux chartes fait l'objet d'une procédure collégiale :
1. Rappel à l'ordre et entretien fraternel en cas de manquement mineur ou de retard non motivé.
2. Avertissement écrit du bureau pour absences consécutives non justifiées ou non-paiement répété sans motif valable.
3. Suspension temporaire ou exclusion définitive pour tentative de politisation, indiscipline caractérisée, comportement indécent dans un lieu saint ou atteinte à la dignité de l'association.`,
    rules: [
      "Gradation équitable et respectueuse",
      "Protection de la cohésion du groupe",
      "Décision finale collégiale du bureau exécutif"
    ]
  },
  {
    id: 'C6',
    code: 'C6',
    title: 'Rôle et Engagement des Membres',
    summary: 'Esprit d’équipe, solidarité, entraide et implication sur le terrain',
    fullText: `Être membre de l'ASJY n'est pas un titre honorifique, c'est un dévouement concret. Chaque membre doit faire preuve d'esprit d'équipe, de solidarité envers ses camarades et de disponibilité lors des nettoyages.

L'entraide mutuelle, la bonne humeur, le respect des consignes édictées par les coordinateurs de chantiers et la valorisation du travail collectif priment sur toute considération individuelle.`,
    rules: [
      "Travail d'équipe solidaire et bienveillant",
      "Écoute des consignes des coordinateurs désignés",
      "Partage d'expérience entre les anciens et les nouveaux"
    ]
  },
  {
    id: 'C7',
    code: 'C7',
    title: 'Gestion et Soin du Matériel',
    summary: 'Responsabilité collective, inventaire et propreté des outils de travail',
    fullText: `Le matériel acquis grâce aux cotisations des membres et aux dons des bienfaiteurs constitue un dépôt sacré (Amana).

À la fin de chaque chantier de quinzaine, tous les outils (balais, brosses, raclettes, tuyaux d'arrosage, aspirateurs) doivent être soigneusement lavés, séchés, comptabilisés et rangés dans les caisses de la section sous la responsabilité du chargé du matériel. Tout matériel perdu ou détérioré par négligence doit être signalé immédiatement.`,
    rules: [
      "Nettoyage et désinfection des outils après chaque opération",
      "Inventaire rigoureux avant et après chaque dimanche",
      "Stockage sécurisé auprès des référents locaux"
    ]
  },
  {
    id: 'C8',
    code: 'C8',
    title: 'Organisation des Nettoyages',
    summary: 'Chantiers réguliers organisés par quinzaine de dimanche (2 fois par mois)',
    fullText: `Les opérations de nettoyage sur le terrain sont structurées selon un rythme précis : par quinzaine de dimanche (deux dimanches par mois).

Ce rythme permet d'assurer une régularité irréprochable dans les mosquées tout en préservant le repos dominical, les obligations professionnelles, étudiantes et familiales des bénévoles. Chaque intervention commence généralement à 08h30 pour se conclure avant l'appel à la prière de Dhuhr.`,
    rules: [
      "Rythme bimensuel fixe (quinzaine de dimanche)",
      "Horaires standards : 08h30 à 12h30",
      "Préparation logistique et état des lieux préliminaire"
    ]
  }
];

export const SANCTIONS_DATA: SanctionItem[] = [
  {
    level: 'Niveau 1 — Rappel à l’ordre fraternel',
    description: 'En cas de retard non motivé, manquement mineur ou propos inapproprié sur les canaux de discussion.',
    impact: 'Entretien privé avec le coordonnateur de section et rappel de l’esprit désintéressé « Jeff té YALLA rek takh ».'
  },
  {
    level: 'Niveau 2 — Avertissement officiel',
    description: 'En cas d’absences répétées non justifiées à 2 chantiers consécutifs ou retard de cotisation sans justification valable.',
    impact: 'Notification écrite du bureau et obligation de régularisation sous 15 jours.'
  },
  {
    level: 'Niveau 3 — Suspension ou Exclusion définitive',
    description: 'En cas de tentative de politisation, tenue indécente dans une mosquée, insubordination grave ou récidive après avertissement.',
    impact: 'Perte immédiate de la qualité de membre et exclusion définitive de l’association.'
  }
];

export const SECTIONS_DATA: SectionData[] = [
  {
    id: 'dakar',
    name: 'Section Dakar (Siège National)',
    activeSince: '2022',
    mosquesCleaned: 64,
    membersCount: 180,
    description: "Section historique et pionnière. Coordonne les 4 départements de Dakar, Pikine, Guédiawaye et Rufisque avec une mobilisation exemplaire par quinzaine de dimanche.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Dakar-Plateau', 'Médina', 'Grand Yoff', 'Parcelles Assainies', 'Pikine', 'Guédiawaye', 'Rufisque']
  },
  {
    id: 'thies',
    name: 'Section Thiès',
    activeSince: '2023',
    mosquesCleaned: 28,
    membersCount: 75,
    description: "Très active sur la commune de Thiès, Mbour et Tivaouane. Forte mobilisation des étudiants et jeunes travailleurs pour l'entretien et la réparation des robinets d'ablution.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Thiès-Nord', 'Thiès-Sud', 'Mbour', 'Tivaouane']
  },
  {
    id: 'diourbel',
    name: 'Section Diourbel / Mbacké',
    activeSince: '2023',
    mosquesCleaned: 35,
    membersCount: 90,
    description: "Au cœur du bassin religieux du Baol. Nettoyage intensif des nattes, lavage des cours et approvisionnement continu en bouilloires neuves à Diourbel, Mbacké et Touba.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Diourbel Commune', 'Mbacké', 'Périphérie Touba']
  },
  {
    id: 'fatick',
    name: 'Section Fatick',
    activeSince: '2024',
    mosquesCleaned: 12,
    membersCount: 38,
    description: "Équipe dévouée soutenant les lieux de prière ruraux et urbains avec dotation en matériel de nettoyage durable.",
    coordinatorContact: '+221 77 757 87 89 / +221 76 440 14 41',
    communes: ['Fatick Commune', 'Diofior', 'Gossas']
  }
];

export const ARTICLES_DATA: ArticleData[] = [
  {
    id: 'art-1',
    title: 'Bilan du Grand Chantier : Dépoussiérage et Lavage des Tapis de Prière',
    date: '8 Septembre 2026',
    category: 'Chantier',
    region: 'Thiès & Dakar',
    summary: "Les jeunes bénévoles équipés de leurs gilets fluorescents officiels ont évacué et lavé à grande eau les grands tapis et moquettes de prière au soleil.",
    content: `Dans le respect strict du rythme bimensuel de l'association, les sections se sont mobilisées dès 8 heures du matin. Équipés des gilets officiels fluorescents ASJY, les volontaires ont procédé au roulage, transport et dépoussiérage des imposants tapis de prière dans la cour extérieure.

Les équipes ont ensuite procédé au lessivage méticuleux des carreaux et des surfaces intérieures, au savon désinfectant et aux raclettes, pour offrir aux fidèles un cadre parfaitement purifié pour les prières quotidiennes et le Jummah.

L'imam et le comité de gestion de la mosquée ont salué cet engagement dévoué et sincère, fidèle au mot d'ordre « Jeff té YALLA rek takh ».`,
    image: ASJY_PHOTOS.nettoyageTapis
  },
  {
    id: 'art-2',
    title: 'Opération Ndogou Solidaire : Café Touba Chaud et Kits aux Carrefours',
    date: '15 Mars 2026',
    category: 'Solidarité Ramadan',
    region: 'Thiès, Dakar & Régions',
    summary: "À l'heure de la rupture du jeûne, nos bénévoles ont servi du café Touba chaud au thermos et distribué des kits complets aux automobilistes et passants.",
    content: `À l'occasion du mois sacré de Ramadan, l'Association Andeu Setal Jummah Yi a déployé ses équipes de bénévoles aux abords des grands axes routiers et des mosquées.

Munis de thermos de café Touba bien chaud, de gobelets et de sachets garnis de pain frais et de dattes, nos jeunes ont accueilli chaleureusement les chauffeurs bloqués dans la circulation et les passants pour leur permettre de rompre le jeûne dans la dignité et la fraternité.

Cette action bénévole et solidaire est financée grâce aux cotisations des membres et à la générosité des donateurs.`,
    image: ASJY_PHOTOS.ndogouRue
  },
  {
    id: 'art-3',
    title: 'Mobilisation des Équipes Féminines : Hygiène, Entretien et Logistique',
    date: '22 Août 2026',
    category: 'Vie Associative',
    region: 'Thiès & National',
    summary: "Les sœurs bénévoles de l'ASJY, en première ligne avec bassines, désinfectants et gilets officiels, assurent le nettoyage approfondi des espaces de prière et sanitaires.",
    content: `La composante féminine de l'Association Andeu Setal Jummah Yi joue un rôle moteur lors de chaque chantier du dimanche.

Munies de leurs gilets fluorescents, de gants de protection et de matériel adapté (bassines, éponges, brosses), elles prennent en charge le lessivage soigné des estrades, des bancs d'ablution, des portes et des espaces réservés aux femmes.

Leur dévouement sans faille illustre la vitalité de la jeunesse musulmane unie pour la propreté de la maison d'Allah.`,
    image: ASJY_PHOTOS.volontairesEntree
  }
];

export const OPERATIONS_DATA: OperationEvent[] = [
  {
    id: 'op-1',
    mosqueName: 'Mosquée Al-Rahma',
    region: 'Dakar',
    location: 'Pikine Tally Boumack',
    date: 'Dimanche 20 Septembre 2026',
    time: '08h30 - 12h30',
    volunteersRegistered: 42,
    description: "Nettoyage intégral à grande eau, dépoussiérage des tapis, révision de la plomberie d'ablution et remplacement des satalas usagées.",
    status: 'upcoming'
  },
  {
    id: 'op-2',
    mosqueName: 'Mosquée Thierno Mountaga',
    region: 'Thiès',
    location: 'Thiès Grand Stand',
    date: 'Dimanche 4 Octobre 2026',
    time: '08h30 - 12h30',
    volunteersRegistered: 28,
    description: "Opération rénovation des blocs sanitaires, pose de projecteurs LED et lavage des carrelages de la nef principale.",
    status: 'upcoming'
  },
  {
    id: 'op-3',
    mosqueName: 'Mosquée de Mbacké Khewar',
    region: 'Diourbel',
    location: 'Mbacké',
    date: 'Dimanche 18 Octobre 2026',
    time: '08h00 - 13h00',
    volunteersRegistered: 35,
    description: "Lavage des dalles extérieures, aspiration des moquettes intérieures et désinfection des bacs d'ablution.",
    status: 'upcoming'
  },
  {
    id: 'op-4',
    mosqueName: 'Grande Mosquée de Diourbel (Annexe)',
    region: 'Diourbel',
    location: 'Diourbel Centre',
    date: 'Dimanche 23 Août 2026',
    time: '08h30 - 12h30',
    volunteersRegistered: 48,
    description: "Grand chantier de désensablement et réfection complète de l'espace ablution. Clôturé avec les remerciements de l'Imam.",
    status: 'completed'
  },
  {
    id: 'op-5',
    mosqueName: 'Mosquée Médina Rue 15',
    region: 'Dakar',
    location: 'Dakar Médina',
    date: 'Dimanche 9 Août 2026',
    time: '08h30 - 12h00',
    volunteersRegistered: 52,
    description: "Lavage à haute pression de la cour et dotation de 30 bouilloires en plastique neuves.",
    status: 'completed'
  }
];

export const REALISATIONS_GALLERY: RealisationPhoto[] = [
  {
    id: 'photo-1',
    title: 'Roulage et aération des tapis de prière en extérieur',
    category: 'Nettoyage',
    location: 'Mosquée de Quartier',
    region: 'Thiès',
    date: 'Dimanche de Chantier',
    image: ASJY_PHOTOS.nettoyageTapis,
    description: "Évacuation en plein soleil, dépoussiérage et lavage approfondi des grands tapis de prière par les volontaires en gilets officiels."
  },
  {
    id: 'photo-2',
    title: 'Lessivage soigné et récurage au savon des bancs d’ablution',
    category: 'Nettoyage',
    location: 'Espace Sanitaire & Ablutions',
    region: 'Thiès',
    date: 'Dimanche de Chantier',
    image: ASJY_PHOTOS.lavageBanc,
    description: "Récurage méticuleux avec gants étanches, brosses et eau savonneuse pour désinfecter les estrades et bancs en bois de la mosquée."
  },
  {
    id: 'photo-3',
    title: 'Acheminement du matériel et des bassines par les bénévoles',
    category: 'Vie Associative',
    location: 'Entrée Principale Mosquée',
    region: 'Thiès',
    date: 'Chantier Quinzaine',
    image: ASJY_PHOTOS.volontairesEntree,
    description: "Arrivée matinale des équipes féminines équipées des gilets fluorescents ASJY avec bassines d'eau, savons et raclettes professionnelles."
  },
  {
    id: 'photo-4',
    title: 'Distribution de café Touba chaud aux automobilistes (Ndogou)',
    category: 'Ramadan',
    location: 'Carrefour Urbain',
    region: 'Thiès & Régions',
    date: 'Ramadan 2026',
    image: ASJY_PHOTOS.ndogouRue,
    description: "Service direct de boissons chaudes au thermos et de kits de rupture du jeûne pour les chauffeurs et usagers bloqués aux carrefours."
  },
  {
    id: 'photo-5',
    title: 'Kits alimentaires et sachets de dons pour les jeûneurs',
    category: 'Ramadan',
    location: 'Point de Ralliement Opérationnel',
    region: 'National',
    date: 'Ramadan 2026',
    image: ASJY_PHOTOS.distributionSacs,
    description: "Conditionnement et distribution de sacs garnis de pain frais, dattes et vivres distribués chaleureusement par les volontaires masqués et gantés."
  },
  {
    id: 'photo-6',
    title: 'Cadre de culte purifié et prêt pour la prière du Jummah',
    category: 'Embellissement',
    location: 'Grande Mosquée',
    region: 'Sénégal',
    date: 'Après Intervention',
    image: ASJY_PHOTOS.heroMosque,
    description: "Résultat final d'un chantier bimensuel réussi : sol éclatant, propreté irréprochable et atmosphère sainte prête à accueillir les fidèles."
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
    id: 'don-1',
    amount: 1000,
    title: 'Cotisation Mensuelle Membre',
    impact: "Participe à l'achat des détergents, sacs poubelles et eau de Javel pour les chantiers bimensuels."
  },
  {
    id: 'don-2',
    amount: 5000,
    title: 'Dotation Bouilloires (Satala)',
    impact: "Finance 10 bouilloires en plastique neuves et résistantes pour l'espace d'ablution d'une mosquée."
  },
  {
    id: 'don-3',
    amount: 10000,
    title: 'Pack Grand Nettoyage',
    impact: "Finance l'intégralité des produits de désinfection et les raclettes professionnelles pour une mosquée."
  },
  {
    id: 'don-4',
    amount: 25000,
    title: 'Rénovation Équipements & Éclairage',
    impact: "Finance de nouvelles nattes lavables et des tubes LED économiques pour éclairer la prière de l'Aube (Fajr)."
  },
  {
    id: 'don-5',
    amount: 50000,
    title: 'Parrainage d’un Chantier Complet',
    impact: "Prend en charge tous les coûts matériels et le rafraîchissement des 30 bénévoles pour une grande mosquée."
  }
];
