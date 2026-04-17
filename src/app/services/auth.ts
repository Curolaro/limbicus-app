import { UserCredential } from './../../../node_modules/@firebase/auth-types/index.d';
import { Injectable } from '@angular/core';
import { auth } from '../firebase.config';
import { ToastController } from '@ionic/angular';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private ToastController: ToastController){}

  async registrer(nome: string, email: string, password: string, ){
      try {
        const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(UserCredential.user, {displayName: nome});
        // adicionar mensagem de user adicionado
        return UserCredential.user;
      } catch (error) {
        // adicionar mensagem de erro
        throw error;
      }
    }
}
