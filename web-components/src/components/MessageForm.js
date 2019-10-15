/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
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

        html, body{
            height: 100%;
            font-family: -apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,Noto Sans Armenian,Noto Sans Bengali,Noto Sans Cherokee,Noto Sans Devanagari,Noto Sans Ethiopic,Noto Sans Georgian,Noto Sans Hebrew,Noto Sans Kannada,Noto Sans Khmer,Noto Sans Lao,Noto Sans Osmanya,Noto Sans Tamil,Noto Sans Telugu,Noto Sans Thai,sans-serif;
            font-size: var(--fontNormSize);
        }

        :host{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            outline: 1px solid green;
        }

        .content{
            margin-top: 40px;
            width: 100%;
            display: flex;
            flex: auto;
            flex-wrap: wrap;
            flex-direction: column-reverse;
            align-content: flex-end;
            z-index: 0;
            overflow-y: auto;
        }

        ::-webkit-scrollbar {
            width: 0px;
        }

        .messageWrap{
            display: block;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
        }

        message-box{
            box-sizing: border-box;
            width: 100%;
            padding: 10px 20px 10px;
        }

        .footer{
            width: 100%;
            outline: 1px solid orange;
            background-color: #FFF;
            z-index: 1;
        }

    </style>

    <div class="content">
        <div class="messageWrap"></div>
    </div>
    <div class="footer">
        <form-input placeholder="Ваше сообщение"></form-input>
    </div>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this._shadowRoot.querySelector('form-input');
        this.$messages = this._shadowRoot.querySelector('.messageWrap');

        this.$input.addEventListener('onSubmit', this._onSubmit.bind(this));

        this.dialogID = 0;

        this._messageLoader();
    }

    _messageLoader() {
        // let currentID = parseInt(localStorage.getItem(this.dialogID + '_curentID'));
        // console.log(currentID);
        let currentID = localStorage.getItem('dialog_0');
        if (currentID == undefined) {
            currentID = 0;
        } else {
            // let i = 0;
            // if (i < 0) i = 0;
            /* do {
                // let messageBox = JSON.parse(localStorage.getItem('msg_' + this.dialogID + '_' + i));
                messageBox = JSON.parse(localStorage.getItem('dialog_0'));
                if (messageBox != null) this._renderMessage(messageBox);
            } while (++i && i <= currentID); */
            var messageBox = JSON.parse(localStorage.getItem('dialog_0'));
            for (var i = 0; i < currentID.length; i++) {
                if (messageBox[i] != undefined) {
                    this._renderMessage(messageBox[i]);
                }
            }
        }
    }

    _renderMessage(messageBox) {
        const template = document.createElement('message-box');
        const message = this.$messages.appendChild(template);

        message.setAttribute('messageid', messageBox.messageid);
        message.setAttribute('owner', messageBox.owner);
        message.setAttribute('text', messageBox.message);
        message.setAttribute('time', messageBox.time);

        /*

        this.$messages.innerHTML += `<message-box
            messageID="${messageBox['messageID']}"
            owner="${messageBox['owner']}"
            text="${messageBox['message']}"
            time="${messageBox['time']}"
        ></message-box>`;

        */
    }

    _newMessage(owner, text, additions = null) {
        // let currentID = parseInt(localStorage.getItem(this.dialogID + '_curentID')) + 1;

        var currentID = 0;
        if (localStorage.getItem('dialog_0') != undefined) {
            currentID = localStorage.getItem('dialog_0').length;
            // console.log(localStorage.getItem('dialog_0'));
        }

        // if (isNaN(currentID)) currentID = 0;
        // localStorage.setItem(this.dialogID + '_curentID', currentID);

        let time = new Date();
        var messageBox = {
            messageid: currentID,
            owner: ((owner) ? 'enemy' : 'self'),
            message: text,
            additions: null,
            time: time.getTime(),
        };

        var messages = [];
        if (localStorage.getItem('dialog_0') != undefined) {
            messages = JSON.parse(localStorage.getItem('dialog_0'));
        }
        messages.push(messageBox);
        localStorage.setItem('dialog_0', JSON.stringify(messages));
        // console.log(localStorage.length);
        this._renderMessage(messageBox);
    }

    _onSubmit(event) {
        if (this.$input.value != '') {
            this._newMessage(0, this.$input.value);
            this.$input.setAttribute('value', '');
        }
    }
}

customElements.define('message-form', MessageForm);
