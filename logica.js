(()=>{
    //variables
    const panelEscribir = document.querySelector("#panelEscribir");
    const panelCopiar = document.querySelector("#panelCopiar");
    const panelImagen = document.querySelector("#panelImagen");
    const btnEncriptar = document.querySelector("#btnEncriptar");
    const btnDesencriptar = document.querySelector("#btnDesencriptar");
    const btnCopiar = document.querySelector("#btnCopiar");
    const campoAlertas = document.querySelector("#campoAlertas");
    const mostrarTexto = document.querySelector("#mostrarTexto");
    var textoLimpio;
    var textoEncriptado = [];
    var textoDesencriptado = [];
    var textoFinal;
    var textoFinalDesencriptado;
    var palabras;
    //iniciar con botones desahilitados
    deshabilitarBotones();
    
    //al escribir se habilitan los botones
    panelEscribir.addEventListener('input', ()=>{
        if(panelEscribir.value === ""){
            deshabilitarBotones();
            return;
        }else{
            habilitarBotones();
        }
        limpiarTexto();
    })
    
    
            //al presionar cualquier boton desaparece la imagen refecial
            
    btnDesencriptar.addEventListener('click', ()=>{
        //intercambiar paneles
        panelImagen.classList.add('hidden');
        panelCopiar.classList.remove('hidden');  
        desencriptar();  
    })
    
    btnEncriptar.addEventListener('click', ()=>{
        //intercambiar paneles
        panelImagen.classList.add('hidden');
        panelCopiar.classList.remove('hidden');
        
            limpiarPanel();
            encriptar();
        
    })
    btnCopiar.addEventListener('click', ()=>{            
        navigator.clipboard.writeText(mostrarTexto.value)
        .then(() => {
          console.log("¡Texto copiado al portapapeles con éxito!");
        })
        .catch(err => {
          console.error("Error al copiar texto:", err);
        });
        panelEscribir.value = "";
        mostrarTexto.value = "";
        alertaTextoCopiado();
    })
    // Agregar un evento de escucha para el evento keyup
    panelEscribir.addEventListener('keyup', function(event) {
        var tecla = event.key;
        // Verificar si la tecla presionada es una letra mayúscula
        if (tecla.toUpperCase() === tecla && tecla.toLowerCase() !== tecla) {
            alertaMayusculas();
        }
        // Verificar si la tecla presionada es un carácter especial
        var caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (caracteresEspeciales.test(tecla)) {
            alertaCaracteresEspeciales();
        }
    });


    //funciones

    function limpiarPanel(){
        textoEncriptado = [];
        mostrarTexto.value= "";
    }
    function limpiarTexto() {
        var caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        var expresionRegular = /[A-Z]/g;
        // Obtener el valor del campo de entrada
        textoLimpio = panelEscribir.value.replace(caracteresEspeciales, "")
                                         .replace(expresionRegular, "");
        panelEscribir.value = textoLimpio;
    }

    function alertaCaracteresEspeciales(){
        const existeAlerta = document.querySelector('.existencia');
        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('alerta', 'existencia', 'text-center', 'bg-red-600', 'py-2', 'px-2', 'text-white', 'rounded-lg');
            alerta.textContent = "No se permiten caracteres especiales";
            campoAlertas.appendChild(alerta);
            setTimeout(()=>{
                alerta.remove();
            },3000) 
        }
    }
    function alertaMayusculas(){
        const existeAlerta2 = document.querySelector('.existencia2');
        if(!existeAlerta2){
            const alerta2 = document.createElement('div');
            alerta2.classList.add('alerta', 'existencia2', 'text-center', 'bg-red-600', 'py-2', 'px-2', 'text-white', 'rounded-lg');
            alerta2.textContent = "No se permiten letras mayusculas";
            campoAlertas.appendChild(alerta2);
            setTimeout(()=>{
                alerta2.remove();
            },3000) 
        }
    }
    function alertaTextoCopiado(){
        const existeAlerta3 = document.querySelector('.existencia3');
        if(!existeAlerta3){
            const alerta3= document.createElement('div');
            alerta3.classList.add('alerta', 'existencia3', 'text-center', 'bg-green-700', 'py-2', 'px-2', 'text-white', 'rounded-lg');
            alerta3.textContent = "Texto copiado";
            campoAlertas.appendChild(alerta3);
            setTimeout(()=>{
                alerta3.remove();
            },1200) 
        }
    }
    /* hola hoberlai */
    function encriptar(){
        palabras = textoLimpio.split(" ");
        separarPalabras();
    }   
    function separarPalabras(){
        palabras.forEach(element => {
            var new1 = element.replace(/e/g, "enter");
            var new2 = new1.replace(/i/g, "imes");
            var new3 = new2.replace(/a/g, "ai");
            var new4 = new3.replace(/o/g, "ober");
            var new5 = new4.replace(/u/g, "ufat");
            textoEncriptado.push(new5);
            textoFinal = textoEncriptado.join(" ");
            mostrarTexto.value = textoFinal;
        });
    }
    function desencriptar(){
        textoDesencriptado = [];
        palabras = panelEscribir.value.split(" ");
        mostrarTexto.textContent = "";
        unirPalabras();
    }
    function unirPalabras(){
        palabras.forEach(element => {
            var n1 = element.replace(/enter/g, "e");
            var n2 = n1.replace(/imes/g, "i");
            var n3 = n2.replace(/ai/g, "a");
            var n4 = n3.replace(/ober/g, "o");
            var n5 = n4.replace(/ufat/g, "u");
            textoDesencriptado.push(n5);
            textoFinalDesencriptado = textoDesencriptado.join(" ");
            mostrarTexto.value = textoFinalDesencriptado;
        });
    }
    function habilitarBotones(){
        btnDesencriptar.disabled = false;
        btnDesencriptar.classList.add('hover:scale-105', 'duration-300');
        btnDesencriptar.classList.remove('opacity-20');
        btnEncriptar.disabled = false;
        btnEncriptar.classList.add('hover:scale-105', 'duration-300');
        btnEncriptar.classList.remove('opacity-20');

    }
    function deshabilitarBotones(){
        btnDesencriptar.disabled = true;
        btnDesencriptar.classList.remove('hover:scale-105', 'duration-300');
        btnDesencriptar.classList.add('opacity-20');
        btnEncriptar.disabled = true;
        btnEncriptar.classList.remove('hover:scale-105', 'duration-300');
        btnEncriptar.classList.add('opacity-20');
    }
})()


