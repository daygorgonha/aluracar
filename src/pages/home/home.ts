import { CarrosServiceProvider } from './../../providers/carros-service/carros-service';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Carro[];

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private carrosService: CarrosServiceProvider) {}

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: 'Carregando carros...'
    });

    loading.present();

    this.carrosService.lista()
      .subscribe(
        (carros) => {
          this.carros = carros;

          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          console.log(err);

          loading.dismiss();

          this._alertCtrl.create({
            title: 'Falha de conexao',
            subTitle: 'Nao foi possivel carregar a lista de carros. Tente novamente mais tarde!',
            buttons: [
              { text: 'Ok' }
            ]
          })
          .present();
        }
    );
  }

}
