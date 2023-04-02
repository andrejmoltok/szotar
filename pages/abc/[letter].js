import { useRouter } from 'next/router';
// import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import szotar from '../szotar.js';
import styles from '../../styles/Abc.module.css';

const alphabet = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz".split("");

export default function LetterPage({ entries }) {
  const router = useRouter();
  const { letter } = router.query
  
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
            <Link  href={`/abc/${letter}`} className={styles.link}>
              {letter.toUpperCase()}
            </Link>
            </div>
          ))}
        
    </div>
    <div className={styles.entry}>
      <ul>
        {entries && entries.length > 0 && entries.sort((a,b) => a.halan.toLowerCase().localeCompare(b.halan.toLowerCase(), 'hu-HU', { sensitivity: 'base'})).map((entry, index) => (
          <li key={index}>{entry.halan}</li>
        ))}
      </ul>
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