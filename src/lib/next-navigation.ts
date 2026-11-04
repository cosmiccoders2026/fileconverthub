import { useNavigation } from './router-context';

export function useRouter() {
  const { navigate, replace } = useNavigation();
  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => replace(url),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
  };
}

export function usePathname() {
  const { pathname } = useNavigation();
  return pathname;
}

export function useSearchParams() {
  const { search } = useNavigation();
  return new URLSearchParams(search);
}

export function notFound(): never {
  throw new Error('NEXT_NOT_FOUND');
}
