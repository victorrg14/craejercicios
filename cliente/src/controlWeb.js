function limpiar(){
  $('#formInicio').remove();
  $('#mostrarListaEjercicios').remove();
  $('#granCabecera').remove();
  $('#granCabeceraProfesor').remove();
  $('#granCabeceraAlumno').remove();
  $('#formRegistro').remove();
  $('.well').remove();
  $('#mostrarNavProfesor').remove();
  $('#botonesInicio').remove();
  $('#imagenA').remove();
  $('#imagenP').remove();
  $('#formRegistroAlumno').remove();
  $('#imageReg').remove();
  $('#formCrearEjercicioImg').remove();
  $('#tablaEjercicios').remove();
  $('#tablaTodos').remove();
  $('#tablaAlumnos').remove();
  $('#tablaResultados').remove();
  $('#formActualizarEjercicioImg').remove();
  $('#formActualizarAlumno').remove();
  $('#mostrarDatos').remove();
  $('#mostrarDatos2').remove();
  $('#mostrarTexto').remove();
  $('#mostrarTexto2').remove();
  $('#mostrarSolucion').remove();
  $('#formRegistroAlumnoP').remove();
  $('#actualizaCon').remove();
  $('#bajaProfesor').remove();
  $('#visializacionSolucion').remove();
  
}


/////////////////////////////////////////////////////// CRA EJERCICIOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function comprobarUsuario(){
  if ($.cookie("pro")){
    var pro=JSON.parse($.cookie("pro"));
    rest.comprobarProfesor(pro._id, pro.email);
    //mostrarLogoInicio();
  }
  else{
    if($.cookie("alu")){
      var alu=JSON.parse($.cookie("alu"));
      rest.comprobarAlumno(alu._id, alu.nickAlumno);
    }
    else{
      mostrarLogoInicio();
    }
  }
}

function mostrarAviso(id,cadena){
  $(id).append(cadena);
}

function mostrarInicio(){
  if ($.cookie("alu")){
    limpiar();
   var alu=JSON.parse($.cookie("alu"));
   mostrarPantallaAlumnoIniciada(alu.nickAlumno);

    
  }else{
    if($.cookie("pro")){
      limpiar();
      var pro=JSON.parse($.cookie("pro"));
      mostrarPantallaProfesorIniciada(pro.email)
      
    }else{
      limpiar();
      $('#loginAlumno1').remove();
      $('#loginProfesor1').remove();

      mostrarCabecera();

      mostrarLogoInicio();
    }

  }
}

function mostrarLogoInicio(){

  var cadena='<div id="botonesInicio"> <button style="margin: 20px" type="button" class="botonProfesor" onclick="mostrarPantallaProfesor();">PROFESOR</button>';
  cadena=cadena+'<button type="button" class="botonAlumno" onclick="mostrarPantallaAlumno();">ALUMNO</button></div>'
  $('#logoInicio').append(cadena);

}

function mostrarCabecera(){
  limpiar();
  $("#granCabecera").remove();
  var cadena='<div class="jumbotron text-center" id="granCabecera">';
  cadena=cadena+'<h1>LECTOCRA</h1>';
  cadena=cadena+'<p>¡Aprende a escribir!</p></div>';
  $("#cabecera").append(cadena);
}

/////////////////////////////// INICIO Y REGISTRO PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarCabeceraProfesor(){
  limpiar();
  $("#granCabecera").remove();
  var cadena='<div class="jumbotron text-center" id="granCabeceraProfesor">';
  cadena=cadena+'<h1>Área Profesor</h1>';
  cadena=cadena+'<p>Aquí podrá crear ejercicios y consultar los resultados de sus alumnos</p></div>';
  cadena=cadena+ '<div id="imagenP"> <img src="cliente/img/profesor.gif" class="img-rounded" ></div>';
  $("#cabecera").append(cadena);
}

function mostrarPantallaProfesor(){
  
  limpiar();
  mostrarCabeceraProfesor();
  mostrarNavLoginProfesor();


}

function mostrarNavLoginProfesor(){
  $('#loginAlumno1').remove();
  $('#loginProfesor1').remove();
  var cadena='<li class="dropdown" id="loginProfesor1"><a href="#" class="dropdown-toggle"><b>INICIAR SESIÓN</b></a>';
  cadena=cadena+'<ul id="login-dp" class="dropdown-menu"><li><div class="row"><div class="col-md-12" id="formInicioCuadrado">';
  cadena=cadena+'<div id="formInicio">';
  
  cadena=cadena+'<input id="emailUsr" type="text" class="form-control" name="nombre" placeholder="Email usuario">';
 
  cadena=cadena+'<input id="passwordUser" type="password" class="form-control" name="nombre2" placeholder="Contraseña usuario"';
  cadena=cadena+'<div class="help-block text-right"><a href=""></a></div>';
  cadena=cadena+'<button type="button" id="inicioBtn2" class="btn btn-primary btn-md">Iniciar sesión</button>';  
  cadena=cadena+''
  cadena=cadena+'<div class="bottom text-center" id="reg"><a style="color:black;" href="#" onclick="mostrarRegistroProfesor();"<b>Registro</b></a></div>'
  cadena=cadena+'<a style="color:red;" href="#" text-align="center" id="refRecordar"><b>Recordar Contraseña</b></a></div></li></ul></li>';        
                                
  $('#btnLogin').append(cadena);

  $('#reg').on('click', function (event) {
      $('.dropdown-toggle').parent().removeClass('open');
  });

  $('#refRecordar').on('click',function(){
    var email=$('#emailUsr').val();
    $('#msg').remove();
    rest.enviarClave(email);
  });


  $('.dropdown-toggle').on('click', function (event) {
      $(this).parent().toggleClass('open');
  });

  $('#inicioBtn2').on('click',function(){
        
        $('#formInicio p').remove();

        var email=$('#emailUsr').val();
        var patronEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        var password=$('#passwordUser').val();

        if($('#emailUsr').val().length<1 /*|| $('#passwordUser').val().length<1*/){
          var cadena='<p style="color:red;">Rellena los dos campos</p>';
          $('#formInicio').append(cadena);
        }
        else{
          if (patronEmail.test(email)){
              rest.loginProfesor(email,password);
          }
          else{
            var cadena='<p style="color:red;">Dirección email inválida</p>';
            $('#formInicio').append(cadena);
          }
        }
    });
}

function mostrarRegistroProfesor(){
 $('#logoInicio img').remove();
 $('#formRegistro').remove();
 $('#granCabeceraProfesor').remove();
 $('#imagenP').remove();

 var cadena='<div id="formRegistro" align="center" >';
 cadena=cadena+'<h3 style="color:black">Registro profesor </h3>';
 cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Email usuario" style="margin-bottom:5px">';
 cadena=cadena+'<input id="password" type="password" class="form-control" name="password" placeholder="Contraseña usuario" style="margin-bottom:5px">';
 cadena=cadena+'<input id="password2" type="password" class="form-control" name="password2" placeholder="Repita contraseña usuario" style="margin-bottom:5px">';
 cadena=cadena+'<button type="button" id="registroBtn" class="btn btn-primary btn-md">Registrar Profesor</button>';
 cadena=cadena+'</div>';

 $('#registro').append(cadena);

 $('#registroBtn').on('click',function(){
       $('#formRegistro p').remove();

       var email=$('#email').val();
       var patronEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

       if (patronEmail.test(email)){
         if($('#password').val().length>=4 && $('#password2').val().length>=4){
           if($('#password').val()==$('#password2').val()){
             var password=$('#password').val();
             rest.registrarProfesor(email,password);
           }
           else{
             mostrarAviso("#formRegistro","<p id='conNoCoinciden' style='color:yellow;font-size:1.5em;'>Las contraseñas no coinciden</p>");
           }
         }
         else{
           mostrarAviso("#formRegistro","<p id='msg' style='color:yellow;font-size:1.5em;'>La contraseña debe tener al menos 4 caracteres</p>");
         }
       }
       else{
            mostrarAviso("#formRegistro","<p id='msg' style='color:yellow;font-size:1.5em;'>Dirección email inválida</p>");
       }
   });
}


///////////////////////////////////////// INICIO Y REGISTRO ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarCabeceraAlumno(){
  limpiar();
  $("#granCabecera").remove();
  var cadena='<div class="jumbotron text-center" id="granCabeceraAlumno">';
  cadena=cadena+'<h1>Área Alumno</h1>';
  cadena=cadena+'<p>Aquí podrás realizar las actividades que quiera y ver tus resultados</p></div>';
  cadena=cadena+ '<div id="imagenA"> <img src="cliente/img/alumno.gif" class="img-rounded" ></div>';
  $("#cabecera").append(cadena);
}

function mostrarPantallaAlumno(){

  limpiar();
  mostrarCabeceraAlumno();
  mostrarNavLoginAlumno();

}

