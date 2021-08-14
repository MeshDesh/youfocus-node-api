import { DocumentSnapshotModel } from '../interfaces';
import firebase from '../database/DatabaseConfig';

// 1. Get Document data from database 
export const getDocumentDataByReference = async (
  documentReference: firebase.firestore.DocumentReference,
): Promise<DocumentSnapshotModel> => {
  const documentSnapshot = await documentReference.get();

  const documentId = documentSnapshot.id;
  const documentData = documentSnapshot.data() as firebase.firestore.DocumentData;

  return { documentId, documentData };
};