class Services {
    constructor(indice, curso) {
        this.url_base = "https://painel.umentor.com.br/painel_candidato/";
        this.indice = indice;
        this.curso = curso;
        this.operacao = operacao;
        this.codigo_trilha = codigo_trilha;
    }
    finalizarModulo(nivelModulo) {
        return new Promise(resolve => {
            $.post(`${this.url_base}videos_aulas/controle_cursos`, {
                indice: this.indice + (nivelModulo > 0 ? nivelModulo - 1 : 0),
                curso: this.curso,
                operacao: operacao,
                codigo_trilha: codigo_trilha
            }, function (results) {
                const params = $.parseJSON(results);
                resolve(params);
            });
        });
    }
}
export default Services;
