import { createDocumentApi } from "../api/documents";

export const createDocument = async (title, content) => {
    const data = await createDocumentApi(title, content);
    return data;
    
}