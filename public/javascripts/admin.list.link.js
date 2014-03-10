$(function(){
	$.each($('tr[data-product-id'), function(index, val) {
		$(val).on('click', function(event) {
			document.location = '{{ route.path }}'+$(this).attr('data-product-id');
		}); 	 
	}); 
});