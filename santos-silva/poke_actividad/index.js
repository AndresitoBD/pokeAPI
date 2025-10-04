
// index.js - implementación básica
const nameEl = document.getElementById('nombre_pokemon');
const imgEl = document.getElementById('img');
const input = document.getElementById('inputBuscar');
const btn = document.getElementById('botonBuscar');
const errorEl = document.getElementById('error');

async function peticionAPI(nombre='pikachu'){
  try{
    errorEl.style.display='none';
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + nombre.toLowerCase());
    if(!res.ok) throw new Error('Pokémon no encontrado');
    const datos = await res.json();
    // ruta de la imagen: sprites.other.dream_world.front_default (fallback a sprites.front_default)
    const imgUrl = datos.sprites?.other?.dream_world?.front_default || datos.sprites?.front_default || '';
    nameEl.textContent = datos.name;
    imgEl.src = imgUrl;
    imgEl.alt = datos.name;
  }catch(err){
    nameEl.textContent = '—';
    imgEl.src = '';
    imgEl.alt = '';
    errorEl.style.display='block';
    errorEl.textContent = err.message || 'Error en la petición';
  }
}

// eventos
btn.addEventListener('click', ()=> peticionAPI(input.value || 'pikachu'));
input.addEventListener('keyup', (e)=> { if(e.key === 'Enter') peticionAPI(input.value || 'pikachu') });

// cargar por defecto
peticionAPI();
