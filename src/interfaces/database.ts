import firebase from '../database/DatabaseConfig'

export interface DocumentSnapshotModel{
    documentId: string;
    documentData: firebase.firestore.DocumentData;  
}