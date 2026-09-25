import { SiteInfoSettings } from '../types';

const SITE_SETTINGS_KEY = 'asjy_official_site_settings_v1';

export const DEFAULT_SITE_SETTINGS: SiteInfoSettings = {
  name: 'Association Andeu Setal Jummah Yi',
  slogan: 'Jeff té YALLA rek takh',
  subtitle: 'Ensemble pour des mosquées propres, belles et accueillantes.',
  presentation:
    "Organisation sénégalaise à but non lucratif fondée en 2022 par des jeunes musulmans dévoués, mobilisés pour l'entretien régulier, le nettoyage en profondeur, l'embellissement paysager, la réhabilitation des équipements sanitaires et l'action sociale au profit des mosquées du Sénégal.",
  creationDate: '2022',
  phone1: '+221 77 757 87 89',
  phone2: '+221 76 440 14 41',
  email: 'contact@andeusetaljummahyi.sn',
  headquarters: 'Dakar, Sénégal (Siège National)',
  scheduleNotice: 'Opérations organisées par quinzaine de dimanche (deux dimanches par mois)',
  cotisationAmount: '1 000 FCFA par mois',
  zonesIntervention: 'Dakar, Thiès, Diourbel, Mbacké, Touba, Fatick et régions'
};

export function loadSiteSettings(): SiteInfoSettings {
  if (typeof window === 'undefined') return DEFAULT_SITE_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SITE_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SITE_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.warn('Erreur lecture configuration site:', err);
  }
  return DEFAULT_SITE_SETTINGS;
}

export function saveSiteSettings(settings: SiteInfoSettings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Erreur sauvegarde configuration site:', err);
  }
}
