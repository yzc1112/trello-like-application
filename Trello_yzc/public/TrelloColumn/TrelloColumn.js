const rowCards = document.querySelector('.row__cards');

(function () {
    const currentDocument = document.currentScript.ownerDocument;

    class TrelloColumn extends HTMLElement {

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#trello-column');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            let addANewCardButton = this.shadowRoot.querySelector('.trello-column__add-a-new-card');
            addANewCardButton.addEventListener('click', e => this.addNewCard());

            let removeColumnButton = this.shadowRoot.querySelector('.trello-column__delete-column');
            removeColumnButton.addEventListener('click', e => this.removeColumn());
            this.$columnWrapper = this.shadowRoot.querySelector('.trello-column-container');
            console.log('columnwrapper',this.$columnWrapper);
            this.$columnWrapper.addEventListener('drop', this.onDrop.bind(this));
            this.$columnWrapper.addEventListener('dragover', this.onDragOver.bind(this));
        }

        getColumnData(column, userSearchQueryValue) {
            this.render(column, userSearchQueryValue);
        }

        render(column, userSearchQueryValue) {

            fetch(`http://localhost:3000/cards${userSearchQueryValue}`)
                .then((response) => response.text())
                .then((responseText) => {
                    const cardList = JSON.parse(responseText);

                    var node = this.shadowRoot.querySelector('.trello-column__title');

                    cardList.forEach(card => {

                        if (card.columnId === column.id) {
                            let trelloCard = document.createElement('trello-card');
                            node.appendChild(trelloCard);
                            trelloCard.getCardData(card);
                        }

                    });

                })
                .catch((error) => {
                    console.error(error);
                });

            this.shadowRoot.querySelector('.trello-column__title').id = column.id;
            this.shadowRoot.querySelector('.trello-column__title').innerHTML = column.title;
        }

        addNewCard() {
            var node = this.shadowRoot.querySelector('.trello-column__title');
            let trelloCard = document.createElement('trello-card');
            // var uniqueIdCard = '(' + 'id-' + Math.random().toString(36).substr(2, 16) + ')';
            var object = { title: "New Card", description: "New Card Description" };
            node.appendChild(trelloCard);
            trelloCard.getCardData(object);
        }

        removeColumn() {
            let columnToBeRemoved = this.shadowRoot.querySelector('.trello-column-container');
            columnToBeRemoved.remove();
        }
        onDragOver(e) {
            e.preventDefault();
          }
          async onDrop(e) {
            this.$columnWrapper.className = 'column-wrapper';
            this._dragCounter = 0;
        
            // get card data from the event
            const data = JSON.parse(e.dataTransfer.getData('text/json'));
            console.log('data',data);
            let trelloCard = document.createElement('trello-card');
            // const dragElement = this.shadowRoot.querySelector(".trello-card");
            var object = { id:data.id, title: data.title, description: data.description };
            // node.appendChild(trelloCard);
           
            // console.log('dragelement',dragElement);
            // console.log('e.source',e.source);
            e.target.parentNode.appendChild(trelloCard);
            trelloCard.getCardData(object);
            let cardToBeRemoved = currentDocument.getElementById('1');
            console.log('cardtoberemoved',cardToBeRemoved);
            cardToBeRemoved.remove();
            e.dataTransfer.clearData();
        
          }
    }

    customElements.define('trello-column', TrelloColumn);
})();

