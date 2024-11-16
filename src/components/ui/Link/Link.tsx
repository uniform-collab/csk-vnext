import { FC } from 'react';
import NextLink from 'next/link';
import { cn } from '@/utils';
import { LinkProps } from '.';

export const Link: FC<LinkProps> = ({ children, link, openInNewTab, className }) => (
  <NextLink
    href={link}
    className={cn(
      '[&:hover_img]:scale-[0.98] [&_img]:transition-transform hover:underline transition-transform',
      className
    )}
    target={openInNewTab ? '_blank' : '_self'}
  >
    {children}
  </NextLink>
);