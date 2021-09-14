import { collectionLabels } from '../utils/contstants';
import firebase from './DatabaseConfig';

export const firestore = firebase.firestore();

export const feedbackDBRef = firestore.collection(collectionLabels.USER_FEEDBACK);

export const userDBRef = firestore.collection(collectionLabels.USERS)
