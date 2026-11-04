import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

interface RouterContextType {
  pathname: string;
  search: string;
  navigate: (url: string) => void;
  replace: (url: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  search: '',
  navigate: () => {},
  replace: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/');
  const [search, setSearch] = useState(() => window.location.search || '');
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setPathname(window.location.pathname || '/');
        setSearch(window.location.search || '');
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (url: string) => {
    if (!url) return;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      window.location.href = url;
      return;
    }
    const [newPath, newSearch = ''] = url.split('?');
    window.history.pushState(null, '', url);
    startTransition(() => {
      setPathname(newPath || '/');
      setSearch(newSearch ? `?${newSearch}` : '');
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const replace = (url: string) => {
    if (!url) return;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      window.location.replace(url);
      return;
    }
    const [newPath, newSearch = ''] = url.split('?');
    window.history.replaceState(null, '', url);
    startTransition(() => {
      setPathname(newPath || '/');
      setSearch(newSearch ? `?${newSearch}` : '');
    });
  };

  return (
    <RouterContext.Provider value={{ pathname, search, navigate, replace }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useNavigation() {
  return useContext(RouterContext);
}
