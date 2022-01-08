class Services {
    constructor(curso) {
        this.url_base = "https://painel.umentor.com.br/painel_candidato/";
        this.curso = curso;
    }
    finalizarModulo(nivelModulo) {
        const hrefModulo = [...document.querySelectorAll(".list-group-item")][nivelModulo].getAttribute("href");
        const indice = hrefModulo.split("-")[1].replace("99", "");
        return new Promise(resolve => {
            const request1 = new Promise(resolve => {
                $.post(`${this.url_base}videos_aulas/controle_cursos`, {
                    indice: indice,
                    curso: this.curso,
                    operacao: 1,
                    codigo_trilha: codigo_trilha
                }, function () {
                    resolve();
                });
            });
            const request2 = new Promise(resolve => {
                $.post(`${this.url_base}videos_aulas/controle_cursos`, {
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
