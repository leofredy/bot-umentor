import Select from "./scripts/select.js";
import Services from "./service/api.js";

type PerguntaRespostaDOM = {
  indexPergunta: number,
  inputPergunta: HTMLInputElement,
  respostas: Array<HTMLInputElement>
}

type respostaReq = {
  acerto: number | string,
  pergunta: string,
  resposta: string
};

class App {
  private template: string = "";
  private containerApp: HTMLDivElement = document.createElement("div")!;
  private loaderApp: HTMLDivElement = document.createElement("div")!;
  private select: Select;
  private selectTemplate: string;
  private selectValue: string = "";
  private api: Services;
  private perguntasRespostasProva: Array<PerguntaRespostaDOM> = [];


  constructor(curso:number) {
    this.bindEvents();
    this.api = new Services(curso);
    this.containerApp.setAttribute("id", "appTonDoid");
    this.select = new Select(this.selectChange);
    this.selectTemplate = this.select.template;
  }

  private mounted() {
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
    document.querySelector("body")?.appendChild(this.containerApp);
    const videoDOM = (document.querySelector("#audioTonDroid") as HTMLVideoElement);
    videoDOM.muted = true;
    videoDOM.play();
    videoDOM.muted = false;
    this.loaderApp = document.querySelector("#appTonDoid .loaderTonDroid")!;
  }

  private getLastModulo(): number {
    let index = 0
    for (index; index < this.select.listModuloDOM.length; index++) {
      const contentModulo = this.select.listModuloDOM[index].innerText.trim().toLowerCase();
      if (contentModulo === "informações") {
        break;
      }
    }

    return index;
  }

  private getNivelModuloDOM(value: string) {
    const nivelModulo:number = this.select.listModuloDOM.findIndex(modulo => modulo.innerText.trim() === value);
    return nivelModulo;
  }

  private addCheckModulo(nivelModulo: number) {
    const iconeModulo = ([...document.querySelectorAll(".list-group-item")!] as Array<HTMLElement>)[nivelModulo].children[0].children[1];
    iconeModulo.classList.remove("fa-times");
    iconeModulo.classList.remove("text-danger");
    iconeModulo.classList.add("fa-check-circle");
    iconeModulo.classList.add("text-success");
  }

  private async makeModule(eventTarget: HTMLInputElement) {
    if (this.selectValue) {
      this.showLoading(true);

      if (this.selectValue !== "Todos os módulos") {
        const nivelModuloDOM: number = this.getNivelModuloDOM(this.selectValue);
        await this.api.finalizarModulo(nivelModuloDOM);
        this.addCheckModulo(nivelModuloDOM);
        this.select.finishModulo();
      } else {
        for (let index = 0; index < this.getLastModulo(); index++) {
          const checkSVG = this.select.listModuloDOM[index].children[0].children[1];
          if (checkSVG.getAttribute("class")!.split(" ").indexOf("text-danger") !== -1) {
            await this.api.finalizarModulo(index);
            this.addCheckModulo(index);
            this.select.finishModulo();
          }
        }
      }

      this.showLoading(false);
    } else {
      alert("Selecione um módulo!");
    }

    eventTarget.checked = false;
  }

  private async makeProva() {
    const formDOM = (document.querySelector("#form_video_aula_testes") as HTMLFormElement);
    if (formDOM) {
      if (!this.perguntasRespostasProva.length) {
        this.handlePerguntaResposta(formDOM);
      }

      const formData = this.responderForm();
      const dataProva = await this.api.finalizaProva(formData);

      if (!this.verificaAprovacaoProva(dataProva.array_perguntas)) {
        this.makeProva();
      }
    } else {
      alert("Você deve estar na página da prova!");
    }
  }

