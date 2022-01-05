class Select {
    constructor() {
        this.status = false;
        this._value = "";
        this.optionsDOM = [];
        this.valueOptions = [];
        this.exaustToggle = 0;
        this.body = document.querySelector("body");
        this._template = "";
        this.selectDOM = (document.querySelector("body"));
        this.listModuloDOM = [...document.querySelectorAll("a.list-group-item")];
        this.mounted();
    }
    get template() {
        return this._template;
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        this._value = newValue;
    }
    bindEvents() {
        this.toggleEvent = this.toggleEvent.bind(this);
        this.toggleBody = this.toggleBody.bind(this);
    }
    addEvents() {
        this.addEventToggle();
        this.addEventChange();
    }
    addEventToggle() {
        this.selectDOM.children[0].addEventListener("click", this.toggleEvent, false);
    }
    addEventChange() {
        const options = [...this.selectDOM.children[1].children];
        options.forEach(option => {
            option.addEventListener("click", (event) => this.changeEvent(event));
        });
    }
    toggleEvent() {
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
                this.body.addEventListener("click", this.toggleBody, false);
            }, 100);
        }
        this.status = !this.status;
    }
    toggleBody() {
        this.toggleEvent();
    }
    changeEvent(event) {
        this.value = event.currentTarget.children[1].getAttribute("value");
        this.selectDOM.children[0].children[0].innerHTML = this.value;
        this.toggleEvent();
        this.updateListOptions();
    }
    updateListOptions() {
        let template = "";
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
    startOptionsValues() {
        this.optionsDOM = [...this.selectDOM.children[1].children];
        this.optionsDOM.forEach(optionModulo => {
            this.valueOptions.push(optionModulo.children[1].value);
        });
    }
    mounted() {
        let optionsTemplate = ``;
        this.listModuloDOM.forEach(moduloDOM => {
            const text = moduloDOM.innerText;
            if (text !== "Informações" && text !== "Certificado" && text !== "Avalie o Curso") {
                optionsTemplate += `
          <li class="select-option">
            <p>
              ${text}
            </p>
            <input value="${text}" type="text">
          </li>
        `;
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
        this.selectDOM = document.querySelector(".content-select");
        this.startOptionsValues();
        this.bindEvents();
        this.addEvents();
    }
}
export default Select;
