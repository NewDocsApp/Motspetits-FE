import { useEffect } from 'react';
import styles from './home.module.css';

const Home = () => {
  useEffect(() => {
    document.title = "Motspetits";
  }, []);

  return (
    <div className={styles.container}> 
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <img src="/logo.png" alt="Motspetits Logo" style={{ width: '100px'}} />
        <input type="text" placeholder="Search for documents..." className={styles.searchbar} />
        <img src='/bg.jpg' alt="Avatar" className={styles.avatar} />
      </div>
      <div className={styles.headtitle}>DOCUMENTS</div>
     <div className={styles.whiteline}></div>
     <div style={{  flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px'}}>
       <button className={styles.button}>+ New</button>
       <button className={styles.button}>Filter</button>
     </div>
      <div className={styles.headtitle}>Folder</div>
      <div className={styles.whiteline}></div>
      
      <div className={styles.headtitle}>Recent</div>
      <div className={styles.whiteline}></div>

      <div className={styles.headtitle}>All files </div>
      <div className={styles.wrapper}>
      <div className={styles.table}>
        <div className={styles.tableheader}>
          <span>Name</span>
          <span>Size</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
