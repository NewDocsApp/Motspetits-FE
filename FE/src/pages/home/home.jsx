import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { createDocument, getUserDocument } from '../../services/documentsServices';
import { useDocument } from '../../context/DocumentContext';

const Home = () => {
  useEffect(() => {
    document.title = "Motspetits";
  }, []);

  const navigate = useNavigate();
  const [errorNewDoc, setErrorNewDoc] = useState('');
  const { setDocument } = useDocument();
  const [isCreating, setIsCreating] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  const handleclickNewDoc = async (e) => {
    e.preventDefault();
    setErrorNewDoc('');
    setIsCreating(true);
    
    try {
      const data = await createDocument('Untitled', '{}');
      if (data) {
        setDocument(data);
        await fetchDocument();
        navigate(`/document/${data.id}`);
      } else {
        setErrorNewDoc('Failed to create document');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      setErrorNewDoc('An error occurred while creating the document');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDocumentClick = useCallback((doc) => {
    setDocument(doc);
    navigate(`/document/${doc.id}`);
  }, [setDocument, navigate]);

  const fetchDocument = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorNewDoc('');
      const data = await getUserDocument();
      console.log('Fetched documents:', data);
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setErrorNewDoc(`Failed to load documents: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);


  const filteredDocuments = useMemo(() => {
    const docs = Array.isArray(documents) ? documents : [];
    const filtered = docs.filter(doc =>
      (doc.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) => new Date(b.modified || b.createdAt) - new Date(a.modified || a.createdAt));
  }, [documents, searchTerm]);


  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const getDocumentSize = useCallback((content) => {
    try {
      const parsedContent = JSON.parse(content);
      const textLength = parsedContent.text ? parsedContent.text.length : 0;
      return textLength < 1000 ? `${textLength} chars` : `${(textLength/1000).toFixed(1)}KB`;
    } catch {
      return '0 chars';
    }
  }, []);

  const handleFilterClick = () => {
    console.log('Filter clicked');
  };

  const handleRefresh = async () => {
    await fetchDocument();
  };

  return (
    <div className={styles.container}> 
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <img src="/logo.png" alt="Motspetits Logo" style={{ width: '100px'}} />
        <input 
          type="text" 
          placeholder="Search for documents..." 
          className={styles.searchbar} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src='/bg.jpg' alt="Avatar" className={styles.avatar} />
      </div>
      
      <div className={styles.headtitle}>DOCUMENTS</div>
      <div className={styles.whiteline}></div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={styles.button}
            onClick={handleclickNewDoc}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : '+ New'}
          </button>
          <button 
            className={styles.button}
            onClick={handleFilterClick}
          >
            Filter
          </button>
          <button 
            className={styles.button}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        {errorNewDoc && (
          <div className={styles.error}>{errorNewDoc}</div>
        )}
      </div>
      
      <div className={styles.headtitle}>Folder</div>
      <div className={styles.whiteline}></div>
      
      <div className={styles.headtitle}>Recent</div>
      <div className={styles.whiteline}></div>

      <div className={styles.headtitle}>All files</div>
      <div className={styles.wrapper}>
        <div className={styles.table}>
          <div className={styles.tableheader}>
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
          </div>
          {isLoading ? (
            <div className={styles.loading}>Loading documents...</div>
          ) : filteredDocuments.length === 0 ? (
            <div className={styles.empty}>
              {searchTerm ? 'No documents found matching your search.' : 'No documents yet. Create your first document!'}
            </div>
          ) : (
            filteredDocuments.map(doc => (
              <div 
                key={doc.id} 
                className={styles.tablerow}
                onClick={() => handleDocumentClick(doc)}
                style={{ cursor: 'pointer' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDocumentClick(doc);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open document ${doc.title}`}
              >
                <span>{doc.title}</span>
                <span>{getDocumentSize(doc.content)}</span>
                <span>{formatDate(doc.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;