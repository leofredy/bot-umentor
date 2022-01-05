import Select from "./scripts/select.js";
import Services from "./service/api.js";
class App {
    constructor(indice, curso, operacao, codigo_trilha) {
        this.template = "";
        this.containerApp = document.createElement("div");
        this.selectValue = "";
        this.api = new Services(indice, curso, operacao, codigo_trilha);
        this.containerApp.setAttribute("id", "appTonDoid");
        this.select = new Select(this.selectChange);
        this.selectTemplate = this.select.template;
    }
    mounted() {
        var _a;
        this.template = `
      <link rel="stylesheet" href="https://leofredy.github.io/bot-umentor/src/assets/styles/style.css">
      <link rel="stylesheet" href="https://leofredy.github.io/bot-umentor/src/assets/styles/animations.css">
      <body>
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

              ${this.selectTemplate}

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
      </body>
    `;
        this.containerApp.innerHTML = this.template;
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(this.containerApp);
    }
    makeModule() {
        console.log("make", this.selectValue);
        if (this.selectValue) {
            if (this.selectValue !== "Avaliação") {
                const nivelModulo = parseInt(this.selectValue.split(".")[0]);
                this.api.finalizarModulo(nivelModulo).then(res => console.log("Módulo finalizado!", res));
            }
            else {
                alert("O módulo é uma avaliação!");
            }
        }
        else {
            alert("Selecione um módulo!");
        }
    }
    selectChange(value) {
        this.selectValue = value;
        console.log("selectChange", this.selectValue);
    }
    changeToggle(event) {
        const eventTarget = event.target;
        if (eventTarget.checked) {
            const toggleName = eventTarget.getAttribute("id");
            switch (toggleName) {
                case "toggleFazerProva":
                    break;
                case "toggleModulos":
                    this.makeModule();
                    break;
                case "toggleCurso":
                    break;
            }
        }
    }
    bindEvents() {
        this.changeToggle = this.changeToggle.bind(this);
    }
    addEvents() {
        var _a, _b, _c;
        (_a = document.querySelector("#toggleFazerProva")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", event => this.changeToggle(event));
        (_b = document.querySelector("#toggleModulos")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", event => this.changeToggle(event));
        (_c = document.querySelector("#toggleCurso")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", event => this.changeToggle(event));
    }
    liberaContextMenu() {
        document.oncontextmenu = null;
    }
    init() {
        this.liberaContextMenu();
        this.mounted();
        this.select.startSelect();
        this.bindEvents();
        this.addEvents();
    }
}
export default App;
