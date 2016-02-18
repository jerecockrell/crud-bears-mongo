var deleteBear = function() {
	
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
event.preventDefault();

var addBear = function(){
	var name = $('#name').val();
	var age = $('#age').val();
	var gender = $('#gender').val();
	alert(name)
}

$('.addBear').on('click', addBear);