class Select {
  private selectDOM: HTMLElement;
  private status: boolean = false;
  private _value: string = "";
  private optionsDOM: Array<HTMLElement>;
  private valueOptions: Array<string> = [];
  private exaustToggle: number = 0;
  private body: HTMLElement = document.querySelector("body")!;

  constructor(selectDOM: HTMLElement) {
    this.selectDOM = selectDOM;
    this.optionsDOM = ([...this.selectDOM.children[1].children] as Array<HTMLElement>);
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

  startSelect() {
    this.startOptionsValues();
    this.bindEvents();
    this.addEvents();
  }
}

export default Select;

