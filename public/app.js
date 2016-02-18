var deleteBear = function() {
	event.preventDefault();
	
	var id = $(event.target).closest('tr').attr('id');
	var bear = $(event.target).closest('tr');

	if(confirm('Are you sure you want to delete this bear?')){
		$.ajax({
			url: 'api/bears/' + id,
			method: 'DELETE',
		}).done(function() {
			console.log('bear deleted!');
			bear.remove();
		})
	}
}

$('.deleteBear').on('click', deleteBear);


var addBear = function(event){
	event.preventDefault();

	var name = $('#name').val();
	var age = $('#age').val();
	var gender = $('#gender').val();
	var $table = $('#bearTable');

	var bear = {};
	bear.name = name;
	bear.age = Number(age);
	bear.gender = gender;

	if (!bear.age){
		alert('Please enter a numeric age for bear');
		return;
	}

	$.ajax({
		url: '/api/bears',
		method: 'POST',
		data: bear
	}).done(function(data){
		console.log('I posted a bear!', data)

		$table.append('<tr id=' + data._id + '> \
					  <td>' + data.name + '</td> \
					  <td>' + data.age + '</td>	  \
					  <td>' + data.gender + '</td>  \
					  <td><button class="btn btn-danger deleteBear">delete</button></td> \
					  </tr>'
					  );
		$('.deleteBear').off('click').on('click', deleteBear);
	});
}


$('#addBear').on('click', addBear);