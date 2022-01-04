class Select {
  private selectDOM: HTMLElement;
  private status: boolean = false;
  private _value: string = "";
  private optionsDOM: Array<HTMLElement> = [];
  private valueOptions: Array<string> = [];
  private exaustToggle: number = 0;
  private body: HTMLElement = document.querySelector("body")!;
  private _template: string = "";
  private listModuloDOM: Array<HTMLElement>;

  constructor() {
    this.selectDOM = (document.querySelector("body")!);
    this.listModuloDOM = ([...document.querySelectorAll("a.list-group-item")!] as Array<HTMLElement>);
    this.mounted();
  }

  public get template(): string {
    return this._template;
  }

  public get value(): string {
    return this._value;
  }

  private set value(newValue: string) {
    this._value = newValue;
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
    clearTimeout(this.exaustToggle);
    
    if (this.status) {
      this.selectDOM.children[1].classList.remove("show");
      this.selectDOM.children[1].classList.add("closing");
      this.exaustToggle = setTimeout(() => {
        this.selectDOM.children[1].classList.remove("closing");
      }, 900);

      this.body.removeEventListener("click", this.toggleBody, false);
    } 
    else {
      this.selectDOM.children[1].classList.remove("closing");
      this.exaustToggle = setTimeout(() => {
        this.selectDOM.children[1].classList.add("show");
        this.body.addEventListener("click", this.toggleBody, false)
      }, 100);
    }

    this.status = !this.status;
  }

  private toggleBody() {
    this.toggleEvent();
  }

  private changeEvent(event: Event): void {
    this.value = (event.currentTarget as HTMLElement).children[1].getAttribute("value")!;
    this.selectDOM.children[0].children[0].innerHTML = this.value; 
    this.toggleEvent();
    this.updateListOptions();
  }

  private updateListOptions() {
    let template: string = "";
    this.valueOptions.forEach(valorOption => {
      if (valorOption !== this.value) {
        template += `
          <li class="select-option">
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
    this.optionsDOM.forEach(optionModulo => {
      this.valueOptions.push((optionModulo.children[1] as HTMLInputElement).value);
    });
    console.log(this.valueOptions);
  }

  private mounted() { 
    let optionsTemplate: string = ``;
    this.listModuloDOM.forEach(moduloDOM => {
      optionsTemplate += `
        <li class="select-option">
          <p>
            ${moduloDOM.innerText}
          </p>
          <input value="Introdução" type="text">
        </li>
      `
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
          <li class="select-option">
            <p>
              Todos os módulos
            </p>
            <input value="Todos os módulos" type="text">
          </li>
        </ul>
      </div>
    `;
  }

  startSelect() {
    this.selectDOM = document.querySelector(".content-select")!;
    this.optionsDOM = ([...this.selectDOM.children[1].children] as Array<HTMLElement>);
    this.startOptionsValues();
    this.bindEvents();
    this.addEvents();
  }
}

export default Select;

