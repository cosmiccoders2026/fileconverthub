import React, { AnchorHTMLAttributes, forwardRef, MouseEvent } from 'react';
import { useNavigation } from './router-context';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asChild?: boolean;
  replace?: boolean;
  scroll?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, onClick, asChild, replace = false, scroll = true, ...props }, ref) => {
    const { navigate, replace: routerReplace } = useNavigation();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);
      if (
        !e.defaultPrevented &&
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        href &&
        href.startsWith('/')
      ) {
        e.preventDefault();
        if (replace) {
          routerReplace(href);
        } else {
          navigate(href);
        }
        if (scroll) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as any;
      return React.cloneElement(children as React.ReactElement<any>, {
        onClick: (e: MouseEvent<HTMLAnchorElement>) => {
          childProps?.onClick?.(e);
          handleClick(e);
        },
        ...props,
      });
    }

    return (
      <a ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
export default Link;
