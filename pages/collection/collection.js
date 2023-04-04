import szotar from '../api/szotar';
import styles from '../../styles/Collection.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Collection() {

    const router = useRouter();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedName, setSelectedName] = useState(null);
  
    const handleClickWithName = (name) => {
        if (isCollapsed) {
          setIsCollapsed(false);
          setSelectedName(null);
        } else {
          setIsCollapsed(true);
          setSelectedName(name);
        }
    };

    const handleClick = () => {
        if (isCollapsed) {
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    }
  
    const contentStyle = {
      height: isCollapsed ? 40 : '85vh',
      transition: 'height 0.3s ease-in-out',
    };

    const uniqueKeys = new Set();
    szotar.forEach((entry) => {
      if (entry.magyarazo2 && entry.bekuldo2 !== undefined) {
        uniqueKeys.add(entry.magyarazo2);
        uniqueKeys.add(entry.bekuldo2);
      }
    });

    const handleHome = () => {
        router.push(`/`);
    };
    
    const handleIdorend = () => {
        router.push(`/idorend/${szotar[0].halan}`);
    };
    
    const handleABC = () => {
        router.push(`/abc/a`);
    };
    
    const handleStat = () => {
        router.push(`/stat/`);
    };

    return (
        <>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerMenuHome} onClick={handleHome}>Főoldal</div>
                <div className={styles.entryContainerMenuIdorend} onClick={handleIdorend}>Időrend</div>
                <div className={styles.entryContainerMenuABC} onClick={handleABC}>ABC</div>
                <div className={styles.entryContainerMenuStat} onClick={handleStat}>Statisztika</div>
            </div>
            {!isCollapsed ? 
                <div className={styles.collapsible} style={contentStyle}>
                    <ul className={styles.notSelectedName}>{Array.from(uniqueKeys).map((key, index) => (
                        <li 
                            key={index} 
                            className={styles.collapsibleNames} 
                            onClick={() => handleClickWithName(key)}>
                                {key}
                        </li>
                        ))}
                    </ul>
                </div> : 
                <>
                    <div className={styles.ULStyle}>
                        <div className={styles.selectedName} onClick={handleClick}>
                            <div className={styles.selectedNameChild}>{selectedName}</div>
                            <div className={styles.selectedNameChild}>Beküldött: 
                                {szotar.reduce((p,c) => {selectedName === c.bekuldo2? p++:p;return p},0)}
                            </div>
                            <div className={styles.selectedNameChild}>Magyarázott:
                                {szotar.reduce((p,c) => {selectedName === c.magyarazo2? p++:p;return p},0)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.wordsLists}>
                        <div>
                            <div className={styles.bekuldo2}>Beküldött</div>
                                    <ul className={styles.words}>{szotar.map((entry,index) => (
                                        selectedName === entry.bekuldo2 ? 
                                        <li key={index} className={styles.innerWords}>
                                            {entry.halan}
                                        </li> : null))}
                                    </ul>
                            </div>
                        <div>
                        <div className={styles.magyarazo2}>Magyarázott</div>
                            <ul className={styles.words}>{szotar.map((entry,index) => (
                                selectedName === entry.magyarazo2 ? 
                                    <li key={index} className={styles.innerWords}>
                                        {entry.halan}
                                    </li> : null))}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
