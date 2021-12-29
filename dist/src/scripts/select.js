class Select {
    constructor(selectDOM, values) {
        this.status = false;
        this._value = "";
        this.exaustToggle = 0;
        this.body = document.querySelector("body");
        this.selectDOM = selectDOM;
        this.valueOptions = values;
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
    startSelect() {
        this.bindEvents();
        this.addEvents();
    }
}
export default Select;
