import { useState, useEffect } from 'react';
import type { Role } from '../types';
import { formatCurrency, formatPercentage, getCompanyLogoUrl, formatDateRange, getIndustryColors } from '../utils/formatUtils';

interface RoleCardProps {
  role: Role;
  onUpdate: (role: Role) => void;
  onDelete: (id: string) => void;
  isViewMode: boolean;
}

export function RoleCard({ role, onUpdate, onDelete, isViewMode }: RoleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditedRole] = useState(role);
  const [logoError, setLogoError] = useState(false);

  // Reset states when role prop changes
  useEffect(() => {
    setEditedRole(role);
    setLogoError(false);
  }, [role]);

  const logoUrl = getCompanyLogoUrl(role.companyDomain);
  const industryColors = role.industry ? getIndustryColors(role.industry) : null;

  const handleSave = () => {
    onUpdate(editedRole);
    setIsEditing(false);
    setLogoError(false);
  };

  const handleCancel = () => {
    setEditedRole(role);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Role, value: string | number | boolean) => {
    setEditedRole({ ...editedRole, [field]: value });
    if (field === 'companyDomain') {
      setLogoError(false);
    }
  };

  if (isEditing && !isViewMode) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {editedRole.companyDomain && !logoError ? (
              <img
                src={getCompanyLogoUrl(editedRole.companyDomain)}
                alt="Company logo"
                className="w-full h-full object-contain p-2"
                onError={() => setLogoError(true)}
              />
            ) : (
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company Name"
              value={editedRole.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="border rounded px-3 py-2 text-gray-800"
            />
            <div>
              <input
                type="text"
                placeholder="Domain for logo (e.g. salesforce.com)"
                value={editedRole.companyDomain}
                onChange={(e) => handleInputChange('companyDomain', e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-800"
              />
              <p className="text-xs text-gray-500 mt-1">Just the domain, no https:// or www</p>
            </div>
            <input
              type="text"
              placeholder="Your Title"
              value={editedRole.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="border rounded px-3 py-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Industry"
              value={editedRole.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="border rounded px-3 py-2 text-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Revenue Generated ($)</label>
            <input
              type="number"
              value={editedRole.revenueGenerated || ''}
              onChange={(e) => handleInputChange('revenueGenerated', parseFloat(e.target.value) || 0)}
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cash Collected ($)</label>
            <input
              type="number"
              value={editedRole.cashCollected || ''}
              onChange={(e) => handleInputChange('cashCollected', parseFloat(e.target.value) || 0)}
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Show Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={editedRole.showRate || ''}
              onChange={(e) => handleInputChange('showRate', parseFloat(e.target.value) || 0)}
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Revenue Per Call ($)</label>
            <input
              type="number"
              value={editedRole.revenuePerCall || ''}
              onChange={(e) => handleInputChange('revenuePerCall', parseFloat(e.target.value) || 0)}
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Start Date</label>
            <input
              type="month"
              value={editedRole.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <input
              type="month"
              value={editedRole.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              disabled={editedRole.isCurrent}
              className="w-full border rounded px-3 py-2 text-gray-800 disabled:bg-gray-100"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editedRole.isCurrent}
                onChange={(e) => handleInputChange('isCurrent', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Current Role</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition">
            Save
          </button>
          <button onClick={handleCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition">
            Cancel
          </button>
          <button onClick={() => onDelete(role.id)} className="ml-auto bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded font-medium transition">
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
          {role.companyDomain && !logoError ? (
            <img
              src={logoUrl}
              alt={`${role.companyName} logo`}
              className="w-full h-full object-contain p-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{role.companyName || 'Company Name'}</h3>
              <p className="text-gray-600">{role.title || 'Title'}</p>
              {(role.startDate || role.isCurrent) && (
                <p className="text-gray-500 text-sm mt-1">
                  {formatDateRange(role.startDate, role.endDate, role.isCurrent)}
                </p>
              )}
              {role.industry && industryColors && (
                <span className={`${industryColors.bg} ${industryColors.text} text-xs px-2 py-1 rounded inline-block mt-1`}>
                  {role.industry}
                </span>
              )}
            </div>
            {!isViewMode && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-600 p-1 transition"
                title="Edit Role"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Revenue Generated</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(role.revenueGenerated)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Cash Collected</p>
          <p className="text-lg font-bold text-blue-600">{formatCurrency(role.cashCollected)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Show Rate</p>
          <p className="text-lg font-bold text-purple-600">{formatPercentage(role.showRate)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Revenue/Call</p>
          <p className="text-lg font-bold text-orange-600">{formatCurrency(role.revenuePerCall)}</p>
        </div>
      </div>
    </div>
  );
}
