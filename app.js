'use strict';

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior'),btnSiguiente = document.getElementById('btnSiguiente'),
$divContador = document.querySelector('.contadorPag'), d = document,
$contenedorGlobal = d.querySelector('.container-global');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 10){
		pagina += 1;
		cargarPeliculas();
	}
	$divContador.textContent = `Pag: ${pagina}`;
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
	$divContador.textContent = `Pag: ${pagina}`;
});


const retornarPeliculas = ( peliculas ) => {

	console.log(peliculas.results);

	d.addEventListener('click', e => {

		if(e.target.matches('.pelicula *')){
			
			const $title = e.target.parentElement.children[1].textContent,
			$img = e.target.parentElement.children[0].src,
			$div = d.createElement('div');
			let peli,
			popularidad;
		
			
			console.log($title, $img);

			$div.classList.add('modal');
			$contenedorGlobal.appendChild($div);

			peliculas.results.forEach(ele => {
				if(ele.title === $title){
					peli = ele.overview;
					popularidad = ele.populatity;
				}
			});


			$div.innerHTML = `
				<div class="modal-card">
					<header><a href="#" class="btn-close">X</a></header>
					<h2 class="card-title">${$title}</h2>
					<img class="card-img"src="${$img}">
					<div class="card-icons">
					<a>${popularity/1000}</a><span class="card-icon"><i class="fas fa-star"></i></span>
					</div>
					<p>
						${peli}
					</p>
				</div>
			`;
		};

		if(e.target.matches('.btn-close')){
			e.preventDefault();
			//console.log(e.target);
			d.querySelector('.modal').remove();
		}

	});
}


const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		//console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();

			retornarPeliculas(datos);

			let peliculas = '';
			datos.results.forEach(pelicula => {
				//console.log(pelicula);
				peliculas += `
				<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
				</div>
				`;
			});

			d.querySelector('.contenedor').innerHTML = peliculas;
			

			console.log(pagina);

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();

$divContador.textContent = `Pag: ${pagina}`;

/* d.addEventListener('click', e =>{
	//console.log(datos);
	
	if(e.target.matches('.pelicula img')){
		let namePeli = e.target.parentElement.children[1].textContent,
		imgPeli = e.target.parentElement.children[0].src,
		peli; 
		//console.log(e.target.parentElement.children[1].textContent);
		const $div = d.createElement('div'); 
		$div.classList.add('modal');
		$contenedorGlobal.appendChild($div);

		datos.results.forEach(ele => {
			if(ele.title === namePeli){
				peli = ele.overview;
			}
		});

		//console.log(peli);

		$div.innerHTML = `
			<div class="modal-card">
				<header><a href="#" class="btn-close">X</a></header>
				<h2 class="card-title">${namePeli}</h2>
				<img class="card-img"src="${imgPeli}">
				<p>
					${peli}
				</p>
			</div>
		`;
	};

	if(e.target.matches('.btn-close')){
		e.preventDefault();
		//console.log(e.target);
		d.querySelector('.modal').remove();
	}
}); */

