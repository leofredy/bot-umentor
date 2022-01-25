type resposta = {
  acerto: number | string,
  pergunta: string,
  resposta: string
};
type dataProva =  {
  array_perguntas: Array<resposta>,
  curso: string,
  curso_nome: string,
  msg: string,
  result: Boolean,
  resultado: string,
  trilha: string,
};

class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private curso: number;

  constructor(curso:number) {
    this.curso = curso;
  }

  public finalizaProva(formData: FormData): Promise<dataProva> {
    // 2 é errado e 1 acertou!!
    // $.ajax(
    //   {
    //     url: 'https://painel.umentor.com.br/painel_candidato/videos_aulas/gravar_teste',
    //     data: a,
    //     contentType: false,
    //     processData: false,
    //     type: 'POST',
    //     success: function(data){
    //     }
    // });
    return new Promise((resolve, reject) => {
      $.ajax(
        {
          url: 'https://painel.umentor.com.br/painel_candidato/videos_aulas/gravar_teste',
          data: formData,
          contentType: false,
          processData: false,
          type: 'POST',
          success: function(data: string){
            resolve(JSON.parse(data));
          },
          erro: function() {
            reject();
          }
        }
      );
    })
  }

  public finalizarModulo(nivelModulo: number): Promise<void> {
    const hrefModulo = ([...document.querySelectorAll(".list-group-item")!] as Array<HTMLElement>)[nivelModulo].getAttribute("href")!;
    const indice = hrefModulo.split("-")[1].replace("99", "");
    return new Promise((resolve, reject) => {
      const request1 = new Promise((resolve, reject) => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: 1,
          codigo_trilha: codigo_trilha
        }).done(function() {
          resolve();
        }).fail(function(data) {
          reject();
        });
      });

      const request2 = new Promise((resolve, reject) => {
        $.post(
          `${this.url_base}videos_aulas/controle_cursos`, {
          indice: indice,
          curso: this.curso,
          operacao: 2,
          codigo_trilha: codigo_trilha
        }).done(function() {
          resolve();
        })
        .fail(function() {
          reject();
        });
      });

      Promise.all([request1, request2])
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        }); 
    });
  }
}

export default Services;