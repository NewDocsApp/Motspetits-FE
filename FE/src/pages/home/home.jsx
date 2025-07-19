import { useEffect, useState } from 'react';
import styles from './home.module.css';
import documentApi from '../../apis/document';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Motspetits";
    const fetchDocuments = async () => {
      try {
        const res = await documentApi.getUserDocuments();
        setDocuments(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 24 }}>
        <img src="/logo.png" alt="Motspetits Logo" style={{ width: '80px' }} />
        <input type="text" placeholder="Search for documents..." className={styles.searchbar} />
        <img src='/bg.jpg' alt="Avatar" className={styles.avatar} />
      </div>

      {/* Documents Section */}
      <div className={styles.headtitle}>DOCUMENTS</div>
      <div className={styles.whiteline}></div>
      <div style={{ display: 'flex', gap: 16, marginLeft: 30, marginTop: 10 }}>
        <button className={styles.button}>+ NEW</button>
        <button className={styles.button}>FILTER</button>
      </div>

      {/* Folder Section */}
      <div className={styles.headtitle}>FOLDER</div>
      <div className={styles.whiteline}></div>
      <div style={{ display: 'flex', gap: 24, marginLeft: 30, marginTop: 16 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 16,
            padding: 20,
            width: 140,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <img src="/folder.png" alt="Folder" style={{ width: 48, marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: '#5288ca' }}>Folder A</div>
            <div style={{ color: '#b0b0b0', fontSize: 14 }}>20 files</div>
          </div>
        ))}
      </div>

      {/* Recent Section */}
      <div className={styles.headtitle}>Recent</div>
      <div className={styles.whiteline}></div>
      <div style={{ display: 'flex', gap: 16, marginLeft: 30, marginTop: 16 }}>
        {documents.map(doc => 
        
        (
          <div key={doc} style={{
            background: '#fff',
            borderRadius: 12,
            padding: '12px 20px',
            width: 180,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <img src="/icon_file.png" alt="File" style={{ width: 32 }} />
            <div>
              <div style={{ fontWeight: 600, color: '#5288ca', fontSize: 15 }}>{doc.title}</div>
              <div style={{ color: '#b0b0b0', fontSize: 13 }}>{doc.createdAt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* All files table */}
      <div className={styles.headtitle}>All files </div>
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.tableheader}>
            <span>Name ↓</span>
            <span>Upload by ↓</span>
          </div>
          {documents && documents.length > 0 ? (
            documents.map(doc => (
              <div className={styles.tablerow} key={doc.id}
                  onClick={() => navigate(`/edit/${doc.id}`)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="icon_file.png" alt="File" style={{ width: 24 }} />
                  {doc.title || doc.name}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src="/bg.jpg" alt="Avatar" style={{ width: 24, borderRadius: '50%' }} />
                  {doc.uploader || "Uyên Thy"}
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: 24, color: '#b0b0b0', textAlign: 'center' }}>No documents found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;