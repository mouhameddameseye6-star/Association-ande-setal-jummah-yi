import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ActivityKey, UserPhoto, HomepagePhoto, SiteInfoSettings } from '../types';
import { MAX_PHOTOS_PER_ACTIVITY } from '../data/activities';
import {
  saveActivityPhotos,
  loadAllPhotos,
  loadHomepagePhotos,
  saveHomepagePhotos,
  addHomepagePhoto as addHomepagePhotoStorage,
  removeHomepagePhoto as removeHomepagePhotoStorage,
  replaceHomepagePhoto as replaceHomepagePhotoStorage,
  resetHomepagePhotosToDefault,
  compressImage,
  detectStorageSupport,
  exportPhotosBackup,
  StorageType
} from '../services/photoStorage';
import { loadSiteSettings, saveSiteSettings as saveSiteSettingsStorage } from '../services/siteSettingsStorage';

interface PhotoContextType {
  photosByActivity: Record<ActivityKey, UserPhoto[]>;
  homepagePhotos: HomepagePhoto[];
  siteSettings: SiteInfoSettings;
  loading: boolean;
  storageType: StorageType;
  // Homepage photo management (Accessible by Admin and Mobile)
  addHomepagePhoto: (
    file: File,
    meta: {
      title: string;
      category: HomepagePhoto['category'];
      location: string;
      description?: string;
    }
  ) => Promise<{ success: boolean; error?: string; photo?: HomepagePhoto }>;
  replaceHomepagePhoto: (
    id: string,
    file?: File,
    meta?: Partial<HomepagePhoto>
  ) => Promise<{ success: boolean; error?: string }>;
  removeHomepagePhoto: (id: string) => Promise<void>;
  resetHomepagePhotos: () => Promise<void>;
  // Site settings
  updateSiteSettings: (settings: SiteInfoSettings) => void;
  // Activity Photos
  addPhotosToActivity: (
    activityKey: ActivityKey,
    files: File[]
  ) => Promise<{ added: number; error?: string }>;
  removePhoto: (activityKey: ActivityKey, photoId: string) => Promise<void>;
  replacePhoto: (activityKey: ActivityKey, photoId: string, newFile: File) => Promise<void>;
  updatePhotoMeta: (
    activityKey: ActivityKey,
    photoId: string,
    updates: { title?: string; location?: string; description?: string }
  ) => Promise<void>;
  clearActivityPhotos: (activityKey: ActivityKey) => Promise<void>;
  getAllPhotos: () => UserPhoto[];
  exportBackup: () => void;
  importBackup: (jsonContent: string) => Promise<{ success: boolean; error?: string }>;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

const initialPhotos: Record<ActivityKey, UserPhoto[]> = {
  nettoyage: [],
  embellissement: [],
  entretien: [],
  social: [],
  ramadan: [],
  autres: []
};

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photosByActivity, setPhotosByActivity] = useState<Record<ActivityKey, UserPhoto[]>>(initialPhotos);
  const [homepagePhotos, setHomepagePhotos] = useState<HomepagePhoto[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteInfoSettings>(loadSiteSettings());
  const [loading, setLoading] = useState<boolean>(true);
  const [storageType, setStorageType] = useState<StorageType>('indexedDB');

  // Load photos & settings on mount
  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const detected = await detectStorageSupport();
        if (isMounted) setStorageType(detected);

        const [loadedPhotos, loadedHomepage] = await Promise.all([
          loadAllPhotos(),
          loadHomepagePhotos()
        ]);

        if (isMounted) {
          setPhotosByActivity(loadedPhotos);
          setHomepagePhotos(loadedHomepage);
          setSiteSettings(loadSiteSettings());
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur initialisation stockage photos:', err);
        if (isMounted) setLoading(false);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update site settings
  const updateSiteSettings = useCallback((newSettings: SiteInfoSettings) => {
    setSiteSettings(newSettings);
    saveSiteSettingsStorage(newSettings);
  }, []);

  // Add a new photo to homepage (from Admin or Mobile)
  const addHomepagePhoto = useCallback(
    async (
      file: File,
      meta: {
        title: string;
        category: HomepagePhoto['category'];
        location: string;
        description?: string;
      }
    ): Promise<{ success: boolean; error?: string; photo?: HomepagePhoto }> => {
      try {
        const { dataUrl } = await compressImage(file, 1600, 0.85);
        const newPhoto: HomepagePhoto = {
          id: `hp_usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          title: meta.title.trim() || 'Photo de terrain ASJY',
          category: meta.category,
          location: meta.location.trim() || 'Mosquée partenaire',
          region: 'Sénégal',
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          image: dataUrl,
          description: meta.description?.trim() || `Cliché officiel de l'Association Andeu Setal Jummah Yi pour l'action ${meta.category}.`,
          isUserAdded: true,
          addedAt: Date.now()
        };

        const updated = await addHomepagePhotoStorage(newPhoto);
        setHomepagePhotos(updated);
        return { success: true, photo: newPhoto };
      } catch (err: any) {
        console.error('Erreur ajout photo accueil:', err);
        return { success: false, error: err?.message || 'Erreur lors du traitement de l’image.' };
      }
    },
    []
  );

  // Replace existing homepage photo
  const replaceHomepagePhoto = useCallback(
    async (
      id: string,
      file?: File,
      meta?: Partial<HomepagePhoto>
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const updates: Partial<HomepagePhoto> = { ...meta };
        if (file) {
          const { dataUrl } = await compressImage(file, 1600, 0.85);
          updates.image = dataUrl;
          updates.isUserAdded = true;
        }

        const updated = await replaceHomepagePhotoStorage(id, updates);
        setHomepagePhotos(updated);
        return { success: true };
      } catch (err: any) {
        console.error('Erreur remplacement photo accueil:', err);
        return { success: false, error: err?.message || 'Erreur lors du remplacement de l’image.' };
      }
    },
    []
  );

  // Remove photo from homepage
  const removeHomepagePhoto = useCallback(async (id: string): Promise<void> => {
    const updated = await removeHomepagePhotoStorage(id);
    setHomepagePhotos(updated);
  }, []);

  // Reset to default photos
  const resetHomepagePhotos = useCallback(async (): Promise<void> => {
    const defaultPhotos = await resetHomepagePhotosToDefault();
    setHomepagePhotos(defaultPhotos);
  }, []);

  // Activity photos methods
  const addPhotosToActivity = useCallback(
    async (
      activityKey: ActivityKey,
      files: File[]
    ): Promise<{ added: number; error?: string }> => {
      const currentList = photosByActivity[activityKey] || [];
      const remainingSlots = MAX_PHOTOS_PER_ACTIVITY - currentList.length;

      if (remainingSlots <= 0) {
        return {
          added: 0,
          error: `Limite de ${MAX_PHOTOS_PER_ACTIVITY} photos atteinte.`
        };
      }

      const filesToProcess = files.slice(0, remainingSlots);
      const newPhotos: UserPhoto[] = [];

      for (let i = 0; i < filesToProcess.length; i++) {
        const file = filesToProcess[i];
        try {
          const { dataUrl, size } = await compressImage(file);
          const photoItem: UserPhoto = {
            id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            activityKey,
            dataUrl,
            name: file.name,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            date: new Date().toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            size,
            addedAt: Date.now()
          };
          newPhotos.push(photoItem);
        } catch (compressionErr) {
          console.error(`Erreur compression image ${file.name}:`, compressionErr);
        }
      }

      if (newPhotos.length > 0) {
        const updatedList = [...newPhotos, ...currentList].slice(0, MAX_PHOTOS_PER_ACTIVITY);
        setPhotosByActivity((prev) => ({
          ...prev,
          [activityKey]: updatedList
        }));
        await saveActivityPhotos(activityKey, updatedList);
      }

      return { added: newPhotos.length };
    },
    [photosByActivity]
  );

  const removePhoto = useCallback(
    async (activityKey: ActivityKey, photoId: string): Promise<void> => {
      const currentList = photosByActivity[activityKey] || [];
      const updatedList = currentList.filter((p) => p.id !== photoId);

      setPhotosByActivity((prev) => ({
        ...prev,
        [activityKey]: updatedList
      }));

      await saveActivityPhotos(activityKey, updatedList);
    },
    [photosByActivity]
  );

  const replacePhoto = useCallback(
    async (activityKey: ActivityKey, photoId: string, newFile: File): Promise<void> => {
      try {
        const { dataUrl, size } = await compressImage(newFile);
        const currentList = photosByActivity[activityKey] || [];
        const updatedList = currentList.map((p) => {
          if (p.id === photoId) {
            return {
              ...p,
              dataUrl,
              size,
              name: newFile.name
            };
          }
          return p;
        });

        setPhotosByActivity((prev) => ({
          ...prev,
          [activityKey]: updatedList
        }));

        await saveActivityPhotos(activityKey, updatedList);
      } catch (err) {
        console.error('Erreur remplacement photo activité:', err);
      }
    },
    [photosByActivity]
  );

  const updatePhotoMeta = useCallback(
    async (
      activityKey: ActivityKey,
      photoId: string,
      updates: { title?: string; location?: string; description?: string }
    ): Promise<void> => {
      const currentList = photosByActivity[activityKey] || [];
      const updatedList = currentList.map((p) => {
        if (p.id === photoId) {
          return {
            ...p,
            ...(updates.title !== undefined ? { title: updates.title } : {}),
            ...(updates.location !== undefined ? { location: updates.location } : {}),
            ...(updates.description !== undefined ? { description: updates.description } : {})
          };
        }
        return p;
      });

      setPhotosByActivity((prev) => ({
        ...prev,
        [activityKey]: updatedList
      }));

      await saveActivityPhotos(activityKey, updatedList);
    },
    [photosByActivity]
  );

  const clearActivityPhotos = useCallback(
    async (activityKey: ActivityKey): Promise<void> => {
      setPhotosByActivity((prev) => ({
        ...prev,
        [activityKey]: []
      }));
      await saveActivityPhotos(activityKey, []);
    },
    []
  );

  const getAllPhotos = useCallback((): UserPhoto[] => {
    const all: UserPhoto[] = [];
    Object.values(photosByActivity).forEach((list) => {
      if (Array.isArray(list)) {
        all.push(...list);
      }
    });
    return all.sort((a, b) => b.addedAt - a.addedAt);
  }, [photosByActivity]);

  const exportBackup = useCallback(() => {
    exportPhotosBackup(photosByActivity);
  }, [photosByActivity]);

  const importBackup = useCallback(
    async (jsonContent: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const parsed = JSON.parse(jsonContent);
        if (typeof parsed !== 'object' || parsed === null) {
          return { success: false, error: 'Fichier JSON invalide' };
        }

        const keys: ActivityKey[] = ['nettoyage', 'embellissement', 'entretien', 'social', 'ramadan', 'autres'];
        const sanitized: Record<ActivityKey, UserPhoto[]> = { ...initialPhotos };

        for (const key of keys) {
          if (Array.isArray(parsed[key])) {
            sanitized[key] = parsed[key].slice(0, MAX_PHOTOS_PER_ACTIVITY);
            await saveActivityPhotos(key, sanitized[key]);
          }
        }

        setPhotosByActivity(sanitized);
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e?.message || 'Erreur lors du parsing JSON' };
      }
    },
    []
  );

  return (
    <PhotoContext.Provider
      value={{
        photosByActivity,
        homepagePhotos,
        siteSettings,
        loading,
        storageType,
        addHomepagePhoto,
        replaceHomepagePhoto,
        removeHomepagePhoto,
        resetHomepagePhotos,
        updateSiteSettings,
        addPhotosToActivity,
        removePhoto,
        clearActivityPhotos,
        getAllPhotos,
        exportBackup,
        importBackup
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos doit être utilisé au sein de PhotoProvider');
  }
  return context;
};
