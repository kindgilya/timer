const root = document.querySelector(".root");

function createElement(html) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", html);
  return div.firstElementChild;
}

class Timers {
    _element = null;
    _subElements = null;

    constructor() {
        this._init();
    }

    _init() {
        this._element = createElement(this._getTemplate());
        this._subElements = this._getSubElements();
        // this._addListeners();
      }
    
    //   _addListeners() {
       
    //   }

    _getTemplate() {
        return `<div class="timers">
            <div class="timers__control" data-element="control">
                <input type="number" class="timers__input" data-element="input" placeholder="Введите время в секундах">
                <button class="btn btn--add">Добавить таймер</button>
            </div>
            <div class="timers__wrapper" data-element="timers" ></div>
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

    constructor() {
        this._init();
    }

    _init() {
        this._element = createElement(this._getTemplate());
      }

    _getTemplate() {
        return `<div class="timer">
                    <span class="timer__time">10</span>
                    <button class="btn btn--remove">удалить</button>
                </div>`;
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


root.insertAdjacentElement("beforeend", new Timers().element);