function mostrarNavLoginAlumno(){
  $('#loginAlumno1').remove();
  $('#loginProfesor1').remove();

  var cadena='<li class="dropdown" id="loginAlumno1"><a href="#" class="dropdown-toggle"><b>INICIAR SESIÓN</b></a>';
  cadena=cadena+'<ul id="login-dpA" class="dropdown-menu"><li><div class="row"><div class="col-md-12">';
  cadena=cadena+'<div id="formInicioAlumno">';
  cadena=cadena+'<input id="nickUsr" type="text" class="form-control" name="nombre" placeholder="Nick usuario">';
  cadena=cadena+'<input id="passwordUserAlumno" type="password" class="form-control" name="nombre2" placeholder="Contraseña usuario"';
  cadena=cadena+'<div class="help-block text-right"><a href=""></a></div>';
  cadena=cadena+'<button type="button" id="inicioBtnAlumno" class="btn btn-primary btn-md" style>Iniciar sesión</button>';  
  cadena=cadena+'</div></li></ul></li>';       
                                
  $('#btnLogin').append(cadena);

  $('#reg').on('click', function (event) {
      $('.dropdown-toggle').parent().removeClass('open');
  });


  $('.dropdown-toggle').on('click', function (event) {
      $(this).parent().toggleClass('open');
  });

  $('#inicioBtnAlumno').on('click',function(){
        
        $('#formInicioAlumno p').remove();

        var nick=$('#nickUsr').val();
        var password=$('#passwordUserAlumno').val();

        if($('#nickUsr').val().length<1 || $('#passwordUserAlumno').val().length<1){
          var cadena='<p style="color:red;">Rellena los dos campos</p>';
          $('#formInicioAlumno').append(cadena);
        }
        else{
          if($('#passwordUserAlumno').val().length<4){
            var cadena='<p style="color:red;">La contraseña al menos tiene 4 caracteres</p>';
            $('#formInicioAlumno').append(cadena);
          }
          else{   
            rest.loginAlumno(nick,password);
          }
        }
    });
}

function mostrarRegistroAlumno(){
 $('#logoInicio img').remove();
 $('#formRegistroAlumno').remove();
 $('#granCabeceraAlumno').remove();
 $('#imagenA').remove();

 var cadena='<div id="formRegistroAlumno" >';
 cadena=cadena+'<h3 style="color:black">Registro alumno </h3>';
 cadena=cadena+'<div class="form-group"><label for="nombre">Nombre: </label><input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre"></div>';
 cadena=cadena+'<div class="form-group"><label for="apellidos">Apellidos: </label><input id="apellidos" type="text" class="form-control" name="apellidos" placeholder="Apellidos"></div>';
 cadena=cadena+'<div class="form-group"><label for="nick">Nick Alumno: </label><input id="nick" type="text" class="form-control" name="nick" placeholder="Nick Alumno"></div>';
 cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="edad">Edad: </label><input id="edad" type="text" class="form-control" name="edad" placeholder="Edad" ></div>';
 cadena=cadena+'<div class="col-sm-6"><label for="edad">Género: </label><div class="radio"><label><input type="radio" name="optradio" value="Masculino" checked>Niño</label></div>';
 cadena=cadena+'<div class="radio"><label><input type="radio" name="optradio" value="Femenino">Niña</label></div></div></div>';
 cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="curso" class="control-label">Curso</label><select class="form-control" id="curso" name="curso">';
 cadena=cadena+'<option value="" selected="selected"></option><option value="1º">1º Primaria</option><option value="2º">2º Primaria</option><option value="3º">3º Primaria</option><option value="4º">4º Primaria</option><option value="5º">5º Primaria</option><option value="6º">6º Primaria</option></select></div>';
 cadena=cadena+'<div class="col-sm-6"><label for="edad">ATE: </label><div class="radio"><label><input type="radio" name="radioAte" value="No" checked>No</label></div>';
 cadena=cadena+'<div class="radio"><label><input type="radio" name="radioAte" value="Si">Si</label></div></div></div>';
 cadena=cadena+'<div class="form-group"><label for="centro" class="control-label">Centro</label><select class="form-control" id="centro" name="centro>';
 cadena=cadena+'<option value="" selected="selected"></option><option value="Jardín">Jardín</option><option value="Peñascosa">Peñascosa</option><option value="Robledo">Robledo</option><option value="Povedilla">Povedilla</option><option value="Viveros">Viveros</option></select></div>';
 cadena=cadena+'<div class="form-group"><label for="contraseña">Contraseña: </label><input id="passwordA" type="password" class="form-control" name="passwordA" placeholder="Contraseña usuario"></div>';
 cadena=cadena+'<div class="form-group"><label for="rContraseña">Repetir contraseña: </label><input id="password2A" type="password" class="form-control" name="password2A" placeholder="Repita contraseña usuario"></div>';
 cadena=cadena+'<button type="button" id="registroBtn" class="btn btn-primary btn-md">Registrar Alumno</button>';
 cadena=cadena+'</div>';

 $('#registro').append(cadena);

 $('#registroBtn').on('click',function(){
      $('#formRegistroAlumno p').remove();
      var nombre=$('#nombre').val();
      var apellidos=$('#apellidos').val();
      var nick=$('#nick').val();
      var edad=$('#edad').val();
      var genero = $('input:radio[name=optradio]:checked').val();
      var curso=$("#curso").val();
      var centro=$("#centro").val()    
      var ate= $('input:radio[name=radioAte]:checked').val();

        if($('#passwordA').val().length>=4 && $('#password2A').val().length>=4){
          if($('#passwordA').val()==$('#password2A').val()){
            var password=$('#passwordA').val();
            rest.registrarAlumno(nick,password,curso,nombre,apellidos,edad,genero,ate,centro);           
          }
          else{
            mostrarAviso("#formRegistroAlumno","<p id='conNoCoinciden' style='color:yellow;font-size:1.5em;'>Las contraseñas no coinciden</p>");
          }
        }
        else{
          mostrarAviso("#formRegistroAlumno","<p id='msg' style='color:yellow;font-size:1.5em;'>La contraseña debe tener al menos 4 caracteres</p>");
        }       
   });
}


////////////////////////////////////////// CREAR EJERCICIO- ACTUALIZAR PROFESOR - AREA PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarPantallaProfesorIniciada(data){
  $('#granCabeceraProfesor').remove();
  $("#granCabecera").remove();
  $('#mostrarAciertosFallos').remove();
  $('#mostrarDatos').remove();
  $('#mostrarDatos2').remove();
  $('#mostrarEjerciciosProfesor').remove();
  $('#tabla').remove();
  $('#tablaTodos').remove();
  $('#tablaAlumnos').remove();
  $('#tablaResultados').remove();
  $('#formRegistro').remove();
  mostrarNavProfesor(data);
  rest.obtenerEjerciciosProfesor();
}

function mostrarNavProfesor(email){

  var cadena='<li id="gestionEjercicios_d"><a href="#" onclick="rest.obtenerEjerciciosProfesor();"><span class="glyphicon glyphicon-search"></span>EJERCICIOS</a></li>';
  cadena = cadena + '<li id="gestionUsuarios_d"><a href="#" onclick="rest.obtenerAlumnos();"><span class="glyphicon glyphicon-user"></span>ALUMNOS</a></li>';
  cadena = cadena + '<li id="configuracion_d"><a href="#" onclick="mostrarActualizarEliminar();"><span class="glyphicon glyphicon-pencil"></span> CONFIGURACIÓN</a></li>';
  cadena = cadena + '<li id="cerrar_sesion_d"><a href="#" onclick="cerrarSesionProfesor();"><span class="glyphicon glyphicon-log-out"></span> CERRAR SESIÓN</a></li>';

  $('#btnLogin li').remove();
  $('#btnLogin').append(cadena);
}

/////////////////////////////////////// EJERCICIOS PROFESOR - TABLA - VISUALIZACIÓN  - ACTUALIZACIÓN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarTablaEjercicios(datos){
  limpiar();

  if ($.cookie("pro")){
    var cadena ='<div id="tablaEjercicios" class="container"><h2>Listado de ejercicios profesor</h2><p>Ejercicios presentes en la base de datos creados por ti <button type="button" id="crearEjerBtn" class="btn btn-success btn-responsive btninter right" style="margin-left:30px" >Crear ejercicio</button> </p>';
    cadena = cadena + '<table class="table table-responsive table-striped" id="tab"><thead style="text-align:center;"><tr class="w3-red" >';
    cadena = cadena + '<th>Nombre Ejercicio</th><th>Profesor</th><th>Dificultad</th><th>Acciones</th></tr></thead><tbody>';
    for(var i=0;i<datos.length;i++){
        cadena = cadena + '<tr><td>'+datos[i].nombre+'</td><td>'+datos[i].emailProfesor+'</td><td>'+datos[i].dificultad+'</td>';
        cadena = cadena + '<td><a data-toggle="tooltip" title="visualizar" href="#" id="visualizar" class="ejemplo-visualizar" data-datos-nombre="'+datos[i].nombre+'" data-datos-texto="'+datos[i].texto+'" data-datos-respuesta="'+datos[i].respuesta+'"><img id="ojo" src="cliente/img/witness.png" style="width:11%;margin-left: 10px;" ></a>';
        cadena = cadena + '<a data-toggle="tooltip" title="editar" href="#" id="editar" class="ejemplo-pencil" data-datos-nombre="'+datos[i].nombre+'" data-datos-texto="'+datos[i].texto+'" data-datos-respuesta="'+datos[i].respuesta+'" data-datos-dificultad="'+datos[i].dificultad+'"><img id="pencil" src="cliente/img/pencil.png" style="width:11%; margin-left: 10px;"></a> ';
        cadena = cadena + '<a data-toggle="tooltip" title="eliminar" href="#" id="papelera" class="ejemplo-papelera" data-datos-id="'+datos[i]._id+'"><img id="papelera" src="cliente/img/trash-can.png" style="width:11%; margin-left: 10px;"></a></td></tr>';
      }
    cadena = cadena + '</tbody></table>';
    cadena = cadena + '<button type="button" id="mostrarTodosBtn" class="btn btn-link">Ver todos</button> </div>';

    $('#tablas').append(cadena);

    $('.ejemplo-papelera').on('click', function(){
      var id = $(this).data('datos-id');
      console.log(id);
      $('#myModalEjercicioEliminado').data('id_elemento',id);
      console.log($('#myModalEjercicioEliminado').data('id_elemento'));
      $('#myModalEjercicioEliminado').modal({backdrop: false});
      
    });

    $('.ejemplo-visualizar').on('click', function(){
      var nombre = $(this).data('datos-nombre');
      var texto = $(this).data('datos-texto');
      var respuesta = $(this).data('datos-respuesta');
      
      mostrarVisualizacionEjercicio(texto);
      mostrarVisualizacionEjercicioSolucionado(nombre,texto,respuesta);
      
    });

    $('.ejemplo-pencil').on('click',function(){
      var nombre = $(this).data('datos-nombre');
      var texto = $(this).data('datos-texto');
      var respuesta = $(this).data('datos-respuesta');
      var dificultad = $(this).data('datos-dificultad');

      mostrarActualizacionEjercicio(nombre,texto,respuesta,dificultad);
    })

    $(document).ready(function(){
        $("#tab").tablesorter();
    });


    $('#mostrarTodosBtn').on('click',function(){
        rest.obtenerEjercicios();
     });

    $('#crearEjerBtn').on('click',function(){
        mostrarCrearEjercicio();
     });

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();   
    });
  }
  
  
}

