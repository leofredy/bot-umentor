import Select from "./scripts/select.js";
class App {
    constructor() {
        this.template = "";
        this.containerApp = document.createElement("div");
        this.containerApp.setAttribute("id", "appTonDoid");
        this.listModuloDOM = [...document.querySelectorAll("a.list-group-item")];
    }
    mounted() {
        var _a;
        this.template = `
      <link rel="stylesheet" href="https://leofredy.github.io/bot-umentor/src/assets/styles/style.css">
      <link rel="stylesheet" href="https://leofredy.github.io/bot-umentor/src/assets/styles/animations.css">
      <div class="tonDroid">
        <div class="tonDroid-controls">
          <button class="controls-minimize">
            -
          </button>
          <button class="controls-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#89898B"/>
            </svg>
          </button>
        </div>
        <header>
          <img 
            src="https://leofredy.github.io/bot-umentor/src/assets/icon.png" 
            alt="Ton Droid, bot para realizar curso umentor"
          >
        </header>
        <div class="tonDroid-contents">
          <div class="tonDroid-content">
            <h2 class="content-title">
              Fazer prova
            </h2>
            <div class="content-toggle">
              <input id="toggleFazerProva" type="checkbox">
              <label for="toggleFazerProva"></label>
            </div>
          </div>

          <div class="tonDroid-content">
            <h2 class="content-title">
              Finalizar módulos
            </h2>
            <div class="content-select">
              <div class="select-current">
                <p>
                  Selecione um módulo
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z" fill="#89898B"/>
                </svg>
              </div>
              <ul class="select-options">
                ${this.listModuloDOM.forEach((moduloDOM) => {
            `
                      <li class="select-option">
                        <p>
                          ${moduloDOM.innerText}
                        </p>
                        <input value="Introdução" type="text">
                      </li>
                    `;
        })}
                
                <li class="select-option">
                  <p>
                    Todos os módulos
                  </p>
                  <input value="Todos os módulos" type="text">
                </li>
              </ul>
            </div>
            <div class="content-toggle">
              <input id="toggleModulos" type="checkbox">
              <label for="toggleModulos"></label>
            </div>
          </div>

          <div class="tonDroid-content">
            <h2 class="content-title">
              Finalizar curso
            </h2>
            <div class="content-toggle">
              <input id="toggleCurso" type="checkbox">
              <label for="toggleCurso"></label>
            </div>
          </div>
        </div>
      </div>
    `;
        this.containerApp.innerHTML = this.template;
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(this.containerApp);
    }
    init() {
        this.mounted();
        new Select(document.querySelector(".content-select")).startSelect();
    }
}
export default App;
// export default App;
// const select = new Select(document.querySelector(".content-select")!, ["Introdução", "teste1", "teste2"]);
// select.start();
