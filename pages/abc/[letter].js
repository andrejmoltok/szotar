import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import szotar from '../api/szotar.js';
import styles from '../../styles/Abc.module.css';

const alphabet = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz".split("");

export default function Letter({ entries }) {
  const router = useRouter();
  const { letter } = router.query

  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedEntries = useMemo(() => {
    if (entries && entries.length > 0) {
      return entries.sort((a,b) => a.halan.toLowerCase().localeCompare(b.halan.toLowerCase(), 'hu-HU', { sensitivity: 'base'}));
    }
    return [];
  }, [entries]);

  const handleIndex = (index) => {
    setCurrentIndex(index);
  };

  const handleHome = () => {
    router.push(`/`);
  };

  const handleIdorend = () => {
    router.push(`/idorend/${szotar[0].halan}`);
  };

  const handleCollection = () => {
    router.push(`/collection/`);
  };

  const handleStat = () => {
    router.push(`/stat/`);
  };
  
  // Render the entries list
  return (
    <>
    <Head>
        <title>Értelmetlenező Szótár Prodzsekt</title>
        <meta name="description" content="Értelmetlenező Szótár Prodzsekt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon16.png" />
    </Head>
    <div className={styles.entryH1}><h1>{letter.toUpperCase()}</h1></div>
    <div className={styles.abcLinks}>       
          {alphabet.map((letter, index) => (
            <div key={index} className={styles.linkCont}>
            <Link  href={`/abc/${letter}`} className={styles.link} onClick={() => {setHalan(0)}}>
              {letter.toUpperCase()}
            </Link>
            </div>
          ))}
    </div>
    <div className={styles.middleSection}>
      <div className={styles.entry}>
        <ul>
          {sortedEntries.map((entry, index) => (
            <li key={index}>
              <div onClick={() => {handleIndex(index)}} className={styles.entriesLink}>{entry.halan}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.halan}>
      <div className={styles.entryMain}>
        <div className={styles.entryContainer}>
            <div className={styles.entryContainerH1}>
                <h1>{entries[currentIndex].halan}</h1>
            </div>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerBekuldo2}><div style={{paddingRight: '5px'}}>Beküldő:</div>
                      <div>{entries[currentIndex].bekuldo2 ? entries[currentIndex].bekuldo2 : 'Törölt Tag'}</div>
                </div>
                <div className={styles.entryContainerMagyarazo2}><div style={{paddingRight: '5px'}}>Magyarázó:</div>
                      <div>{entries[currentIndex].magyarazo2 ? entries[currentIndex].magyarazo2 : 'Törölt Tag'}</div>
                </div>
                <div className={styles.entryContainerDatum2}><div style={{paddingRight: '5px'}}>Dátum:</div>
                      <div>{entries[currentIndex].datum2.slice(0,10)}</div>
                </div>
                <div className={styles.entryContainerIndex}>
                      <div>{`${currentIndex}/${entries.length-1}`}</div>
                </div>
            </div>
            <div className={styles.entryContainerMagy}>
                {entries[currentIndex].magy ? entries[currentIndex].magy : 'Törölt Tag'}
            </div>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerMenuHome} onClick={handleHome}>Főoldal</div>
                <div className={styles.entryContainerMenuABC} onClick={handleIdorend}>Időrend</div>
                <div className={styles.entryContainerMenuCollection} onClick={handleCollection}>Szógyűjtő</div>
                <div className={styles.entryContainerMenuStat} onClick={handleStat}>Statisztika</div>
            </div>
        </div>
    </div>
    </div>
    </div>
  </>
  )
}

// This function will be called at build time
export async function getStaticPaths() {
  // Get the unique first letters of all entries in the szotar.json file
  const firstLetters = [...new Set(szotar.map((entry) => entry.halan.charAt(0).toLowerCase()))];

  // Create an array of paths with the unique first letters
  const paths = firstLetters.map((letter) => ({
    params: { letter: letter.toLowerCase() },
  }));

  // Return the paths object to Next.js
  return { paths, fallback: false };
}

// This function will be called at build time for each unique first letter
export async function getStaticProps({ params }) {
  // Get all the entries that start with the first letter from szotar.json file

  const entries = szotar.filter((entry) => entry.halan.charAt(0).toLowerCase() === params.letter.toLowerCase());
  
  return { props: { entries } };
}