function mostrarVisualizacionEjercicio(textoEjercicio){
  
  $('#mostrarTexto').remove();
  $('#mostrarTexto2').remove();
  $('#tablaEjercicios').remove();
  $('#tablaTodos').remove();
  if ($.cookie("pro")){
    var text=textoEjercicio;
    var input = '<input type="text" style="width: 20px;" disabled>'
    text = text.replace(/@/g, input);
    var cadena = '<div align="center" id="mostrarTexto" class="box-blue" style="margin-top: 25px;" ><h4 style="color:white;">'+ text + '</div>';
    $('#tablas').append(cadena);
  }
}

function mostrarVisualizacionEjercicioSolucionado (nombreEjercicio, textoEjercicio, respuestaEjercicio){
 
  $('#visializacionSolucion').remove();
  $('#tablaEjercicios').remove();
  $('#tablaTodos').remove();

  if ($.cookie("pro")){
    var textoEjercicioSeparado=textoEjercicio.split("@");
    var respuestaEjercicioSeparado=respuestaEjercicio.split(" ");
    var pRespuestas=textoEjercicioSeparado.length;
    var textoSolucion;
    for (var i=0;i<respuestaEjercicioSeparado.length;i++){
      if(respuestaEjercicioSeparado[i]=="NADA"){
        respuestaEjercicioSeparado[i]="";
      }
    }

    for(var j=0;j<pRespuestas-1;j++){
      textoEjercicioSeparado[j]=textoEjercicioSeparado[j].concat(respuestaEjercicioSeparado[j]);
    }

    textoSolucion=textoEjercicioSeparado[0];
    for (var i=0;i<pRespuestas-1;i++){
      textoSolucion=textoSolucion.concat(textoEjercicioSeparado[i+1]);
    }
  }
  var cadena= '<div align="center" id="visializacionSolucion"><h3 style="color:black;" >Ejercicio: '+ nombreEjercicio+ '</h3>';
  cadena = cadena+'<div id="mostrarTexto" class="box-green"><h4 style="color:black;">'+ textoSolucion + '</h4></div>';
  cadena=cadena+'<button type="button" id="volverBoton" class="btn btn-primary btn-md">Volver</button></div>';
  $('#tablas').append(cadena);

   $('#volverBoton').on('click',function(){
    $('#VisializaciónSolucion').remove();
      rest.obtenerEjerciciosProfesor();
   });

}

function mostrarActualizacionEjercicio(nombre,texto,respuesta,dificultad){
  $('#tablaEjercicios').remove();
  $('#tablaTodos').remove();
  $('#tablaAlumnos').remove();
  $('#formCrearEjercicioImg').remove();
  $('#formActualizarEjercicioImg').remove();

   if ($.cookie("pro")){

    var cadena = '<div id="formActualizarEjercicioImg" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;align-items: center;">';
    cadena=cadena+'<div id="formActualizarEjercicio" class="caption" align="center">';
    cadena=cadena+'<p id="textActualizarEjercicio" style="font-size:2em;color:green"><b>Actualizar Ejercicios</b></p>';
    cadena=cadena+'<label for="nombreEjercicio">Nombre Ejercicio: </label><input id="nombreEjercicio" type="text" class="form-control" name="nombre" value="'+nombre+'" style="margin-bottom:5px;" disabled>';
    cadena=cadena+'<label for="textoEjercicio">Texto Ejercicio: </label><textarea id="textoEjercicio" name="TextoEjercicio" rows="10" cols="40">'+texto+'</textarea>';
    cadena=cadena+'<label for="respuestaEjercicio">Respuesta Ejercicio: </label><input id="respuestaEjercicio" type="text" class="form-control" name="respuesta" value="'+respuesta+'" style="margin-bottom:5px;">';
    cadena=cadena+'<label for="dificultadEjercicio">Dificultad: </label><select class="form-control" id="dificultadEjercicio" name="dificultadEjercicio">';
    cadena=cadena+'<option value="Fácil">Fácil</option><option value="Media">Media</option><option value="Alta">Alta</option></select></div>';
    cadena=cadena+'<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModalInstrucciones" style="margin-left: 20px">Instrucciones</button>'
    cadena=cadena+'<button type="button" id="verEjercicioBtn" class="btn btn-primary btn-md" style="margin-left: 56px">Ver ejercicio</button>';
    cadena=cadena+'</div></div>';


    $('#inicio').append(cadena);    
    $('#dificultadEjercicio').val(dificultad);

    $('#verEjercicioBtn').on('click',function(){
          var nombreEjercicio=$('#nombreEjercicio').val();
          if(nombreEjercicio==""){
            $('#campoNombre').remove();
            mostrarAviso("#formActualizarEjercicioImg","<p id='campoNombre' style='color:red;font-size:1.5em;'>Rellena el campo nombre</p>");
          }
          else{
            $('#campoNombre').remove();
            var textoEjercicio=$('#textoEjercicio').val();
            
            if($('#textoEjercicio').val().length<1){
              $('#campoTexto').remove();
              mostrarAviso("#formActualizarEjercicioImg","<p id='campoTexto' style='color:red;font-size:1.5em;'>Rellena el campo texto</p>");
            }
            else{
              var nRespuestas=textoEjercicio.split("@");
              $('#campoTexto').remove();
              var respuestaEjercicio=$('#respuestaEjercicio').val();
              var respuestasEjercicioSeparado= respuestaEjercicio.split(" ");
              if(respuestasEjercicioSeparado.length!=nRespuestas.length-1){
                $('#campoRespuesta').remove();
                mostrarAviso("#formActualizarEjercicioImg","<p id='campoRespuesta' style='color:red;font-size:1.5em;'>Has puesto "+respuestasEjercicioSeparado.length+" respuestas </p>");
              }
              else{    
                $('#campoRespuesta').remove();
                $('#campoDificultad').remove();
                var dificultadEjercicio=$('#dificultadEjercicio').val();
                if(dificultadEjercicio==""){
                  mostrarAviso("#formActualizarEjercicioImg","<p id='campoDificultad' style='color:red;font-size:1.5em;'>Rellena el campo dificultad</p>");
                }
                else{
                  $('#mostrarConsultas').remove();
                  mostrarDatosProfesorActu(nombreEjercicio);
                  mostrarHuecosActu(textoEjercicio);
                  mostrarSolucionActualización(nombreEjercicio, textoEjercicio, respuestaEjercicio,dificultadEjercicio);
                }
              }
            }
          }     

    });
  }
}

function mostrarTablaEjerciciosTodos(datos){
  limpiar();
  if ($.cookie("pro")){
    var cadena ='<div id="tablaTodos" class="container"><h2>Listado de todos los ejercicios</h2><p>Ejercicios presentes en la base de datos</p>';
    cadena = cadena + '<table class="table table-responsive table-striped" id="tab" ><thead><tr class="w3-red">';
    cadena = cadena + '<th>Nombre Ejercicio</th><th>Profesor</th><th>Dificultad</th><th>Ver Ejercicio</th></tr></thead><tbody>';
    for(var i=0;i<datos.length;i++){
        cadena = cadena + '<tr><td>'+datos[i].nombre+'</td><td>'+datos[i].emailProfesor+'</td><td>'+datos[i].dificultad+'</td>';
        cadena = cadena + '<td><a data-toggle="tooltip" title="visualizar" href="#" id="visualizar" class="ejemplo-visualizar" data-datos-nombre="'+datos[i].nombre+'" data-datos-texto="'+datos[i].texto+'" data-datos-respuesta="'+datos[i].respuesta+'"><img id="papelera" src="cliente/img/witness.png" style="width:10%;margin-left: 20px;" ></a></td></tr>';
      }
    cadena = cadena + '</tbody></table>';
    cadena=cadena+'<button type="button" id="volverBoton" class="btn btn-link btn-md">Volver</button></div>';
    $('#tablas').append(cadena);

    $('.ejemplo-visualizar').on('click', function(){
      var nombre = $(this).data('datos-nombre');
      var texto = $(this).data('datos-texto');
      var respuesta = $(this).data('datos-respuesta');
      
      mostrarVisualizacionEjercicio(texto);
      mostrarVisualizacionEjercicioSolucionado(nombre,texto,respuesta);
      
    });
    $('#volverBoton').on('click',function(){
      rest.obtenerEjerciciosProfesor();
    });

    $(document).ready(function(){
        $("#tab").tablesorter();
    });

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();   
    });

  }
}


