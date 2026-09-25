import { ActivityKey, UserPhoto, HomepagePhoto } from '../types';
import { MAX_PHOTOS_PER_ACTIVITY } from '../data/activities';
import { ASJY_OFFICIAL_PHOTOS } from '../data/assets';

const DB_NAME = 'asjy_photos_v2';
const STORE_NAME = 'activity_photos';
const HOMEPAGE_STORE = 'homepage_photos';
const DB_VERSION = 3;

export type StorageType = 'indexedDB' | 'localStorage' | 'memory';

// Default 11 official photos present on the homepage
export const DEFAULT_HOMEPAGE_PHOTOS: HomepagePhoto[] = Object.values(ASJY_OFFICIAL_PHOTOS).map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  location: item.region || 'Grande Mosquée',
  region: 'Sénégal',
  date: item.date || 'Chantier Officiel',
  image: item.src,
  alternateSrc: item.alternateSrc,
  filename: item.filename,
  description: item.description,
  isUserAdded: false
}));

let memoryStore: Record<ActivityKey, UserPhoto[]> = {
  nettoyage: [],
  embellissement: [],
  entretien: [],
  social: [],
  ramadan: [],
  autres: []
};

let memoryHomepagePhotos: HomepagePhoto[] = [...DEFAULT_HOMEPAGE_PHOTOS];

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB non supporté'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'activityKey' });
      }
      if (!db.objectStoreNames.contains(HOMEPAGE_STORE)) {
        db.createObjectStore(HOMEPAGE_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Erreur ouverture IndexedDB'));
  });
}

// Detect best storage mechanism
export async function detectStorageSupport(): Promise<StorageType> {
  try {
    if (typeof window !== 'undefined' && window.indexedDB) {
      const db = await openDB();
      db.close();
      return 'indexedDB';
    }
  } catch (e) {
    console.warn('IndexedDB indisponible, test localStorage...', e);
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__asjy_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return 'localStorage';
    }
  } catch (e) {
    console.warn('localStorage indisponible, mode mémoire...', e);
  }

  return 'memory';
}

// -------------------------------------------------------------
// HOMEPAGE PHOTOS PERSISTENT STORAGE
// -------------------------------------------------------------

export async function loadHomepagePhotos(): Promise<HomepagePhoto[]> {
  // 1. Try IndexedDB
  try {
    const db = await openDB();
    const rows = await new Promise<HomepagePhoto[]>((resolve, reject) => {
      const tx = db.transaction(HOMEPAGE_STORE, 'readonly');
      const store = tx.objectStore(HOMEPAGE_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });

    if (rows && rows.length > 0) {
      memoryHomepagePhotos = rows;
      return rows;
    }
  } catch (err) {
    console.warn('Lecture IndexedDB photos accueil échouée, essai localStorage...', err);
  }

  // 2. Try localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('asjy_homepage_photos_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryHomepagePhotos = parsed;
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('Lecture localStorage photos accueil échouée:', e);
  }

  // 3. Fallback to default 11 official photos & seed storage
  memoryHomepagePhotos = [...DEFAULT_HOMEPAGE_PHOTOS];
  try {
    await saveHomepagePhotos(DEFAULT_HOMEPAGE_PHOTOS);
  } catch (_) {
    // Ignore seeding error
  }
  return DEFAULT_HOMEPAGE_PHOTOS;
}

export async function saveHomepagePhotos(photos: HomepagePhoto[]): Promise<void> {
  memoryHomepagePhotos = [...photos];

  // Save to LocalStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('asjy_homepage_photos_list', JSON.stringify(photos));
    }
  } catch (localErr) {
    console.warn('Sauvegarde localStorage photos accueil échouée:', localErr);
  }

  // Save to IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(HOMEPAGE_STORE, 'readwrite');
      const store = tx.objectStore(HOMEPAGE_STORE);
      store.clear();
      photos.forEach((p) => store.put(p));
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (idbErr) {
    console.warn('Sauvegarde IndexedDB photos accueil échouée:', idbErr);
  }
}

