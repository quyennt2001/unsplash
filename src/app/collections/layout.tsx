import FooterCollection from '@/components/collection/FooterCollection';
import * as React from 'react';

export interface ILayoutCollectionProps {
}

export default function LayoutCollection ({
    children
  }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <footer>
        <FooterCollection />
      </footer>
    </div>
  );
}
