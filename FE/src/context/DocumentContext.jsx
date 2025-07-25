import { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [document, setDocument] = useState(null);

  return (
    <DocumentContext.Provider value={{ document, setDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => useContext(DocumentContext);