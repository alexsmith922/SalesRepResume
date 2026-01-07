import { useState } from 'react';
import type { Profile, Role } from '../types';
import { formatCurrency } from '../utils/formatUtils';
import { AnimatedNumber } from './AnimatedNumber';

interface ProfileHeaderProps {
  profile: Profile;
  roles: Role[];
  onUpdateProfile: (profile: Profile) => void;
  isViewMode: boolean;
}

export function ProfileHeader({ profile, roles, onUpdateProfile, isViewMode }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const totalRevenue = roles.reduce((sum, role) => sum + role.revenueGenerated, 0);
  const totalCashCollected = roles.reduce((sum, role) => sum + role.cashCollected, 0);

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (isEditing && !isViewMode) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30">
              {editedProfile.profilePicture ? (
                <img src={editedProfile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
            <label className="cursor-pointer bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          <div className="flex-1 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              className="w-full bg-white/10 border border-white/30 rounded px-4 py-2 text-xl font-bold placeholder-white/50"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Current Title"
                value={editedProfile.currentTitle}
                onChange={(e) => setEditedProfile({ ...editedProfile, currentTitle: e.target.value })}
                className="bg-white/10 border border-white/30 rounded px-4 py-2 placeholder-white/50"
              />
              <input
                type="text"
                placeholder="Current Company"
                value={editedProfile.currentCompany}
                onChange={(e) => setEditedProfile({ ...editedProfile, currentCompany: e.target.value })}
                className="bg-white/10 border border-white/30 rounded px-4 py-2 placeholder-white/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="bg-white/10 border border-white/30 rounded px-4 py-2 placeholder-white/50"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={editedProfile.phone}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="bg-white/10 border border-white/30 rounded px-4 py-2 placeholder-white/50"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={editedProfile.linkedIn}
                onChange={(e) => setEditedProfile({ ...editedProfile, linkedIn: e.target.value })}
                className="bg-white/10 border border-white/30 rounded px-4 py-2 placeholder-white/50 md:col-span-2"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-medium transition">
                Save
              </button>
              <button onClick={handleCancel} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded font-medium transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30 shrink-0">
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">
            {profile.name || 'Your Name'}
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            {profile.currentTitle || 'Sales Professional'}
            {profile.currentCompany && ` at ${profile.currentCompany}`}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-blue-200 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-1 hover:text-blue-200 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {profile.phone}
              </a>
            )}
            {profile.linkedIn && (
              <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-200 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {!isViewMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
            title="Edit Profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <p className="text-blue-100 text-sm mb-1">Total Revenue Generated</p>
          <p className="text-3xl font-bold">
            <AnimatedNumber value={totalRevenue} formatter={formatCurrency} />
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <p className="text-blue-100 text-sm mb-1">Total Cash Collected</p>
          <p className="text-3xl font-bold">
            <AnimatedNumber value={totalCashCollected} formatter={formatCurrency} />
          </p>
        </div>
      </div>
    </div>
  );
}
