import type { SalesRepData } from '../types';

export function encodeDataToUrl(data: SalesRepData): string {
  const jsonString = JSON.stringify(data);
  const encoded = btoa(encodeURIComponent(jsonString));
  return encoded;
}

export function decodeDataFromUrl(encoded: string): SalesRepData | null {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}

export function getShareableUrl(data: SalesRepData): string {
  const encoded = encodeDataToUrl(data);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?data=${encoded}`;
}

export function getDataFromUrlParams(): SalesRepData | null {
  const params = new URLSearchParams(window.location.search);
  const dataParam = params.get('data');
  if (dataParam) {
    return decodeDataFromUrl(dataParam);
  }
  return null;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
