class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private curso: number;

  constructor(curso:number) {
    this.curso = curso;
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
          operacao: 1,
          codigo_trilha: codigo_trilha
        }, function () {
          resolve();
        });
      });

      const request2 = new Promise(resolve => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: 2,
          codigo_trilha: codigo_trilha
        }, function () {
          resolve();
        });
      });

      Promise.all([request1, request2]).then(() =>  {
        resolve();
      });
    });
  }
}

export default Services;