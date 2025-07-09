import { useEffect, useState } from 'react';
import styles from './edittext.module.css';

const TextEditor = () => {

  useEffect(() => {
    document.title = "Edit text - Motspetits";
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img src="/documentsicon.png" className={styles.logo} />
          <input type="text" placeholder="Your title..." className={styles.title} />
        </div>
        <div className={styles.menubar}>
          
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
