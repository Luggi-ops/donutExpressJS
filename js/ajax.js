

const bntCatalogo = document.querySelector('.bnt-catalogo');

document.addEventListener('DOMContentLoaded', traerDatosBebida);

function traerDatosBebida(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'js/precios-bebida.json', true);

    xhr.send();

    xhr.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let productos = JSON.parse(this.responseText);
            let request1 = document.getElementById('request1');

            request1.innerHTML = '';

            for(producto of productos){
                request1.innerHTML += `

                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.chico}</td>
                        <td>${producto.grande}</td>
                    </tr>
                
                `
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', traerDatosDona);

function traerDatosDona(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'js/precios-donas.json', true);

    xhr.send();

    xhr.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let productos = JSON.parse(this.responseText);
            let request2 = document.getElementById('request2');

            request2.innerHTML = '';

            for(producto of productos){
                request2.innerHTML += `

                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.chico}</td>
                    </tr>
                
                `
            }
        }
    }
}