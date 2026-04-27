import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importações diretas do Firebase SDK
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';

// Importar db do seu firebase.config
import { db } from '../firebase.config';

// Importar interfaces
import { Rating } from '../models/rating.model';
import { Suggestion } from '../models/suggestion.model';
import { User } from '../models/user.model';
import { Tags } from '../models/tags.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() {
    console.log('Firebase inicializado com sucesso!');
  }

  // ========== RATING ==========

  // Retorna todas as avaliações como Observable
  getRatings(): Observable<Rating[]> {
    return new Observable<Rating[]>((observer) => {
      const collectionRef = collection(db, 'rating');
      const q = query(collectionRef, orderBy('data', 'desc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        const items: Rating[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data()
          } as Rating);
        });
        observer.next(items);
      }, (error) => {
        observer.error(error);
      });
      
      return () => unsubscribe();
    });
  }

  // Retorna avaliação de um usuário específico
  getRatingPorUsuario(uid: string): Observable<Rating | null> {
    return new Observable<Rating | null>((observer) => {
      const collectionRef = collection(db, 'rating');
      const q = query(collectionRef, where('uid_usuario', '==', uid));
      
      const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        if (querySnapshot.empty) {
          observer.next(null);
        } else {
          const doc = querySnapshot.docs[0];
          observer.next({
            id: doc.id,
            ...doc.data()
          } as Rating);
        }
      }, (error) => {
        observer.error(error);
      });
      
      return () => unsubscribe();
    });
  }

  // Adiciona uma nova avaliação
  async addRating(rating: Rating): Promise<string> {
    const collectionRef = collection(db, 'rating');
    const docRef = await addDoc(collectionRef, { 
      ...rating, 
      data: Date.now() 
    });
    return docRef.id;
  }

  // Atualiza uma avaliação
  async updateRating(id: string, dados: Partial<Rating>): Promise<void> {
    const docRef = doc(db, `rating/${id}`);
    await updateDoc(docRef, dados);
  }

  // Deleta uma avaliação
  async deleteRating(id: string): Promise<void> {
    const docRef = doc(db, `rating/${id}`);
    await deleteDoc(docRef);
  }

  // ========== SUGGESTIONS ==========

  // Retorna todas as sugestões como Observable
  getSuggestions(): Observable<Suggestion[]> {
    return new Observable<Suggestion[]>((observer) => {
      const collectionRef = collection(db, 'suggestions');
      const q = query(collectionRef, orderBy('data_envio', 'desc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        const items: Suggestion[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data()
          } as Suggestion);
        });
        observer.next(items);
      }, (error) => {
        observer.error(error);
      });
      
      return () => unsubscribe();
    });
  }

  // Retorna sugestões de um usuário específico
  getSuggestionsPorUsuario(uid: string): Observable<Suggestion[]> {
    return new Observable<Suggestion[]>((observer) => {
      const collectionRef = collection(db, 'suggestions');
      const q = query(collectionRef, where('id_usuario', '==', uid), orderBy('data_envio', 'desc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        const items: Suggestion[] = [];
        querySnapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data()
          } as Suggestion);
        });
        observer.next(items);
      }, (error) => {
        observer.error(error);
      });
      
      return () => unsubscribe();
    });
  }

  // Adiciona uma nova sugestão
  async addSuggestion(suggestion: Suggestion): Promise<string> {
    const collectionRef = collection(db, 'suggestions');
    const docRef = await addDoc(collectionRef, { 
      ...suggestion, 
      data_envio: Date.now(),
      status: 'pendente',
      respostas: []
    });
    return docRef.id;
  }

  // Atualiza uma sugestão
  async updateSuggestion(id: string, dados: Partial<Suggestion>): Promise<void> {
    const docRef = doc(db, `suggestions/${id}`);
    await updateDoc(docRef, dados);
  }

  // Deleta uma sugestão
  async deleteSuggestion(id: string): Promise<void> {
    const docRef = doc(db, `suggestions/${id}`);
    await deleteDoc(docRef);
  }

  // Adiciona resposta a uma sugestão
  async addResposta(suggestionId: string, resposta: any): Promise<void> {
    const suggestionRef = doc(db, `suggestions/${suggestionId}`);
    const suggestionDoc = await getDoc(suggestionRef);
    
    if (suggestionDoc.exists()) {
      const suggestion = suggestionDoc.data() as Suggestion;
      const respostas = suggestion.respostas || [];
      respostas.push(resposta);
      
      await updateDoc(suggestionRef, { respostas });
    }
  }

  // ========== USER ==========

  // Buscar usuário por UID
  async getUser(uid: string): Promise<User | null> {
    const docRef = doc(db, `user/${uid}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() } as User;
    }
    return null;
  }

  // Criar/atualizar usuário
  async setUser(user: User): Promise<void> {
    const docRef = doc(db, `user/${user.uid}`);
    await setDoc(docRef, user);
  }

  // ========== TAGS ==========

  // Retorna todas as tags
  async getTags(): Promise<Tags[]> {
    const collectionRef = collection(db, 'tags');
    const querySnapshot = await getDocs(collectionRef);
    
    const tags: Tags[] = [];
    querySnapshot.forEach((doc) => {
      tags.push({
        id: doc.id,
        ...doc.data()
      } as Tags);
    });
    return tags;
  }
}