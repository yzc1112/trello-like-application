(function () {
    const currentDocument = document.currentScript.ownerDocument;

    class TrelloCard extends HTMLElement {
        constructor() {
            super();
            this._id = '';
            this._title = '';
            this._description = '';
            this._columnId = null;
            this.addEventListener('click', e => {
                this.toggleDescription();
            });

        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#trello-card');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            let removeCardButton = this.shadowRoot.querySelector('.trello-card__delete-card');
            console.log('remove',removeCardButton);
            removeCardButton.addEventListener('click', e => this.removeCard());
            this.$card = this.shadowRoot.querySelector('.trello-card-container');
            console.log('this', this.$card);    
            this.$card.addEventListener('dragstart', this.onDragStart.bind(this));
        }

        getCardData(card) {
            this.render(card);
        }

        render(card) {
            this.$card.id= card.id
            console.log('id',this.$card.id)
            this.shadowRoot.querySelector('.trello-card-container').id = card.id;
            this.shadowRoot.querySelector('.trello-card__title').innerHTML = card.title;
            this.$card.title = card.title;
            console.log('card.title',this.$card.title);
            this.shadowRoot.querySelector('.trello-card__description').innerHTML = card.description;
            this.$card.description = card.description;
        }

        removeCard() {
            let cardToBeRemoved = this.shadowRoot.querySelector('.trello-card-container');
            cardToBeRemoved.remove();
        }

        toggleDescription() {
            let elem = this.shadowRoot.querySelector('.trello-card__description');
            if (elem) {
                elem.style.display = elem.style.display == 'none' ? 'block' : 'none';
                elem.contenteditable = elem.style.display == 'none' ? 'false' : 'true';
            }
        }

        onDragStart(e) {
            e.dataTransfer.effectAllowed = 'move';
            console.log('aaaa',this.$card.id,this._columnId,this.$card.description,this.$card.title);
            e.dataTransfer.setData(
              'text/json',
              JSON.stringify({
                id: this.$card.id,
                description: this.$card.description,
                title: this.$card.title,
              })
            );
          }

    }
   

    customElements.define('trello-card', TrelloCard);
})();

