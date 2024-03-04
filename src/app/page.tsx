import Navbar from '@/components/Navbar';
import * as React from 'react';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  return (
    <div>
      <Navbar />
    </div>
  );
}
