//Botón back to top
$(document).ready(function(){

    let subir = $('.back-to-top');

    //hacemos que con el evento click se posicione la ventana en el top 0
    subir.click(function(e){

        $('html, body').animate({scrollTop: 0}, 500)
    })

    //escondemos el boton cuando ya estemos en el top de la ventana
    subir.hide();

    //hacemos que aparezca el botón y desaparezca de acuerdo al scroll
    $(window).scroll(function(){

       if ($(this).scrollTop() > 200){
           subir.fadeIn();
       } else{
            subir.fadeOut();
       }
    })

})


