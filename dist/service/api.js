"use strict";
class Services {
    constructor(indice, curso, operacao, codigo_trilha) {
        this.url_base = "https://painel.umentor.com.br/painel_candidato/";
        this.indice = indice;
        this.curso = curso;
        this.operacao = operacao;
        this.codigo_trilha = codigo_trilha;
    }
    finalizarModulo(nivelModulo) {
        return new Promise(resolve => {
            $.post(`${this.url_base}videos_aulas/controle_cursos`, {
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
