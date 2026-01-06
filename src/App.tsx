import { useState, useEffect } from 'react';
import type { Profile, Role, SalesRepData } from './types';
import { defaultProfile, defaultRole, generateId } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getDataFromUrlParams } from './utils/shareUtils';
import { ProfileHeader } from './components/ProfileHeader';
import { RoleCard } from './components/RoleCard';
import { ShareButton } from './components/ShareButton';

function App() {
  const [savedProfile, setSavedProfile] = useLocalStorage<Profile>('salesrep-profile', defaultProfile);
  const [savedRoles, setSavedRoles] = useLocalStorage<Role[]>('salesrep-roles', []);

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    const urlData = getDataFromUrlParams();
    if (urlData) {
      setProfile(urlData.profile);
      setRoles(urlData.roles);
      setIsViewMode(true);
    } else {
      setProfile(savedProfile);
      setRoles(savedRoles);
    }
  }, []);

  useEffect(() => {
    if (!isViewMode) {
      setSavedProfile(profile);
      setSavedRoles(roles);
    }
  }, [profile, roles, isViewMode]);

  const handleUpdateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const handleAddRole = () => {
    const newRole: Role = {
      ...defaultRole,
      id: generateId(),
    };
    setRoles([newRole, ...roles]);
  };

  const handleExitViewMode = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setProfile(savedProfile);
    setRoles(savedRoles);
    setIsViewMode(false);
  };

  const data: SalesRepData = { profile, roles };

  return (
    <div className="min-h-screen bg-gray-100">
      {isViewMode && (
        <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-yellow-800 text-sm">
              You're viewing a shared resume.
            </p>
            <button
              onClick={handleExitViewMode}
              className="text-yellow-700 hover:text-yellow-900 text-sm font-medium underline"
            >
              Edit your own resume
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sales Rep Resume</h1>
            <p className="text-gray-600 text-sm">Track and showcase your sales performance</p>
          </div>
          {!isViewMode && <ShareButton data={data} />}
        </div>

        <div className="space-y-6">
          <ProfileHeader
            profile={profile}
            roles={roles}
            onUpdateProfile={handleUpdateProfile}
            isViewMode={isViewMode}
          />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
            {!isViewMode && (
              <button
                onClick={handleAddRole}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Role
              </button>
            )}
          </div>

          {roles.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No roles added yet</h3>
              <p className="text-gray-500 mb-4">Add your sales experience to showcase your track record</p>
              {!isViewMode && (
                <button
                  onClick={handleAddRole}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Add Your First Role
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {roles.map(role => (
                <RoleCard
                  key={role.id}
                  role={role}
                  onUpdate={handleUpdateRole}
                  onDelete={handleDeleteRole}
                  isViewMode={isViewMode}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Sales Rep Resume - Showcase your sales performance</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
