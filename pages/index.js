import { useEffect, useState } from 'react';
import Router from 'next/router';
import szotar from './api/szotar.js';

export default function Home({ initialData }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentData, setCurrentData] = useState(initialData[0]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % initialData.length);
    setCurrentData(initialData[(currentIndex + 1) % initialData.length]);
  };

  useEffect(() => {
    Router.push(`/${szotar[currentIndex].halan}`);
  },[currentIndex]);

  return (
    <>
    {szotar.length > 0 && (
        <>
            <p>{currentData.halan}</p>
            <p>{currentData.bekuldo2}</p>
            <p>{currentData.magyarazo2}</p>
            <p>{currentData.magy}</p>
            <p>{currentData.datum2.slice(0,10)}</p>
        </>
    )}
    <button onClick={handleNext}>{'>'}</button>
  </>
  )
}

export async function getStaticProps() {
  const initialData = szotar.slice(0, 1);
  return { props: { initialData } };
}