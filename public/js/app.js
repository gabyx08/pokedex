$.getJSON("http://pokeapi.co/api/v2/pokemon/",
	 function (response) {
	 var pokemons = response.results;
	 crearPokemons(pokemons);
});
function crearPokemons(pokemons) {
	var $seccion = $("#pokemons");
	pokemons.forEach(function (pokemon) {
		var $divContenedor = $("<div/>",{"class":" col-md-3 thumbnail pokemon", "data-url":pokemon.url})
		var $imagen = $("<img/>",{"src":"https://dummyimage.com/150x150", "alt":"imagenPokemon"})
		var $div = $("<div />",{"class":"caption"})
	   var $nombre = $('<p/>', {"class":"text-center text-uppercase"});
     $nombre.text(pokemon.name);
		 $div.append($nombre);
		 $divContenedor.append($imagen);
		 $divContenedor.append($div);
     $seccion.append($divContenedor);
	});
}
