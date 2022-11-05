import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://warta-b.project'

  constructor(private http: HttpClient) { }

  login(credencials: any) {
    return this.http.post(this.url + '/auth/login', credencials)
  }
}
