const template = document.createElement('template');
template.innerHTML = `
    <style>
        *{
            margin: 0;
            padding: 0;
            --fontNormalSize: 1.1em;
            --fontMinSize: 0.95em;
            --fontMaxSize: 1.2em;
            --fontMinMinSize: 0.8em;
            box-sizing: border-box;
        }

        li{
            list-style: none;
        }

        .messageBox{
            /* outline: 1px solid red; */
            /* margin-top: 40px; */
            color: white;
            background-color: #4a76a8;
            border-radius: 15px;
            padding: 10px;
            text-align: justify;
            max-width: 60%;
            word-break: break-all;
        }

        .messageBox .time{
            width: 100%;
            text-align: right;
            font-size: var(--fontMinSize);
            margin-top: 5px;
            color: red;
        }

        .self{
            float: right;
        }

        .self:after{
            clear: both;
        }
    </style>
    <div class="messageBox">
        <div class="text"></div>
        <div class="time"></div>
    </div>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$wrap = this.shadowRoot.querySelector('.messageBox');
        this.$text = this.shadowRoot.querySelector('.text');
        this.$time = this.shadowRoot.querySelector('.time');
    }

    static get observedAttributes() {
        return ['messageid', 'owner', 'text', 'time', 'read'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'messageid':
                // console.log("messageid изменился")
                // this.$wrap.attr('messageid', newValue);
                break;

            case 'owner':
                this.$wrap.classList.add(newValue);
                break;

            case 'text':
                this.$text.innerText = newValue;
                break;

            case 'time':
                let time = new Date(parseInt(newValue));
                time = time.toString().split(' ')[4].split(':');
                this.$time.innerText = time[0] + ':' + time[1];
                break;

            case 'read':
                break;
        }
    }
}

customElements.define('message-box', MessageForm);
