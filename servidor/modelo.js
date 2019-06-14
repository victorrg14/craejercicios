var _=require("underscore");
var cf=require("./cifrado.js");
var dao=require("./dao.js");
var moduloEmail=require("./email.js");
  
  
function Juego(){
      
    this.profesores=[];
    this.alumnos=[];
    this.ejercicios=[];
    this.dao=new dao.Dao();
  
  	////////////////////////////// CRA SEDE \\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.agregarCRA=function(nombre,callback){
  		var ju=this;
        this.dao.encontrarCRACriterio({nombre:nombre},function(cra){
            if(!cra){
                ju.dao.insertarCRA({nombre:nombre},function(usu){
                    callback({nombre:'ok'});
                });
            }
            else{
                callback({nombre:undefined});
            }
        });
  	}

  	this.obtenerTodosCRA=function(callback){
        var ju=this;
            ju.dao.obtenerTodosCRA(function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }

    ////////////////////////////// CENTRO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.agregarCentro=function(nombre,cra,callback){
  		var ju=this;
        this.dao.encontrarCentroCriterio({nombre:nombre},function(cen){
            if(!cen){
                ju.dao.insertarCentro({nombre:nombre,cra:cra},function(usu){
                    callback({nombre:'ok'});
                });
            }
            else{
                callback({nombre:undefined});
            }
        });
  	}

  	this.obtenerTodosCentros=function(callback){
        var ju=this;
            ju.dao.obtenerTodosCentros(function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }
  
    ///////////////////////////// PROFESOR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
    this.obtenerProfesor=function(id){
        return this.profesores[id];
    }
 
    this.obtenerTodosProfesores=function(callback){
        var ju=this;
            ju.dao.obtenerTodosProfesores(function(lista){
                if (lista){
                                    
                    callback(lista);
                         
                    }
                else{
                    callback([]);
                }
            });
    }
      
    this.registrarProfesor=function(email,clave,callback){
        var ju=this;
        var claveCifrada=cf.encrypt(clave);
        var key=(new Date().valueOf()).toString();
  
  
        this.dao.encontrarProfesorCriterio({email:email},function(pro){
            if(!pro){
                
                ju.dao.insertarProfesor({email:email,clave:claveCifrada,key:key,confirmada:false},function(usu){
                      
                    moduloEmail.enviarEmail(email,key,"Haz click aqui para confirmar la cuenta");
                    callback({email:'ok'});
                });
            }
            else{
                callback({email:undefined});
            }
        });
    }
  
  
    this.confirmarProfesor=function(email,key,callback){
        var ju=this;
        this.dao.encontrarProfesorCriterio({email:email,key:key,confirmada:false},function(pro){
            if(pro){
                pro.confirmada=true;
                  
                ju.dao.modificarColeccionProfesores(pro,function(data){
  
                    callback({res:"ok"}); 
                });
                  
            }
            else{
                callback({res:"no ok"})
            }
        });
    }
  
    this.enviarClave=function(email,callback){
        var ju=this;
        this.dao.encontrarProfesorCriterio({email:email},function(pro){
            if(pro){
                var key=(new Date().valueOf()).toString();
                pro.confirmada=false;
                pro.key=key;
                pro.clave=cf.encrypt('');
                ju.dao.modificarColeccionProfesores(pro,function(usu){
                    moduloEmail.enviarEmailRecordar(email,key,"Por favor, haz click aquí y cambie su contraseña una vez dentro"); 
                    moduloEmail.enviarEmailAddor('victorrubengomezgarcia@gmail.com',"Hay un nuevo profesor: "+pro.email);        
                    callback({email:'ok'});
                });
            }
            else{
                callback({email:undefined});
            }
        });
    }
  
    this.loginProfesor=function(email,pass,callback){
        var ju=this;
        var passCifrada=cf.encrypt(pass);
        this.dao.encontrarProfesorCriterio({email:email,clave:passCifrada,confirmada:true},function(pro){
            if (pro){                   
                callback(pro);
                ju.agregarProfesor(new Profesor(pro));
                }
            else{
                callback({email:undefined});
            }
        });
    }
  
    this.agregarProfesor=function(profesor){
        profesor.juego=this;
        this.profesores[profesor._id]=profesor;
    }
  
    this.actualizarProfesor=function(nuevo,callback){
        var oldC=cf.encrypt(nuevo.oldpass);
        var newC=cf.encrypt(nuevo.newpass);
        var pers=this.dao;
  
        this.dao.encontrarProfesorCriterio({email:nuevo.email},function(pro){ 
            if(pro){
                if (oldC==pro.clave && nuevo.newpass!="" && nuevo.newpass==nuevo.newpass2){
                    pro.clave=newC;
  
                    pers.modificarColeccionProfesores(pro,function(nusu){
                        console.log("Profesor modificado");
                          
                        callback({_id:pro._id,email:nuevo.email,oldC:oldC, clave:pro.clave});
                    });
                }
                else{
                    callback({_id:pro._id,email:nuevo.email,oldC:oldC,clave:pro.clave});
                }
            }
            else{
                callback({email:undefined});    
            }
        });
    }
  
    this.eliminarProfesor=function(pid,callback){
        var json={'resultados':-1};
          
            this.dao.eliminarProfesor(pid,function(result){
                if (result.result.n==0){
                    console.log("No se pudo eliminar de profesores");
                }
                else{
                    json={"resultados":1};
                    console.log("Profesor eliminado de profesores");
                    callback(json);
                }
            }); 
          
    }
  
    ///////////////////////////// ALUMNO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
    this.agregarAlumno=function(alumno){                
        alumno.juego=this;
        this.alumnos[alumno._id]=alumno;
    }
  
    this.obtenerAlumno=function(id){
        return this.alumnos[id];
    }
 
    this.obtenerTodosAlumnos=function(callback){
        var ju=this;
        ju.dao.obtenerTodosAlumnos(function(lista){
            if (lista){                                    
                callback(lista);     
                }
            else{
                callback([]);
            }
        });
    }

    this.registrarAlumno=function(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro,callback){
        var ju=this;
        var claveCifrada=cf.encrypt(clave);
  
        this.dao.encontrarAlumnoCriterio({nickAlumno:nickAlumno},function(alu){
            if(!alu){
                ju.dao.insertarAlumno({nickAlumno:nickAlumno,clave:claveCifrada,curso:curso,nombre:nombre,apellidos:apellidos,edad:edad,genero:genero,ate:ate,centro:centro},function(usu){
                    callback({nickAlumno:'ok'});
                });
            }
            else{
                callback({nickAlumno:undefined});
            }
        });
    }
  
    this.loginAlumno=function(nickAlumno,pass,callback){
        var ju=this;
        var passCifrada=cf.encrypt(pass);
        this.dao.encontrarAlumnoCriterio({nickAlumno:nickAlumno,clave:passCifrada},function(alu){
            if (alu){                   
                callback(alu);
                ju.agregarAlumno(new Alumno(alu));      
                }
            else{
                callback({nickAlumno:undefined});
            }
        });
    }
  
    this.actualizarAlumno=function(nuevo,callback){
        var newNombre=nuevo.nombre;
        var newApellidos=nuevo.apellidos;
        var newNick=nuevo.nick;
        var newEdad=nuevo.edad;
        var newGenero=nuevo.genero;
        var newCurso=nuevo.curso;
        var newAte=nuevo.ate;
        var newCentro=nuevo.centro;
        var clave1=cf.encrypt(nuevo.clave);

        var pers=this.dao;
  
        this.dao.encontrarAlumnoCriterio({nickAlumno:nuevo.nickAlumno},function(alu){ 
            if(alu){
                if(nuevo.edad!=""){
                    alu.edad=newEdad;
                }
                if(nuevo.curso!=""){
                    alu.curso=newCurso;
                }
                if(nuevo.ate!=""){
                    alu.ate=newAte;
                }
                if(nuevo.centro!=""){
                    alu.centro=newCentro;
                }
                if(nuevo.clave!=""){
                    alu.clave=clave1;
                }
                pers.modificarColeccionAlumnos(alu,function(nalu){
                       console.log("Alumno modificado");
                       callback({_id:alu._id,nickAlumno:nuevo.nickAlumno,clave:alu.clave,curso:alu.curso});
                });
            }
            else{
                callback({nickAlumno:undefined});   
            }
        });
    }
  
    this.actualizarEjercicio=function(nuevo,callback){

        var pers=this.dao;
        var nombreN=nuevo.nombre;
        var textoN=nuevo.texto;
        var respuestaN=nuevo.respuesta;
        var dificultadN=nuevo.dificultad;
        this.dao.encontrarEjercicioCriterio({nombre:nombreN},function(ejer){
            if(ejer){
                if (nuevo.texto!=""){
                    ejer.texto=textoN;
                }
                if (nuevo.respuesta!=""){
                    ejer.respuesta=respuestaN;
                }
                if (nuevo.dificultad!=""){
                    ejer.dificultad=dificultadN;
                }
                pers.modificarColeccionEjercicios(ejer,function(nejer){
                       console.log("Ejercicio modificado");
                       callback(ejer);
                });
            }
            else{
                callback({nombre:undefined});    
            }
        });
    }       
    this.eliminarAlumno=function(aid,callback){
        var json={'resultados':-1};
          
            this.dao.eliminarAlumno(aid,function(result){
                if (result.result.n==0){
                    console.log("No se pudo eliminar de alumnos");
                }
                else{
                    json={"resultados":1};
                    console.log("Alumno eliminado de alumnos");
                    callback(json);
                }
            }); 
          
    }
  
    ///////////////////////////// EJERCICIO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
    this.agregarEjercicio=function(ejercicio){
        this.ejercicios.push(ejercicio);
    } 
    this.crearEjercicio=function(idprofesor,email,nombre,texto,respuesta,dificultad,callback){
        var ju=this;
        var cb=callback;
        //var emailProfesor=profesor.email;
        var ejercicio=new Ejercicio(nombre,texto,respuesta,dificultad);        
        this.dao.encontrarEjercicioCriterio({nombre:nombre},function(ejer){
            if(!ejer){           
                ejercicio.uProfesor=idprofesor;
                ejercicio.emailProfesor=email;
                //ejer.uProfesorNombre = ju.obtenerProfesor(idprofesor);
                console.log("Datos profesores" + idprofesor);
                ju.dao.insertarEjercicio(ejercicio,function(eje){
                    cb(eje._id);

                });                
            }
            else{
                cb(-1);
            }
        });
    }

    this.actualizarEjercicio=function(nuevo,callback){

        var pers=this.dao;
        var nombreN=nuevo.nombre;
        var textoN=nuevo.texto;
        var respuestaN=nuevo.respuesta;
        var dificultadN=nuevo.dificultad;
        this.dao.encontrarEjercicioCriterio({nombre:nombreN},function(ejer){
            if(ejer){
                if (nuevo.texto!=""){
                    ejer.texto=textoN;
                }
                if (nuevo.respuesta!=""){
                    ejer.respuesta=respuestaN;
                }
                if (nuevo.dificultad!=""){
                    ejer.dificultad=dificultadN;
                }
                pers.modificarColeccionEjercicios(ejer,function(nejer){
                       console.log("Ejercicio modificado");
                       callback(ejer);
                });
            }
            else{
                callback({nombre:undefined});    
            }
        });
    }       
    this.obtenerEjercicios=function(callback){
        var ju=this;
            ju.dao.obtenerEjercicios(function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }

    this.obtenerEjerciciosProfesor=function(idprofesor,callback){
        var ju=this;
            this.dao.obtenerEjerciciosCriterio({uProfesor:idprofesor},function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }
  
    this.eliminarEjercicio=function(eid,callback){
        var json={'resultados':-1};
        var ju=this;
            this.dao.eliminarEjercicio(eid,function(result){
                if (result.result.n==0){
                    console.log("No se pudo eliminar ejercicio");
                }
                else{
                    json={"resultados":1};
                    console.log("Ejercicio eliminado");
                    callback(json);
                }
            }); 
    }

    this.eliminarEjercicioId=function(idProfesor,idEjercicio,callback){
        var json={'resultados':-1};
        var ju=this;
            this.dao.obtenerEjerciciosCriterio({_id:idEjercicio,uProfesor:idProfesor},function(result){
                ju.dao.eliminarEjercicio(idEjercicio,function(result){
                if (result.result.n==0){
                    console.log("No se pudo eliminar ejercicio");
                }
                else{
                    json={"resultados":1};
                    console.log("Ejercicio eliminado");
                    callback(json);
                }
                
            }); 
        });
    }
  
  	this.asignarEjercicio=function(alumno,nombre,callback){
  		 var ju=this;
  		 var cb=callback;
         alumno.noJuega();
         alumno.eliminarEjercicio();      
        this.dao.encontrarEjercicioCriterio({nombre:nombre},function(ejer){
            if(ejer){           
                
                cb(ejer);
                
                alumno.ejercicio=new Ejercicio(ejer.nombre, ejer.texto, ejer.respuesta,ejer.dificultad);
                alumno.ejercicio._id=ejer._id;
                alumno.aciertos=0;
                alumno.fallos=0;
                console.log("id "+ejer._id);
                console.log("alumno Ejercicio "+alumno.ejercicio._id);
                ejer.usuariosEjercicio.push(alumno);
                console.log(ejer.usuariosEjercicio);
                alumno.puedeJugar();

                console.log("Se ha unido un alumno al ejercicio");      
            }
            else{
                cb(-1);
                console.log("No se pudo unir al ejercicio");
            }
        });
  	}


  	////////////////////////// EJERCICIOS REALIZADOS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  	this.ejercicioAcabado=function(nickAlumno,ejercicio,aciertos,fallos,fecha,callback){
  		this.agregarEjercicioAcabado({nickAlumno:nickAlumno,ejercicio:ejercicio,aciertos:aciertos,fallos:fallos,fecha:fecha});
  		callback('ok');
  	}
  	this.agregarEjercicioAcabado=function(res){
  		var ju=this;
  		this.dao.insertarEjercicioAcabado(res,function(eje){
  			if(eje){
  				console.log("Resultado del ejercicio insertado");
  			}
  			else{
  				console.log("Problemas al insertar");
  			}
  		})
  	}
  	this.obtenerEjerciciosAcabados=function(callback){
        var ju=this;
            ju.dao.obtenerEjerciciosAcabados(function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }

    this.obtenerEjerciciosAcabadosNombre=function(nombre,callback){
        var ju=this;
            this.dao.obtenerEjerciciosAcabadosCriterio({ejercicio:nombre},function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }

    this.obtenerEjerciciosAcabadosNick=function(nick,callback){
        var ju=this;
            this.dao.obtenerEjerciciosAcabadosCriterio({nickAlumno:nick},function(lista){
                if (lista){
                    callback(lista);      
                    }
                else{
                    callback([]);
                }
            });
 
    }
    this.conectar=function(callback){
        this.dao.conectar(function(db){
            callback("Conectado a la base de datos");
        });
    }
}
  
function Ejercicio(nombre, texto, respuesta, dificultad){
    this.nombre=nombre;
    this._id=undefined;
    this.texto=texto;
    this.posiciones=undefined;
    this.dificultad=dificultad;
    this.respuesta=respuesta;
    this.usuariosEjercicio=[];
    this.uProfesor=[];
    this.emailProfesor=[];
 
    this.contadorPosiciones=function(){
        var textoDividido=texto.split("@");
        posiciones=textoDividido.length;
    }
 
    this.contadorRespuesta=function(){
        var textoRespuestaDividido;
        textoRespuestaDividido=respuesta.split(" ");
        return textoRespuestaDividido;
    }
 
    this.checkAnswer=function(respuestaUsuario,alumno){
        var respuestaDividida;
        var respuestaDivididaAlumno=respuestaUsuario;
        var indice=0;
        respuestaDividida = this.contadorRespuesta();
        respuestaDivididaAlumno = respuestaDivididaAlumno.split(" ");
        if(respuestaDividida.length>respuestaDivididaAlumno.length){
            indice=respuestaDividida.length;
        }
        else{
            indice=respuestaDivididaAlumno.length;
        }
        for(var i=0;i<indice;i++){
            this.checkResultado(respuestaDividida[i],respuestaDivididaAlumno[i], alumno);
        }
        
    }
 
    this.checkResultado=function(respuestaDividida, respuestaDivididaAlumno, alumno){
        console.log("respuesta profe"+respuestaDividida);
        console.log("respuesta Alumno"+respuestaDivididaAlumno)
        if(respuestaDividida==respuestaDivididaAlumno){
            alumno.contadorAciertos(this);
        }
        else{
            alumno.contadorFallos(this);
        }

    }

    this.abandonarEjercicio=function(alu){
    	this.finPartida(alu);
        

    }

    this.finPartida=function(alu){
    	console.log("El ejercicio ha terminado");
        alu.noJuega();
        alu.eliminarEjercicio();
        
    }
 
}
 
function SiJuega(){
    this.elegirRespuesta=function(alu,respuesta){
        alu.puedeElegirRespuesta(respuesta);
    }
    this.juego=function(){ 
        return true;
    }
    this.tocaJugar=function(alu){
        console.log("estas jugando ya");
    }
}
 
function NoJuega(){
    this.tocaJugar=function(alu){
        console.log("Puedes jugar");
        alu.juega=new SiJuega();
    }
    this.elegirRespuesta=function(alu,respuesta){
        console.log("No estas en ningun ejercicio");
    }
    this.juego=function(){
        return false;
    }
}
 
  
function Profesor(usr){
    this._id=usr._id;
    this.juego=undefined;
    this.email=usr.email;
    this.ejerciciosCreados=[];
      
    this.crearEjercicio=function(nombre,texto,respuesta,dificultad,callback){
        this.juego.crearEjercicio(this._id,this.email,nombre,texto,respuesta,dificultad,function(id){
            callback(id)
        });
    }
    this.registrarAlumno=function(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro,callback){
        this.juego.registrarAlumno(nickAlumno,clave,curso,nombre,apellidos,edad,genero,ate,centro,function(res){
            callback(res);
        })
    }
    this.eliminarEjercicio=function(idEjercicio,callback){
        this.juego.eliminarEjercicioId(this._id,idEjercicio,function(result){
            callback(result);
        });
    }

    this.eliminarAlumno=function(idAlumno,callback){
        this.juego.eliminarAlumno(idAlumno,function(result){
            callback(result);
        });
    }
    this.actualizarEjercicio=function(nuevo,callback){
        this.juego.actualizarEjercicio(nuevo,function(result){
            callback(result);
        });
    }
    this.actualizarAlumno=function(nuevo,callback){
        this.juego.actualizarAlumno(nuevo,function(result){
            callback(result);
        });
    }
    this.obtenerEjerciciosProfesor=function(callback){
        this.juego.obtenerEjerciciosProfesor(this._id,function(id){
            callback(id);
        });
    }
    this.obtenerEjerciciosAcabadosNombre=function(nombre,callback){
        this.juego.obtenerEjerciciosAcabadosNombre(nombre,function(id){
            callback(id);
        })
    }

    this.obtenerEjerciciosAcabadosNick=function(nick,callback){
        this.juego.obtenerEjerciciosAcabadosNick(nick,function(id){
            callback(id);
        })
    }

    this.agregarEjercicio=function(ejercicio){
        this.ejerciciosCreados.push(ejercicio);
    }
  
}
  
function Alumno(usr){
    this.nickAlumno=usr.nickAlumno;
    this._id=usr._id;
    this.juego=undefined;
    this.ejercicio=undefined;
    this.curso=usr.curso;
    this.nombre=usr.nombre;
    this.apellidos=usr.apellidos;
    this.edad=usr.edad;
    this.genero=usr.genero;
    this.ate=usr.ate
    this.centro=usr.centro;
    this.respuesta=[];
    this.juega=new NoJuega();
    this.aciertos=0;
    this.fallos=0;
    
 
    this.asignarEjercicio=function(ejercicio){
        this.ejercicio=ejercicio;
        console.log("ejercicio"+this.ejercicio)
        this.aciertos=0;
        this.fallos=0;
    }

    this.obtenerEjerciciosAcabados=function(callback){
        this.juego.obtenerEjerciciosAcabadosNick(this.nickAlumno,function(id){
            callback(id);
        });
    }

    this.asignarEjerciciosRealizados=function(ejercicio){
        this.ejercicioRealizados.push(ejercicio);

    } 
    this.eligeEjercicio=function(nombre,callback){
        return this.juego.asignarEjercicio(this,nombre,function(id){
        	callback(id);
        });
    }
 
    this.puedeJugar=function(){
        this.juega.tocaJugar(this);
        console.log("he llegado");
    }
    this.puedeElegirRespuesta=function(respuesta){
        console.log("he llegado aqui2");
        this.ejercicio.checkAnswer(respuesta,this);
    }
    this.elegirRespuesta=function(respuesta){
    	this.juega.elegirRespuesta(this,respuesta);
        console.log("he llegado aqui");
    }
    this.contadorAciertos=function(ejercicio){
    	this.aciertos++;
        console.log("aciertos:"+this.aciertos);
    }
    this.contadorFallos=function(ejercicio){
    	this.fallos++;
        console.log("fallos:"+this.fallos);
    }
    this.abandonarEjercicio=function(){
        console.log("ejercicio"+this.ejercicio);
    	this.ejercicio.abandonarEjercicio(this);
    }
    this.comprobarRespuestas=function(){
        this.ejercicio.checkAnswer(respuesta,this)
    }
    this.eliminarEjercicio=function(){
        this.ejercicio=undefined;
        console.log("ejercicio"+this.ejercicio);
    }
    this.noJuega=function(){
        this.juega=new NoJuega();
    }
  
}
  
  
  
module.exports.Juego=Juego;
module.exports.Profesor=Profesor;
module.exports.Alumno=Alumno;
module.exports.SiJuega=SiJuega;
module.exports.NoJuega=NoJuega;

