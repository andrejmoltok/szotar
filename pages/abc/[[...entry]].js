<div className={styles.entryMain}>
        <div className={styles.entryContainer}>
            <div className={styles.entryContainerH1}>
                <h1>{entry.halan}</h1>
            </div>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerBekuldo2}><div style={{paddingRight: '5px'}}>Beküldő:</div><div>{currentEntry.bekuldo2 ? currentEntry.bekuldo2 : 'Törölt Tag'}</div></div>
                <div className={styles.entryContainerMagyarazo2}><div style={{paddingRight: '5px'}}>Magyarázó:</div><div>{currentEntry.magyarazo2 ? currentEntry.magyarazo2 : 'Törölt Tag'}</div></div>
                <div className={styles.entryContainerDatum2}><div style={{paddingRight: '5px'}}>Dátum:</div><div>{currentEntry.datum2.slice(0,10)}</div></div>
                <div className={styles.entryContainerIndex}><div>{`${currentIndex}/${szotar.length}`}</div></div>
            </div>
            <div className={styles.entryContainerMagy}>
                {currentEntry.magy ? currentEntry.magy : 'Törölt Tag'}
            </div>
            <div className={styles.entryContainerNevek}>
                <div className={styles.entryContainerMenuHome} onClick={handleHome}>Főoldal</div>
                <div className={styles.entryContainerMenuABC} onClick={handleABC}>ABC</div>
                <div className={styles.entryContainerMenuCollection} onClick={handleCollection}>Szógyűjtő</div>
                <div className={styles.entryContainerMenuStat} onClick={handleStat}>Statisztika</div>
            </div>
        </div>
</div>