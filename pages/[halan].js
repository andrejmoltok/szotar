/* eslint-disable react-hooks/rules-of-hooks */
import szotar from '../pages/api/szotar.js';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export async function getStaticPaths({}) {
    const szotar = await import('../pages/api/szotar.js').then(m => m.default);
    const paths = szotar.map((entry) => ({
        params: { halan: entry.halan}
    }));
    return { paths, fallback: false};
}

export async function getStaticProps({params}) {
    const szotar = await import('../pages/api/szotar.js').then(m => m.default);
    const wordData = szotar.find((entry) => entry.halan === params.halan);
    return { props: { wordData }};
}

const fetcher = (url) => fetch(url).then((res) => res);

export default function Word({wordData}) {

    const router = useRouter();
    
    const {halan, bekuldo2, magyarazo2, magy, datum2} = wordData;

    const { data, error, loading } = useSWR('/api/szotar.js',  fetcher);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentEntry = szotar?.[currentIndex];

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % szotar.length);
    };

    useEffect(() => {
        if (szotar.length > 0 && currentIndex >= 0 && currentIndex < szotar.length) {
            router.push(`/${szotar[currentIndex].halan}`);
        }
      }, [currentIndex, router]);

    //   if (error) {
    //     // console.log('Error loading data:', error);
    //     return <div>Failed to load data</div>;}
    //   if (!data) return <div>Loading...</div>;
    
    return (
    <>
      <div>
            <p>{currentEntry.halan}</p>
            <p>{currentEntry.bekuldo2}</p>
            <p>{currentEntry.magyarazo2}</p>
            <p>{currentEntry.magy}</p>
            <p>{currentEntry.datum2.slice(0,10)}</p>
        </div>
        <button onClick={handleNext}>{'>'}</button>
    </>
    )
}