/////////////////////////////////////// EJERCICIOS PROFESOR - CREAR - BORRADOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarCrearEjercicio(){
  $('#formRegistro').remove();
  $('#imageReg').remove();
  $('#granCabeceraProfesor').remove();
  $('#imagenP').remove();
  $('#formCrearEjercicioImg').remove();
  $('#tablaEjercicios').remove();
  $('#tablaTodos').remove();

  if ($.cookie("pro")){

    var cadena = '<div id="formCrearEjercicioImg" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;align-items: center;">';
    cadena=cadena+'<img id="imagenCrearEjercicio" src="cliente/img/profeEjercicio.png" alt="Lights" style="width:100%">';
    cadena=cadena+'<div id="formCrearEjercicio" class="caption" align="center">';
    cadena=cadena+'<p id="textCrearEjercicio" style="font-size:1.9em;">¡Crea ejercicios para tus alumnos!</p>';
    cadena=cadena+'<label for="nombreEjercicio">Nombre Ejercicio: </label><input id="nombreEjercicio" type="text" class="form-control" name="nombre" placeholder="Nombre del ejercicio" style="margin-bottom:5px;" autocomplete="off">';
    cadena=cadena+'<label for="textoEjercicio">Texto Ejercicio: </label><textarea id="textoEjercicio" name="TextoEjercicio" rows="10" cols="40" placeholder="Escribe aquí el texto"></textarea>';
    cadena=cadena+'<label for="respuestaEjercicio">Respuesta Ejercicio: </label><input id="respuestaEjercicio" type="text" class="form-control" name="respuesta" placeholder="Respuesta del ejercicio" style="margin-bottom:5px;" autocomplete="off">';
    cadena=cadena+'<label for="dificultadEjercicio">Dificultad: </label><select class="form-control" id="dificultadEjercicio" name="dificultadEjercicio">';
    cadena=cadena+'<option value="" selected="selected"></option><option value="Fácil">Fácil</option><option value="Media">Media</option><option value="Alta">Alta</option></select></div>';
    cadena=cadena+'<button type="button" class="btn btn-warning " data-toggle="modal" data-target="#myModalInstrucciones" style="margin-left: 20px">Instrucciones</button>'
    cadena=cadena+'<button type="button" id="crearEjercicioBtn" class="btn btn-primary float-right" style="margin-left: 56px">Ver ejercicio</button>';
    cadena=cadena+'</div></div>';

    $('#inicio').append(cadena);

    $('#crearEjercicioBtn').on('click',function(){
          var nombreEjercicio=$('#nombreEjercicio').val();
          if(nombreEjercicio==""){
            $('#campoNombre').remove();
            mostrarAviso("#formCrearEjercicioImg","<p id='campoNombre' style='color:red;font-size:1.5em;'>Rellena el campo nombre</p>");
          }
          else{
            $('#campoNombre').remove();
            var textoEjercicio=$('#textoEjercicio').val();
            
            if($('#textoEjercicio').val().length<1){
              $('#campoTexto').remove();
              mostrarAviso("#formCrearEjercicioImg","<p id='campoTexto' style='color:red;font-size:1.5em;'>Rellena el campo texto</p>");
            }
            else{
              var nRespuestas=textoEjercicio.split("@");
              $('#campoTexto').remove();
              var respuestaEjercicio=$('#respuestaEjercicio').val();
              var respuestasEjercicioSeparado= respuestaEjercicio.split(" ");
              if(respuestasEjercicioSeparado.length!=nRespuestas.length-1){
                $('#campoRespuesta').remove();
                mostrarAviso("#formCrearEjercicioImg","<p id='campoRespuesta' style='color:red;font-size:1.5em;'>Has puesto "+respuestasEjercicioSeparado.length+" respuestas </p>");
              }
              else{    
                $('#campoRespuesta').remove();
                $('#campoDificultad').remove();
                var dificultadEjercicio=$('#dificultadEjercicio').val();
                if(dificultadEjercicio==""){
                  mostrarAviso("#formCrearEjercicioImg","<p id='campoDificultad' style='color:red;font-size:1.5em;'>Rellena el campo dificultad</p>");
                }
                else{
                  $('#mostrarConsultas').remove();
                  mostrarDatosProfesor(nombreEjercicio);
                  mostrarHuecos(textoEjercicio);
                  mostrarSolucion(nombreEjercicio, textoEjercicio, respuestaEjercicio,dificultadEjercicio);
                }
              }
            }
          }
          

    });
  }
}

function mostrarDatosProfesor(nombreEjercicio){
  
  var pro=JSON.parse($.cookie("pro"));  
  $('#mostrarDatos').remove();
  var cadena='<div  style="margin-top: 260px; margin-bottom:15px" align="center" id="mostrarDatos"><h3 style="color:#449D43;margin-top:100 px">Vista preliminar - Ejercicio: '+ nombreEjercicio +'</div>';
  $('#listaEjercicios').append(cadena);
}

function mostrarDatosProfesorActu(nombreEjercicio){
  
  var pro=JSON.parse($.cookie("pro"));  
  $('#mostrarDatos2').remove();
  var cadena='<div  align="center" id="mostrarDatos2"><h3 style="color:#449D43;">Vista actualización- Ejercicio: '+ nombreEjercicio +'</div>';
  $('#listaEjercicios').append(cadena);
}

function mostrarHuecos(textoEjercicio){
  
  $('#mostrarTexto').remove();
  $('#mostrarTexto2').remove();
  if ($.cookie("pro")){
    var text=textoEjercicio;
    var input = '<input type="text" style="width: 20px;" disabled>'
    text = text.replace(/@/g, input);
    var cadena = '<div style="margin-bottom:30px margin-right: 20 px" align="center" id="mostrarTexto" class="box-blue" ><h4 style="color:white;">'+ text + '</div>';
    $('#listaEjercicios').append(cadena);
  }
}

function mostrarHuecosActu(textoEjercicio){
  
  $('#mostrarTexto2').remove();
  if ($.cookie("pro")){
    var text=textoEjercicio;
    var input = '<input type="text" style="width: 20px;" disabled>'
    text = text.replace(/@/g, input);
    var cadena = '<div  align="center" id="mostrarTexto2" class="box-blue" ><h4 style="color:white;">'+ text + '</div>';
    $('#listaEjercicios').append(cadena);
  }
}

function mostrarSolucion (nombreEjercicio, textoEjercicio, respuestaEjercicio,dificultadEjercicio){
  
  $('#mostrarSolucion').remove();
  if ($.cookie("pro")){
    var textoEjercicioSeparado=textoEjercicio.split("@");
    var respuestaEjercicioSeparado=respuestaEjercicio.split(" ");
    var pRespuestas=textoEjercicioSeparado.length;
    var textoSolucion;
    for (var i=0;i<respuestaEjercicioSeparado.length;i++){
      if(respuestaEjercicioSeparado[i]=="NADA"){
        respuestaEjercicioSeparado[i]="";
      }
    }

    for(var j=0;j<pRespuestas-1;j++){
      textoEjercicioSeparado[j]=textoEjercicioSeparado[j].concat(respuestaEjercicioSeparado[j]);
    }

    textoSolucion=textoEjercicioSeparado[0];
    for (var i=0;i<pRespuestas-1;i++){
      textoSolucion=textoSolucion.concat(textoEjercicioSeparado[i+1]);
    }
  }
  var cadena= '<div align="center" id="mostrarSolucion"><h3 style="color:black;" >Solución - Ejercicio: '+ nombreEjercicio+ '</h3>';
  cadena = cadena+'<div id="mostrarTexto" class="box-green"><h4 style="color:black">'+ textoSolucion + '</h4></div>';
  cadena=cadena+'<button type="button" id="crearEjercicioBtn2" class="btn btn-success btn-md">Crear ejercicio</button></div>';
  $('#listaEjercicios').append(cadena);

   $('#crearEjercicioBtn2').on('click',function(){
      rest.crearEjercicio(nombreEjercicio,textoEjercicio,respuestaEjercicio,dificultadEjercicio);

   });

}

function mostrarSolucionActualización (nombreEjercicio, textoEjercicio, respuestaEjercicio,dificultadEjercicio){
  
  $('#mostrarSolucion').remove();
  if ($.cookie("pro")){
    var textoEjercicioSeparado=textoEjercicio.split("@");
    var respuestaEjercicioSeparado=respuestaEjercicio.split(" ");
    var pRespuestas=textoEjercicioSeparado.length;
    var textoSolucion;
    for (var i=0;i<respuestaEjercicioSeparado.length;i++){
      if(respuestaEjercicioSeparado[i]=="NADA"){
        respuestaEjercicioSeparado[i]="";
      }
    }

    for(var j=0;j<pRespuestas-1;j++){
      textoEjercicioSeparado[j]=textoEjercicioSeparado[j].concat(respuestaEjercicioSeparado[j]);
    }

    textoSolucion=textoEjercicioSeparado[0];
    for (var i=0;i<pRespuestas-1;i++){
      textoSolucion=textoSolucion.concat(textoEjercicioSeparado[i+1]);
    }
  }
  var cadena= '<div align="center" id="mostrarSolucion"><h3 style="color:black;" >Solución - Ejercicio: '+ nombreEjercicio+ '</h3>';
  cadena = cadena+'<div id="mostrarTexto" class="box-green"><h4 style="color:black">'+ textoSolucion + '</h4></div>';
  cadena=cadena+'<button type="button" id="actualizarEjercicioBtn2" class="btn btn-success btn-md">Actualizar ejercicio</button></div>';
  $('#listaEjercicios').append(cadena);

   $('#actualizarEjercicioBtn2').on('click',function(){
      rest.actualizarEjercicio(nombreEjercicio,textoEjercicio,respuestaEjercicio,dificultadEjercicio);

   });

}

