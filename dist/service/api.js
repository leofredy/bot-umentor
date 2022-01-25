class Services {
    constructor(curso) {
        this.url_base = "https://painel.umentor.com.br/painel_candidato/";
        this.curso = curso;
    }
    finalizaProva(formDOM) {
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
            $.ajax({
                url: 'https://painel.umentor.com.br/painel_candidato/videos_aulas/gravar_teste',
                data: new FormData(formDOM),
                contentType: false,
                processData: false,
                type: 'POST',
                success: function () {
                    resolve();
                },
                erro: function () {
                    reject();
                }
            });
        });
    }
    finalizarModulo(nivelModulo) {
        const hrefModulo = [...document.querySelectorAll(".list-group-item")][nivelModulo].getAttribute("href");
        const indice = hrefModulo.split("-")[1].replace("99", "");
        return new Promise((resolve, reject) => {
            const request1 = new Promise((resolve, reject) => {
                $.post(`${this.url_base}videos_aulas/controle_cursos`, {
                    indice: indice,
                    curso: this.curso,
                    operacao: 1,
                    codigo_trilha: codigo_trilha
                }).done(function () {
                    resolve();
                }).fail(function (data) {
                    reject();
                });
            });
            const request2 = new Promise((resolve, reject) => {
                $.post(`${this.url_base}videos_aulas/controle_cursos`, {
                    indice: indice,
                    curso: this.curso,
                    operacao: 2,
                    codigo_trilha: codigo_trilha
                }).done(function () {
                    resolve();
                })
                    .fail(function () {
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
