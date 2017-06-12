var cargarPagina = function(){
	obtenerNombresPokemons();
	$(document).on("click",".pokemon",mostrarInfoPokemon);
}
var obtenerNombresPokemons = function(){
	$.getJSON("http://pokeapi.co/api/v2/pokemon/",
		 function (response) {
		 var pokemons = response.results;
		 crearPokemons(pokemons);
		 imagenesPoke();
	});
};

function crearPokemons(pokemons) {
	var $seccion = $("#pokemons");
	pokemons.forEach(function (pokemon) {
		var url= pokemon.url;
		url= url.replace("pokemon","pokemon-species");
		 var $divContenedor = $("<div/>",{"class":"col-sm-3 thumbnail pokemon", "data-url":url, "data-nombre":pokemon.name});
		 var $imagen = $("<img/>",{"src":"https://dummyimage.com/150x150","class":"imagenPoke", "alt":"imagenPokemon"});
		 var $div = $("<div />",{"class":"caption"});
	   var $nombre = $('<p/>', {"class":"text-center text-uppercase"});
     $nombre.text(pokemon.name);
		 $div.append($nombre);
		 $divContenedor.append($imagen);
		 $divContenedor.append($div);
     $seccion.append($divContenedor);
	});
}
var imagenesPoke = function(){
	$.getJSON("../data/pokemon.json",
		 function (response) {
			 var imag= $(".imagenPoke");
		 		response.forEach(function(img,a){
				imag[a].src= img.imagen;
		 })
});
};

 var plantilla =   '<div class="modal-dialog" role="document">'+
		 '<div class="modal-content">'+
			 '<div class="modal-header">'+
				'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
			 '</div>'+
			 '<div class="modal-body text-center">'+
				 '<img src="https://dummyimage.com/150x150" alt="">'+
				 '<h3 class="text-uppercase">_nombre_</h3>'+
				 '<p>COLOR: _green_</p>'+
				 '<p>HABITAT: _grassland_</p>'+
				 '<p>SHAPE: _cuadruped_</p>'+
				 '<p>GENERA: _seed_</p>'+
		 	 '</div>'+
	 	 '</div>'+
 	 '</div>';

var mostrarInfoPokemon = function(){
	var url = $(this).data("url");
	var name= $(this).data("nombre");
	$("#myModal").html('<div class="spinner">'+
  '<div class="bounce1"></div>'+
  '<div class="bounce2"></div>'+
  '<div class="bounce3"></div>'+
'</div>');
	$.getJSON(url, function (response) {
			 var	descripcion={
				 color:response.color.name,
				 habitat:response.habitat.name,
				 shape:response.shape.name,
				 genera:response.genera[0].genus
			 }
		modal(descripcion,name);
		});

		$('#myModal').modal('show');
};

var modal= function (descripcion,name){
	var $modalContenedor = $("#myModal");
	$modalContenedor.html(plantilla.replace("_green_",descripcion.color)
.replace("_grassland_",descripcion.habitat)
.replace("_cuadruped_",descripcion.shape)
.replace("_seed_",descripcion.genera)
.replace("_nombre_", name)
// .replace("_imagen_",imagen)
);
}

$(document).ready(cargarPagina);