///////////////////////////////////////////// GESTION DE USUARIOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarTablaAlumnos(datos){

  limpiar();

  if ($.cookie("pro")){
    
    var cadena ='<div id="tablaAlumnos" class="container"><h2>Listado de alumnos</h2><p>Alumnos con cuenta creada <button type="button" id="agregarAluBtn" class="btn btn-success btn-responsive btninter right" style="margin-left:30px" >Agregar Alumno</button></p>';
    cadena = cadena + '<table class="table table-striped" id="tab"><thead><tr class="w3-red">';
    cadena = cadena + '<th>Nombre Alumno</th><th>Apellidos</th><th>Nick</th><th>Curso</th><th>Edad</th><th>Atención especial</th><th>Acciones</th></tr></thead><tbody>';
    for(var i=0;i<datos.length;i++){
        cadena = cadena + '<tr><td>'+datos[i].nombre+'</td><td>'+datos[i].apellidos+'</td><td>'+datos[i].nickAlumno+'</td>';
        cadena = cadena + '<td>'+datos[i].curso+'</td><td>'+datos[i].edad+'</td><td>'+datos[i].ate+'</td>';
        cadena = cadena + '<td><a data-toggle="tooltip" title="resultados" href="#" id="visualizar" class="ejemplo-resultados" data-datos-nick="'+datos[i].nickAlumno+'"><img id="resultados" src="cliente/img/award.png" style="width:14%;" ></a> ';
        cadena = cadena + ' <a data-toggle="tooltip" title="editar" href="#" id="editar" class="ejemplo-pencil" data-datos-nick="'+datos[i].nickAlumno+'" data-datos-clave="'+datos[i].clave+'" data-datos-curso="'+datos[i].curso+'" data-datos-nombre="'+datos[i].nombre+'" ';
        cadena = cadena + ' data-datos-apellidos="'+datos[i].apellidos+'" data-datos-edad="'+datos[i].edad+'" data-datos-genero="'+datos[i].genero+'" data-datos-ate="'+datos[i].ate+'" data-datos-centro="'+datos[i].centro+'">'
        cadena = cadena + '<img id="pencil" src="cliente/img/pencil.png" style="width:14%; margin-left: 10px;"></a>';
        cadena = cadena + ' <a data-toggle="tooltip" title="eliminar" href="#" id="papelera" class="ejemplo-papelera" data-datos-id="'+datos[i]._id+'"><img id="papelera" src="cliente/img/trash-can.png" style="width:14%; margin-left: 10px;"></a> </td></tr>'
      }

    cadena = cadena + '</tbody></table></div>';


    $('#tablas').append(cadena);

    $('.ejemplo-papelera').on('click', function(){
      var id = $(this).data('datos-id');
      $('#myModalAlumnoEliminado').data('id_elemento',id);
      console.log($('#myModalAlumnoEliminado').data('id_elemento'));
      $('#myModalAlumnoEliminado').modal({backdrop: false});      
    });

    $('.ejemplo-resultados').on('click', function(){
      var nickAlumno = $(this).data('datos-nick');
      rest.obtenerEjerciciosAcabadosNick(nickAlumno);
      
    });

    $('.ejemplo-pencil').on('click', function(){
      var nick = $(this).data('datos-nick');
      var clave = $(this).data('datos-clave');
      var curso = $(this).data('datos-curso');
      var nombre = $(this).data('datos-nombre');
      var apellidos = $(this).data('datos-apellidos');
      var edad = $(this).data('datos-edad');
      var genero = $(this).data('datos-genero');
      var ate = $(this).data('datos-ate');
      var centro = $(this).data('datos-centro');

      mostrarActualizarAlumno(nick,clave,curso,nombre,apellidos,edad,genero,ate,centro);
      
    });


    $(document).ready(function(){
        $("#tab").tablesorter();
    });

    $('#agregarAluBtn').on('click',function(){
        mostrarFormularioAlumno();
     });

    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();   
    });
  }
}

function mostrarTablaResultados(datos){
  $('#tablaAlumnos').remove();
  $('#tablaResultados').remove();
  
  if ($.cookie("pro")){
    if(datos.length>0){
      var cadena ='<div id="tablaResultados" class="container"><h2>Resultados de '+datos[0].nickAlumno+'</h2><p>Ejercicios presentes en la base de datos</p>';
      cadena = cadena + '<table class="table table-responsive table-striped" id="tab" ><thead><tr class="w3-red">';
      cadena = cadena + '<th>Nombre Ejercicio</th><th>Aciertos</th><th>Fallos</th><th>Fecha</th></tr></thead><tbody>';
      for(var i=0;i<datos.length;i++){
          cadena = cadena + '<tr><td>'+datos[i].ejercicio+'</td><td>'+datos[i].aciertos+'</td><td>'+datos[i].fallos+'</td>';
          cadena = cadena + '<td>'+datos[i].fecha+'</td></tr>';
        }
      cadena = cadena + '</tbody></table>';
      cadena=cadena+'</div>';
    }
    else{
       var cadena ='<div id="tablaResultados" class="container"><h2 style="color:red">No hay datos para dicho alumno</h2>';
       cadena=cadena+'</div>';
    }  

    $('#tablas').append(cadena);

    $(document).ready(function(){
        $("#tab").tablesorter();
    });
  }

}

function mostrarFormularioAlumno(){
$('#tablaAlumnos').remove();
$('#formRegistroAlumnoP').remove();
 
if ($.cookie("pro")){
   var cadena='<div id="formRegistroAlumnoP" >';
   cadena=cadena+'<h3 style="color:black">Registro alumno </h3>';
   cadena=cadena+'<div class="form-group"><label for="nombre">Nombre: </label><input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre" autocomplete="off"></div>';
   cadena=cadena+'<div class="form-group"><label for="apellidos">Apellidos: </label><input id="apellidos" type="text" class="form-control" name="apellidos" placeholder="Apellidos" autocomplete="off"></div>';
   cadena=cadena+'<div class="form-group"><label for="nick">Nick Alumno: </label><input id="nick" type="text" class="form-control" name="nick" placeholder="Nick Alumno" autocomplete="off"></div>';
   cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="edad">Edad: </label><input id="edad" type="text" class="form-control" name="edad" placeholder="Edad" autocomplete="off"></div>';
   cadena=cadena+'<div class="col-sm-6"><label for="edad">Género: </label><div class="radio"><label><input type="radio" name="optradio" value="Masculino" checked>Niño</label></div>';
   cadena=cadena+'<div class="radio"><label><input type="radio" name="optradio" value="Femenino">Niña</label></div></div></div>';
   cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="curso" class="control-label">Curso</label><select class="form-control" id="curso" name="curso">';
   cadena=cadena+'<option value="" selected="selected"></option><option value="1º">1º Primaria</option><option value="2º">2º Primaria</option><option value="3º">3º Primaria</option><option value="4º">4º Primaria</option><option value="5º">5º Primaria</option><option value="6º">6º Primaria</option></select></div>';
   cadena=cadena+'<div class="col-sm-6"><label for="edad">Atención especial: </label><div class="radio"><label><input type="radio" name="radioAte" value="No" checked>No</label></div>';
   cadena=cadena+'<div class="radio"><label><input type="radio" name="radioAte" value="Si">Si</label></div></div></div>';
   cadena=cadena+'<div class="form-group"><label for="centro" class="control-label">Centro</label><select class="form-control" id="centro" name="centro>';
   cadena=cadena+'<option value="" selected="selected"></option><option value="Jardín">Jardín</option><option value="Peñascosa">Peñascosa</option><option value="Robledo">Robledo</option><option value="Povedilla">Povedilla</option><option value="Viveros">Viveros</option></select></div>';
   cadena=cadena+'<div class="form-group"><label for="contraseña">Contraseña: </label><input id="passwordA" type="password" class="form-control" name="passwordA" placeholder="Contraseña usuario"></div>';
   cadena=cadena+'<div class="form-group"><label for="rContraseña">Repetir contraseña: </label><input id="password2A" type="password" class="form-control" name="password2A" placeholder="Repita contraseña usuario"></div>';
   cadena=cadena+'<button type="button" id="registroBtn" class="btn btn-primary btn-md">Registrar Alumno</button>';
   cadena=cadena+'</div>';

   $('#registro').append(cadena);

   $('#registroBtn').on('click',function(){

      $('#formRegistroAlumnoP p').remove();
      var nombre=$('#nombre').val();
      var apellidos=$('#apellidos').val();
      var nick=$('#nick').val();
      var edad=$('#edad').val();
      var genero = $('input:radio[name=optradio]:checked').val();
      var curso=$("#curso").val();
      var centro=$("#centro").val()
      var ate= $('input:radio[name=radioAte]:checked').val();
      
      if(nombre!="" && apellidos!="" && nick!="" && edad!="" && curso!=""){
        if($('#passwordA').val().length>=4 && $('#password2A').val().length>=4){
          if($('#passwordA').val()==$('#password2A').val()){
            var password=$('#passwordA').val();
            rest.registrarAlumnoPorProfesor(nick,password,curso,nombre,apellidos,edad,genero,ate,centro);
              
          }
          else{
            mostrarAviso("#formRegistroAlumnoP","<p id='conNoCoinciden' style='color:red;font-size:1.5em;'>Las contraseñas no coinciden</p>");
          }
        }
        else{
          mostrarAviso("#formRegistroAlumnoP","<p id='msg' style='color:red;font-size:1.5em;'>La contraseña debe tener al menos 4 caracteres</p>");
        }
      }
      else{
         mostrarAviso("#formRegistroAlumnoP","<p id='campo' style='color:red;font-size:1.5em;'>Rellena todos los campos</p>");
      }
         
    });
  }
}

