type response = {
  flag: string
}
class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private indice: number;
  private curso: number;

  constructor(indice:number, curso:number) {
    this.indice = indice;
    this.curso = curso;
    this.operacao = operacao;
    this.codigo_trilha = codigo_trilha;
  }

  public finalizarModulo(nivelModulo: number): Promise<response> {
    return new Promise(resolve => {
      $.post(
        `${this.url_base}videos_aulas/controle_cursos`, {
        indice: this.indice + (nivelModulo > 0 ? nivelModulo - 1: 0),
        curso: this.curso,
        operacao: operacao,
        codigo_trilha: codigo_trilha
      }, function (results: response) {
        const params = $.parseJSON(results);
        resolve(params);
      });
    });
  }
}

export default Services;