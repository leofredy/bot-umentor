import App from "./app.js";
const app = new App(curso);
app.init();
for (let i = 0; i < 2000; i++) {
    $.post(`https://painel.umentor.com.br/painel_candidato/videos_aulas/controle_cursos`, {
        indice: 225,
        curso: 45,
        operacao: 2,
        codigo_trilha: codigo_trilha
    }, function () {
    });
}
