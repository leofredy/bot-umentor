type response = {
  flag: string
}
class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private curso: number;

  constructor(, curso:number) {
    this.curso = curso;
    this.operacao = operacao;
    this.codigo_trilha = codigo_trilha;
  }

  public finalizarModulo(nivelModulo: number): Promise<response> {
    const hrefModulo = ([...document.querySelectorAll(".list-group-item")!] as Array<HTMLElement>)[nivelModulo].getAttribute("href")!;
    const indice = hrefModulo.split("-")[1].replace("99", "");
    return new Promise(resolve => {
      const request1 = new Promise(resolve => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: operacao,
          codigo_trilha: codigo_trilha
        }, function (results: response) {
          const params = $.parseJSON(results);
          resolve(params);
        });
      });

      const request2 = new Promise(resolve => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: operacao + 1,
          codigo_trilha: codigo_trilha
        }, function (results: response) {
          const params = $.parseJSON(results);
          resolve(params);
        });
      });

      const request3 = new Promise(resolve => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: operacao - 1,
          codigo_trilha: codigo_trilha
        }, function (results: response) {
          const params = $.parseJSON(results);
          resolve(params);
        });
      });

      Promise.all([request1, request2, request3]).then((values: Array<response>) => {
        console.log("Result promises", values);
        resolve(values);
      }); 
    });
  }
}

export default Services;