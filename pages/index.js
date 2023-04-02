import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import szotar from './api/szotar.js';
import styles from '../styles/Index.module.css';

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIdoRend = () => {
    Router.push(`/idorend/${szotar[currentIndex].halan}`);
  };

  const handleABC = () => {
    Router.push(`/abc/A/`);
  };

  const handleCollection = () => {
    Router.push('/collection');
  };

  const handleStat = () => {
    Router.push('/stat');
  };

  return (
    <>
    <Head>
        <title>Értelmetlenező Szótár Prodzsekt</title>
        <meta name="description" content="Értelmetlenező Szótár Prodzsekt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon16.png" />
      </Head>
    <div className={styles.container}>
      <div className={styles.btn} onClick={handleIdoRend}>
        <div className={styles.h3Clock}>Időrend</div>
      </div>
      <div className={styles.btn} onClick={handleABC}>
        <div className={styles.h3ABC}>ABC</div>
      </div>
      <div className={styles.btn} onClick={handleCollection}>
        <div className={styles.h3Collection}>Szógyűjtő</div>
      </div>
      <div className={styles.btn} onClick={handleStat}>
        <div className={styles.h3Stat}>Statisztika</div>
      </div>
    </div>
    <div className={styles.attrib}>
      <div>
        <Link href="https://www.freepik.com/free-vector/abstract-low-poly-connection-lines-digital-technology-background_8562956.htm#query=data&position=2&from_view=keyword&track=sph" target='_blank'>
          Image by starline on Freepik
        </Link>
      </div>
      <div>
        <Link href="https://www.freepik.com/free-vector/bar-charts_38271363.htm#query=bar%20chart&position=9&from_view=search&track=ais" target='_blank'>
          Image by Sicily87 on Freepik
        </Link>
      </div>
      <div>
        <Link href="https://www.goodfreephotos.com/" target='_blank'>
          Good Free Photos
        </Link>
      </div>
      <div>
        <Link target="_blank" href="https://icons8.com/icon/66846/circled-a">
          Circled A icon by icons8
        </Link>
      </div>
    </div>
    </>
  )
}