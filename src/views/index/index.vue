<template>
	<div>this index page index</div>
</template>

<script type="text/javascript">
	axios.get('/', {
		firstName: 'Fred',
		lastName: 'Flintstone'
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
</script>