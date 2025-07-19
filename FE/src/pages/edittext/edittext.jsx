import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './edittext.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import documentApi from '../../apis/document';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }], 
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
  const [title, setTitle] = useState('');
  const {id} = useParams()
  const menuContainerRef = useRef(null);

  useEffect(() => {
    if (id) {
      const fetchDocument = async () => {
        try {
          const res = await documentApi.getDocumentById(id)
          setTitle(res.title)
          let contentObj = res.content
          if (typeof contentObj === 'string')
          {
            try {
              contentObj = JSON.parse(contentObj)
            } catch (e) {
              contentObj = {
                text: contentObj
              }
            }
          }
          setContent(contentObj.text || '')
          
        } catch (error) {
          console.log(error);
          
        }
      }
      fetchDocument()
    }
  }, [id]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  
  const handleMenuClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleSave = () => {
    const fileName = title || 'untitled';
    const htmlContent = content;
    const fullHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${fileName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
    
    const blob = new Blob([fullHtmlContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setOpenMenu(null);
  };

  const handlePrint = () => {
    
  };

const handleExport = async () => {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      tempDiv.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 20mm;
        margin: 0 auto;
        background: white;
        font-family: Arial, sans-serif;
        font-size: 12pt;
        line-height: 1.6;
        color: #000;
        position: absolute;
        top: -9999px;
        left: -9999px;
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .temp-pdf-content h1 { font-size: 24pt; margin: 0 0 12pt 0; }
        .temp-pdf-content h2 { font-size: 20pt; margin: 0 0 10pt 0; }
        .temp-pdf-content h3 { font-size: 16pt; margin: 0 0 8pt 0; }
        .temp-pdf-content p { margin: 0 0 8pt 0; }
        .temp-pdf-content ul, .temp-pdf-content ol { margin: 0 0 8pt 20pt; }
        .temp-pdf-content li { margin: 0 0 4pt 0; }
        .temp-pdf-content strong { font-weight: bold; }
        .temp-pdf-content em { font-style: italic; }
        .temp-pdf-content u { text-decoration: underline; }
      `;
      
      tempDiv.className = 'temp-pdf-content';
      document.head.appendChild(styleSheet);
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123 
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297; 

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }
      
      pdf.save(`${title}.pdf`);
      document.body.removeChild(tempDiv);
      document.head.removeChild(styleSheet);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
    
    setOpenMenu(null);
  };


  return (
    <div>
      <div className={styles.header}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img src="/icon_file.png" className={styles.logo} />
          <input type="text" placeholder="Your title..." className={styles.title} value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
          <div className={styles.menubar} ref={menuContainerRef}>
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
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <div className={styles.word}>
          <ReactQuill 
          theme="snow"
          modules={modules}
          value={content}
          onChange={setContent}
        />
      </div>
      </div>
    </div>
  );
};

export default TextEditor;