function mostrarActualizarAlumno(nick,clave,curso,nombre,apellidos,edad,genero,ate,centro){
$('#tablaAlumnos').remove();
$('#formRegistroAlumnoP').remove();
$('#formActualizarAlumno').remove();

 
if ($.cookie("pro")){
   var cadena='<div id="formActualizarAlumno" >';
   cadena=cadena+'<h3 style="color:green"><b>Actualizar alumno </b></h3>';
   cadena=cadena+'<div class="form-group"><label for="nombre">Nombre: </label><input id="nombre" type="text" class="form-control" name="nombre" value="'+nombre+'" disabled></div>';
   cadena=cadena+'<div class="form-group"><label for="apellidos">Apellidos: </label><input id="apellidos" type="text" class="form-control" name="apellidos" value="'+apellidos+'" disabled></div>';
   cadena=cadena+'<div class="form-group"><label for="nick">Nick Alumno: </label><input id="nick" type="text" class="form-control" name="nick" value="'+nick+'" disabled></div>';
   cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="edad">Edad: </label><input id="edad" type="text" class="form-control" name="edad" value="'+edad+'" ></div>';

   //Radio input genero
   if(genero=="Masculino"){
    cadena=cadena+'<div class="col-sm-6"><label for="edad">Género: </label><div class="radio"><label><input type="radio" name="optradio" value="Masculino" checked disabled>Niño</label></div>';
    cadena=cadena+'<div class="radio"><label><input type="radio" name="optradio" value="Femenino" disabled>Niña</label></div></div></div>';
  }
  else{
     cadena=cadena+'<div class="col-sm-6"><label for="edad">Género: </label><div class="radio"><label><input type="radio" name="optradio" value="Masculino"  disabled>Niño</label></div>';
    cadena=cadena+'<div class="radio"><label><input type="radio" name="optradio" value="Femenino" checked disabled>Niña</label></div></div></div>';
  }

  //select curso
   cadena=cadena+'<div class="form-group"><div class="col-sm-6"><label for="curso" class="control-label">Curso</label><select class="form-control" id="curso" name="curso">';
   cadena=cadena+'<option value="" selected="selected"></option><option value="1º">1º Primaria</option><option value="2º">2º Primaria</option><option value="3º">3º Primaria</option><option value="4º">4º Primaria</option><option value="5º">5º Primaria</option><option value="6º">6º Primaria</option></select></div>';

   //Radio input Ate
   if(ate=="Si"){
    cadena=cadena+'<div class="col-sm-6"><label for="edad">Atención especial: </label><div class="radio"><label><input type="radio" name="radioAte" value="No">No</label></div>';
    cadena=cadena+'<div class="radio"><label><input type="radio" name="radioAte" value="Si" checked>Si</label></div></div></div>';
   }
   else{
    cadena=cadena+'<div class="col-sm-6"><label for="edad">Atención especial: </label><div class="radio"><label><input type="radio" name="radioAte" value="No" checked>No</label></div>';
    cadena=cadena+'<div class="radio"><label><input type="radio" name="radioAte" value="Si">Si</label></div></div></div>';
   }
   //Select centros
   cadena=cadena+'<div class="form-group"><label for="centro" class="control-label">Centro</label><select class="form-control" id="centro" name="centro>';
   cadena=cadena+'<option value="" selected="selected"></option><option value="Jardín">Jardín</option><option value="Peñascosa">Peñascosa</option><option value="Robledo">Robledo</option><option value="Povedilla">Povedilla</option><option value="Viveros">Viveros</option></select></div>';

   //Contraseña
   cadena=cadena+'<div class="form-group"><label for="contraseña">Contraseña: </label><input id="passwordA" type="password" class="form-control" name="passwordA" placeholder="Contraseña usuario"></div>';
   cadena=cadena+'<div class="form-group"><label for="rContraseña">Repetir contraseña: </label><input id="password2A" type="password" class="form-control" name="password2A" placeholder="Repita contraseña usuario"></div>';
   cadena=cadena+'<button type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar Alumno</button><br>';
   cadena=cadena+'<button type="button" id="volverBtn" class="btn btn-link btn-md">Volver</button><br>';
   cadena=cadena+'</div>';

   $('#registro').append(cadena);
   $('#radioGenero').val(genero);
   $('#curso').val(curso);
   $('#radioAte1').val(ate);
   $('#centro').val(centro);

    $('#volverBtn').on('click',function(){
      rest.obtenerAlumnos();
    });

   $('#actualizarBtn').on('click',function(){

      $('#formActualizarAlumno p').remove();
      var nombre=$('#nombre').val();
      var apellidos=$('#apellidos').val();
      var nick=$('#nick').val();
      var edad=$('#edad').val();
      var genero = $('input:radio[name=optradio]:checked').val();
      var curso=$("#curso").val();
      var centro=$("#centro").val()       
      var ate= $('input:radio[name=radioAte]:checked').val();
     
      if(nombre!="" && apellidos!="" && nick!="" && edad!="" && curso!=""){
        if($('#passwordA').val().length>=4 && $('#password2A').val().length>=4){
          if($('#passwordA').val()==$('#password2A').val()){
            var password=$('#passwordA').val();
            rest.actualizarAlumnoPorProfesor(nick,password,curso,nombre,apellidos,edad,genero,ate,centro);
              
          }
          else{
            mostrarAviso("#formActualizarAlumno","<p id='conNoCoinciden' style='color:red;font-size:1.5em;'>Las contraseñas no coinciden</p>");
          }
        }
        else{
          mostrarAviso("#formActualizarAlumno","<p id='msg' style='color:red;font-size:1.5em;'>La contraseña debe tener al menos 4 caracteres</p>");
        }
      }
      else{
         mostrarAviso("#formActualizarAlumno","<p id='campo' style='color:red;font-size:1.5em;'>Rellena todos los campos</p>");
      }
         
    });
  }
}

/////////////////////////////////////////////////// EJERCICIOS PROFESOR - CONSULTAS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarConsultas(){
  $('#mostrarSolucion').remove();
  $('#mostrarTexto').remove();
  $('#mostrarTexto2').remove();
  $('#mostrarDatos').remove();
  $('#mostrarDatos2').remove();
  $('#mostrarConsultas').remove();
  if ($.cookie("pro")){
    var cadena = '<div id="mostrarConsultas" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;">';
    cadena = cadena + '<img id="imagenCrearEjercicio" src="cliente/img/profeEjercicio.png" alt="Lights" style="width:100%">';
    cadena = cadena + '<div id="consultas" class="caption">';
    cadena = cadena + '<p id="textConsultaEjercicio" align="center" style="font-size:2em;">Consulta tus ejercicios o los de tus alumnos</p>';
    cadena = cadena + '<ol><li><div id="first"><p>Ejercicios creados por ti <button id="ejerciciosProfesorBtn" type="button" class="button1">Buscar</button></p></div></li>';
    cadena = cadena + '<li><div id="second"><p>Ejercicios por nombre <input type="text" id="nombreEjercicioInput" name="nombreEjercicio" placeholder="Nombre ejercicio">';
    cadena = cadena + '<button id="ejercicioPorNombreBtn" type="button" class="button1">Buscar</button></p></div></li>';
    cadena = cadena + '<li><div id="third"><p>Ejercicios por alumno <input type="text" id="nickEjercicioInput" name="nickAlumno" placeholder="Nick alumno">';
    cadena = cadena + '<button id="ejercicioPorNickBtn" type="button" class="button1">Buscar</button></p></div></li>';
    cadena = cadena + '</ol></div></div>'

    $('#listaEjercicios').append(cadena);
    $('#ejerciciosProfesorBtn').on('click',function(){
      rest.obtenerEjerciciosProfesor();
   });

    $('#ejercicioPorNombreBtn').on('click',function(){
      
      var nombreEjercicio=$('#nombreEjercicioInput').val();
      if(nombreEjercicio==""){
          $('#campoNombreConsultas').remove();
          mostrarAviso("#mostrarConsultas","<p id='campoNombreConsutas' style='color:red;font-size:1.5em;'>Rellena el campo nombre</p>");
        }
        else{
          $('#campoNombreConsultas').remove();
          rest.obtenerEjerciciosAcabadosNombre(nombreEjercicio);
        }
   });

    $('#ejercicioPorNickBtn').on('click',function(){
      
      var nickAlumno=$('#nickEjercicioInput').val();
      if(nickAlumno==""){
          $('#campoNickConsultas').remove();
          mostrarAviso("#mostrarConsultas","<p id='campoNickConsutas' style='color:red;font-size:1.5em;'>Rellena el campo nombre</p>");
        }
        else{
          $('#campoNickConsultas').remove();
          rest.obtenerEjerciciosAcabadosNick(nickAlumno);
        }
   });

  }
}

