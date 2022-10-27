export interface Agendamento {
  push(agendamento: any): unknown;
  nomeCliente: string,
  enderecoCliente: string,
  emailCliente: string,
  modeloCarro: string,
  precoTotal: number,
  confirmado: boolean,
  enviado: boolean,
  data: string;
}
