class Services {
  private url_base: string = "https://painel.umentor.com.br/painel_candidato/";
  private indice: number;
  private curso: number;
  private operacao: number;
  private codigo_trilha: number | null;

  constructor(indice:number, curso:number, operacao:number, codigo_trilha:number) {
    this.indice = indice;
    this.curso = curso;
    this.operacao = operacao;
    this.codigo_trilha = codigo_trilha;
  }

  public finalizarModulo(nivelModulo: number) {
    return new Promise(resolve => {
      $.post(
        `${this.url_base}videos_aulas/controle_cursos`, {
        indice: this.indice + nivelModulo,
        curso: this.curso,
        operacao: this.operacao,
        codigo_trilha: this.codigo_trilha
      }, function (results) {
        const params = $.parseJSON(results);
        resolve(params);
      });
    });
  }
}

export default Services;