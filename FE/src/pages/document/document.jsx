import styles from './document.module.css';
import logo from '../../assets/logo.png';
import folderIcon from '../../assets/logo-folder.png'
const Document = () => (
  <div className={styles.container}>
    {/* Header */}
    <div className={styles.header}>
      <img src={logo} className={styles.logo} />
      <input className={styles.search} placeholder="Search..." />
      <img src="/avatar.png" className={styles.avatar} />
    </div>

    {/* Documents Section */}
    <div className={styles.section}>
      <div className={styles.sectionTitle}>DOCUMENTS</div>
      <button className={styles.newBtn}>+ NEW</button>
      <button className={styles.filterBtn}>FILTER</button>
    </div>

    {/* Folder Section */}
    <div className={styles.folderSection}>
      <div className={styles.sectionTitle}>FOLDER</div>
      <div className={styles.folderList}>
        {[1,2,3,4].map(i => (
          <div className={styles.folder} key={i}>
            <img src={folderIcon} />
            <div>Folder A</div>
            <div>20 files</div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Section */}
    <div className={styles.recentSection}>
      <div className={styles.sectionTitle}>Recent</div>
      <div className={styles.recentList}>
        {[1,2,3,4].map(i => (
          <div className={styles.recentFile} key={i}>
            <img src={folderIcon} />
            <div>DCT Là con chó</div>
            <div>08/03/2005</div>
          </div>
        ))}
      </div>
    </div>

    {/* All Files Table */}
    <div className={styles.allFilesSection}>
      <div className={styles.sectionTitle}>All files</div>
      <table className={styles.fileTable}>
        <thead>
          <tr>
            <th>Name ↓</th>
            <th>Upload by ↓</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4].map(i => (
            <tr key={i}>
              <td>
                <img src="/file-icon.png" className={styles.fileIcon} />
                Uyên Thy nè
              </td>
              <td>
                <img src="/avatar.png" className={styles.avatarSmall} />
                Uyên Thy
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Document;