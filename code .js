let filas = 80;
let columnas = 80;
let lados=20
fotografia=[]
let reproducir=false

generarTablero();


setInterval(()=>{
    if(reproducir){
        siguienteEstado()
    }
},100)
function intercambiarRepro(){
    reproducir=!reproducir
    if (reproducir) {
        document.body.style.background = "white"
        document.getElementById("btn1").innerHTML = `<i class="fas fa-pause"></i>`
    } else {
        document.body.style.background = "#f0f0ff"
        document.getElementById("btn1").innerHTML = `<i class="fas fa-play"></i>`
    }
}

function generarTablero() {
  let html = `<table cellpadding=0 cellspacing=0 id="tablero">`;
  for (let y = 0; y < filas; y++) {
    html += `<tr>`;
    for (let x = 0; x < columnas; x++) {
      html += `<td id="celula-${+x+"-"+y}" onmouseup="cambiarEstado(${x},${y})">`;
      html += `</td>`;
    }
    html += `</tr>`;
  }
  html += `</table>`;

  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = html;
  let tablero=document.getElementById("tablero");
  tablero.style.width=lados*columnas+"px"
  tablero.style.height=lados*columnas+"px"
}
function cambiarEstado(x,y){
    let celula = document.getElementById(`celula-${x + "-" + y}`)
    if (celula.style.background != "cadetblue") {
        celula.style.background = "cadetblue"
    } else {
        celula.style.background = ""
    }
}


function limpiar(){
    fotografia=[]
    for(var x=0;x<columnas;x++){
        fotografia.push([])
        for (var y=0;y<filas;y++){
            let celula=document.getElementById(`celula-${+x+"-"+y}`);
            celula.style.background=""
        }
    }
}
function randomizar() {
    for (let x = 0; x < columnas; x++) {
        for (let y = 0; y < filas; y++) {
            if (Math.random() < 0.2 ) {
                cambiarEstado(x, y)
            }
        }
    }
}
function Photografiar(){
    fotografia=[]
    for(var x=0;x<columnas;x++){
        fotografia.push([])
        for (var y=0;y<filas;y++){
            let celula=document.getElementById(`celula-${+x+"-"+y}`);
            fotografia[x][y]=celula.style.background=="cadetblue"
        }
    }
}
function contarVivas(x,y){
    let vivas=0;
    for(let i= -1 ; i<=1 ; i++){
        for(let j= -1 ; j<=1 ; j++){
            if(i==0 && j==0)
            continue
            try{
                if(fotografia[x+i][y+j]){
                    vivas++
                }
            }catch(e){}
            if(vivas>3){
                return vivas
            }
        }
    }
    return vivas
}
function siguienteEstado(){
    Photografiar();
    for(var x=0; x<columnas ;x++){
        for(var y=0; y < columnas ; y++){
            let vivas=contarVivas(x,y);
            let celula=document.getElementById(`celula-${+x+"-"+y}`);
            if(fotografia[x][y]){
                if(vivas< 2|| vivas>3){
                    celula.style.background=""
                }
            }else{
                if(vivas==3){
                    celula.style.background="cadetblue"
                }
            }

        }
    }
}