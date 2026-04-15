import { Injectable } from '@angular/core';
import { auth } from '../firebase.config';
import { ToastController } from '@ionic/angular';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private ToastController: ToastController){
    
  }
}
