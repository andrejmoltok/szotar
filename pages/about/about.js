import szotar from '../api/szotar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/About.module.css';

export default function About() {

    const router = useRouter();

    const handleHome = () => {
        router.push(`/`);
    };
    
    const handleIdorend = () => {
        router.push(`/idorend/${szotar[0].halan}`);
    };
    
    const handleABC = () => {
        router.push(`/abc/a`);
    };
    
    const handleCollection = () => {
        router.push(`/collection/collection`);
    };

    return (
        <>
        <Head>
            <title>Értelmetlenező Szótár Prodzsekt</title>
            <meta name="description" content="Értelmetlenező Szótár Prodzsekt" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon16.png" />
        </Head>
        <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerMenuHome} onClick={handleHome}>Főoldal</div>
                <div className={styles.entryContainerMenuIdorend} onClick={handleIdorend}>Időrend</div>
                <div className={styles.entryContainerMenuABC} onClick={handleABC}>ABC</div>
                <div className={styles.entryContainerMenuCollection} onClick={handleCollection}>Szógyűjtő</div>
        </div>
        <div className={styles.container}>
            <div className={styles.title}><h1>Rólunk</h1></div>
            <div className={styles.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, exercitationem. Sapiente rerum modi, obcaecati alias necessitatibus culpa praesentium rem fugit fuga, at molestias deserunt sunt ipsa perspiciatis quo saepe. Cumque!
            </div>
        </div>
        </>
    )

}