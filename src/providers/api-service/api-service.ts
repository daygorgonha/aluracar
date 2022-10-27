import { Injectable } from '@angular/core';


@Injectable()
export class ApiServiceProvider {
  private _url: string = 'http://localhost:8080/api';

  get url() {
    return this._url;
  }

}
