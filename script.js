const root = document.querySelector(".root");

function createElement(html) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", html);
  return div.firstElementChild;
}

class Timers {
    _element = null;
    _subElements = null;

    _state = {
        currentTimer: 0,
        activeTimer: false
    }

    constructor({Timer,Button}) {
        this._Button = Button;
        this._Timer = Timer;
        this._init();
    }

    _setStateCurrentTimer(time){
        this._state.currentTimer = time;
    }

    _setStateActiveTimer(){
        this._state.activeTimer = !this._state.activeTimer;
    }

    _init() {
        this._element = createElement(this._getTemplate());
        this._subElements = this._getSubElements();
        this._render();
        this._addListeners();
      }
    
      _addListeners() {
        this._subElements.input.addEventListener("input", (event) => {
            if (event.target.value < 0 || event.target.value === "") {
                this._setStateCurrentTimer(0);
                return;
            }
            this._setStateCurrentTimer(event.target.value);
          });
      }

    _render(){

        if (!this._isButtonAdded) {
            this._subElements.control.append(this._generateBtn());
            this._isButtonAdded = true;
        }
        if (this._state.activeTimer) {
            if (this._state.currentTimer <= 0) {
                return;
            }
         this._subElements.control.append(this._generateTimer());
         this._setStateCurrentTimer(0);
        }
    }

    _generateBtn(){
        return new this._Button({use:"add", text:"Добавить таймер"}, this._setTimerHandler.bind(this)).element; 
    }
    _generateTimer(){
        return new this._Timer({time:this._state.currentTimer, Button: this._Button}).element;
    }

    _setTimerHandler(){
        this._setStateActiveTimer();
        this._render();
    }

    _getTemplate() {
        return `<div class="timers">
            <div class="timers__control" data-element="control">
                <input type="number" min="0" class="timers__input" data-element="input" placeholder="Введите время в секундах">
            </div>
            <div class="timers__wrapper" data-element="timers"></div>
        </div>`;
      }

      _getSubElements() {
        return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, elem) => {
          return {
            ...acc,
            [elem.getAttribute("data-element")]: elem,
          };
        }, {});
      }
    
      get element() {
        return this._element;
      }
}

class Timer {
    _element = null;
    _subElements = null;

    constructor({time, Button}) {
        this._time = time;
        this._Button = Button;
        this._init();
    }

    _init() {
        this._element = createElement(this._getTemplate());
        this._subElements = this._getSubElements();
        this._render();
      }

    _generateBtn(){
        return new this._Button({use:"remove", text:"удалить"}, this._removeTimerHandler.bind(this)).element; 
    }

    _render(){
        this._subElements.control.append(this._generateBtn());
    }

    _removeTimerHandler(){
        console.log("hello");
    }

    _getTemplate() {
        return `<div class="timer">
                    <span class="timer__time">${this._time}</span>
                    <div class="timer__control" data-element="control"></div>
                </div>`;
      }

      _getSubElements() {
        return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, elem) => {
          return {
            ...acc,
            [elem.getAttribute("data-element")]: elem,
          };
        }, {});
      }

      get element() {
        return this._element;
      }
}

class Button {
    _element = null;
		
    constructor({use, disabled, text}, handler){
        this._use = use;
        this._disabled = disabled;
        this._text = text;
        this._handler = handler;
        this._init();
    }

    _init(){
        this._element = createElement(this._getTemplate());
        this._addListeners();
    }

	_getTemplate(){
        return `<button class="btn btn--${this._use}" ${this._disabled ? "disabled" : ""}>${this._text}</button>`
    }

	_addListeners() {
       this._element.addEventListener("click", () => this._handler()) 
	}

    get element() {
        return this._element;
    }
}


root.insertAdjacentElement("beforeend", new Timers({Timer,Button}).element);