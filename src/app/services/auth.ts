import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Importações diretas do Firebase SDK
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User
} from 'firebase/auth';

// Importar auth do seu firebase.config
import { auth } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() {
    console.log('Firebase Auth inicializado com sucesso!');
  }

  // Observable do estado de autenticação (tempo real)
  getAuthState(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        observer.next(user);
      }, (error) => {
        observer.error(error);
      });
      
      return () => unsubscribe();
    });
  }

  // Pegar usuário atual
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Cadastro
  async register(email: string, password: string, nome: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: nome });
      console.log('Cadastro realizado com sucesso!');
      return userCredential.user;
    } catch (error: any) {
      console.error('Erro no cadastro:', error.message);
      throw error;
    }
  }

  // Login
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login realizado com sucesso!');
      return userCredential.user;
    } catch (error: any) {
      console.error('Erro no login:', error.message);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('Logout realizado!');
    } catch (error: any) {
      console.error('Erro no logout:', error.message);
      throw error;
    }
  }

  // Recuperar senha
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Email de recuperação enviado!');
    } catch (error: any) {
      console.error('Erro ao enviar email:', error.message);
      throw error;
    }
  }

  // Verificar se está logado
  async isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(!!user);
      });
    });
  }
}