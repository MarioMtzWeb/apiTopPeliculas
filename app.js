'use strict';

let pagina = 1;
let db;
const d = document,
btnAnterior = d.getElementById('btnAnterior'),
btnSiguiente = d.getElementById('btnSiguiente'),
$divContador = d.querySelector('.contadorPag'),
$contenedorGlobal = d.querySelector('.container-global');

const API = `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=`;

const incrementPage = () => {
	if(pagina < 10){
		pagina++;
		renderMovies(getData(API,pagina));
		renderPag();
	}
};
const decrementPage = () => {
	if(pagina > 1){
		pagina--;
		renderMovies(getData(API,pagina));
		renderPag();
	}
};

const renderModal = (movie) => {

	console.log(movie);

	const $cardModal = d.createElement('div'),
	$btnClose = d.createElement('button'),
	$h3 = d.createElement('h3'),
	$img = d.createElement('img'),
	$box = d.createElement('div'),
	$p = d.createElement('p');
	$cardModal.classList.add('card-modal');
	$h3.classList.add('card-modal-title');
	$btnClose.classList.add('card-modal-btn');
	$box.classList.add('card-modal-box');
	$img.classList.add('card-modal-img');
	$p.classList.add('card-modal-p');

	$h3.textContent = movie.title;
	$img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
	$box.innerHTML = `
		<div>
			<p>
				Estreno: <span class="date-modal">${movie.release_date}</span>
			</p>
		</div>
		<div class="box-vote">
			<i class="fa-solid fa-star icon-vote"></i>
			<p>
				${movie.vote_average}
			</p>
		</div>
	`;
	$p.textContent = movie.overview || 'Sin sinopsis';

	$btnClose.textContent = 'X';
	$cardModal.appendChild($h3);
	$cardModal.appendChild($img);
	$cardModal.appendChild($box);
	$cardModal.appendChild($p);
	$cardModal.appendChild($btnClose);


	d.querySelector('.modal').innerHTML = '';
	d.querySelector('.modal').appendChild($cardModal);
	d.querySelector('.modal').classList.remove('none');
	d.querySelector('.modal').classList.add('is-visible');

};

const searchMovie = (id, db) => {

	let movie = db.filter(movie => movie.id === Number(id));

	renderModal(movie[0]);
}

const renderPag = () => {

	d.querySelector('.contadorPag').textContent = `Pag: ${pagina}`;
};

const renderMovies = async (data) => {
	try {	
		
		let $fragment = d.createDocumentFragment();
		
		let arr = await data;

		db = arr;
	
		arr.forEach( movie => {
			const $div = d.createElement('div');
			const $h4 = d.createElement('h4')
			const $img = d.createElement('img')
			$div.classList.add('card');
			$img.classList.add('card-img');
			$img.dataset.id = movie.id;
			$h4.innerText = movie.title;
			$img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

			$div.appendChild($h4)
			$div.appendChild($img)

			$fragment.appendChild($div);
		});

		d.querySelector('.contenedor').innerHTML = '';
		d.querySelector('.contenedor').appendChild($fragment);

	} catch (err) {

		console.log(err);
	}
}

const getData = async (url, page) => {
	try {
		
		let data = await fetch(`${url}${page}`);
		
		if(!data.ok){
			throw data;
		}
		let res = await data.json();

		return res.results;
	} catch (err){
		
		console.log(err);
		let message = err.statusText || 'Ocurro un error';

		console.error(`Error ${err.status} : ${message}`);
	}
};

renderMovies(getData(API,pagina));
renderPag();

d.addEventListener('click', e => {

	if(e.target === btnSiguiente){
		incrementPage();
	}
	if(e.target === btnAnterior){
		decrementPage();
	}
	if(e.target.matches('.card-img')){
		let id = e.target.dataset.id;
		searchMovie(id, db);
	}
	if(e.target.matches('.card-modal-btn') || e.target.matches('.modal')){
		d.querySelector('.card-modal').remove();
		d.querySelector('.modal').classList.remove('is-visible');
		d.querySelector('.modal').classList.add('none');
	}
});


