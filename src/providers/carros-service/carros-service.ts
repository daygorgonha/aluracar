import { Observable } from 'rxjs';
import { Carro } from './../../modelos/carro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';

@Injectable()
export class CarrosServiceProvider {
  _url: string;

  constructor(
    private _api: ApiServiceProvider,
    private _http: HttpClient) {
      this._url = this._api.url;
  }

  lista(): Observable<Carro[]> {
   return this._http
          .get<Carro[]>(this._url+'/carro/listaTodos');
  }

}
