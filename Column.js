function Column(id, name) {
	var self = this;
	
	this.id = id
	this.name = name || "No name given";
	this.element = createColumn(id);

	function createColumn(id) {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column" id="' + id + '"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
            event.preventDefault();
            $.ajax({
                url: baseUrl + "/card",
                method: "POST",
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response){
                    var card = new Card(response.id, cardName);
                    self.createCard(card);
                }
            });
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + "/column" + self.id,
            method: "DELETE",
            success: function(){
                self.element.remove();
            }
        });
	}
};