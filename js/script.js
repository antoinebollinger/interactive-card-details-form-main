class Card {
    #form;
    #inputs;

    constructor() {
        this.#form = document.forms[0];
        this.#inputs = [...this.#form.elements].filter(input => input.type !== 'submit');
        this.#init();
    }

    #synchronisation() {
        this.#inputs.forEach(input => {
            const cardSibling = document.querySelector(`.${input.id}`);
            if (input.value === '') cardSibling.innerHTML = cardSibling.dataset.placeholder;
            input.addEventListener('keyup', () => {
                cardSibling.innerHTML = input.value !== '' ? input.value : cardSibling.dataset.placeholder;
            });
        });
    }

    #formatNumber() {
        this.#form.elements['card-number'].addEventListener('keyup', (e) => {
            const formatedValue = [...e.target.value].filter(ele => ele !== ' ').map((ele, index) => {
                return `${(index % 4 === 0 ? ' ' : '')}${ele}`
            }).join('');
            e.target.value = formatedValue;
        })
    }

    #formValidation() {
        this.#form.addEventListener('submit', (e) => {
            e.preventDefault();
            const validation = this.#inputs.map(ele => {
                ele.setAttribute('required', true);
                return ele.checkValidity();
            }).reduce((acc, cur) => acc = (cur && acc) ? true : false, true);
            if (validation) this.#confirm();
        })
    }

    #confirm() {
        console.log("it's OK!");
        const template = document.querySelector('template');
        this.#form.remove();
        document.querySelector('.card').insertBefore(template.content, null)
    }

    #init() {
        this.#formatNumber();
        this.#synchronisation();
        this.#formValidation();
    }
}

new Card();