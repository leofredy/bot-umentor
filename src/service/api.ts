class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private curso: number;

  constructor(curso:number) {
    this.curso = curso;
  }

  public finalizaProva() {
    // 2 é errado e 1 acertou!!
    // $.ajax(
    //   {
    //     url: 'https://painel.umentor.com.br/painel_candidato/videos_aulas/gravar_teste',
    //     data: a,
    //     contentType: false,
    //     processData: false,
    //     type: 'POST',
    //     success: function(data){
    //       console.log(data);
    //     }
    // });
    // $.ajax({
    //     url: 'https://painel.umentor.com.br/painel_candidato/videos_aulas/gravar_teste',
    //     data: new FormData(document.querySelector("#form_video_aula_testes")),
    //     contentType: false,
    //     processData: false,
    //     type: 'POST',
    //     success: function(data){
    //         console.log(data);
    //     }
    // });
  }

  public finalizarModulo(nivelModulo: number): Promise<void> {
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
          operacao: operacao > 1 ? 1 : 2,
          codigo_trilha: codigo_trilha
        }, function () {
          resolve();
        });
      });

      Promise.all([request1, request2]).then(() => {
        resolve();
      }); 
    });
  }
}

export default Services;