type listener = (value: string) => void;
class Select {
  private selectDOM: HTMLElement;
  private status: boolean = false;
  private _template: string = "";
  private changeListener: listener;
  
  private _optionsDOM: Array<HTMLElement> = [];

  private _value: string = "";
  private _valueOptions: Array<string> = [];
  private _listModuloDOM: Array<HTMLElement> = [];
  private listModulosConcluidos: Array<string> = [];

  constructor(changeListener: listener) {
    this.changeListener = changeListener;
    this.selectDOM = (document.querySelector("body")!);
    this.listModuloDOM = ([...document.querySelectorAll("a.list-group-item")!] as Array<HTMLElement>);
    this.mounted();
  }

  public get listModuloDOM() {
    return this._listModuloDOM;
  }

  private set listModuloDOM(listModulosDOM: Array<HTMLElement>) {
    this._listModuloDOM = listModulosDOM;
  }

  public get optionsDOM() {
    return this._optionsDOM;
  }

  private set optionsDOM(newsOptions: Array<HTMLElement>) {
    this._optionsDOM = newsOptions;
  }

  public get template(): string {
    return this._template;
  }

  public get value(): string {
    return this._value;
  }

  private set value(newValue: string) {
    this._value = newValue;

    this.changeListener(this._value);
  }

  public get valueOptions() {
    return this._valueOptions;
  }

  private set valueOptions(newValue: Array<string>) {
    this._valueOptions = newValue;
  }

  private bindEvents(): void {
    this.toggleEvent = this.toggleEvent.bind(this);
    this.toggleBody = this.toggleBody.bind(this);
  }

  private addEvents() {
    this.addEventToggle();
    this.addEventChange();
  }

  private addEventToggle() {
    this.selectDOM.children[0].addEventListener("click", this.toggleEvent, false);
  }

  private addEventChange() {
    const options = [...this.selectDOM.children[1].children];
    options.forEach(option => {
      option.addEventListener("click", (event) => this.changeEvent(event));
    });
  }

  private toggleEvent(): void {    
    if (this.status) {
      this.selectDOM.children[1].classList.remove("show");
    } else {
      this.selectDOM.children[1].classList.add("show");
    }

    this.status = !this.status;
  }

  private toggleBody() {
    this.toggleEvent();
  }

  private changeEvent(event: Event): void {
    const valueTarget = (event.currentTarget as HTMLElement).children[1].getAttribute("value")!;
    if (valueTarget) {
      if (this.listModulosConcluidos.indexOf(valueTarget) === -1) {
        this.value = valueTarget;
        this.selectDOM.children[0].children[0].innerHTML = this.value; 
        this.updateListOptions();
      }
    }
    this.toggleEvent();
  }

  public finishModulo() {
    const currentValue = this.value;
    this.listModulosConcluidos.push(currentValue);
    this.resetCurrentValue();
  }

  private resetCurrentValue() {
    this.value = "";
    this.selectDOM.children[0].children[0].innerHTML = "Selecione um módulo"; 
    this.updateListOptions();
  }

  private updateListOptions() {
    let template: string = "";
    this.valueOptions.forEach(valorOption => {
      if (valorOption !== this.value) {
        let checked: string = "false";
        if (this.listModulosConcluidos.indexOf(valorOption) !== -1) {
          checked = "true";
        } 
        template += `
          <li data-check="${checked}" class="select-option">
            <p>
              ${valorOption}
            </p>
            <input value="${valorOption}" type="text">
          </li>
        `;
      }
    });
    
    this.selectDOM.children[1].innerHTML = template;
    this.addEventChange();
  }

  private startOptionsValues() {
    const valueOptions: Array<string> = [];
    this.optionsDOM = ([...this.selectDOM.children[1].children] as Array<HTMLElement>);
    this.optionsDOM.forEach(optionModulo => {
      valueOptions.push((optionModulo.children[1] as HTMLInputElement).value);
    });
    this.valueOptions = valueOptions;
  }

  private mounted() { 
    let optionsTemplate: string = ``;
    this.listModuloDOM.forEach(moduloDOM => {
      const checkSVG = moduloDOM.children[0].children[1];
      if (checkSVG) {
        if (checkSVG.getAttribute("class")!.split(" ").indexOf("text-danger") !== -1) {
          const text: string = moduloDOM.innerText;
          if (text !== "Informações" && text !== "Certificado" && text !== "Avalie o Curso" && text !== "Avaliação") {
            optionsTemplate += `
              <li class="select-option">
                <p>
                  ${text}
                </p>
                <input value="${text}" type="text">
              </li>
            `;
          }
        } else {
          this.listModulosConcluidos.push(moduloDOM.innerText.trim());
        }
      }
    });
    this._template += `
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
          ${optionsTemplate}
          ${

            optionsTemplate.length ? 
              `<li class="select-option">
                <p>
                  Todos os módulos
                </p>
                <input value="Todos os módulos" type="text">
              </li>`
              :
              `<li class="select-option">
                <p>
                  Não possui modulos a concluir
                </p>
                <input value="" type="text">
              </li>`
          }
        </ul>
      </div>
    `;
  }

  startSelect() {
    this.selectDOM = document.querySelector(".content-select")!;
    this.startOptionsValues();
    this.bindEvents();
    this.addEvents();
  }
}

export default Select;