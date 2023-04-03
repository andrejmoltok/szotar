// import szotar from '../api/szotar';
import path from 'path';
import fs from 'fs';
import styles from '../../styles/Collection.module.css';
import { useRef, useState, useEffect } from 'react';

export default function Collection({szotar}) {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(null);
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
      height: isCollapsed ? 40 : '100%',
      overflow: 'hidden',
      transition: 'height 0.3s ease-in-out',
    };

    const uniqueKeys = new Set();
    szotar.forEach((entry) => {
      if (entry.magyarazo2 && entry.bekuldo2 !== undefined) {
        uniqueKeys.add(entry.magyarazo2);
        uniqueKeys.add(entry.bekuldo2);
      }
    });

    // const magyarazott = 

    return (
        <>
            {!isCollapsed ? 
                <div className={styles.collapsible} style={contentStyle} ref={contentRef}>
                    <ul className={styles.ULStyle}>{Array.from(uniqueKeys).map((key, index) => (
                        <li 
                            key={index} 
                            className={styles.collapsibleNames} 
                            onClick={() => handleClickWithName(key)}>
                                {key}
                        </li>
                        ))}
                    </ul></div> : 
                <>
                    <ul className={styles.ULStyle}>
                        <li className={styles.selectedName} onClick={handleClick}>
                            {selectedName}
                        </li>
                    </ul>
                    <div>
                        <div>Beküldött</div>
                        <div>Magyarázott</div>
                    </div>
                </>
            }
        </>
    )
}

export async function getStaticProps() {
    const szotarFilePath = path.join(process.cwd(), '/pages/szotar/szotar.js');
    const szotarData = fs.readFileSync(szotarFilePath, 'utf-8');
    const szotar = JSON.parse(szotarData);
  
    return {
      props: {
        szotar: JSON.parse(JSON.stringify(szotar)),
      },
    };
}