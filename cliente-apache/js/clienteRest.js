//Este objeto se va a encargar de la comunicación con el servidor REST
// aqui habria que poner registro e inicio sesion, de momento tenemos agregar usuario
var url="https://craejercicios.herokuapp.com";
//var url="http://localhost:5000";
function ClienteRest(){


  ////////////////////////////// COMPROBAR USUARIO \\\\\\\\\\\\\\\\\\\


  this.comprobarAlumno=function(usrid,nickAlumno){
    $.getJSON(url+"/comprobarAlumno/"+usrid,function(data){ 
      //console.log(data.ejercicio);
      //console.log(data.nombreEjercicio);   
    if (data.ejercicio){
      // Alumnos con ejercicio
          console.log(data);

        }
       
    else{
        console.log(data);
      }
      }); 
  }

  
    ////////////////////////////// OBTENER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  

    this.obtenerEjercicios=function(){
        $.getJSON(url+"/obtenerEjercicios",function(data){ 
            console.log(data);
  
            if(data.length>0){
                //mostrarListaEjercicios(data);
                //console.log(data);
                app.mostrarListaEjercicios(data);
  
            }          
        });
    }
 
    this.obtenerProfesores=function(){
        $.getJSON(url+"/obtenerProfesores",function(data){ 
            console.log(data);
  
            if(data.length>0){
                //mostrarListaEjercicios(data);
                console.log(data);
  
            }              
              
        });
    }
 
    this.obtenerAlumnos=function(){
        $.getJSON(url+"/obtenerAlumnos",function(data){ 
            console.log(data);
  
            if(data.length>0){
                //mostrarListaEjercicios(data);
                console.log(data);
            }
                           
        });
    }

    this.obtenerEjerciciosAcabados=function(){
      var uid;
      if (window.localStorage.getItem('alu')!=undefined){
        var alu=JSON.parse(window.localStorage.getItem('alu'));
        uid=alu._id;
      }
      if(uid!=undefined){
        $.getJSON(url+"/obtenerEjerciciosAcabados/"+uid,function(data){           
            app.mostrarResultados(data);
            //console.log(data);
        });
      }else{
        console.log("Debes de iniciar sesion");
      }
    }

    ////////////////////////////// ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  
    this.registrarAlumno=function(nickAlumno,clave,curso){
      $.ajax({
        type:'POST',
        url:url+'/registrarAlumno/',
        data:JSON.stringify({nickAlumno:nickAlumno,clave:clave,curso:curso}),
        success:function(data){
          if (!data.nickAlumno){
            //console.log("No se ha podido registrar");
            $('#existeAlumno').remove();
            var cadena='<p id="existeAlumno" style="color:red;">Existe un alumno con ese nick</p>';
            $('#registro').append(cadena); 
          }
          else{  
            //console.log("Se ha registrado"); 
            $('#existeAlumno').remove();
            $('#exitoRegistro').remove();
            var cadena='<p id="exitoRegistro" style="color:green;">Se ha registrado correctamente</p>';
            $('#registro').append(cadena);     
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
            url:url+'/loginAlumno',
            data:JSON.stringify({nickAlumno:nickAlumno,clave:clave}),
            success:function(data){
              if (!data.nickAlumno){
                //console.log('No se ha podido iniciar sesión');
                $('#falloInicio').remove();
                var cadena='<p id="falloInicio" style="color:red;">Datos incorrectos</p>';
                $('#cajita').append(cadena);
              }
              else{     

                //console.log("Alumno ha iniciado sesión: "+data.nickAlumno);
                window.localStorage.setItem("alu",JSON.stringify(data));
                $('#formlogin').remove();

                app.pantallaAlumno();
                $("#mobile-nav").show();
                $("#navSide").show(); 
                
              }
             },
            contentType:'application/json',
            dataType:'json'
        });

    }
  
  
    this.actualizarAlumno=function(oldpass,newpass,newpass2){
      var alu=JSON.parse(window.localStorage.getItem('alu'));
     $.ajax({
        type:'PUT',
        url:url+'/actualizarAlumno', // index.js
        data:JSON.stringify({uid:alu._id,nickAlumno:alu.nickAlumno,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
        success:function(data){
          if (!data.nickAlumno){
            //console.log("mostrarRegistro: ");
          }
          else{
            window.localStorage.setItem("alu",JSON.stringify(data));
             
            if(data.oldC!=alu.clave){
                console.log("contraseña incorrecta: ");
            }
            else{
                console.log("contraseña cambiada: ");
            }
          }
          },
        contentType:'application/json',
        dataType:'json'
      });
    }
  
  
    this.eliminarAlumno=function(){
      var alu=JSON.parse(window.localStorage.getItem('alu'));
      $.ajax({
        type:'DELETE',
        url:url+'/eliminarAlumno/'+alu._id,//$.cookie("uid"), // index.js
        data:'{}',
        success:function(data){
          if (data.resultados==1)
          {
            console.log("Alumno correctamente eliminado: ");
            window.localStorage.removeItem("alu");
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
    
    this.elegirEjercicio=function(nombreEjercicio){
      var uid;
      if (window.localStorage.getItem('alu')!=undefined){
        var alu=JSON.parse(window.localStorage.getItem('alu'));
        uid=alu._id;
      }
      if(uid!=undefined){
        $.getJSON(url+"/elegirEjercicio/"+uid+"/"+nombreEjercicio,function(data){           
            console.log("Ejercicio elegido correctamente:"+nombreEjercicio);
            
        });
      }else{
        console.log("No se ha podido elegir ejercicio");
      }
    }

    this.abandonarEjercicio=function(){
        var alu=JSON.parse(window.localStorage.getItem('alu'));
        $.ajax({
            type:'POST',
            url:url+'/abandonarEjercicio/'+alu._id,
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
        var alumno=JSON.parse(window.localStorage.getItem('alu'));
        $.ajax({
            type:'POST',
            url:url+'/elegirRespuesta/'+alumno._id,
            data:JSON.stringify({respuesta:respuesta}),
            success:function(data){
              if (data.aid==-1){
                console.log("No se ha podido responder ejercicio");

              }
              else{   
                console.log("Ejercicio respondido correctamente");
                var textoSeparado=data.textoEjercicio.split("@");
                console.log("texto en ElegirRespuesta "+data.textoEjercicio);
                var nRespuestas=textoSeparado.length-1;
                
                app.mostrarAciertosFallos(data.aciertos,data.fallos,nRespuestas,data.nombreEjercicio,
                  data.textoEjercicio,data.respuestaEjercicio,data.ejercicio);
                   
              }
              },
            contentType:'application/json',
            dataType:'json'
          });
    }

    this.ejercicioAcabado=function(ejercicio,aciertos,fallos){
      var alumno=JSON.parse(window.localStorage.getItem('alu'));
        $.ajax({
            type:'POST',
            url:url+'/ejercicioAcabado/'+alumno._id,
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