import { DatePicker } from '@ionic-native/date-picker';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from './../../modelos/agendamento';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Carro } from './../../modelos/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  private _alerta: Alert;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker: DatePicker) {

      this.carro = this.navParams.get('carroSelecionado');
      this.precoTotal = this.navParams.get('precoTotal');
    }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: 'date',
    })
    .then(data => this.data = data.toISOString());
  }

  agenda() {
    if (!this.nome || !this.endereco || this.email) {
      this._vibration.vibrate(500);

      this._alertCtrl.create({
        title: 'Preenchimento obrigatorio',
        subTitle: 'Preencha todos os campos',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;
    }

      let agendamento: Agendamento = {
        nomeCliente: this.nome,
        enderecoCliente: this.endereco,
        emailCliente: this.email,
        modeloCarro: this.carro.nome,
        precoTotal: this.precoTotal,
        confirmado: false,
        enviado: false,
        data: this.data,
      };

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(ehDuplicado => {
        if (ehDuplicado)  {
          throw new Error ('Agendamento existente');
        }

        return this._agendamentosService.agenda(agendamento);
      })
      .mergeMap((valor) => {
        let observable = this._agendamentoDao.salva(agendamento);
        if (valor instanceof Error) {
          throw valor;
        }
        return observable;
      })
      .finally(
        () => {
          this._alerta.setSubTitle(mensagem);
          this._alerta.present();
        }
      )
      .subscribe(
        () => mensagem = 'Agendamento realizado!',
        (err: Error) => mensagem = err.message,
      );
  }
}
