//Este objeto se va a encargar de la comunicación con el servidor REST
// aqui habria que poner registro e inicio sesion, de momento tenemos agregar usuario
function ClienteRest(){


	////////////////////////////// COMPROBAR USUARIO \\\\\\\\\\\\\\\\\\\
  var rest=this;

	this.comprobarProfesor=function(usrid,email){
    $.getJSON("/comprobarProfesor/"+usrid,function(data){    

		   	console.log(data);
		   	mostrarPantallaProfesorIniciada(data.email);
		  
	    });	
	}

	this.comprobarAlumno=function(usrid,nickAlumno){
    $.getJSON("/comprobarAlumno/"+usrid,function(data){ 
    	console.log(data.ejercicio);
    	console.log(data.nombreEjercicio);   
		if (data.ejercicio){
			// Alumnos con ejercicio
		    	console.log(data);

		    	$("#granCabecera").remove();
		    	$('#granCabeceraProfesor').remove();
		    	mostrarNavAlumno(data.nickAlumno);
		    	// 
          $('#ejercicios_dA').remove();
          $('#resultados_dA').remove();
		    	$('#configuracion_dA').remove();
		    	$('#cerrar_sesion_dA').remove();
		    	
		    	
		    	mostrarNavAlumnoConEjercicio();
		    	mostrarDatosAlumno(data.nombreEjercicio);
		    	mostrarEjercicio(data.textoEjercicio);

		    }
		    // alumnos conectados pero sin ejercicio
		else{
		   	console.log(data);
		   	mostrarPantallaAlumnoIniciada(data.nickAlumno);
		  }
	  });	
	}

  
    ////////////////////////////// OBTENER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  	this.obtenerCRA=function(){
        $.getJSON("/obtenerCRA",function(data){ 
            console.log(data); 
            if(data.length>0){
                console.log(data);
            }            
        });
    }

    this.obtenerCentros=function(){
        $.getJSON("/obtenerCentros",function(data){ 
            console.log(data);
            if(data.length>0){
                console.log(data);
            }          
        });
    }

    this.obtenerEjercicios=function(){
        $.getJSON("/obtenerEjercicios",function(data){ 
            console.log(data);
  
            if(data.length>0){
              if ($.cookie("alu")!=undefined){
	    			    var alu=JSON.parse($.cookie("alu"));
	    			    mostrarListaEjercicios(data);	
	  			    }
	  			    else if ($.cookie("pro")!=undefined){
	  				    mostrarTablaEjerciciosTodos(data);
	  			    }         
              console.log(data);
            }         
        });
    }
 
    this.obtenerProfesores=function(){
        $.getJSON("/obtenerProfesores",function(data){ 
            console.log(data);
  
            if(data.length>0){
                console.log(data);
            } 
        });
    }
 
    this.obtenerAlumnos=function(){
        $.getJSON("/obtenerAlumnos",function(data){ 
            console.log(data);
  
            if(data.length>0){
                mostrarTablaAlumnos(data);
                console.log(data);
            }    
        });
    }

    this.obtenerEjerciciosAcabados=function(){
    	var uid;
    	if ($.cookie("alu")!=undefined){
	    	var alu=JSON.parse($.cookie("alu"));
	    	uid=alu._id;
	  	}
	  	if(uid!=undefined){
	  		$.getJSON("/obtenerEjerciciosAcabados/"+uid,function(data){           
	        	mostrarTablaResultadosAlumno(data);
	    	});
	  	}else{
	  		//console.log("Debes de iniciar sesion");
	  	}
    }

  	////////////////////////////// CRA SEDE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.agregarCRA=function(nombre){
      $.ajax({
        type:'POST',
        url:'/agregarCRA/',
        data:JSON.stringify({nombre:nombre}),
        success:function(data){
          if (!data.nombre){
            console.log("No se ha podido registrar");
          }
          else{   
            console.log("Se ha agregado el CRA");     
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    ////////////////////////////// CENTRO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.agregarCentro=function(nombre,cra){
      $.ajax({
        type:'POST',
        url:'/agregarCentro/',
        data:JSON.stringify({nombre:nombre,cra:cra}),
        success:function(data){
          if (!data.nombre){
            console.log("No se ha podido registrar");
          }
          else{   
            console.log("Se ha agregado el Centro");     
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    ////////////////////////////// PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
    this.registrarProfesor=function(email,clave){
      $.ajax({
        type:'POST',
        url:'/registrarProfesor/',
        data:JSON.stringify({email:email,clave:clave}),
        success:function(data){
          if (!data.email){
            //console.log("No se ha podido registrar");
          }
          else{   
            console.log("Debes confirmar la cuenta " + data.email);
            mostrarAviso("#formRegistro","<p style='color:green;font-weight:bold;'>Confirma la cuenta en tu correo</p>");  
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
  
    this.loginProfesor=function(email,clave){
        var cli=this;
        $.ajax({
            type:'POST',
            url:'/loginProfesor',
            data:JSON.stringify({email:email,clave:clave}),
            success:function(data){
              if (!data.email){
                console.log('No se ha podido iniciar sesión');
                mostrarAviso("#formInicio","<p style='color:red;'>Datos incorrectos</p>");
              }
              else{     
              	$('#logoInicio').remove();
              	$('#formRegistro').remove();
                console.log("Profesor ha iniciado sesión: "+data.email);
                $.cookie("pro",JSON.stringify(data));
                $('.dropdown-toggle').parent().removeClass('open');
                mostrarPantallaProfesorIniciada(data.email);
              }
             },
            contentType:'application/json',
            dataType:'json'
        });
    }
  
  
    this.actualizarProfesor=function(oldpass,newpass,newpass2){
      var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'PUT',
        url:'/actualizarProfesor', // index.js
        data:JSON.stringify({uid:pro._id,email:pro.email,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
        success:function(data){
          if (!data.email){
            //console.log("mostrarRegistro: ");
          }
          else{
            $.cookie("pro",JSON.stringify(data));
             
            if(data.oldC!=pro.clave){
                console.log("contraseña incorrecta: ");
                mostrarAviso("#borrador","<p id='msg' style='color:red'>La contraseña actual no es correcta</p>");
            }
            else{
                console.log("contraseña cambiada: ");
                mostrarAviso("#borrador","<p id='msg' style='color:green'>Datos correctamente actualizados</p>");
            }
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    this.enviarClave=function(email){
      if (!email || email==""){
        mostrarLogin();
        mostrarAviso("Introduce usuario");
      }
      else{
        $.getJSON("/enviarClave/"+email,function(data){    
            if (!data.email){
              mostrarAviso("#formInicioCuadrado","<p id='msg' style='color:red'>El usuario no existe en el sistema</p>");           
            }
            else{
               
               mostrarAviso("#formInicioCuadrado","<p id='msg' style='color:green'>Le hemos enviado un correo a su cuenta</p>");
            }
          });
      }
    }
  
  
    this.eliminarProfesor=function(){
      var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'DELETE',
        url:'/eliminarProfesor/'+pro._id,
        data:'{}',
        success:function(data){
          if (data.resultados==1)
          {
           	mostrarAviso("#menu2","<p style='color:red'>Usuario correctamente eliminado</p>");
            console.log("Profesor correctamente eliminado: ");
            $.removeCookie("pro");
            	location.reload();
            	$('.well').remove();
		    	mostrarCabecera();
		    	$('#btnLogin li').remove();
		    	mostrarNavLogin();
		    	mostrarLogoInicio();

		    	$('#myModal').modal({backdrop: false});

          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
  ////////////////////// FILTROS PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  	this.obtenerEjerciciosProfesor=function(){
        var uid;
    	if ($.cookie("pro")!=undefined){
	    	var pro=JSON.parse($.cookie("pro"));
	    	uid=pro._id;
	  	}
	  	if(uid!=undefined){
	  		$.getJSON("/obtenerEjerciciosProfesor/"+uid,function(data){           
	        	console.log(data);
	        	mostrarTablaEjercicios(data);
	    	});
	  	}else{
	  		//console.log("Debes de iniciar sesion");
	  	}
    }
    

    this.obtenerEjerciciosAcabadosNombre=function(nombre){
    	var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'POST',
        url:'/obtenerEjerciciosAcabadosNombre/'+pro._id,
        data:JSON.stringify({nombre:nombre}),
        success:function(data){
          if (data.lista!=[]){
            console.log(data);
            mostrarEjerciciosAcabadosProfesor(data);
          }
          else{   
          	  console.log(data.lista)
              //console.log("Debes de iniciar sesion");
              $('#campo').remove();
              mostrarAviso("#mostrarConsultas","<p id='campo' style='color:red;font-size:1.5em;'>No existen ejercicios con ese nombre</p>");
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
    this.obtenerEjerciciosAcabadosNick=function(nick){
   	  var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'POST',
        url:'/obtenerEjerciciosAcabadosNick/'+pro._id,
        data:JSON.stringify({nick:nick}),
        success:function(data){
          if (data.lista!=[]){
            //console.log(data);
            mostrarTablaResultados(data);
          }
          else{   
          	  //console.log(data)
              //console.log("Debes de iniciar sesion");
              $('#campo').remove();
              mostrarAviso("#mostrarConsultas","<p id='campo' style='color:red;font-size:1.5em;'>No existen ejercicios con ese nombre</p>");
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    ////////////////////// GESTION ALUMNOS - PROFESOR \\\\\\\\\\\\\\\
    this.registrarAlumnoPorProfesor=function(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro){
        var profesor=JSON.parse($.cookie("pro"));
        $.ajax({
            type:'POST',
            url:'/registrarAlumnoPorProfesor/'+profesor._id,
            data:JSON.stringify({nickAlumno:nickAlumno,clave:clave,curso:curso,nombre:nombre,apellidos:apellidos,edad:edad,genero:genero,ate:ate,centro:centro}),
            success:function(data){
              if (!data.nickAlumno){
                //console.log("No se ha podido registrar");
                mostrarAviso("#formRegistroAlumnoP","<p id='msg' style='color:red;font-size:1.5em;'>Existe un alumno con ese nick</p>");
              }
              else{   
                //console.log("Se ha registrado");
                $('#myModalAlumnoRegistrado').modal();
                rest.obtenerAlumnos();       
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }

    this.eliminarAlumnoPorProfesor=function(idAlumno){
      var profesor=JSON.parse($.cookie("pro"));
      $.ajax({
          type:'DELETE',
          url:'/eliminarAlumnoPorProfesor/'+profesor._id+'/'+idAlumno,
          data:'{}',
          success:function(data){
            if (data.resultados==1)
            {
              //console.log("Alumno correctamente eliminado: ");
              mostrarAviso("#tablaAlumnos","<p style='color:red'>Alumno correctamente eliminado</p>");
              $('#myModalAlEl').modal();
              rest.obtenerAlumnos();

            }else{
              mostrarAviso("#tablaAlumnos","<p style='color:red'>Alumno no encontrado</p>");
            }
            },
          contentType:'application/json',
          dataType:'json'
        });
    }

    this.actualizarAlumnoPorProfesor=function(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro){
      var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'PUT',
        url:'/actualizarAlumnoPorProfesor/'+pro._id, 
        data:JSON.stringify({nickAlumno:nickAlumno,clave:clave,curso:curso,nombre:nombre,apellidos:apellidos,edad:edad,genero:genero,ate:ate,centro:centro}),
        success:function(data){
          if (!data.nickAlumno){
            console.log(data.nickAlumno);
            //console.log("mostrarRegistro: ");
          }
          else{
            mostrarAviso("#formActualizarAlumno","<p style='color:green'>Alumno correctamente actualizado</p>");
            //console.log("Ejercicio actualizado");
             $('#myModalAlumnoActualizado').modal();
             rest.obtenerAlumnos();
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    ////////////////////////////// ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  
    this.registrarAlumno=function(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro){
      $.ajax({
        type:'POST',
        url:'/registrarAlumno/',
        data:JSON.stringify({nickAlumno:nickAlumno,clave:clave,curso:curso,nombre:nombre,apellidos:apellidos,edad:edad,genero:genero,ate:ate,centro:centro}),
        success:function(data){
          if (!data.nickAlumno){
            //console.log("No se ha podido registrar");
            mostrarAviso("#formRegistroAlumno","<p id='exito' style='color:red;font-size:1.5em;'>Ya existe alguien con ese nick</p>");    
          }
          else{   
            //console.log("Se ha registrado"); 
            mostrarAviso("#formRegistroAlumno","<p id='exito' style='color:#449D43;font-size:1.5em;'>Alumno registrado correctamente</p>");    
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
  
    this.loginAlumno=function(nickAlumno,clave){
        var cli=this;
        $.ajax({
            type:'POST',
            url:'/loginAlumno',
            data:JSON.stringify({nickAlumno:nickAlumno,clave:clave}),
            success:function(data){
              if (!data.nickAlumno){
                //console.log('No se ha podido iniciar sesión');
                mostrarAviso("#formInicioAlumno","<p style='color:red;'>Datos incorrectos</p>");
              }
              else{     
                $('#logoInicio').remove();
              	$('#formRegistroAlumno').remove();
                console.log("Alumno ha iniciado sesión: "+data.nickAlumno);
                $.cookie("alu",JSON.stringify(data));
                $('.dropdown-toggle').parent().removeClass('open');
                mostrarPantallaAlumnoIniciada(data.nickAlumno);
              }
             },
            contentType:'application/json',
            dataType:'json'
        });
    }
  
  
    this.actualizarAlumno=function(oldpass,newpass,newpass2){
      var alu=JSON.parse($.cookie("alu"));
      $.ajax({
        type:'PUT',
        url:'/actualizarAlumno',
        data:JSON.stringify({uid:alu._id,nickAlumno:alu.nickAlumno,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
        success:function(data){
          if (!data.nickAlumno){
            //console.log("mostrarRegistro: ");
          }
          else{
            $.cookie("alu",JSON.stringify(data));
             
            if(data.oldC!=alu.clave){
                //console.log("contraseña incorrecta: ");
                mostrarAviso("#menu1A","<p id='msg' style='color:red'>La contraseña actual no es correcta</p>");
            }
            else{
                //console.log("contraseña cambiada: ");
                mostrarAviso("#menu1A","<p id='msg' style='color:green'>Datos correctamente actualizados</p>");
            }
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
  
    this.eliminarAlumno=function(){
      var alu=JSON.parse($.cookie("alu"));
      $.ajax({
        type:'DELETE',
        url:'/eliminarAlumno/'+alu._id,
        data:'{}',
        success:function(data){
          if (data.resultados==1)
          {
            mostrarAviso("#menu2A","<p style='color:red'>Usuario correctamente eliminado</p>");
            //console.log("Alumno correctamente eliminado: ");
            $.removeCookie("alu");
              location.reload();
              $('.well').remove();
		      mostrarCabecera();
		      $('#btnLogin li').remove();
		      mostrarNavLogin();
		      mostrarLogoInicio();

		      $('#myModal').modal({backdrop: false});

          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
 
 
 
     ////////////////////////////// EJERCICIO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     
    this.crearEjercicio=function(nombre,texto,respuesta,dificultad){
        var profesor=JSON.parse($.cookie("pro"));
        $.ajax({
            type:'POST',
            url:'/crearEjercicio/'+profesor._id,
            data:JSON.stringify({nombre:nombre,texto:texto,respuesta:respuesta,dificultad:dificultad}),
            success:function(data){
              if (data.ejercicioId==-1){
                console.log("No se ha podido crear ejercicio");
                mostrarAviso("#mostrarSolucion","<p style='color:red;font-size:1.5em;'>No se ha podido crear ejercicio, coincide el nombre</p>");
              }
              else{   
                console.log("Ejercicio creado correctamente"); 
                mostrarAviso("#mostrarSolucion","<p style='color:#449D43;font-size:1.5em;'>Ejercicio creado correctamente</p>");
                $('#myModalEjercicioCreado').modal();
                rest.obtenerEjerciciosProfesor();  
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }
 	
   	this.eliminarEjercicio=function(idEjercicio){
   		var profesor=JSON.parse($.cookie("pro"));
   		$.ajax({
          type:'DELETE',
          url:'/eliminarEjercicio/'+profesor._id+'/'+idEjercicio,//$.cookie("uid"), // index.js
          data:'{}',
          success:function(data){
            if (data.resultados==1)
            {
              console.log("Ejercicio correctamente eliminado: ");
              mostrarAviso("#mostrarEjerciciosProfesor","<p style='color:red'>Ejercicio correctamente eliminado</p>");
              $('#myModalEjerEl').modal();
              
              rest.obtenerEjerciciosProfesor();
            }else{
            	mostrarAviso("#mostrarEjerciciosProfesor","<p style='color:red'>Ejercicio no encontrado</p>");
            }
            },
          contentType:'application/json',
          dataType:'json'
        });
   	}

    this.actualizarEjercicio=function(nombre,texto,respuesta,dificultad){
      var pro=JSON.parse($.cookie("pro"));
      $.ajax({
        type:'PUT',
        url:'/actualizarEjercicio/'+pro._id, // index.js
        data:JSON.stringify({nombre:nombre,texto:texto,respuesta:respuesta,dificultad:dificultad}),
        success:function(data){
          if (!data.nombre){
            //console.log("mostrarRegistro: ");
          }
          else{
            mostrarAviso("#formActualizarEjercicioImg","<p style='color:green'>Ejercicio correctamente actualizado</p>");
            //console.log("Ejercicio actualizado");
            rest.obtenerEjerciciosProfesor();
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }

    this.elegirEjercicio=function(nombreEjercicio){
    	var uid;
    	if ($.cookie("alu")!=undefined){
	    	var alu=JSON.parse($.cookie("alu"));
	    	uid=alu._id;
	  	}
	  	if(uid!=undefined){
	  		$.getJSON("/elegirEjercicio/"+uid+"/"+nombreEjercicio,function(data){           
	        	console.log("Ejercicio elegido correctamente:"+nombreEjercicio);
	        	mostrarAviso("#menu2","<p style='color:red'>Ejercicio elegido correctamente:"+data.nombreEjercicio+"</p>");
            $('#formListaEjerciciosImg').remove();
            $('#inicio_d').hide();
	    	});
	  	}else{
	  		console.log("No se ha podido elegir ejercicio");
	  	}
    }

    this.abandonarEjercicio=function(){
        var alumno=JSON.parse($.cookie("alu"));
        $.ajax({
            type:'POST',
            url:'/abandonarEjercicio/'+alumno._id,
            data:'{}',
            success:function(data){
              if (data.aid==-1){
                console.log("No se ha podido abandonar ejercicio");

              }
              else{   
                console.log("Ejercicio abandonado correctamente");   
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }

  

    this.elegirRespuesta=function(respuesta){
        var alumno=JSON.parse($.cookie("alu"));
        $.ajax({
            type:'POST',
            url:'/elegirRespuesta/'+alumno._id,
            data:JSON.stringify({respuesta:respuesta}),
            success:function(data){
              if (data.aid==-1){
                console.log("No se ha podido responder ejercicio");

              }
              else{   
                //console.log("Ejercicio respondido correctamente");
                var textoSeparado=data.textoEjercicio.split("@");
                //console.log("texto en ElegirRespuesta "+data.textoEjercicio);
                var nRespuestas=textoSeparado.length-1;
                
                mostrarAciertosFallos(data.aciertos,data.fallos,nRespuestas,data.nombreEjercicio,
                	data.textoEjercicio,data.respuestaEjercicio,data.ejercicio);  
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }


    ///////////////////////////// EJERCICIOS ACABADOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.ejercicioAcabado=function(ejercicio,aciertos,fallos){
    	var alumno=JSON.parse($.cookie("alu"));
        $.ajax({
            type:'POST',
            url:'/ejercicioAcabado/'+alumno._id,
            data:JSON.stringify({ejercicio:ejercicio,aciertos:aciertos,fallos:fallos}),
            success:function(data){
              if (data.aid==-1){
                console.log("No se ha podido insertar ejercicio");
              }
              else{   
                console.log("Ejercicio insertado correctamente");   
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }
      
}