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
            align-content: flex-end;
        } 

        .dialogContent{
            margin-top: 40px;
            width: 100%;
            display: flex;
            flex: auto;
            flex-wrap: wrap;
            flex-direction: column;
            /* z-index: 1; */ 
            overflow-y: auto;
        }

        ::-webkit-scrollbar {
            width: 0px;
        }

        .dialogWrap{
            display: block;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
        }

        dialog-box{
            box-sizing: border-box;
            width: 100%;
            padding: 10px 20px 10px;
        }

        .dialogs{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 40px;
            position: fixed;
            right: 0;
            left: 0;
            top: 0;
            background-color: #75b5ff;
            font-size: 20pt;
            font-family: 'Times New Roman';
        }

        .burger{
            cursor: pointer;
            background: url('https://image.flaticon.com/icons/svg/149/149176.svg') no-repeat;
            background-size: 100%;
            height: 100%;
            width: 39px;
            opcaity: 0.85;
            transition-duration: 0.15s;
        }

        .burger:hover{
            opacity: 1.0;
          }

        .burger:active{
            opacity: 0.6;
        }

        .newButton_place{
            width: 100%; 
            /* outline: 1px solid orange; */
            background-color: #FFF;
            z-index: 1;
            height: 50px;
            width: 50px;
            border-radius: 50px;
            background-color: orange;
        }

        .newButton{
            cursor: pointer;
            background: url('https://image.flaticon.com/icons/svg/2132/2132600.svg') no-repeat center;
            background-size: 70%;
            height: 50px;
            width: 50px;
            border-radius: 50px;
            background-color: orange;
        }

    </style>
    <div class="dialogs">
        <div class="burger"></div>
        <div class="messages">Сообщения</div>
        <div class="something"></div>
    </div>
    <div class="dialogContent">
        <div class="dialogWrap"></div>
    </div>
    <div class="newButton_place">
        <div class="newButton"></div>
    </div>
    <div class="messageContent" style="display: None">
        <message-form></message-form>
    </div>
`;

class DialogForm extends HTMLElement {
    constructor() {
        super();
        this.template = 0;
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$dialogs = this.shadowRoot.querySelector('.dialogWrap');
        this.$messageForm = this.shadowRoot.querySelector('message-form');
        this.$messageContent = this.shadowRoot.querySelector('.messageContent');
        this.$dialogContent = this.shadowRoot.querySelector('.dialogContent');
        this.$newButton = this.shadowRoot.querySelector('.newButton_place');

        this.dialogsLoader();

        // this.$dialog = this._shadowRoot.querySelector('dialog-box');

        if (localStorage.getItem('dialog_0') == null) {
            this.$newButton.addEventListener('click', this.newDialog.bind(this));
        } else {
            this.$dialog = this.shadowRoot.querySelector('dialog-box');
            this.$dialog.addEventListener('click', this.showDialog.bind(this));
        }
        // this.$dialogContent.addEventListener("click", this.showDialog.bind(this));
        // this.$dialog.addEventListener("showDialog", this.showDialog.bind(this));
        this.$messageForm.addEventListener('backButtonFromDialog', this.backButtonFromDialog.bind(this));

        this.$newButton.addEventListener('click', this.newDialog.bind(this));
    }

    dialogsLoader() {
        const dialogIDs = Object.keys(localStorage);
        for (const dialogID of dialogIDs) {
            if (localStorage.getItem(dialogID) == '[]') {
                localStorage.removeItem(dialogID);
                this.$newButton.addEventListener('click', this.newDialog.bind(this));
            }
            if (localStorage.getItem(dialogID) != 'INFO') {
                const dialogBox = JSON.parse(localStorage.getItem(dialogID)).splice(-1);
                this.renderLastMessage(dialogBox[0]);
            }
        }
    }

    renderLastMessage(dialogBox) {
        // console.log(dialogBox);

        this.template = document.createElement('dialog-box');
        this.dialog = this.$dialogs.appendChild(this.template);
        this.dialog.setAttribute('dialogid', dialogBox.messageid);
        this.dialog.setAttribute('owner', dialogBox.owner);
        this.dialog.setAttribute('text', dialogBox.message);
        this.dialog.setAttribute('time', dialogBox.time);
    }

    showDialog() {
        this.$messageContent.setAttribute('style', 'height: 100%');
        // this.$messageForm.setAttribute("style", "z-index: 10");
        this.$newButton.setAttribute('style', 'display: None');
        this.$dialogContent.setAttribute('style', 'display: None');
    }

    backButtonFromDialog() {
        this.$messageContent.setAttribute('style', 'display: None');
        this.$newButton.setAttribute('style', 'display:');
        this.$dialogContent.setAttribute('style', 'display:');

        const dialogIDs = Object.keys(localStorage);
        for (const dialogID of dialogIDs) {
            if (localStorage.getItem(dialogID) != 'INFO') {
                const dialogBox = JSON.parse(localStorage.getItem(dialogID)).splice(-1);
                if (localStorage.getItem('dialog_0') == '[]') {
                    window.location.reload(true);
                }
                this.backButtonrenderLastMessage(dialogBox[0]);
            }
        }
    }

    backButtonrenderLastMessage(dialogBox) {
        if (this.template == 0) {
            this.template = document.createElement('dialog-box');
            this.dialog = this.$dialogs.appendChild(this.template);
            this.$dialogContent.addEventListener('showDialog', this.showDialog.bind(this));
        }
        this.dialog.setAttribute('dialogid', dialogBox.messageid);
        this.dialog.setAttribute('owner', dialogBox.owner);
        this.dialog.setAttribute('text', dialogBox.message);
        this.dialog.setAttribute('time', dialogBox.time);

        this.$dialog = this.shadowRoot.querySelector('dialog-box');
        this.$dialog.addEventListener('click', this.showDialog.bind(this));
    }

    newDialog() {
        // console.log("Новый диалог");
        if (localStorage.getItem('dialog_0') == null) {
            // this.$content.setAttribute("style", "margin-top: 0px");
            localStorage.setItem('dialog_0', JSON.stringify([]));
            this.$messageContent.setAttribute('style', 'height: 100%');
            this.$newButton.setAttribute('style', 'display: None');
            this.$messageForm.addEventListener('backButtonFromDialog', this.backButtonFromDialog.bind(this));
        }
    }
}

customElements.define('dialog-form', DialogForm);
