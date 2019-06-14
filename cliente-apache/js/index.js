var rest=new ClienteRest(); 
var app = {

    
    
    initialize: function() {
      app.formLogin();
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      
    },

    
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      nfc.addNdefListener (
        function (nfcEvent) {
          var tag = nfcEvent.tag,
              ndefMessage = tag.ndefMessage;

          var inputs = ['input'];
          var id;

          if(document.activeElement && inputs.indexOf(document.activeElement.tagName.toLowerCase()) !== -1){
            id=document.activeElement.getAttribute("id");
            var valor = (nfc.bytesToString(ndefMessage[0].payload).substring(3));
            document.activeElement.value=valor;

          }
          else{
            alert("Selecciona un hueco");
          }
        },
        function () { 
          alert("Esperando recibir tag NFC");
        },
        function (error) { 
          alert("Reinicia la aplicación con el NFC encendido " + JSON.stringify(error));
        }
      );
    },
  
    limpiar:function(){
      $('#formlogin').remove();
    },
 
    formLogin:function(){
      $('#formlogin').remove();
      $('#formRegistro').remove();
      var cadena = '<div id="formlogin"><center><h5 class="indigo-text">Por favor, inicie sesión</h5><div id="login" class="container"><div id="cajita" class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">';
      cadena = cadena + '<div class="col s12" ><div class="row"><div class="col s12"></div></div>';
      cadena = cadena + '<div class="row"><div class="input-field col s12"><i class="material-icons prefix">account_circle</i><input class="validate" type="text" name="nick" id="nick" minlength="1" required/><label for="Nick">Nick</label></div></div>';
      cadena = cadena + '<div class="row"><div class="input-field col s12"><i class="material-icons prefix">mode_edit</i><input class="validate" type="password" name="password" id="password" minlength="4" required /><label for="password">Contraseña</label></div>';
      cadena = cadena + '</div><br /><center>';
 
      cadena = cadena + '<div class="row"><button type="submit" id="btn_login" name="btn_login" class="col s12 btn btn-large waves-effect indigo">Login</button></div></center></div><p style="color:green">Si no tiene cuenta deberá de registrarle su profesor</p></div></div></center></div>';
      
      $('#user-login').append(cadena);

      $('#btn_login').on('click',function(){
        var nick=$('#nick').val();
        var password=$('#password').val();
        if($('#nick').val().length<1 || $('#password').val().length<1){
          $('#warningLogin').remove();
          var cadena='<p id="warningLogin" style="color:red;">Rellena los dos campos</p>';
          $('#cajita').append(cadena);
        }
        else{
          $('#warningLogin').remove();
          rest.loginAlumno(nick,password);
            
        }
      })

    },

    formRegistro:function(){
      $('#formRegistro').remove();
      $('#formlogin').remove();
      var cadena = '<div id="formRegistro"><center><h5 class="indigo-text">Registro de alumno</h5><div id="registro" class="container"><div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">';
      cadena = cadena + '<div class="col s12" ><div class="row"><div class="col s12"></div></div>';
      cadena = cadena + '<div class="row"><div class="input-field col s6"><input class="validate" type="text" name="nick" id="nick" required/><label for="Nick">Nick</label></div>';
      cadena = cadena + '<div class="input-field col s6"><label for="Curso">Curso</label><br><p><label><input class="with-gap" name="group1" value="1º-3º" type="radio" checked /><span>1º-3º</span></label></p>'
      cadena = cadena + '<p><label><input name="group1" type="radio" class="with-gap" value="4º-6º" /><span>4º-6º</span></label></p></div></div>'
      cadena = cadena + '<div class="row"><div class="input-field col s12"><input class="validate" type="password" name="password" id="password" minlength="4" required /><label for="password">Contraseña</label></div></div>';
      cadena = cadena + '<div class="row"><div class="input-field col s12"><input class="validate" type="password" name="password2" id="password2" minlength="4" required /><label for="password">Repite Contraseña</label></div>';
      cadena = cadena + '<label style="float: right;"></label></div><br /><center>';

      cadena = cadena + '<div class="row"><button type="submit" id="btn_registro" name="btn_registro" class="col s12 btn btn-large waves-effect indigo">Registro</button></div></center></div><a href="#" onclick="app.formLogin();">Volver inicio</a></div></div></center></div>';
      $('#user-login').append(cadena);

      $('#btn_registro').on('click',function(){
        var nick=$('#nick').val();
        var curso=$('input:radio[name=group1]:checked').val();
        

        if($('#password').val().length>=4 && $('#password2').val().length>=4){
          if($('#password').val()==$('#password2').val()){            
            var password=$('#password').val();
            
              $('#falloRegistro').remove();
              $('#falloRegistroCurso').remove();
              $('#con4').remove();
              rest.registrarAlumno(nick,password,curso);
          }
          else{
            $('#falloRegistroCurso').remove();          
            $('#falloRegistro').remove();
            $('#con4').remove();
            var cadena='<p id="falloRegistro" style="color:red;">Las contraseñas no coinciden</p>';
            $('#registro').append(cadena); 
          }
        }
        else{
          $('#falloRegistroCurso').remove();
          $('#falloRegistro').remove();
          $('#con4').remove();
          var cadena='<p id="con4" style="color:red;">Las contraseña tiene que tener al menos 4 caracteres</p>';
          $('#registro').append(cadena); 
        }
      });
  
    },

    pantallaAlumno:function(){
      $('#listaEjercicios').remove();
      $('#mostrarSolucionAlumno').remove();
      $('#mostrarAciertosFallos').remove();
      $('#listaEjercicios').remove();
      $('#mostrarTextoAlumno').remove();

      rest.obtenerEjercicios();
      
    },

    cerrarSesion:function(){
      if (window.localStorage.getItem('alu')!=undefined){
        window.localStorage.removeItem("alu");
        app.formLogin();
        $('#listaEjercicios').remove();
        $('#mostrarSolucionAlumno').remove();
        $('#mostrarAciertosFallos').remove();
        $('#listaEjercicios').remove();
        $('#mostrarTextoAlumno').remove();
        $("#mobile-nav").hide();
        $('#mostrarResultados').remove();
        $("#logoSide").hide();
      }
    },

    abandonarEjercicio:function(){
      if (window.localStorage.getItem('alu')!=undefined){
        rest.abandonarEjercicio();
        app.pantallaAlumno();
          
      }
    },


    mostrarNav:function(nickAlumno){
      $('#logoSide').remove();
      $('#foto').remove();
      $('#inicio').remove();
      $('#resultados').remove();
      $('#cerrar').remove();
      $('#inicio_d').remove();
      $('#resultados_d').remove();
      $('#cerrar_d').remove();
      $('#divider').remove();

      var cadena= '<li id="inicio_d"><a href="#" onclick="app.pantallaAlumno();">Ejercicios</a></li><li id="resultados_d"><a href="#" onclick="rest.obtenerEjerciciosAcabados();">Resultados</a></li><li id="cerrar_d"><a href="#" onclick="app.cerrarSesion();">Cerrar Sesión</a></li>';
      var cadena2= '<a href="#" id="logoSide" class="sidenav-trigger" data-target="mobile-nav"><i class="material-icons">menu</i></a>';
      var cadena3='<li id="foto" ><div class="user-view"><div class="background"><img src="cliente-apache/img/pizarra-800x478.jpg"></div><a href="#user"><img src="cliente-apache/img/user.png" style="width:20%"></a><span class="white-text name">'+nickAlumno+'</span></div></li>';
      cadena3= cadena3+'<li id="inicio"><a href="#" onclick="app.pantallaAlumno();">Inicio</a></li><li id="resultados"><a href="#" onclick="rest.obtenerEjerciciosAcabados();">Resultados</a></li><li><div class="divider" id="divider" ></div></li><li id="cerrar"><a href="#" onclick="app.cerrarSesion();">Cerrar Sesión</a></li>';
      $('#navBar').append(cadena);
      $('#navSide').append(cadena2);
      $('#mobile-nav').append(cadena3);

      $(document).ready(function(){
        $('.sidenav')
          .sidenav()
          .on('click tap', 'li a', () => {
            $('.sidenav').sidenav('close');
        });
      });
    },

    mostrarListaEjercicios:function(datos){
      $("#mobile-nav").show();
      $('#listaEjercicios').remove();
      $('#mostrarResultados').remove();

      if (window.localStorage.getItem('alu')){
        var alumno=JSON.parse(window.localStorage.getItem('alu'));
        app.mostrarNav(alumno.nickAlumno);
        var cadena = '<div id="listaEjercicios"><ul class="collection">';
        cadena = cadena + '<li class="collection-header"><h4>Lista de Ejercicios</h4></li>'
      
        for(var i=0;i<datos.length;i++){
          var nombreEjercicio=datos[i].nombre

          cadena = cadena + '<li class="collection-item avatar"><a href="#!" ><i class="material-icons circle">create</i>';
          cadena = cadena + '<span class="title">'+datos[i].nombre+'</span><p>Dificultad: '+datos[i].dificultad+'</p>';
          cadena = cadena + '<a class="secondary-content"><i class="medium material-icons" >play_circle_outline</i></a></a></li>'
        }
        cadena=cadena+'</ul>';
        cadena=cadena+'</div>';
        $('#messageDiv').append(cadena);

         $('.collection li').click(function(){
          var nombreEjercicio=$(this).find('span').text();
          if (nombreEjercicio!=""){
            var textoEjercicioElegido;
            var respuestaEjercicioElegido;
            for(var j=0;j<datos.length;j++){
              if(datos[j].nombre==nombreEjercicio){
                textoEjercicioElegido=datos[j].texto;
                respuestaEjercicioElegido=datos[j].respuesta;
              }
            }
            $('#listaEjercicios').remove();
            rest.elegirEjercicio(nombreEjercicio);
            app.mostrarEjercicio(nombreEjercicio,textoEjercicioElegido);
          }
        })
      }
    },


    mostrarEjercicio:function (nombreEjercicio,textoEjercicio){
      $('#listaEjercicios').remove();
      $('#mostrarSolucionAlumno').remove();
      $('#mostrarAciertosFallos').remove();
      $('#listaEjercicios').remove();
      $('#mostrarTextoAlumno').remove();
      $('#inicio_d').remove();
      $('#resultados_d').remove();
      $('#cerrar_d').remove();
      $("#mobile-nav").hide();
      $('#inicio').hide();
      $('#resultados').hide();
      $('#cerrar').hide();
      $("#logoSide").hide();

      if (window.localStorage.getItem('alu')){
        var text=textoEjercicio;
        var textSeparado=textoEjercicio.split("@");
        var nInput=textSeparado.length-1;
        var idInput=0;
        
        for (var i=0;i<text.length;i++){
          if(text.charAt(i)=="@"){
            var inputN='<input id="'+idInput+'" type="text" readonly style="width:20px; color:green; font-size: 26pt ">'
            text = text.replace("@", inputN);
            idInput++;
          }
        }
        
        var cadena = '<div id="mostrarTextoAlumno" align="center"><h3>'+ nombreEjercicio +'</h3><div class="card-panel cyan lighten-5"><h4 style="color:black;">'+ text + '</h4></div>';
        cadena=cadena+'<div align="center" id="mostrarSolucion">';
        cadena=cadena+'<button id="verBorradorBtn" class="btn waves-effect waves-light" type="submit">Ver solución<i class="material-icons right">edit</i></button> ';
        cadena=cadena+' <button id="abandonarBtn" data-target="modal1" data-toggle="modal" class="btn modal-trigger" style="background:#b71c1c">Salir<i class="material-icons right">close</i></button> </div></div>';
        $('#messageDiv').append(cadena);

        var respuestaAlumno=[];
        var respuestaAlumnoC;

        
        $('#verBorradorBtn').on('click',function(){
          respuestaAlumno=[];
          for (let i=0; i<idInput;i++) {
            respuestaAlumno.push($(`#${i}`).val());
          }
         

          console.log('Los valores son',respuestaAlumno.toString());

          respuestaAlumnoC=respuestaAlumno[0];
          for (var j=1;j<respuestaAlumno.length;j++){
            respuestaAlumnoC=respuestaAlumnoC.concat(" ");
            respuestaAlumnoC=respuestaAlumnoC.concat(respuestaAlumno[j]);
          }
          console.log('Los valores son',respuestaAlumnoC);

          app.mostrarBorrador(textoEjercicio,respuestaAlumnoC);
        });

        $(':input').keyup(function(){
          $(this).next().focus();
        });

      }   
    },

    mostrarBorrador:function(textoEjercicio, respuestaAlumno){
      $('#mostrarSolucionAlumno').remove();
      $('#listaEjercicios').remove();
      
      
       if (window.localStorage.getItem('alu')){
        var textoEjercicioSeparado=textoEjercicio.split("@");
        var respuestaAlumnoSeparado=respuestaAlumno.split(" ");
        var pRespuestas=textoEjercicioSeparado.length;
        var textoSolucionAlumno;

        for (var i=0;i<respuestaAlumnoSeparado.length;i++){
          if(respuestaAlumnoSeparado[i]==""){
            respuestaAlumnoSeparado[i]="___";
          }
        }

        for (var i=0;i<respuestaAlumnoSeparado.length;i++){
          if(respuestaAlumnoSeparado[i]=="NADA"){
            respuestaAlumnoSeparado[i]="";
          }
        }

        

        for(var j=0;j<pRespuestas-1;j++){
          textoEjercicioSeparado[j]=textoEjercicioSeparado[j].concat(respuestaAlumnoSeparado[j]);
        }
        
        textoSolucionAlumno=textoEjercicioSeparado[0];
        for (var i=0;i<pRespuestas-1;i++){
          textoSolucionAlumno=textoSolucionAlumno.concat(textoEjercicioSeparado[i+1]);
        }
        var cadena= '<div align="center" id="mostrarSolucionAlumno"><h3 style="color:black;" >Borrador de solución</h3>';
        cadena = cadena+'<div id="mostrarTextoAlumno" class="card-panel green lighten-5"><h4 style="color:black;">'+ textoSolucionAlumno + '</h4></div>';
        cadena=cadena+'<button type="button" id="checkResultadoBtn" class="btn btn-primary btn-md">Comprobar respuesta</button></div>';

        $('#texto').append(cadena);

          $('#checkResultadoBtn').on('click',function(){
            rest.elegirRespuesta(respuestaAlumno);
            checkResultadoBtn.disabled = true;
            $('#verBorradorBtn').prop('disabled', true);

         });

      }
    },

   mostrarAciertosFallos:function(aciertos,fallos,nRespuestas,nombreEjercicio,textoEjercicio,respuestaEjercicio,ejercicio){
    $('#mostrarAciertosFallos').remove();
    $('#listaEjercicios').remove();
    $('#mostrarTextoAlumno').remove();
    $('#mostrarSolucionAlumno').remove();
    if (window.localStorage.getItem('alu')){
       //var respuestaInput;
       var cadena= '<div align="center" id="mostrarAciertosFallos"><div id="nombreEjercicio" class="a"><h3 class="caja">'+nombreEjercicio+'</h3></div>';
       if(aciertos==nRespuestas){
        cadena=cadena + '<div align="center" id="texto" class"b"><h4 style="color:#2096F3">¡Has acertado todas!</h4><img src="cliente-apache/img/congrat.gif" class="img-rounded" id="rival" style="width:95%;border:none;"></div>';
       }
       else{
        cadena=cadena + '<div align="center" id="texto" class"b"><h4 style="color:#2096F3">¡Inténtalo otra vez!</h4><img src="cliente-apache/img/repitelo.gif" class="img-rounded" id="rival" style="width:50%;border:none;"></div>';
       }
       cadena = cadena + '<div align="center" id="texto" class"c"><h4 style="color:#2096F3">Tu puntuación:</h4><br>';
       cadena = cadena + '<h1 class="caja2">Aciertos: <img src="cliente-apache/img/check.png" style="width:6%"> '+aciertos+'<br>';
       cadena = cadena + 'Fallos: <img src="cliente-apache/img/cancel.png" style="width:6%"> '+fallos+'</h1></div>';
       cadena = cadena + '<div class="reinicio" id="reinicio"><button id="home" class="btn red darken-4" style="background-color: #b71c1; border: 2px solid black;" ><i class="large material-icons">home</i></button>';
       cadena = cadena + '<button  id="restart" class="btn green accent-4" style="background-color: #00c853; border: 2px solid black;"><i class="large material-icons">loop</i></button></div></div>';

       $('#messageDiv').append(cadena);
      
       rest.ejercicioAcabado(nombreEjercicio,aciertos,fallos);

      $('#home').on('click',function(){
        app.pantallaAlumno();
      });

      $('#restart').on('click',function(){
        app.mostrarEjercicio(nombreEjercicio,textoEjercicio);
      });

    }
  },

  mostrarResultados:function(datos){
    $('#mostrarAciertosFallos').remove();
    $('#listaEjercicios').remove();
    $('#mostrarTextoAlumno').remove();
    $('#mostrarSolucionAlumno').remove();
    $('#mostrarResultados').remove();
    if (window.localStorage.getItem('alu')){
      var cadena = '<div align="center" id="mostrarResultados"><table class="myTable"><h3>Resultados</h3>';
      cadena = cadena + '<thead><tr><th>Ejercicio</th><th>Aciertos</th><th>Fallos</th><th>Fecha</th>';
      cadena = cadena + '</tr></thead><tbody>';
      
      for(var i=0;i<datos.length;i++){
        // Convertir fecha a formato normal
        cadena = cadena + '<tr><td>'+datos[i].ejercicio+'</td><td>'+datos[i].aciertos+'</td><td>'+datos[i].fallos+'</td><td>'+datos[i].fecha+'</td></tr>'

      }
      cadena = cadena + '</tbody></table></div>';
    }
    $('#messageDiv').append(cadena);

  },



    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();