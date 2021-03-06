var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column').click(function(){
		var columnName = prompt("Enter a column name");
		$.ajax({
			url: baseUrl + "/column",
			method: "POST",
			data: {
				name: columnName
			},
			success: function(response){
				var column = new Column(response.id, columnName);
				board.createColumn(column);
			}
		});
	});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
			receive: function(event, item){
				$.ajax({
					url: baseUrl + "/card/" + item.item[0].id,
					method: "PUT",
					data: {
						bootcamp_kanban_column_id: event.target.parentElement.id,
						name: item.item[0].lastChild.textContent,
					},
				});
			}
    }).disableSelection();
  }