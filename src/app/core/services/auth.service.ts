import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  signOut() {
    // Implement sign out logic
    console.log('User signed out');
  }
}