import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { createDocument } from '../../services/documentsServices';
import { useDocument } from '../../context/DocumentContext';

const Home = () => {
  useEffect(() => {
    document.title = "Motspetits";
  }, []);

  const navigate = useNavigate();
  const [errorNewDoc, setErrorNewDoc] = useState('');
  const { setDocument } = useDocument();
  const [isCreating, setIsCreating] = useState(false);

  const handleclickNewDoc = async (e) => {
    e.preventDefault();
    setErrorNewDoc('');
    setIsCreating(true);
    try {
    const data = await createDocument('Untitled', '{}');
     if (data) {
        navigate(`/document`);
      } else {
        setErrorNewDoc('Failed to create document');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      setErrorNewDoc('An error occurred while creating the document');
    } finally {
      setIsCreating(false);
    }

  }


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
       <button 
          className={styles.button}
          onClick={handleclickNewDoc}
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : '+ New'}
        </button>
        <button 
          className={styles.button}
        >
          Filter
        </button>
        {errorNewDoc && (
        <div className={styles.error}>{errorNewDoc}</div>
      )}
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
