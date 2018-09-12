//check the todo list

$('ul').on("click", "li", function(){
	$(this).toggleClass("complete");
});

//remove the todo list
$('ul').on("click", "span",function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		var inputText = $(this).val();
		$(this).val("");
		$('ul').append(`<li><span>X </span>${inputText}</li>`);
	}
});
