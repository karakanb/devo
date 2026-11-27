import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let listeners;
let systemDark;

const mockMatchMedia = () => {
  listeners = [];
  window.matchMedia = vi.fn().mockImplementation(() => ({
    get matches() {
      return systemDark;
    },
    addEventListener: (_event, cb) => listeners.push(cb),
  }));
};

const setSystemDark = (value) => {
  systemDark = value;
  listeners.forEach((cb) => cb({ matches: value }));
};

// In-memory Storage; Node 25+ exposes a non-functional global localStorage that shadows jsdom's.
const createStorage = () => {
  let data = {};
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    clear: () => { data = {}; },
    key: (i) => Object.keys(data)[i] ?? null,
    get length() { return Object.keys(data).length; },
  };
};

const loadStore = async () => {
  vi.resetModules();
  return (await import('@/store.js')).default;
};

describe('theme mode', () => {
  beforeEach(() => {
    const storage = createStorage();
    vi.stubGlobal('localStorage', storage);
    Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
    systemDark = false;
    mockMatchMedia();
  });

  afterEach(() => {
    delete window.matchMedia;
    vi.unstubAllGlobals();
  });

  it('defaults to system and follows the OS preference', async () => {
    systemDark = true;
    const store = await loadStore();
    expect(store.state.settings.themeMode).toBe('system');
    expect(store.state.settings.isNightMode).toBe(true);
  });

  it('updates live when the OS preference changes in system mode', async () => {
    const store = await loadStore();
    expect(store.state.settings.isNightMode).toBe(false);
    setSystemDark(true);
    expect(store.state.settings.isNightMode).toBe(true);
    setSystemDark(false);
    expect(store.state.settings.isNightMode).toBe(false);
  });

  it('ignores OS changes when light or dark is chosen explicitly', async () => {
    const store = await loadStore();
    store.dispatch('setThemeMode', 'dark');
    setSystemDark(false);
    expect(store.state.settings.isNightMode).toBe(true);

    store.dispatch('setThemeMode', 'light');
    setSystemDark(true);
    expect(store.state.settings.isNightMode).toBe(false);

    store.dispatch('setThemeMode', 'system');
    expect(store.state.settings.isNightMode).toBe(true);
  });

  it('migrates the legacy explicit night mode toggle', async () => {
    localStorage.setItem('settings.isNightMode', 'true');
    const store = await loadStore();
    expect(store.state.settings.themeMode).toBe('dark');
  });

  it('ignores a stale persisted system preference on load', async () => {
    let store = await loadStore();
    expect(store.state.settings.isNightMode).toBe(false);

    // OS switched to dark while the tab was closed; persisted state still says light.
    systemDark = true;
    mockMatchMedia();
    store = await loadStore();
    expect(store.state.settings.isNightMode).toBe(true);
  });

  it('rejects unknown theme modes', async () => {
    const store = await loadStore();
    store.dispatch('setThemeMode', 'purple');
    expect(store.state.settings.themeMode).toBe('system');
  });
});
