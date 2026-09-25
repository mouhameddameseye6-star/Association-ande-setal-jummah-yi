import React, { useState, useEffect, useRef } from 'react';
import { PageId, MembershipApplication, HomepagePhoto, SiteInfoSettings } from '../types';
import { usePhotos } from '../context/PhotoContext';
import { AsjyLogo } from '../components/AsjyLogo';
import { AsjyImage } from '../components/AsjyImage';
import {
  loadMembershipApplications,
  updateMembershipStatus,
  deleteMembershipApplication
} from '../services/membershipStorage';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  Image as ImageIcon,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  RefreshCw,
  Upload,
  Download,
  AlertCircle,
  Search,
  ExternalLink,
  ChevronRight,
  Eye,
  Camera,
  ArrowLeft
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

const ADMIN_AUTH_KEY = 'asjy_admin_session_auth';
const ADMIN_HASH_KEY = 'asjy_admin_pwd_hash_v2';

async function computeSHA256(message: string): Promise<string> {
  const enc = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    homepagePhotos,
    siteSettings,
    addHomepagePhoto,
    replaceHomepagePhoto,
    removeHomepagePhoto,
    resetHomepagePhotos,
    updateSiteSettings,
    storageType
  } = usePhotos();

  // Check if admin password is configured
  const [hasConfiguredPassword, setHasConfiguredPassword] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ADMIN_HASH_KEY);
      const envPass = import.meta.env.VITE_ADMIN_PASSWORD;
      return Boolean(stored || envPass);
    }
    return false;
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authError, setAuthError] = useState('');

  // Password change state inside Settings
  const [currentPwdForChange, setCurrentPwdForChange] = useState('');
  const [newPwdForChange, setNewPwdForChange] = useState('');
  const [confirmPwdForChange, setConfirmPwdForChange] = useState('');
  const [pwdChangeMessage, setPwdChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Active Tab: 'candidatures' | 'photos' | 'settings' | 'backup'
  const [activeTab, setActiveTab] = useState<'candidatures' | 'photos' | 'settings' | 'backup'>('candidatures');

  // Applications state
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [appsFilter, setAppsFilter] = useState<'all' | 'en_attente' | 'acceptee' | 'refusee'>('all');
  const [appsSearch, setAppsSearch] = useState('');
  const [loadingApps, setLoadingApps] = useState(true);

  // New Photo Modal / Form state
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState<HomepagePhoto['category']>('Chantier');
  const [photoLocation, setPhotoLocation] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState(false);
  const [photoActionMessage, setPhotoActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Replace photo state
  const [replacingPhotoId, setReplacingPhotoId] = useState<string | null>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteInfoSettings>(siteSettings);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Load applications
  useEffect(() => {
    if (isAuthenticated) {
      loadMembershipApplications().then((data) => {
        setApplications(data);
        setLoadingApps(false);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  // Handle Login or Initial Setup
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!hasConfiguredPassword) {
      // First-time initial setup
      if (passwordInput.trim().length < 6) {
        setAuthError('Le mot de passe doit comporter au moins 6 caractères.');
        return;
      }
      if (passwordInput !== passwordConfirm) {
        setAuthError('Les deux mots de passe ne correspondent pas.');
        return;
      }
      const hash = await computeSHA256(passwordInput.trim());
      localStorage.setItem(ADMIN_HASH_KEY, hash);
      setHasConfiguredPassword(true);
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setPasswordInput('');
      setPasswordConfirm('');
      return;
    }

    // Standard Login
    const enteredHash = await computeSHA256(passwordInput.trim());
    const storedHash = localStorage.getItem(ADMIN_HASH_KEY);
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

    const isValid = (storedHash && enteredHash === storedHash) || (envPass && passwordInput.trim() === envPass);

    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Mot de passe administrateur incorrect.');
    }
  };

  // Handle Change Password inside Dashboard
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdChangeMessage(null);

    const storedHash = localStorage.getItem(ADMIN_HASH_KEY);
    const currentHash = await computeSHA256(currentPwdForChange.trim());
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

    const isCurrentValid = !storedHash || currentHash === storedHash || (envPass && currentPwdForChange.trim() === envPass);

    if (!isCurrentValid) {
      setPwdChangeMessage({ type: 'error', text: 'Le mot de passe actuel est incorrect.' });
      return;
    }

    if (newPwdForChange.trim().length < 6) {
      setPwdChangeMessage({ type: 'error', text: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' });
      return;
    }

    if (newPwdForChange !== confirmPwdForChange) {
      setPwdChangeMessage({ type: 'error', text: 'Les deux nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    const newHash = await computeSHA256(newPwdForChange.trim());
    localStorage.setItem(ADMIN_HASH_KEY, newHash);
    setCurrentPwdForChange('');
    setNewPwdForChange('');
    setConfirmPwdForChange('');
    setPwdChangeMessage({ type: 'success', text: 'Mot de passe administrateur mis à jour avec succès.' });
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setPasswordInput('');
  };

  // Status Change for Application
  const handleStatusChange = async (id: string, status: MembershipApplication['status']) => {
    const updated = await updateMembershipStatus(id, status);
    setApplications(updated);
  };

  // Delete Application
  const handleDeleteApp = async (id: string, name: string) => {
    if (window.confirm(`Confirmez-vous la suppression de la demande de ${name} ?`)) {
      const updated = await deleteMembershipApplication(id);
      setApplications(updated);
    }
  };

  // Handle Photo selection for adding
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
      if (!photoTitle) {
        setPhotoTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  // Submit new photo
  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) {
      alert('Veuillez sélectionner une photo depuis vos fichiers ou appareil photo.');
      return;
    }
    setIsSubmittingPhoto(true);
    setPhotoActionMessage(null);

    const res = await addHomepagePhoto(photoFile, {
      title: photoTitle,
      category: photoCategory,
      location: photoLocation,
      description: photoDescription
    });

    setIsSubmittingPhoto(false);

    if (res.success) {
      setPhotoActionMessage({ type: 'success', text: 'Photo ajoutée avec succès sur la page d’accueil !' });
      setPhotoFile(null);
      setPhotoPreview(null);
      setPhotoTitle('');
      setPhotoLocation('');
      setPhotoDescription('');
      setIsAddingPhoto(false);
    } else {
      setPhotoActionMessage({ type: 'error', text: res.error || 'Erreur lors de l’ajout de la photo.' });
    }
  };

  // Handle Replace Photo
  const handleTriggerReplace = (id: string) => {
    setReplacingPhotoId(id);
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && replacingPhotoId) {
      const file = e.target.files[0];
      const res = await replaceHomepagePhoto(replacingPhotoId, file);
      if (res.success) {
        setPhotoActionMessage({ type: 'success', text: 'Photo remplacée avec succès !' });
      } else {
        setPhotoActionMessage({ type: 'error', text: res.error || 'Erreur lors du remplacement.' });
      }
      setReplacingPhotoId(null);
    }
  };

  // Handle Remove Photo
  const handleRemovePhoto = async (id: string, title: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la photo « ${title} » de l’accueil ?`)) {
      await removeHomepagePhoto(id);
      setPhotoActionMessage({ type: 'success', text: 'Photo supprimée de l’accueil.' });
    }
  };

  // Handle Reset Photos
  const handleResetPhotos = async () => {
    if (window.confirm('Voulez-vous rétablir les 11 photos officielles d’origine de l’accueil ?')) {
      await resetHomepagePhotos();
      setPhotoActionMessage({ type: 'success', text: 'Photos de l’accueil réinitialisées avec succès.' });
    }
  };

  // Save Site Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    if (appsFilter !== 'all' && app.status !== appsFilter) return false;
    if (appsSearch.trim()) {
      const q = appsSearch.toLowerCase();
      const matchName = `${app.firstName} ${app.lastName}`.toLowerCase().includes(q);
      const matchPhone = app.phone.toLowerCase().includes(q);
      const matchCity = app.cityRegion.toLowerCase().includes(q);
      return matchName || matchPhone || matchCity;
    }
    return true;
  });

  // Export full JSON backup
  const handleExportBackup = () => {
    const backupData = {
      siteSettings,
      homepagePhotos,
      applications,
      exportDate: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `asjy_sauvegarde_complete_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // -------------------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" id="admin-login-screen">
        <div className="max-w-md w-full bg-white dark:bg-[#0f1f17] p-8 sm:p-10 rounded-3xl border border-[#0D3823]/20 dark:border-[#D4AF37]/30 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#0D3823] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
              {hasConfiguredPassword ? 'Espace Administrateur' : 'Initialisation Administrateur'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {hasConfiguredPassword
                ? "Accès sécurisé pour la gestion de l'Association Andeu Setal Jummah Yi."
                : "Veuillez définir votre mot de passe secret pour protéger l'accès à l'administration."}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                {hasConfiguredPassword ? 'Mot de passe d’administration' : 'Définir le mot de passe'}
              </label>
              <input
                type="password"
                required
                placeholder={hasConfiguredPassword ? 'Entrez votre mot de passe' : 'Minimum 6 caractères'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none text-sm"
              />
            </div>

            {!hasConfiguredPassword && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  required
                  placeholder="Répétez le mot de passe"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white focus:ring-2 focus:ring-[#0D3823] focus:outline-none text-sm"
                />
              </div>
            )}

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{hasConfiguredPassword ? 'Se Connecter' : 'Enregistrer et Accéder'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <button
              onClick={() => onNavigate('accueil')}
              className="text-xs font-semibold text-gray-500 hover:text-[#0D3823] dark:hover:text-[#D4AF37] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="admin-dashboard-view">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-3xl border border-[#0D3823]/15 dark:border-[#D4AF37]/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0D3823] text-white flex items-center justify-center shadow-md shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Connecté en tant qu'Administrateur</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
              Tableau de Bord ASJY
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Gérez les demandes d'adhésion, les photos de l'accueil et les textes du site.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => onNavigate('accueil')}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#162a1f] hover:bg-gray-200 dark:hover:bg-[#1e382a] text-[#19241C] dark:text-gray-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#0D3823] dark:text-[#D4AF37]" />
            <span>Voir le site</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-700 dark:text-red-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-red-200 dark:border-red-900"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Action notification banner */}
      {photoActionMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold shadow-sm ${
            photoActionMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {photoActionMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{photoActionMessage.text}</span>
          </div>
          <button
            onClick={() => setPhotoActionMessage(null)}
            className="text-xs underline hover:opacity-75 cursor-pointer ml-4"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Navigation Tabs (Mobile-friendly scrollable buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('candidatures')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'candidatures'
              ? 'bg-[#0D3823] text-white shadow-sm'
              : 'bg-white dark:bg-[#11221a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Users className="w-4 h-4 text-[#D4AF37]" />
          <span>Demandes d'Adhésion ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-[#0D3823] text-white shadow-sm'
              : 'bg-white dark:bg-[#11221a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
          <span>Photos Accueil ({homepagePhotos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#0D3823] text-white shadow-sm'
              : 'bg-white dark:bg-[#11221a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Settings className="w-4 h-4 text-[#D4AF37]" />
          <span>Informations du Site</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'backup'
              ? 'bg-[#0D3823] text-white shadow-sm'
              : 'bg-white dark:bg-[#11221a] text-gray-700 dark:text-gray-300 hover:bg-gray-100 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <span>Sauvegarde & Données</span>
        </button>
      </div>

      {/* Hidden file input for quick replace */}
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* ===================================================================== */}
      {/* TAB 1: DEMANDES D'ADHÉSION */}
      {/* ===================================================================== */}
      {activeTab === 'candidatures' && (
        <div className="space-y-6" id="admin-tab-candidatures">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#0f1f17] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Demandes</span>
              <p className="text-2xl font-black text-[#19241C] dark:text-white mt-0.5">{applications.length}</p>
            </div>
            <div className="bg-white dark:bg-[#0f1f17] p-4 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 shadow-xs">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">En Attente</span>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                {applications.filter((a) => a.status === 'en_attente').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#0f1f17] p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Acceptées</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {applications.filter((a) => a.status === 'acceptee').length}
              </p>
            </div>
            <div className="bg-white dark:bg-[#0f1f17] p-4 rounded-2xl border border-red-200/60 dark:border-red-900/40 shadow-xs">
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Refusées</span>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-0.5">
                {applications.filter((a) => a.status === 'refusee').length}
              </p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white dark:bg-[#0f1f17] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setAppsFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appsFilter === 'all'
                    ? 'bg-[#0D3823] text-white'
                    : 'bg-gray-100 dark:bg-[#162a1f] text-gray-700 dark:text-gray-300'
                }`}
              >
                Toutes ({applications.length})
              </button>
              <button
                onClick={() => setAppsFilter('en_attente')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appsFilter === 'en_attente'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 dark:bg-[#162a1f] text-gray-700 dark:text-gray-300'
                }`}
              >
                En Attente ({applications.filter((a) => a.status === 'en_attente').length})
              </button>
              <button
                onClick={() => setAppsFilter('acceptee')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appsFilter === 'acceptee'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-[#162a1f] text-gray-700 dark:text-gray-300'
                }`}
              >
                Acceptées ({applications.filter((a) => a.status === 'acceptee').length})
              </button>
              <button
                onClick={() => setAppsFilter('refusee')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  appsFilter === 'refusee'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-[#162a1f] text-gray-700 dark:text-gray-300'
                }`}
              >
                Refusées ({applications.filter((a) => a.status === 'refusee').length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher nom, tel, ville..."
                value={appsSearch}
                onChange={(e) => setAppsSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#13261c] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#0D3823]"
              />
            </div>
          </div>

          {/* List of Applications */}
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#0f1f17] rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 space-y-2">
              <Users className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
              <h3 className="font-bold text-base text-gray-700 dark:text-gray-300">
                {applications.length === 0
                  ? "Aucune demande reçue pour le moment"
                  : "Aucune demande trouvée pour ce filtre"}
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                {applications.length === 0
                  ? "Le formulaire d'adhésion est prêt. Dès qu'un candidat postule en ligne, sa demande apparaîtra ici."
                  : "Modifiez votre recherche ou réinitialisez le filtre de statut."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredApps.map((app) => {
                const cleanPhone = app.phone.replace(/[^0-9+]/g, '');
                return (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-[#0f1f17] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Status & Date */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1 ${
                            app.status === 'acceptee'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : app.status === 'refusee'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {app.status === 'acceptee' && <CheckCircle className="w-3 h-3" />}
                          {app.status === 'refusee' && <XCircle className="w-3 h-3" />}
                          {app.status === 'en_attente' && <Clock className="w-3 h-3" />}
                          <span>
                            {app.status === 'acceptee'
                              ? 'Acceptée'
                              : app.status === 'refusee'
                              ? 'Refusée'
                              : 'En Attente'}
                          </span>
                        </span>

                        <span className="text-[11px] text-gray-400">
                          {new Date(app.submittedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Candidate Name & Info */}
                      <div>
                        <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                          {app.firstName} {app.lastName}
                        </h3>
                        <div className="mt-1 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#0D3823] dark:text-[#D4AF37] shrink-0" />
                            <span>{app.cityRegion || 'Région non précisée'}</span>
                          </div>
                          {app.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <a href={`mailto:${app.email}`} className="hover:underline">
                                {app.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#0D3823] dark:text-[#D4AF37] shrink-0" />
                            <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                              {app.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Motivation Text */}
                      {app.motivation && (
                        <div className="p-3 bg-gray-50 dark:bg-[#13261c] rounded-xl text-xs text-gray-700 dark:text-gray-300 italic border border-gray-100 dark:border-gray-800">
                          « {app.motivation} »
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        {/* Direct Contact Buttons */}
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-[#162a1f] text-[#0D3823] dark:text-emerald-400 hover:bg-emerald-50 text-xs font-bold transition-all"
                            title="Appeler le candidat"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Bonjour%20${encodeURIComponent(
                              app.firstName
                            )}%2C%20je%20vous%20contacte%20suite%20%C3%A0%20votre%20demande%20d%27adh%C3%A9sion%20%C3%A0%20l%27Association%20ASJY.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 text-xs font-bold transition-all flex items-center gap-1"
                            title="Contacter sur WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span className="text-[10px]">WhatsApp</span>
                          </a>
                        </div>

                        {/* Status update buttons */}
                        <div className="flex items-center gap-1.5">
                          {app.status !== 'acceptee' && (
                            <button
                              onClick={() => handleStatusChange(app.id, 'acceptee')}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase transition-all cursor-pointer"
                            >
                              Accepter
                            </button>
                          )}
                          {app.status !== 'refusee' && (
                            <button
                              onClick={() => handleStatusChange(app.id, 'refusee')}
                              className="px-2.5 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 hover:bg-red-200 text-red-700 dark:text-red-300 text-[11px] font-bold uppercase transition-all cursor-pointer"
                            >
                              Refuser
                            </button>
                          )}
                          {app.status !== 'en_attente' && (
                            <button
                              onClick={() => handleStatusChange(app.id, 'en_attente')}
                              className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-[#162a1f] text-gray-700 dark:text-gray-300 text-[11px] font-bold uppercase transition-all cursor-pointer"
                            >
                              En attente
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteApp(app.id, `${app.firstName} ${app.lastName}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all cursor-pointer"
                            title="Supprimer la candidature"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: GESTION DES PHOTOS DE L'ACCUEIL */}
      {/* ===================================================================== */}
      {activeTab === 'photos' && (
        <div className="space-y-6" id="admin-tab-photos">
          {/* Header Action Card: Designed specifically for phones and computers */}
          <div className="bg-gradient-to-r from-[#0D3823] via-[#145334] to-[#0A291A] text-white p-6 rounded-3xl border border-[#D4AF37]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                Photos Présentes sur l'Accueil
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {homepagePhotos.length} Photos Actives
              </h2>
              <p className="text-xs text-emerald-100 max-w-xl">
                Ajoutez de nouvelles photos directement depuis vos fichiers ou appareil photo de téléphone. Elles sont enregistrées de façon permanente dans l'application.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddingPhoto(true)}
                className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A291A] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4 text-[#0A291A]" />
                <span>+ Ajouter une photo</span>
              </button>

              <button
                type="button"
                onClick={handleResetPhotos}
                className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
                title="Rétablir les photos officielles"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rétablir photos d'origine</span>
              </button>
            </div>
          </div>

          {/* Modal / Panel for Adding Photo */}
          {isAddingPhoto && (
            <div className="bg-white dark:bg-[#0f1f17] p-6 rounded-3xl border-2 border-[#0D3823] dark:border-[#D4AF37] shadow-lg space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#0D3823] dark:text-[#D4AF37]" />
                  <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                    Ajouter une photo sur la page d'accueil
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingPhoto(false)}
                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white font-bold cursor-pointer"
                >
                  Annuler
                </button>
              </div>

              <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                {/* File input (Camera & Gallery enabled) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Sélectionner la photo (depuis votre téléphone ou ordinateur) *
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-[#0D3823] file:text-white hover:file:bg-[#145334] cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Formats acceptés : JPG, PNG, WebP. Compression automatique pour une vitesse maximale.
                  </p>
                </div>

                {/* Preview if selected */}
                {photoPreview && (
                  <div className="w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
                    <img src={photoPreview} alt="Aperçu" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Aperçu prêt
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Titre de la photo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Nettoyage grande salle de prière"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-xs sm:text-sm text-[#19241C] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-xs sm:text-sm text-[#19241C] dark:text-white"
                    >
                      <option value="Chantier">Chantier</option>
                      <option value="Nettoyage">Nettoyage</option>
                      <option value="Embellissement">Embellissement</option>
                      <option value="Entretien">Entretien</option>
                      <option value="Ramadan">Ramadan</option>
                      <option value="Vie Associative">Vie Associative</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Lieu / Mosquée
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Grande Mosquée de Thiès"
                      value={photoLocation}
                      onChange={(e) => setPhotoLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-xs sm:text-sm text-[#19241C] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Courte description
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Volontaires en gilets ASJY pour le balayage"
                      value={photoDescription}
                      onChange={(e) => setPhotoDescription(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-xs sm:text-sm text-[#19241C] dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingPhoto || !photoFile}
                    className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    {isSubmittingPhoto ? 'Enregistrement permanent...' : 'Publier sur l’accueil'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingPhoto(false)}
                    className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid of current homepage photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homepagePhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-[#0f1f17] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                    {photo.isUserAdded ? (
                      <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                    ) : (
                      <AsjyImage
                        src={photo.image}
                        alternateSrc={photo.alternateSrc}
                        filename={photo.filename}
                        fallbackTitle={photo.title}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute top-2.5 left-2.5 bg-[#0D3823]/85 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                      {photo.category}
                    </div>

                    {photo.isUserAdded && (
                      <div className="absolute top-2.5 right-2.5 bg-[#D4AF37] text-[#0A291A] text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        Ajoutée
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-bold text-sm text-[#19241C] dark:text-white line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span className="truncate">{photo.location}</span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-[#13261c] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleTriggerReplace(photo.id)}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0f1f17] border border-gray-200 dark:border-gray-700 text-xs font-bold text-[#0D3823] dark:text-[#D4AF37] hover:bg-gray-100 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Remplacer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photo.id, photo.title)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all cursor-pointer"
                    title="Supprimer cette photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: INFORMATIONS DU SITE */}
      {/* ===================================================================== */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-[#0f1f17] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6" id="admin-tab-settings">
          <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
              Informations Principales du Site
            </h2>
            <p className="text-xs text-gray-500">
              Modifiez ici les textes officiels, le slogan, les coordonnées et les informations de l'association. Les modifications sont appliquées immédiatement.
            </p>
          </div>

          {settingsSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Modifications enregistrées avec succès sur tout le site !</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nom de l'Association *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Slogan Officiel *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.slogan}
                  onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white font-serif italic"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Sous-titre / Devise *
              </label>
              <input
                type="text"
                required
                value={settingsForm.subtitle}
                onChange={(e) => setSettingsForm({ ...settingsForm, subtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Présentation courte de l'association *
              </label>
              <textarea
                rows={3}
                required
                value={settingsForm.presentation}
                onChange={(e) => setSettingsForm({ ...settingsForm, presentation: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Numéro de Téléphone 1 *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone1}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Numéro de Téléphone 2 *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone2}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Email officiel *
                </label>
                <input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Siège national *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.headquarters}
                  onChange={(e) => setSettingsForm({ ...settingsForm, headquarters: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Rythme des Opérations *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.scheduleNotice}
                  onChange={(e) => setSettingsForm({ ...settingsForm, scheduleNotice: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Cotisation Mensuelle *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.cotisationAmount}
                  onChange={(e) => setSettingsForm({ ...settingsForm, cotisationAmount: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>

          {/* Secure Admin Password Management */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#19241C] dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0D3823] dark:text-[#D4AF37]" />
                <span>Sécurité & Mot de passe Administrateur</span>
              </h3>
              <p className="text-xs text-gray-500">
                Modifiez votre mot de passe d'administration. Il est haché cryptographiquement et stocké de manière sécurisée.
              </p>
            </div>

            {pwdChangeMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  pwdChangeMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pwdChangeMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  required
                  placeholder="Mot de passe actuel"
                  value={currentPwdForChange}
                  onChange={(e) => setCurrentPwdForChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 caractères"
                  value={newPwdForChange}
                  onChange={(e) => setNewPwdForChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Confirmer le nouveau
                </label>
                <input
                  type="password"
                  required
                  placeholder="Répéter le mot de passe"
                  value={confirmPwdForChange}
                  onChange={(e) => setConfirmPwdForChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#13261c] text-[#19241C] dark:text-white"
                />
              </div>

              <div className="sm:col-span-3 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: SAUVEGARDE & DONNÉES */}
      {/* ===================================================================== */}
      {activeTab === 'backup' && (
        <div className="bg-white dark:bg-[#0f1f17] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6" id="admin-tab-backup">
          <div className="space-y-1 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-black text-[#19241C] dark:text-white uppercase tracking-tight">
              Sauvegarde & Restauration
            </h2>
            <p className="text-xs text-gray-500">
              Téléchargez une sauvegarde complète de toutes vos données (candidatures, photos ajoutées, paramètres) pour ne jamais rien perdre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#13261c] border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D3823] text-[#D4AF37] flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                Exporter la Sauvegarde Complète
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Générez un fichier JSON contenant l'ensemble des {applications.length} candidatures et des {homepagePhotos.length} photos enregistrées.
              </p>
              <button
                type="button"
                onClick={handleExportBackup}
                className="px-5 py-2.5 rounded-xl bg-[#0D3823] hover:bg-[#145334] text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Télécharger la Sauvegarde JSON</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#13261c] border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D3823] text-[#D4AF37] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-[#19241C] dark:text-white">
                État du Stockage Local
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Moteur de persistance actif :{' '}
                <strong className="text-[#0D3823] dark:text-[#D4AF37] font-mono">{storageType}</strong>.
              </p>
              <div className="text-[11px] text-gray-500 space-y-1">
                <div>• Photos d'accueil : {homepagePhotos.length} éléments</div>
                <div>• Candidatures enregistrées : {applications.length} éléments</div>
                <div>• Paramètres du site : Actifs et synchronisés</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
