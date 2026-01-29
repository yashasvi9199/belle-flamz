/**
 * Formats an asset path to work in both local development and GitHub Pages.
 * Prepends the base URL to absolute paths referencing the public folder.
 */
export const getAssetPath = (path: string): string => {
  if (!path) return '';
  
  // Handle external URLs
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Ensure path doesn't have leading slash if base ends with one, 
  // but Vite's import.meta.env.BASE_URL usually includes it.
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base and path, ensuring no double slashes
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};
