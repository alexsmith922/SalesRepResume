export function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function formatRevenuePerCall(amount: number): string {
  return `$${Math.round(amount).toLocaleString()}`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function getCompanyLogoUrl(domain: string): string {
  if (!domain) return '';
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  return `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;
}

// Generate consistent colors based on industry name
export function getIndustryColors(industry: string): { bg: string; text: string } {
  const colors = [
    { bg: 'bg-blue-100', text: 'text-blue-700' },
    { bg: 'bg-green-100', text: 'text-green-700' },
    { bg: 'bg-purple-100', text: 'text-purple-700' },
    { bg: 'bg-orange-100', text: 'text-orange-700' },
    { bg: 'bg-pink-100', text: 'text-pink-700' },
    { bg: 'bg-teal-100', text: 'text-teal-700' },
    { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    { bg: 'bg-rose-100', text: 'text-rose-700' },
    { bg: 'bg-amber-100', text: 'text-amber-700' },
    { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  ];

  // Simple hash function to get consistent color for same industry
  let hash = 0;
  for (let i = 0; i < industry.length; i++) {
    hash = industry.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function formatDateRange(startDate: string, endDate: string, isCurrent: boolean): string {
  const formatMonth = (dateStr: string) => {
    if (!dateStr) return '';
    // Parse YYYY-MM format correctly by adding day
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const start = formatMonth(startDate);
  const end = isCurrent ? 'Present' : formatMonth(endDate);

  if (start && end) {
    return `${start} - ${end}`;
  }
  return start || end || '';
}
