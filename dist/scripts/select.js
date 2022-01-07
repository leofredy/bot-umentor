class Select {
    constructor(changeListener) {
        this.status = false;
        this._template = "";
        this._optionsDOM = [];
        this._value = "";
        this._valueOptions = [];
        this._listModuloDOM = [];
        this.listModulosConcluidos = [];
        this.changeListener = changeListener;
        this.selectDOM = (document.querySelector("body"));
        this.listModuloDOM = [...document.querySelectorAll("a.list-group-item")];
        this.mounted();
    }
    get listModuloDOM() {
        return this._listModuloDOM;
    }
    set listModuloDOM(listModulosDOM) {
        this._listModuloDOM = listModulosDOM;
    }
    get optionsDOM() {
        return this._optionsDOM;
    }
    set optionsDOM(newsOptions) {
        this._optionsDOM = newsOptions;
    }
    get template() {
        return this._template;
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        this._value = newValue;
        this.changeListener(this._value);
    }
    get valueOptions() {
        return this._valueOptions;
    }
    set valueOptions(newValue) {
        this._valueOptions = newValue;
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
        if (this.status) {
            this.selectDOM.children[1].classList.remove("show");
        }
        else {
            this.selectDOM.children[1].classList.add("show");
        }
        this.status = !this.status;
    }
    toggleBody() {
        this.toggleEvent();
    }
    changeEvent(event) {
        const valueTarget = event.currentTarget.children[1].getAttribute("value");
        if (valueTarget) {
            if (this.listModulosConcluidos.indexOf(valueTarget) === -1) {
                this.value = valueTarget;
                this.selectDOM.children[0].children[0].innerHTML = this.value;
                this.updateListOptions();
            }
        }
        this.toggleEvent();
    }
    finishModulo() {
        const currentValue = this.value;
        this.listModulosConcluidos.push(currentValue);
        this.resetCurrentValue();
    }
    resetCurrentValue() {
        this.value = "Selecione um módulo";
        this.selectDOM.children[0].children[0].innerHTML = this.value;
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
        const valueOptions = [];
        this.optionsDOM = [...this.selectDOM.children[1].children];
        this.optionsDOM.forEach(optionModulo => {
            valueOptions.push(optionModulo.children[1].value);
        });
        this.valueOptions = valueOptions;
    }
    mounted() {
        let optionsTemplate = ``;
        this.listModuloDOM.forEach(moduloDOM => {
            const checkSVG = moduloDOM.children[0].children[1];
            if (checkSVG.getAttribute("class").split(" ").indexOf("text-danger") !== -1) {
                const text = moduloDOM.innerText;
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
            }
            else {
                this.listModulosConcluidos.push(moduloDOM.innerText.trim());
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
          ${optionsTemplate.length ?
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
              </li>`}
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
