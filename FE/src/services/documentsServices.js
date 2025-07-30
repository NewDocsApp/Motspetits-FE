import { createDocumentApi, getUserDocumentApi } from "../api/documents";

export const createDocument = async (title, content) => {
    const data = await createDocumentApi(title, content);
    return data;
    
}

export const getUserDocument = async () => {
    const data = await getUserDocumentApi();
    console.log('API returned:', data);
    return Array.isArray(data) ? data : (data.documents || []);
}