  private handlePerguntaResposta(formDOM: HTMLFormElement) {
    let indexPergunta = 0;
    let perguntaResposta: PerguntaRespostaDOM;

   [...formDOM.querySelectorAll("input")].forEach((input, index) => {
     if(input.getAttribute("name") === "f_pergunta[]") {
      perguntaResposta = {
        indexPergunta: indexPergunta,
        inputPergunta: input,
        respostas: []
      }
      this.perguntasRespostasProva.push(perguntaResposta);

      indexPergunta++;
     } else if (input.getAttribute("id") === "f_respostas_") {
      this.perguntasRespostasProva[indexPergunta - 1].respostas.push(input);
     }
   });
  }

  private responderForm(listRespostas?: Array<respostaReq>): FormData {
    const formData = new FormData();

    if (listRespostas) {
      listRespostas.forEach((respostaReq, index) => {
        if (respostaReq.acerto === 2 || respostaReq.acerto === "2") { // ERROU
          this.perguntasRespostasProva.forEach(perguntaRespostaForm => {
            if (parseInt(perguntaRespostaForm.inputPergunta.value) === parseInt(respostaReq.pergunta)) {
              formData.append("f_pergunta[]", perguntaRespostaForm.inputPergunta.value);

              let lastIndexRespostaForm = 0;

              for (let lastRespostaForm = 0; lastRespostaForm < perguntaRespostaForm.respostas.length; lastRespostaForm++) {
                if (parseInt(perguntaRespostaForm.respostas[lastRespostaForm].value) === parseInt(respostaReq.resposta)) {
                  lastIndexRespostaForm = lastRespostaForm;
                  break;
                }
              }

              formData.append(perguntaRespostaForm.respostas[lastIndexRespostaForm].getAttribute("name")!, perguntaRespostaForm.respostas[lastIndexRespostaForm].value);
            }
          });
        } else { // ACERTOU
          formData.append("f_pergunta[]", respostaReq.pergunta);
          formData.append(`f_respostas_${index}[]`, respostaReq.resposta);
        }
      });      
    } else {
      this.perguntasRespostasProva.forEach(perguntaResposta => {
        formData.append("f_pergunta[]", perguntaResposta.inputPergunta.value);
        formData.append(perguntaResposta.respostas[0].getAttribute("name")!, perguntaResposta.respostas[0].value);
      });
    }

    return formData;
  }

  private verificaAprovacaoProva(listRespostaReq: Array<respostaReq>) {
    //80% é aprovado;
    let estaAprovado = false;
    let numeroAcertos = 0;

    for (let indexRespostaReq = 0; indexRespostaReq < listRespostaReq.length; indexRespostaReq++) {
      if (listRespostaReq[indexRespostaReq].acerto === 1 || listRespostaReq[indexRespostaReq].acerto === "1") {
        numeroAcertos++;
      }
    }

    const minimoDeAcertos = (this.perguntasRespostasProva.length * 80) / 100;

    if (numeroAcertos >= minimoDeAcertos) {
      estaAprovado = true;
    }

    return estaAprovado;
  }

  private selectChange(value: string) {
    this.selectValue = value;
  }

  private changeToggle(event: Event) {
    const eventTarget = (event.target as HTMLInputElement);
  
    if (eventTarget.checked) {
      const toggleName = eventTarget.getAttribute("id");
      switch(toggleName) {
        case "toggleFazerProva": 
          this.makeProva();
          break;
        case "toggleModulos":
          this.makeModule(eventTarget);
          break;
        case "toggleCurso":
          break;
      }
    }
  }
  
  private bindEvents() {
    this.selectChange = this.selectChange.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
  }

  private addEvents() {
    document.querySelector("#toggleFazerProva")?.addEventListener("change", event => this.changeToggle(event));
    document.querySelector("#toggleModulos")?.addEventListener("change", event => this.changeToggle(event));
    document.querySelector("#toggleCurso")?.addEventListener("change", event => this.changeToggle(event));
  }

  private liberaContextMenu() {
    document.oncontextmenu = null;
  }

  private showLoading(show: boolean) {
    if (show) {
      this.loaderApp.style.display = "flex";
    } else {
      this.loaderApp.style.display = "none";
    }
  }

  public init() {
    this.liberaContextMenu();
    this.mounted();
    this.select.startSelect();
    this.addEvents();
  }
}

export default App;