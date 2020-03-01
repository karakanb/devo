export default function prefersDarkMode() {
  const hasMatchMedia = 'matchMedia' in window;
  if (!hasMatchMedia) {
    return false;
  }

  const darkModeQuery = '(prefers-color-scheme: dark)';

  return window.matchMedia(darkModeQuery).matches;
}
