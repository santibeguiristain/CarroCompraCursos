//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const infoCard = document.querySelector('.info-card');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito =[];

cargarEventListeners();
function cargarEventListeners()
{
    //Al presionar "Agregar al Carrito"
    listaCursos.addEventListener('click' , agregarCurso);

    carrito.addEventListener('click',eliminarCurso);

    vaciarCarrito.addEventListener('click',eliminarCurso);
}
 



btnVaciarCarrito.addEventListener('click',limpiarHtmlyArreglo);




//Funciones


function agregarCurso(e)
 {
    e.preventDefault(); //Sino al presionar el boton se sube la pantalla
  
    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
     
    }
 }




 function eliminarCurso(e) {
  
  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    alert(cursoId);
    //Eliminar del arreglo por id, me quedo con todos los elementos menos con el curso a eliminar.
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHtml();//itera nuevamente en el carroy muesra
  }
 
}




 // Leeer el contenido del HTML al que le dimos click.
 function leerDatosCurso(curso )
 {

   const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1 // primera vez va a ser uno agregado al carro 
   }

   // Revisa si un elemento ya existe en el carrito. (.some devuelve si ya existe)
  const existe = articulosCarrito.some(curso=>curso.id === infoCurso.id);
 
  if(existe){
      // Actualizamos cantidad
      const cursos = articulosCarrito.map(curso => {
       if( curso.id === infoCurso.id){
          curso.cantidad ++;
          
          return curso; //Retorna objeto actualizado
       }else{
          return curso; //Retorna los objetos que no son duplicados pero que igual son importantes para el carro de compra.
       }
      })
   }else {
     // Agrega elemento al carrito
     articulosCarrito.push(infoCurso);
   }
   

   carritoHtml(articulosCarrito);

 }




 
function limpiarHtmlyArreglo()
{
  
  limpiarHtml();
  articulosCarrito = [];
}





 
 // Muestra el Carrito de compras en el HTML
 function carritoHtml(curso )
 {
   
  //Limpiar el hrml
  limpiarHtml();
  //Recorre carro y genera html
   articulosCarrito.forEach(elemento =>{
    const {imagen,titulo,precio,cantidad,id} = elemento;
    const row = document.createElement('tr');
    row.innerHTML= `<td> <img src="${imagen}" class="imagen-curso u-full-width"> </td>
                   <td> ${titulo} </td>
                   <td> ${precio} </td>
                   <td> ${cantidad} </td>
                   
                   <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                    </td>

                   `
                   
                   ;

      //Agrega html del carro al tbody
      contenedorCarrito.appendChild(row);
   })
 }

 //Elimina los cursos del tbody
 function limpiarHtml()
 {
  //Mientras tenga un elemento
    while(contenedorCarrito.firstChild)
    {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild) 
    
    } 
 }