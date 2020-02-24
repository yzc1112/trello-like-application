const rowColumns = document.querySelector('.row__columns');
const currentDocument = document.currentScript.ownerDocument;
 
    function _fetchAndPopulateData(self, userSearchQuery) {

    fetch(`http://localhost:3000/columns`)
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
            const list = JSON.parse(responseText);
            console.log(list);

            var node = currentDocument.querySelector('.row__columns');

            var userSearchQueryValue = userSearchQuery ? userSearchQuery : "";

            list.forEach(column => {
                let trelloColumn = document.createElement('trello-column');
                rowColumns.appendChild(trelloColumn);
                trelloColumn.getColumnData(column, userSearchQueryValue);
            });

            function _addButtonColumn() {
                let addColumnButton = currentDocument.createElement('button');
                addColumnButton.innerHTML = "Add New Column";
                addColumnButton.onclick = () => {

                    let trelloColumn = document.createElement('trello-column');
                    // var uniqueIdColumn = '(' + 'id-' + Math.random().toString(36).substr(2, 16) + ')';
                    var object = { title: "New Column"};
                    rowColumns.insertBefore(trelloColumn, addColumnButton);
                    trelloColumn.getColumnData(object, userSearchQueryValue);

                }

                return addColumnButton;
            }

            let addButtonColumn = _addButtonColumn();
            node.appendChild(addButtonColumn);

        })
        .catch((error) => {
            console.error(error);
        });
}
_fetchAndPopulateData();

function search(ele) {
    if (event.key === 'Enter') {

        var userSearchQuery = "?q=" + ele.value;

        var trelloAppContent=document.getElementById("trello-app__content");  
        trelloAppContent.innerHTML = "";

        _fetchAndPopulateData(this, userSearchQuery);
    }
}