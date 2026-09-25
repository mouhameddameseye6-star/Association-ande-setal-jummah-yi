import { MembershipApplication } from '../types';

const DB_NAME = 'asjy_memberships_db';
const STORE_NAME = 'membership_applications';
const LOCAL_STORAGE_KEY = 'asjy_membership_applications_list';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB non supporté'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Erreur IndexedDB'));
  });
}

// Clean any legacy demo items (starting with adh_demo_)
function filterRealApplications(items: MembershipApplication[]): MembershipApplication[] {
  return items.filter((item) => item && !item.id.startsWith('adh_demo_'));
}

// Load applications from persistent storage (Empty by default for production)
export async function loadMembershipApplications(): Promise<MembershipApplication[]> {
  // 1. Try IndexedDB
  try {
    const db = await openDB();
    const items = await new Promise<MembershipApplication[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => db.close();
    });

    const realItems = filterRealApplications(items || []);
    if (realItems.length !== (items || []).length) {
      // Cleaned out legacy demo items
      await persistAllApplications(realItems);
    }
    return realItems.sort((a, b) => b.submittedAt - a.submittedAt);
  } catch (err) {
    console.warn('Erreur lecture IndexedDB candidatures, passage à localStorage...', err);
  }

  // 2. Try LocalStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const realItems = filterRealApplications(parsed);
          if (realItems.length !== parsed.length) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(realItems));
          }
          return realItems.sort((a, b) => b.submittedAt - a.submittedAt);
        }
      }
    }
  } catch (e) {
    console.warn('Erreur lecture localStorage candidatures:', e);
  }

  // Real initial state: strictly empty for production
  return [];
}

// Helper to save whole array
async function persistAllApplications(apps: MembershipApplication[]): Promise<void> {
  const cleanApps = filterRealApplications(apps);

  // Save in LocalStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanApps));
    }
  } catch (e) {
    console.warn('Erreur écriture localStorage candidatures:', e);
  }

  // Save in IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      cleanApps.forEach((app) => store.put(app));
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Erreur écriture IndexedDB candidatures:', err);
  }
}

// Save a single new application
export async function saveMembershipApplication(
  data: Omit<MembershipApplication, 'id' | 'status' | 'submittedAt'>
): Promise<MembershipApplication> {
  const current = await loadMembershipApplications();
  const newApp: MembershipApplication = {
    id: `adh_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    cityRegion: data.cityRegion.trim(),
    motivation: data.motivation.trim(),
    status: 'en_attente',
    submittedAt: Date.now()
  };

  const updated = [newApp, ...current];
  await persistAllApplications(updated);
  return newApp;
}

// Update application status
export async function updateMembershipStatus(
  id: string,
  newStatus: MembershipApplication['status']
): Promise<MembershipApplication[]> {
  const current = await loadMembershipApplications();
  const updated = current.map((app) => (app.id === id ? { ...app, status: newStatus } : app));
  await persistAllApplications(updated);
  return updated;
}

// Delete application
export async function deleteMembershipApplication(id: string): Promise<MembershipApplication[]> {
  const current = await loadMembershipApplications();
  const updated = current.filter((app) => app.id !== id);
  await persistAllApplications(updated);
  return updated;
}
