var baseUrl = "https://kodilla.com/pl/bootcamp-api";
var myHeaders = {
    "X-Client-Id" : "1846",
    "X-Auth-Token" : "08e4f3f48c5b3cd58bf3c78459518d9a",
}
$.ajaxSetup({
    headers: myHeaders
});

$.ajax({
    url: baseUrl + "/board",
    method: "GET",
    success: function(response){
        setupColumns(response.columns);
    }
});

function setupColumns(columns){
    columns.forEach(function (column){
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards){
    cards.forEach(function (card){
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(card);
    });
}