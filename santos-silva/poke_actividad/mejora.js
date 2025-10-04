
// mejora.js - versión mejorada con helpers, estado de carga y manejo de errores
const $ = id => document.getElementById(id);

const nombreResultadoEl = $('nombreResultadoEl');
const imagenResultadoEl = $('imagenResultadoEl');
const inputBuscar = $('inputBuscarMejora');
const botonBuscar = $('botonBuscarMejora');
const estado = $('estado');
const errorMejora = $('errorMejora');

function actualizarEstadoUI(cargando){
  if(cargando){
    botonBuscar.disabled = true;
    estado.textContent = 'Buscando...';
    nombreResultadoEl.textContent = 'Buscando...';
    imagenResultadoEl.src = '';
    imagenResultadoEl.alt = '';
    errorMejora.style.display = 'none';
  } else {
    botonBuscar.disabled = false;
    estado.textContent = '';
  }
}

async function obtenerDatosPokemon(nombre){
  const ruta = 'https://pokeapi.co/api/v2/pokemon/' + nombre.toLowerCase();
  const respuesta = await fetch(ruta);
  if(!respuesta.ok) throw new Error('Pokémon no encontrado');
  return respuesta.json();
}

function mostrarPokemonEnTarjeta(datos){
  nombreResultadoEl.textContent = datos.name;
  const img = datos.sprites?.other?.dream_world?.front_default || datos.sprites?.other?.home?.front_default || datos.sprites?.front_default || '';
  imagenResultadoEl.src = img;
  imagenResultadoEl.alt = datos.name;
}

async function cargarPokemonPorDefecto(){
  actualizarEstadoUI(true);
  try{
    const datos = await obtenerDatosPokemon('pikachu');
    mostrarPokemonEnTarjeta(datos);
  }catch(e){
    errorMejora.style.display = 'block';
    errorMejora.textContent = e.message;
  }finally{
    actualizarEstadoUI(false);
  }
}

async function buscarPokemon(){
  const val = inputBuscar.value.trim();
  if(!val){ errorMejora.style.display='block'; errorMejora.textContent='Ingresa un nombre.'; return; }
  if(/\d+/.test(val)){ errorMejora.style.display='block'; errorMejora.textContent='Esta versión busca solo por nombre, usa la práctica para búsquedas por ID.'; return; }

  actualizarEstadoUI(true);
  try{
    const datos = await obtenerDatosPokemon(val);
    mostrarPokemonEnTarjeta(datos);
  }catch(e){
    errorMejora.style.display = 'block';
    errorMejora.textContent = e.message;
  }finally{
    actualizarEstadoUI(false);
  }
}

// listeners
botonBuscar.addEventListener('click', buscarPokemon);
inputBuscar.addEventListener('keyup', e => { if(e.key === 'Enter') buscarPokemon(); });

// init
document.addEventListener('DOMContentLoaded', cargarPokemonPorDefecto);
