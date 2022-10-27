import { Usuario } from './../../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {}

  efetuaLogin(email, senha) {
   return this._http.post<Usuario>('http://192.168.178.210:8080/api/login', { email, senha})
              .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }
}
