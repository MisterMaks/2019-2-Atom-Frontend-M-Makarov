const template = document.createElement('template');
template.innerHTML = `
    <style>

        .dialogBox{
            /* outline: 1px solid red; */
            /* margin-top: 40px; */
            height: 75px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            /* color: white; */
            /* background-color: #4a76a8; */
            /* border-radius: 15px; */
            padding: 10px;
            /* text-align: justify; */
            /* max-width: 60%; */
            /* word-break: break-all; */
            cursor: pointer;
            border-bottom: 1px solid #242424;
        }

        .dialogBox .time{
            /* width: 100%;
            text-align: right;
            font-size: var(--fontMinSize);
            margin-top: 5px; */
            color: red;
        }

        .name_with_text{
            display: flex;
            flex-direction: column;
            flex-grow: 10;
        }

        .avatar{
            background: url('https://sun9-45.userapi.com/hEQhH2jxDrt9dY8DFTka_w3ETVIkFGo-ntwt8g/Nqb8C2aQd_Q.jpg') no-repeat center;
            background-size: 134%;
            height: 70px; 
            width: 70px;
            opcaity: 0.85;
            transition-duration: 0.15s;
            border-radius: 50px;
        }

        .avatar_place{
            flex-grow: 3;
        }

        .name{
            height: 45px;
        }

        .time_with_read{
            flex-grow: 1;
            padding-top: 20px;
            display: flex;
            flex-direction: column;
        }

        .read{
            background: url('https://image.flaticon.com/icons/svg/60/60727.svg') no-repeat center;
            background-size: 100%;
            height: 20px; 
            width: 20px;
        }

        .read_place{
            padding-top: 15px;
            padding-left: 20px;
        }

    </style>
    <div class="dialogBox">
        <div class="avatar_place">
            <div class="avatar"></div>
        </div>
        <div class="name_with_text">
            <div class="name">Максим Макаров</div>
            <div class="text"></div>
        </div>
        <div class="time_with_read">
            <div class="time"></div>
            <div class="read_place">
                <div class="read"></div>
            </div>
        </div>
    </div>
`;

class DialogForm extends HTMLElement {
    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$wrap = this.shadowRoot.querySelector('.dialogBox');
        this.$text = this.shadowRoot.querySelector('.text');
        this.$time = this.shadowRoot.querySelector('.time');

        this.$wrap.addEventListener('click', this.wrap.bind(this));
    }

    static get observedAttributes() {
        return ['dialogid', 'owner', 'text', 'time'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let time = new Date(parseInt(newValue, 10));
        switch (name) {
        case 'dialogid':
            // console.log("messageid изменился")
            // this.$wrap.attr('messageid', newValue);
            break;

        case 'owner':
            this.$wrap.classList.add(newValue);
            break;

        case 'text':
            if (newValue.length > 20) {
                this.$text.innerText = `${newValue.slice(0, 20)}...`;
            } else {
                this.$text.innerText = newValue;
            }
            break;

        case 'time':
            // let time = new Date(parseInt(newValue, 10));
            time = time.toString().split(' ')[4].split(':');
            this.$time.innerText = `${time[0]}:${time[1]}`;
            break;

        default:
            /* code */
            break;
        }
    }

    wrap() {
        this.dispatchEvent(new Event('showDialog'));
        // console.log("Открыть диалог :)");
    }
}

customElements.define('dialog-box', DialogForm);
