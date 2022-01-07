var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Select from "./scripts/select.js";
import Services from "./service/api.js";
class App {
    constructor(curso) {
        this.template = "";
        this.containerApp = document.createElement("div");
        this.loaderApp = document.createElement("div");
        this.selectValue = "";
        this.bindEvents();
        this.api = new Services(curso);
        this.containerApp.setAttribute("id", "appTonDoid");
        this.select = new Select(this.selectChange);
        this.selectTemplate = this.select.template;
    }
    mounted() {
        var _a;
        this.template = `
    <audio id="audioTonDroid" controls autoplay="true">
      <source src="https://leofredy.github.io/bot-umentor/src/assets/sounds/ton-droid.wav" type="audio/wav">
    </audio>
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
        <div class="loaderTonDroid">
          <img 
            src="https://leofredy.github.io/bot-umentor/src/assets/gifs/loader.gif" 
            alt="Ton Droid em trabalhando..."
          >
        </div>
      </body>
    `;
        this.containerApp.innerHTML = this.template;
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(this.containerApp);
        const videoDOM = document.querySelector("#audioTonDroid");
        videoDOM.muted = true;
        videoDOM.play();
        videoDOM.muted = false;
        this.loaderApp = document.querySelector("#appTonDoid .loaderTonDroid");
    }
    getNivelModuloDOM(value) {
        const nivelModulo = this.select.listModuloDOM.findIndex(modulo => modulo.innerText.trim() === value);
        return nivelModulo;
    }
    addCheckModulo(nivelModulo) {
        const iconeModulo = [...document.querySelectorAll(".list-group-item")][nivelModulo].children[0].children[1];
        iconeModulo.classList.remove("fa-times");
        iconeModulo.classList.remove("text-danger");
        iconeModulo.classList.add("fa-check-circle");
        iconeModulo.classList.add("text-success");
        console.log("iconeModulo: ", iconeModulo);
    }
    makeModule(eventTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.selectValue) {
                if (this.selectValue !== "Avaliação") {
                    this.showLoading(true);
                    const nivelModuloDOM = this.getNivelModuloDOM(this.selectValue);
                    console.log("nivel Modulo:", nivelModuloDOM);
                    try {
                        yield this.api.finalizarModulo(nivelModuloDOM);
                        this.addCheckModulo(nivelModuloDOM);
                        this.select.finishModulo();
                    }
                    catch (err) {
                        alert(`Erro ao finalizar módulo: ${JSON.stringify(err)}`);
                    }
                    this.showLoading(false);
                }
                else {
                    alert("O módulo é uma avaliação!");
                }
            }
            else {
                alert("Selecione um módulo!");
            }
            eventTarget.checked = false;
        });
    }
    selectChange(value) {
        this.selectValue = value;
    }
    changeToggle(event) {
        const eventTarget = event.target;
        if (eventTarget.checked) {
            const toggleName = eventTarget.getAttribute("id");
            switch (toggleName) {
                case "toggleFazerProva":
                    break;
                case "toggleModulos":
                    this.makeModule(eventTarget);
                    break;
                case "toggleCurso":
                    break;
            }
        }
    }
    bindEvents() {
        this.selectChange = this.selectChange.bind(this);
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
    showLoading(show) {
        if (show) {
            this.loaderApp.style.display = "flex";
        }
        else {
            this.loaderApp.style.display = "none";
        }
    }
    init() {
        this.liberaContextMenu();
        this.mounted();
        this.select.startSelect();
        this.addEvents();
    }
}
export default App;