function mostrarEjerciciosProfesor(datos){
  $('#formCrearEjercicioImg').remove();
  $('#mostrarEjerciciosProfesor').remove();

  if ($.cookie("pro")){
    var cadena = '<div id="mostrarEjerciciosProfesor" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;">';
    cadena = cadena + '<div id="ejerciciosProfesor" class="caption">';
    cadena = cadena + '<p id="textEjerciciosProfesor" align="center" style="font-size:2em;">Sus ejercicios son: </p>';
    cadena = cadena + '<ol id="listaEjerciciosProfesor">';

    for(var i=0;i<datos.length;i++){
      cadena = cadena + '<li><div><p><b><big>ID:</big></b> '+datos[i]._id+' <b><big>Nombre:</big></b> '+datos[i].nombre+' </p></div>';
      cadena = cadena + '<div><p id="truncaTexto"><b><big>Texto:</big></b> '+datos[i].texto+'</p></div></li>'
    }
    cadena=cadena+'</ol>';
    cadena= cadena+'<div align="center"><p>Eliminar ejercicio <input type="text" id="idEjercicioInput" placeholder="Id ejercicio"></p></div>';
    cadena=cadena+'<div align="center" ><button id="eliminarEjercicioBtn" type="button" class="button1">Eliminar</button></div></div></div>';
    $('#inicio').append(cadena);

    $('#eliminarEjercicioBtn').on('click',function(){
      var idEjercicio=$('#idEjercicioInput').val();
        if(idEjercicio==""){
          $('#campoId').remove();
          mostrarAviso("#mostrarEjerciciosProfesor","<p id='campoId' style='color:red;font-size:1.5em;'>Rellena el campo Id</p>");
        }else{
          rest.eliminarEjercicio(idEjercicio);
        }
   });

  }
}

function mostrarEjerciciosAcabadosProfesor(datos){
  $('#formCrearEjercicioImg').remove();
  $('#mostrarEjerciciosProfesor').remove();
  if ($.cookie("pro")){
    var cadena = '<div id="mostrarEjerciciosProfesor" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;">';
    cadena = cadena + '<div id="ejerciciosProfesor" class="caption">';
    cadena = cadena + '<p id="textEjerciciosProfesor" align="center" style="font-size:2em;">Resultados del ejercicio: </p>';
    cadena = cadena + '<ol id="listaEjerciciosProfesor">';

    for(var i=0;i<datos.length;i++){
      cadena = cadena + '<li><div><p><b><big>Ejercicio:</big></b> '+datos[i].ejercicio+' <b><big>Alumno:</big></b> '+datos[i].nickAlumno+' </p></div>';
      cadena = cadena + '<div><p><b><big>Aciertos: </big></b> '+datos[i].aciertos+' <b><big>Fallos: </big></b>'+datos[i].fallos+'</p></div></li>'
    }
    cadena=cadena+'</ol>';
    cadena=cadena+'<div align="center" ><button id="volverBtn" type="button" class="button1">Volver</button></div></div></div>';
    $('#inicio').append(cadena);

    $('#volverBtn').on('click',function(){
      location.reload();
   });

  }
}

function mostrarEjerciciosAcabadosNick(datos){
  $('#formCrearEjercicioImg').remove();
  $('#mostrarEjerciciosNick').remove();
  if ($.cookie("pro")){
    var cadena = '<div id="mostrarEjerciciosNick" class="thumbnail" style="margin-top:20px; margin-left:10px; width:80%;">';
    cadena = cadena + '<div id="ejerciciosProfesorNick" class="caption">';
    cadena = cadena + '<p id="textEjerciciosProfesor" align="center" style="font-size:2em;">Resultados para el alumno: </p>';
    cadena = cadena + '<ol id="listaEjerciciosProfesor">';

    for(var i=0;i<datos.length;i++){
      cadena = cadena + '<li><div><p><b><big>Alumno: </big></b> '+datos[i].nickAlumno+' <b><big>Ejercicio: </big></b> '+datos[i].ejercicio+' </p></div>';
      cadena = cadena + '<div><p><b><big>Aciertos: </big></b> '+datos[i].aciertos+' <b><big>Fallos: </big></b>'+datos[i].fallos+'</p></div></li>'
    }
    cadena=cadena+'</ol>';
    cadena=cadena+'<div align="center" ><button id="volverBtn" type="button" class="button1">Volver</button></div></div></div>';
    $('#inicio').append(cadena);

    $('#volverBtn').on('click',function(){
      location.reload();
   });

  }
}


/////////////////////////////////////// PROFESOR CERRAR SESION - ACTUALIZAR  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function cerrarSesionProfesor(){
  if ($.cookie("pro")){
      $.removeCookie("pro");
      location.reload();
      mostrarLogoInicio();
  }
}

function mostrarActualizarEliminar(){
 

  limpiar();
 

  var uid;
  if ($.cookie("pro")!=undefined){
    var pro=JSON.parse($.cookie("pro"));
    uid=pro._id;
  }
  if(uid)
  {
    var cadena = '<div id="actualizaCon">';
    cadena = cadena + '<h3 style="color:green"><b>Actualizar contraseña </b></h3>';
    cadena = cadena + '<p>Dirección de correo</p><input id="emailAc" type="text" value="'+pro.email+' " class="form-control" disabled>';
    cadena = cadena + '<p>Contraseña actual </p><input type="password" id="oldpass" class="form-control">';
    cadena = cadena + '<p>Introduzca la nueva contraseña </p><input type="password" id="newpass" class="form-control">';
    cadena = cadena + '<p>Repita la nueva contraseña </p><input type="password" id="newpass2" class="form-control"><br>';
    cadena = cadena + '<button class="btn btn-primary" id="actualizarBtn">Actualizar</button></div>';

    var baja = '<div id="bajaProfesor">';
    baja = baja + '<h3 style="color:red"><b>Baja profesor</b></h3>';
    baja = baja + '<p style="color:black; font-size:1.5em;">Una vez que se dé de baja no pdrá recuperar su cuenta ni sus ejercicios</p>';
    baja = baja + '<button class="btn btn-danger" id="btnBaja">Quiero darme de baja</button></div>';
    

    $('#borrador').append(cadena);
    $('#infoAlumno').append(baja);
    $('#actualizarBtn').on('click',function(){
      $('#msg').remove();
      var oldpass=$('#oldpass').val();
      var newpass=$('#newpass').val();
      var newpass2=$('#newpass2').val();
      
      
      if (oldpass=="" && newpass=="" && newpass2==""){
        mostrarAviso("#borrador","<p id='msg' style='color:red'>No rellenaste ningún campo</p>");
      }
      
      else if(newpass!=newpass2){
        mostrarAviso("#borrador","<p id='msg' style='color:red'>Las contraseñas no coinciden</p>");
      }
       else if($('#newpass').val().length<4){
          mostrarAviso("#borrador","<p id='msg' style='color:red'>Las contraseñas deben tener al menos 4 caracteres</p>");
      }
      else{
        rest.actualizarProfesor(oldpass,newpass,newpass2);
      }
    });
    $('#btnBaja').on('click',function(){
      
      $('#myModalEliminarProfesor').modal({backdrop: false});
    });
  }
  else{
    mostrarNavLogin();
  }
}




//////////////////////////////////////////  ELEGIR EJERCICIO- ACTUALIZAR ALUMNO - AREA ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarPantallaAlumnoIniciada(data){
  $('#granCabeceraAlumno').remove();
  $("#granCabecera").remove();
  $('#mostrarDatosAlumno').remove();
  $('#mostrarSolucionEjercicio').remove();
  $('#mostrarTextoAlumno').remove();
  $('#mostrarSolucionAlumno').remove();
  $('#mostrarAciertosFallos').remove();
  $('#imagenA').remove();
  $('#mostrarListaEjercicios').remove();
  $('#respuestaInput').remove();
  rest.obtenerEjercicios();
  mostrarNavAlumno(data);
}

function mostrarNavAlumno(nickAlumno){

  var cadena='<li><a href="#"><span class="glyphicon glyphicon-user"></span>'+nickAlumno+'</a></li>';
  cadena = cadena + '<li id="ejercicios_dA"><a href="#" onclick="rest.obtenerEjercicios();"><span class="glyphicon glyphicon-play-circle"></span> EJERCICIOS</a></li>';
  cadena = cadena + '<li id="resultados_dA"><a href="#" onclick="rest.obtenerEjerciciosAcabados();"><span class="glyphicon glyphicon-stats"></span> RESULTADOS</a></li>';
  //cadena = cadena + '<li id="configuracion_dA"><a href="#" onclick="mostrarActualizarEliminarAlumno();"><span class="glyphicon glyphicon-user"></span> CONFIGURACIÓN</a></li>';
  cadena = cadena + '<li id="cerrar_sesion_dA"><a href="#" onclick="cerrarSesionAlumno();"><span class="glyphicon glyphicon-log-out"></span> CERRAR SESIÓN</a></li>';

  $('#btnLogin li').remove();
  $('#btnLogin').append(cadena);
}

