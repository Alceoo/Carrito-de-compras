//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners(){
   listaCursos.addEventListener('click', agregarCurso);  
   //Eliminar cursos del carrito.
   carrito.addEventListener('click', eliminarCurso);
   /*Eliminar todo el carrito de compras de tajo*/
   vaciarCarrito.addEventListener('click', () => {
//     console.log('vaciando carrito');
  /*Hay dos cosas que tenemos que hacer, una es reiniciar el arreglo(es decir
    lo que hay en el arreglo, mantenerlo cómo nada) y 2do mandar llamar el 
    html*/
    
  articulosCarrito = [];/*aqui lo que estamoc haciendo es reiniciar el arreglo a un arreglo
  vacío si presionamos el boton vaciar carrito.*/
   
 carritoHTML();/*.2, también le podríamos haber puesto limpiarHTM,los 2 sirven, lo que estamos
 haciendo aqui es mandar llamar el html de nuevo para que los cambios que hicimos del carrito
 se muestren en el html*/


});
}

function agregarCurso(e){
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
   
 }}

function eliminarCurso(e){
 if(e.target.classList.contains('borrar-curso')){
  const cursoID = e.target.getAttribute('data-id');
  //elimina del arreglo Artículos carrito por el data-id
  articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
  carritoHTML();
}}

function leerDatosCurso(curso){
   const infoCurso = {
   imagen: curso.querySelector('img').src,
   titulo: curso.querySelector('h4').textContent,
   precio: curso.querySelector('.precio span').textContent,    
   id: curso.querySelector('a').getAttribute('data-id'),
   cantidad: 1
 } 
 const existe = articulosCarrito.some( curso => curso.id  === infoCurso.id);
   if(existe){//actualizamos la cantidad 
   const cursos = articulosCarrito.map( curso => {
     if(curso.id === infoCurso.id){
        curso.cantidad++;
     return curso;
    }else {
    return curso;
  }
});  
articulosCarrito = [...cursos];
}else  {
 articulosCarrito = [...articulosCarrito, infoCurso]; 
}//Agregar elementos al arreglo de carrito
 //articulosCarrito = [...articulosCarrito, infoCurso];
console.log(articulosCarrito);
 carritoHTML();
}
//Muestra carrito de compras en el html
function carritoHTML (){
  /*limpiarhtml*/  
limpiarHTML();
//Recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
     // console.log(curso);  
          const row = document.createElement('tr');
        row.innerHTML = //aquí el orden de los factores si afecta el producto
        `<td> 
           <img src=" ${curso.imagen}" width="100" >
        </td>

        <td> ${curso.titulo} </td> 
         
        <td>${curso.precio}</td>
        
        <td>${curso.cantidad}</td>
   -
        <td> 
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
     //Agregar el HTML al carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}
//Elimina los cursos del tbody
function limpiarHTML (){
    while (contenedorCarrito.firstChild){
 contenedorCarrito.removeChild(contenedorCarrito.firstChild);
 }  
}