export async function addHomepagePhoto(photo: HomepagePhoto): Promise<HomepagePhoto[]> {
  const current = await loadHomepagePhotos();
  const updated = [photo, ...current];
  await saveHomepagePhotos(updated);
  return updated;
}

export async function removeHomepagePhoto(id: string): Promise<HomepagePhoto[]> {
  const current = await loadHomepagePhotos();
  const updated = current.filter((p) => p.id !== id);
  await saveHomepagePhotos(updated);
  return updated;
}

export async function replaceHomepagePhoto(
  id: string,
  updatedFields: Partial<HomepagePhoto>
): Promise<HomepagePhoto[]> {
  const current = await loadHomepagePhotos();
  const updated = current.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
  await saveHomepagePhotos(updated);
  return updated;
}

export async function resetHomepagePhotosToDefault(): Promise<HomepagePhoto[]> {
  await saveHomepagePhotos(DEFAULT_HOMEPAGE_PHOTOS);
  return DEFAULT_HOMEPAGE_PHOTOS;
}

// -------------------------------------------------------------
// ACTIVITY PHOTOS PERSISTENT STORAGE
// -------------------------------------------------------------

export async function saveActivityPhotos(
  activityKey: ActivityKey,
  photos: UserPhoto[]
): Promise<void> {
  const cappedPhotos = photos.slice(0, MAX_PHOTOS_PER_ACTIVITY);
  memoryStore[activityKey] = cappedPhotos;

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ activityKey, photos: cappedPhotos });

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('Sauvegarde IndexedDB activité échouée, essai localStorage...', err);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`asjy_photos_${activityKey}`, JSON.stringify(cappedPhotos));
      }
    } catch (localErr) {
      console.warn('Sauvegarde localStorage échouée:', localErr);
    }
  }
}

export async function loadAllPhotos(): Promise<Record<ActivityKey, UserPhoto[]>> {
  const result: Record<ActivityKey, UserPhoto[]> = {
    nettoyage: [],
    embellissement: [],
    entretien: [],
    social: [],
    ramadan: [],
    autres: []
  };

  try {
    const db = await openDB();
    const rows = await new Promise<any[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });

    if (rows && rows.length > 0) {
      rows.forEach((row) => {
        if (row.activityKey && Array.isArray(row.photos)) {
          result[row.activityKey as ActivityKey] = row.photos.slice(0, MAX_PHOTOS_PER_ACTIVITY);
        }
      });
      memoryStore = { ...result };
      return result;
    }
  } catch (err) {
    console.warn('Lecture IndexedDB activités échouée, essai localStorage...', err);
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const keys: ActivityKey[] = ['nettoyage', 'embellissement', 'entretien', 'social', 'ramadan', 'autres'];
      keys.forEach((key) => {
        const item = window.localStorage.getItem(`asjy_photos_${key}`);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) {
              result[key] = parsed.slice(0, MAX_PHOTOS_PER_ACTIVITY);
            }
          } catch (parseErr) {
            console.error('Erreur lecture JSON localStorage pour', key, parseErr);
          }
        }
      });
      memoryStore = { ...result };
      return result;
    }
  } catch (localErr) {
    console.warn('Lecture localStorage échouée:', localErr);
  }

  return memoryStore;
}

/**
 * Optimizes an image for the web:
 * - Reads client file (from mobile camera, photo album, or computer)
 * - Resizes max dimensions to 1600px while maintaining EXACT aspect ratio
 * - Compresses to JPEG 0.85
 * - Returns clean base64 dataUrl and byte size
 */
export function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<{ dataUrl: string; size: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Le fichier sélectionné n’est pas une image valide.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Format d’image non décodable.'));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve({
            dataUrl: reader.result as string,
            size: file.size
          });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const byteSize = Math.round((dataUrl.length * 3) / 4);

        resolve({
          dataUrl,
          size: byteSize
        });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

// Export all photos as a downloadable JSON backup
export function exportPhotosBackup(photosRecord: Record<ActivityKey, UserPhoto[]>): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(photosRecord, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute(
    'download',
    `asjy_sauvegarde_photos_${new Date().toISOString().slice(0, 10)}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
