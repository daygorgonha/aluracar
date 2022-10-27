## Curso Alura: Ionic 3 parte 1 - Aplicações híbridas mobile ainda mais poderosas e parte 2 - Recursos e build nativos

### Aprendi sobre: 

- Implementar a persistência do AluraCar usando a API IndexedDB
- Aprendi que o Ionic possui um serviço chamado Storage para lidar com persistência e configurou esse serviço no módulo principal da aplicação
- Modifiquei o modelo de agendamentos para incluir os atributos confirmado e enviado
- Alterei o estado a propriedade enviado para true sempre que o agendamento for enviado para a API no agendamentos-service
- Salvei o agendamento na nossa base, através de uma nova propriedade para usar o serviço de Storage do Ionic, convertendo a promise retornada por padrão do serviço de Storage para um Observable
- Concatenei o envio do agendamento com o salvamento, compondo seus observables do RxJs através do mergeMap
- Tratei os erros de agendamento usando o operador catch do RxJs finalizar a persistência
- Encapsulei a lógica de persistência para permitir que ela seja utilizada em outras partes da aplicação usando o padrão DAO (Data Access Object)
- Evitei a sobrescrita de agendamentos repetidos, consultando a base de dados com o método ehDuplicado
- Como vibrar o dispositivo.
- Como funciona a entrada nativa de datas.
- Como fazer execuções diretamente no sistema.

