import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './edittext.module.css';

const  modules = {
                toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    ['blockquote', 'code-block'],
                    ['link', 'image'],
                    ['clean']
                ]
              };

const TextEditor = () => {

  const [content, setContent] = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    document.title = "Edit text - Motspetits";
  }, []);

  
  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleSave = () => {
  };

  const handlePrint = () => {
  };

  const handleExport = () => {
  };


  return (
    <div>
      <div className={styles.header}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img src="/icon_file.png" className={styles.logo} />
          <input type="text" placeholder="Your title..." className={styles.title} />
          

        </div>
          <div className={styles.menubar}>
            {['File', 'Help'].map((menu) => (
            <div
              key={menu}
              className={styles.menuItem}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
              {openMenu === menu && (
                <div className={styles.dropdown}>
                  {menu === 'File' && (
                    <>
                      <div onClick={handleSave}>Save</div>
                      <div onClick={handleExport}>Export</div>
                      <div onClick={handlePrint}>Print</div>
                    </>
                  )}
                  {menu === 'Help' && (
                    <>
                      <div>Documentation</div>
                      <div>About us</div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
          </div>

      </div>
        <div className={styles.word}>
          <ReactQuill 
          theme="snow"
          modules={modules} />
        </div>
    </div>
  );
};

export default TextEditor;
