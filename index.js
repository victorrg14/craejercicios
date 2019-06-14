var fs=require("fs");

var bodyParser=require("body-parser");
var exp=require("express");
var app=exp();
var server = require('http').Server(app);
var io = require('socket.io').listen(server); 
  
var modelo = require("./servidor/modelo.js"); 
  
var juego = new modelo.Juego(); //cuando se inicia el servidor se crea una instancia de juego
app.set('port', (process.env.PORT || 5000));
app.use(exp.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
  
juego.conectar(function(cadena){
    console.log(cadena);
});
  
  
app.get('/',function(request, response) {
    //Esto lo hacemos para que cargue el archivo index.html 
    //cuando se conecten a nuestro servidor Web.
     var contenido=fs.readFileSync("./cliente/index-bs.html"); 
     response.setHeader("Content-type","text/html");
     response.send(contenido); 
});

app.get('/movil',function(request, response) {
    //Esto lo hacemos para que cargue el archivo index.html 
    //cuando se conecten a nuestro servidor Web.
     var contenido=fs.readFileSync("./cliente-apache/index.html"); 
     response.setHeader("Content-type","text/html");
     response.send(contenido); 
});
  
//////////////////////// COMPROBAR USUARIO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get("/comprobarProfesor/:usrid",function(request,response){
    

    var usrid=request.params.usrid;
    var profesor=juego.obtenerProfesor(usrid);
    var json={"email":undefined}
    if (profesor){
        json={"email":profesor.email};
    }
    response.send(json);
});

app.get("/comprobarAlumno/:usrid",function(request,response){

    var usrid=request.params.usrid;
    var alumno=juego.obtenerAlumno(usrid);
    var json;
    if (alumno){
        json={"nickAlumno":alumno.nickAlumno,"ejercicio":alumno.ejercicio};
        console.log(json.ejercicio);
        if(alumno.ejercicio!=undefined){
            json.nombreEjercicio=alumno.ejercicio.nombre;
            json.textoEjercicio= alumno.ejercicio.texto;
        }
        console.log(json.nickAlumno + json.ejercicio + json.nombreEjercicio +json.textoEjercicio);
    }
    response.send(json);
});

 
/////////////////////////// OBTENER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/obtenerCRA', function(request, response) {
    juego.obtenerTodosCRA(function(lista){
        response.send(lista);
    })
});

app.get('/obtenerCentros', function(request, response) {
    juego.obtenerTodosCentros(function(lista){
        response.send(lista);
    })
});
 
app.get('/obtenerEjercicios', function(request, response) {
    juego.obtenerEjercicios(function(lista){
        response.send(lista);
    })
});

app.get('/obtenerEjerciciosProfesor/:uid', function(request, response) {
    var uid=request.params.uid;
    var profesor=juego.obtenerProfesor(uid);
    if(profesor){
        profesor.obtenerEjerciciosProfesor(function(lista){
            response.send(lista);
        })
    }
    else{
        response.send({'lista':[]});
    }
});

app.get('/obtenerEjerciciosAcabados/:uid', function(request, response) {
    var uid=request.params.uid;
    var alumno=juego.obtenerAlumno(uid);
    if(alumno){
        alumno.obtenerEjerciciosAcabados(function(result){
            response.send(result);
        })
    }else{
        response.send({'resultados':[]});
    }
});

app.post('/obtenerEjerciciosAcabadosNombre/:uid', function(request, response) {
    var uid=request.params.uid;
    var nombre=request.body.nombre;
    var profesor=juego.obtenerProfesor(uid);
    if(profesor){
        profesor.obtenerEjerciciosAcabadosNombre(nombre,function(lista){
            response.send(lista);
        })
    }
    else{
        response.send({'lista':[]});
    }
});

app.post('/obtenerEjerciciosAcabadosNick/:uid', function(request, response) {
    var uid=request.params.uid;
    var nick=request.body.nick;
    var profesor=juego.obtenerProfesor(uid);
    if(profesor){
        profesor.obtenerEjerciciosAcabadosNick(nick,function(lista){
            response.send(lista);
        })
    }
    else{
        response.send({'lista':[]});
    }
});
 
app.get('/obtenerProfesores', function(request, response) {
    juego.obtenerTodosProfesores(function(lista){
        response.send(lista);
    })
});
 
