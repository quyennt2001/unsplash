import * as React from 'react';

export interface ISkPhotoProps {
}

export default function SkPhoto (props: ISkPhotoProps) {
  return (
    <div className='w-main grid grid-cols-3 gap-5 grid-rows-2'>
        <div className='w-full h-[300px] bg-sketelon'></div>
        <div className='w-full h-[300px] bg-sketelon'></div>
        <div className='w-full h-[300px] bg-sketelon'></div>
        <div className='w-full h-[300px] bg-sketelon'></div>
        <div className='w-full h-[300px] bg-sketelon'></div>
        <div className='w-full h-[300px] bg-sketelon'></div>
    </div>
  );
}