function mostrarListaEjercicios(datos){
  $('#imagenA').remove();
  $('#granCabeceraAlumno').remove();
  $('#mostrarListaEjercicios').remove();
  $('#formListaEjerciciosImg').remove();
  $('#tablaResultadosA').remove();
  
  if ($.cookie("alu")){
    var cadena ='<div id="formListaEjerciciosImg" class="container"><h2>Listado de ejercicios</h2>';
    cadena = cadena + '<table class="table table-striped" id="tab" ><thead><tr class="w3-red">';
    cadena = cadena + '<th>Nombre Ejercicio</th><th>Profesor</th><th>Dificultad</th><th></th></tr></thead><tbody>';
    for(var i=0;i<datos.length;i++){
        cadena = cadena + '<tr><td>'+datos[i].nombre+'</td><td>'+datos[i].emailProfesor+'</td><td>'+datos[i].dificultad+'</td>';
        cadena = cadena + '<td><a href="#" id="jugar" class="ejemplo-jugar" data-datos-nombre="'+datos[i].nombre+'" data-datos-texto="'+datos[i].texto+'" ><img id="play" src="cliente/img/play.png" style="width:10%;margin-left: 10px;"></a></td></tr>';
      }
    cadena = cadena + '</tbody></table></div>';
    
    $('#inicio').append(cadena);

    $('.ejemplo-jugar').on('click', function(){
      var nombreEjercicio = $(this).data('datos-nombre');
      var textoEjercicio = $(this).data('datos-texto');
      rest.elegirEjercicio(nombreEjercicio);
      mostrarNavAlumnoConEjercicio();
      mostrarDatosAlumno(nombreEjercicio);
      mostrarEjercicio(textoEjercicio);     
      
    });

    $(document).ready(function(){
        $("#tab").tablesorter();
    });

  }
  
}

//////////////////////////////////////// PANTALLA EJERCICIO ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function mostrarDatosAlumno(nombreEjercicio){
  $('#mostrarDatosAlumno').remove();
  $('#mostrarSolucionEjercicio').remove();
  if ($.cookie("alu")){ 
    var cadena='<div margin-top="20 px" align="center" id="mostrarDatosAlumno"><h3 style="color:black" >Ejercicio: '+ nombreEjercicio +'</div>';
    $('#datos').append(cadena);
  }
}

function mostrarEjercicio(textoEjercicio){
  $('#mostrarTextoAlumno').remove();
  if ($.cookie("alu")){
    var text=textoEjercicio;
    var textSeparado=textoEjercicio.split("@");
    var nInput=textSeparado.length-1;
    var idInput=0;
    for (var i=0;i<text.length;i++){
      if(text.charAt(i)=="@"){
        var inputN='<input id="'+idInput+'" type="text" style="width:20px; color:black" autocomplete="off">'
        text = text.replace("@", inputN);
        idInput++;
      }
    }

    var cadena = '<div id="mostrarTextoAlumno"><div class="box-blue" ><h4 style="color:white;">'+ text + '</h4></div>';
    cadena=cadena+'<div align="center" id="mostrarSolucion"><button style="color:#286090" type="button" class="btn btn-link" data-toggle="modal" data-target="#myModalInstruccionesAlumno">Instrucciones</button>'
    cadena=cadena+'<button type="button" id="verBorradorBtn" class="btn btn-primary btn-md">Ver borrador</button></div></div>';
    $('#texto').append(cadena);

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

      mostrarBorrador(textoEjercicio,respuestaAlumnoC);
     });
  }
}

function mostrarBorrador(textoEjercicio, respuestaAlumno){
  $('#mostrarSolucionAlumno').remove();
   if ($.cookie("alu")){
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
    var cadena= '<div align="center" id="mostrarSolucionAlumno"><h3 style="color:#F96161;" >Borrador de solución</h3>';
    cadena = cadena+'<div id="mostrarTextoAlumno" class="box-green"><h4 style="color:#F96161;">'+ textoSolucionAlumno + '</h4></div>';
    cadena=cadena+'<button type="button" id="checkResultadoBtn" class="btn btn-primary btn-md">Comprobar respuesta</button></div>';

    $('#borrador').append(cadena);

      $('#checkResultadoBtn').on('click',function(){
        rest.elegirRespuesta(respuestaAlumno);
        checkResultadoBtn.disabled = true;
        $('#verBorradorBtn').prop('disabled', true);

     });

  }
}

function mostrarAciertosFallos(aciertos,fallos,nRespuestas,nombreEjercicio,textoEjercicio,respuestaEjercicio,ejercicio){
  $('#mostrarAciertosFallos').remove();
  $('#respuestaInput').remove();
  if ($.cookie("alu")){
     var cadena= '<div align="center" id="mostrarAciertosFallos">';
     if(aciertos==nRespuestas){
      cadena=cadena + '<div id="aciertosFallos"><h3 style="color:green;">Aciertos: '+aciertos+' Fallos: '+fallos+'</h3></div>'
      cadena=cadena + '<div align="center" id="imagenCongrats"><img src="cliente/img/congrat.gif" class="img-rounded" id="rival" style="width:100%;border:none;"></div></div>';
     }
     else{
      cadena=cadena + '<div id="aciertosFallos"><h3 style="color:red;">Aciertos: '+aciertos+' Fallos: '+fallos+'</h3></div>'
      cadena=cadena + '<div align="center" id="imagenCongrats"><img src="cliente/img/repitelo.gif" class="img-rounded" id="rival" style="width:55%;border:none;"></div>';
      cadena=cadena + '<h3 style="color:red;">¡Inténtalo de nuevo!</h3></div>';
      var respuestaInput='<div align="center" id="respuestaInput"><button type="button" id="mostrarRespuestaBtn" class="btn btn-warning btn-md">Ver respuesta correcta</button></div>';
      $('#respuestaCorrecta').append(respuestaInput);
      $('#mostrarRespuestaBtn').on('click',function(){
        mostrarSolucionEjercicio(nombreEjercicio,textoEjercicio,respuestaEjercicio);

      });

     }
     $('#infoAlumno').append(cadena);    
     rest.ejercicioAcabado(nombreEjercicio,aciertos,fallos);
  }
}

function mostrarSolucionEjercicio(nombreEjercicio,textoEjercicio,respuestaEjercicio){
  $('#mostrarSolucionEjercicio').remove();
  $('#mostrarAciertosFallos').remove();
  $('#respuestaInput').remove();
  $('#mostrarSolucionAlumno').remove();
  $('#mostrarTextoAlumno').remove();
  $('#mostrarDatosAlumno').remove();
  if ($.cookie("alu")){
    var textoEjercicioSeparado=textoEjercicio.split("@");
    var respuestaEjercicioSeparado=respuestaEjercicio.split(" ");
    var pRespuestas=textoEjercicioSeparado.length;
    var textoSolucion;
    for (var i=0;i<respuestaEjercicioSeparado.length;i++){
      if(respuestaEjercicioSeparado[i]=="NADA"){
        respuestaEjercicioSeparado[i]="";
      }
    }

    for(var j=0;j<pRespuestas-1;j++){
      textoEjercicioSeparado[j]=textoEjercicioSeparado[j].concat(respuestaEjercicioSeparado[j]);
    }

    textoSolucion=textoEjercicioSeparado[0];
    for (var i=0;i<pRespuestas-1;i++){
      textoSolucion=textoSolucion.concat(textoEjercicioSeparado[i+1]);
    }
  }
  var cadena= '<div align="center" id="mostrarSolucionEjercicio"><h3 style="color:black;" >Solución - Ejercicio: '+ nombreEjercicio+ '</h3>';
  cadena = cadena+'<div id="mostrarTexto" class="box-green"><h4 style="color:black">'+ textoSolucion + '</h4></div></div>';
  $('#texto').append(cadena);

}

function mostrarTablaResultadosAlumno(datos){
  $('#imagenA').remove();
  $('#granCabeceraAlumno').remove();
  $('#mostrarListaEjercicios').remove();
  $('#formListaEjerciciosImg').remove();
  $('#tablaResultadosA').remove();
  
  if ($.cookie("alu")){
    if(datos.length>0){
      var cadena ='<div id="tablaResultadosA" class="container"><h2 style="color:green;">Resultados de '+datos[0].nickAlumno+'</h2>';
      cadena = cadena + '<table class="table table-striped" id="tab" ><thead><tr class="w3-red">';
      cadena = cadena + '<th>Nombre Ejercicio</th><th>Aciertos</th><th>Fallos</th><th>Fecha</th></tr></thead><tbody>';
      for(var i=0;i<datos.length;i++){
          cadena = cadena + '<tr><td >'+datos[i].ejercicio+'</td><td style="color:green;">'+datos[i].aciertos+'</td><td style="color:red;">'+datos[i].fallos+'</td>';
          cadena = cadena + '<td>'+datos[i].fecha+'</td></tr>';
        }
      cadena = cadena + '</tbody></table>';
      cadena=cadena+'</div>';
    }
    else{
       var cadena ='<div id="tablaResultados" class="container"><h2 style="color:red">No hay registros de ningún ejercicio</h2>';
       cadena=cadena+'</div>';
    }
   
    $('#inicio').append(cadena);

    $(document).ready(function(){
        $("#tab").tablesorter({
          sortColumn:'Fecha',

        });
    });
  }
}


function cerrarSesionAlumno(){
  if ($.cookie("alu")){
      $.removeCookie("alu");
      location.reload();
      mostrarLogoInicio();
  }
}

function mostrarNavAlumnoConEjercicio(){
  $('#cerrar_sesion_dA').remove();
  $('#ejercicios_dA').remove();
  $('#resultados_dA').remove();

  var cadena='<li id="abandonarP"><a href="#" onclick="abandonarEjercicio()"><span class="glyphicon glyphicon-log-out"></span>SALIR EJERCICIO</a></li>';

  $('#btnLogin').append(cadena);
}

function abandonarEjercicio(){
  if ($.cookie("alu")){
    rest.abandonarEjercicio();
      var alu=JSON.parse($.cookie("alu"));
      var nick=alu.nickAlumno;
      $('#mostrarDatosAlumno').remove();
      mostrarPantallaAlumnoIniciada(nick);
      $('#inicio_d').show();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