app.get('/obtenerAlumnos', function(request, response) {
    juego.obtenerTodosAlumnos(function(lista){
        response.send(lista);
    })
});



/////////////////////////// CRASEDE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/agregarCRA', function(request, response) {
    var nombre=request.body.nombre;
  
    juego.agregarCRA(nombre,function(data){
        response.send(data);
    });
  
});

/////////////////////////// CENTRO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/agregarCentro', function(request, response) {
    var nombre=request.body.nombre;
    var cra=request.body.cra;
  
    juego.agregarCentro(nombre,cra,function(data){
        response.send(data);
    });
  
});
  
/////////////////////////// PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
app.post('/registrarProfesor', function(request, response) {
    var email=request.body.email;
    var clave=request.body.clave;
    if(!clave){
        clave="";
    }
  
    //response.send({email:"ok"});
    juego.registrarProfesor(email,clave,function(data){
        response.send(data);
    });
  
});
  
app.post('/loginProfesor',function(request,response){
    var email=request.body.email;
    var clave=request.body.clave;    
      
    juego.loginProfesor(email,clave,function(data){
         response.send(data);
     });
});
  
app.put("/actualizarProfesor",function(request,response){
    
    juego.actualizarProfesor(request.body,function(result){
  
            response.send(result);
    });
});

app.get('/enviarClave/:email',function(request,response){
    var email=request.params.email;
    juego.enviarClave(email,function(data){
        response.send(data);
    })
});

  
app.delete("/eliminarProfesor/:pid",function(request,response){
    var pid=request.params.pid;
  
    juego.eliminarProfesor(pid,function(result){
        response.send(result);
    });
});
  
  
app.get("/confirmarProfesor/:email/:key",function(request,response){
    var email=request.params.email;
    var key=request.params.key;
  
    juego.confirmarProfesor(email,key,function(data){
        response.redirect("/");
    });
});
  

//////////////////////// GESTION ALUMNOS - PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\
  
app.post('/registrarAlumnoPorProfesor/:usrid', function(request, response) {
    var nickAlumno=request.body.nickAlumno;
    var clave=request.body.clave;
    var curso=request.body.curso;
    var nombre = request.body.nombre;
    var apellidos = request.body.apellidos;
    var edad = request.body.edad;
    var genero = request.body.genero;
    var ate = request.body.ate;
    var centro = request.body.centro;

    var usrid=request.params.usrid;
    var profesor=juego.obtenerProfesor(usrid);
    console.log(" profe  "+ profesor);
    if (profesor){
        profesor.registrarAlumno(nickAlumno,clave,curso,nombre, apellidos, edad, genero, ate,centro, function(data){
            response.send(data);
        });
    }
  
});

app.delete("/eliminarAlumnoPorProfesor/:usrid/:aid",function(request,response){
    var usrid=request.params.usrid;
    var aid=request.params.aid;
    var profesor=juego.obtenerProfesor(usrid);
     if(profesor){
        profesor.eliminarAlumno(aid,function(result){
            response.send(result);
        });
    }
});

app.put("/actualizarAlumnoPorProfesor/:usrid",function(request,response){
  
    var usrid=request.params.usrid;
    var profesor=juego.obtenerProfesor(usrid);
    if(profesor){
        profesor.actualizarAlumno(request.body,function(result){
            response.send(result);
        });
    }
});

  
/////////////////////////////// ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  
  
app.post('/registrarAlumno', function(request, response) {
    var nickAlumno=request.body.nickAlumno;
    var clave=request.body.clave;
    var curso=request.body.curso;
    var nombre = request.body.nombre;
    var apellidos = request.body.apellidos;
    var edad = request.body.edad;
    var genero = request.body.genero;
    var ate = request.body.ate;
    var centro = request.body.centro;
    juego.registrarAlumno(nickAlumno,clave,curso,nombre, apellidos, edad, genero, ate, centro, function(data){
        response.send(data);
    });
  
});
  
app.post('/loginAlumno',function(request,response){
    var nickAlumno=request.body.nickAlumno;
    var clave=request.body.clave;    
      
    juego.loginAlumno(nickAlumno,clave,function(data){
         response.send(data);
     });
});
  
app.put("/actualizarAlumno",function(request,response){
    juego.actualizarAlumno(request.body,function(result){
  
            response.send(result);
    });
});

app.delete("/eliminarAlumno/:aid",function(request,response){
    var aid=request.params.aid;
  
    juego.eliminarAlumno(aid,function(result){
        response.send(result);
    });
});
  
  
  
  
  
  
////////////////////////////// EJERCICIOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
 
app.post('/crearEjercicio/:usrid', function(request, response) {
    var nombre=request.body.nombre;
    var texto=request.body.texto; 
    var respuesta=request.body.respuesta;
    var dificultad=request.body.dificultad;
    var usrid=request.params.usrid;
    var profesor=juego.obtenerProfesor(usrid);
    console.log(" profe  "+ profesor);
    var ejercicioId=-1;
    if (profesor){
        profesor.crearEjercicio(nombre,texto,respuesta,dificultad,function(id){
            response.send({"ejercicioId":id});
        });
    }
});

app.put("/actualizarEjercicio/:usrid",function(request,response){
    var usrid=request.params.usrid;
    var profesor=juego.obtenerProfesor(usrid);
    if(profesor){
        profesor.actualizarEjercicio(request.body,function(result){
            response.send(result);
        });
    }
});
 
app.delete("/eliminarEjercicio/:usrid/:eid",function(request,response){
    var usrid=request.params.usrid;
    var eid=request.params.eid;
    var profesor=juego.obtenerProfesor(usrid);
     if(profesor){
        profesor.eliminarEjercicio(eid,function(result){
            response.send(result);
        });
    }
});
  
  
  
  
app.get("/elegirEjercicio/:usrid/:nombre",function(request,response){
    var usrid=request.params.usrid;
    var ejercicio=request.params.nombre;
    //var usr=juego.usuarios[usrid]; 
    var alumno=juego.obtenerAlumno(usrid);
    console.log(" alumno  "+ alumno);
    var ejercicioId=-1;
    if (alumno){
        alumno.eligeEjercicio(ejercicio,function(id){
             response.send({"ejercicioId":id,"nombreEjercicio":ejercicio});
        });
    }
    
});

app.post("/abandonarEjercicio/:usrid",function(request,response){

    var usrid=request.params.usrid;
    var alumno=juego.obtenerAlumno(usrid);
    if(alumno){
        alumno.abandonarEjercicio();
        response.send({"aid":alumno._id});
    }
    else{
        response.send({'ejercicio':-1});
    }


});
  
////////////////////////////// EJERCICIOS ACABADOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/ejercicioAcabado/:usrid',function(request,response){
    
    var ejercicio=request.body.ejercicio;
    var aciertos=request.body.aciertos;
    var fallos=request.body.fallos;
    var usrid=request.params.usrid;
    var alumno=juego.obtenerAlumno(usrid);
    var date=new Date();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var fecha = (day<10 ? '0' : '') + day + '/' + (month<10 ? '0' : '') + month + '/' +date.getFullYear();

    if(alumno){
        juego.ejercicioAcabado(alumno.nickAlumno,ejercicio,aciertos,fallos,fecha,function(ejercicio){
            response.send({"aid":usrid,"aciertos":aciertos,"fallos":fallos,"ejercicio":ejercicio});
        });
    }
    else{
        response.send({'ejercicio':-1});
    }

});

/////////////////////////// RESPUESTAS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/elegirRespuesta/:usrid', function(request, response) {
    var usrid   = request.params.usrid;
    var respuesta = request.body.respuesta
    var alumno     = juego.obtenerAlumno(usrid)
    if (alumno){
        alumno.fallos=0;
        alumno.aciertos=0;
        alumno.elegirRespuesta(respuesta)
        response.send({"aid":alumno._id,"aciertos":alumno.aciertos,"fallos":alumno.fallos,"nombreEjercicio":alumno.ejercicio.nombre,
            "textoEjercicio":alumno.ejercicio.texto,"respuestaEjercicio":alumno.ejercicio.respuesta,"ejercicio":alumno.ejercicio});
    }
    else{
        response.send({"aid":-1});
    }
  
});
  
//sirven para lanzar los dos servidores (Web y WebSocket)
server.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
 });