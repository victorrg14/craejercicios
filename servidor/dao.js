var mongo=require("mongodb").MongoClient;
var ObjectID=require("mongodb").ObjectID;

function Dao(){
    this.profesores=undefined;
    this.alumnos=undefined;
    this.ejercicios=undefined;
    this.ejerciciosAcabados=undefined;
    this.crasede=undefined;
    this.centros=undefined;

    this.encontrarProfesor=function(email,callback){
        encontrar(this.profesores,{email:email},callback);
    };

    this.encontrarAlumno=function(nickAlumno,callback){
        encontrar(this.alumnos,{nickAlumno:nickAlumno},callback);
    };

    this.encontrarEjercicio=function(nombre,callback){
        encontrar(this.ejercicios,{nombre:nombre},callback);
    };

    this.encontrarProfesorCriterio=function(criterio,callback){
        encontrar(this.profesores,criterio,callback);
    };
    this.encontrarAlumnoCriterio=function(criterio,callback){
        encontrar(this.alumnos,criterio,callback);
    };
    this.encontrarEjercicioCriterio=function(criterio,callback){
        encontrar(this.ejercicios,criterio,callback);
    };
    this.encontrarCRACriterio=function(criterio,callback){
        encontrar(this.crasede,criterio,callback);
    }
    this.encontrarCentroCriterio=function(criterio,callback){
        encontrar(this.centros,criterio,callback);
    }

    function encontrar(coleccion,criterio,callback){ // funcion privada que usan las otras publicas
        coleccion.find(criterio).toArray(function(error,usr){
            if (usr.length==0){
                callback(undefined);    
            }
            else{
                callback(usr[0]);
                
            }
        });
    };

    this.insertarProfesor=function(usu,callback){
        insertar(this.profesores,usu,callback);
    }
    this.insertarAlumno=function(usu,callback){
        insertar(this.alumnos,usu,callback);
    }
    this.insertarEjercicio=function(ejer,callback){
        insertar(this.ejercicios,ejer,callback);
    }
    this.insertarEjercicioAcabado=function(res,callback){
        insertar(this.ejerciciosAcabados,res,callback);
    }
    this.insertarCRA=function(res,callback){
        insertar(this.crasede,res,callback);
    }
    this.insertarCentro=function(res,callback){
        insertar(this.centros,res,callback);
    }

     function insertar(coleccion,obj,callback){
        coleccion.insertOne(obj,function(err,result){
            if(err){
                console.log("error");
            }
            else{
                console.log("Nuevo elemento creado: "+obj);
                callback(obj);
            }
        });
    }
    
    this.eliminarProfesor=function(pid,callback){
 
       eliminar(this.profesores,{_id:ObjectID(pid)},callback);
    }

    this.eliminarAlumno=function(aid,callback){
 
       eliminar(this.alumnos,{_id:ObjectID(aid)},callback);
    }

    this.eliminarEjercicio=function(eid,callback){
 
       eliminar(this.ejercicios,{_id:ObjectID(eid)},callback);
    }

    function eliminar(coleccion,criterio,callback){
        coleccion.remove(criterio,function(err,result){
            if(!err){
                callback(result);
            }
        });
    }


    this.modificarColeccionProfesores=function(usr,callback){
        modificarColeccion(this.profesores,usr,callback);
    }

    this.modificarColeccionAlumnos=function(usr,callback){
        modificarColeccion(this.alumnos,usr,callback);
    }
    this.modificarColeccionEjercicios=function(ejer,callback){
        modificarColeccion(this.ejercicios,ejer,callback);
    }


    function modificarColeccion(coleccion,usr,callback){
        coleccion.findAndModify({_id:ObjectID(usr._id)},{},usr,{},function(err,result){
            if (err){
                console.log("No se pudo actualizar (método genérico)");
            }
            else{     
                console.log("Actualizado"); 
            }
            //database.close(); //PARA HEROKU COMENTADO, PARA TEST: parche para los test que no se quede enganchado
            callback(result);
        });
    }

    this.obtenerEjercicios=function(callback){
        obtener(this.ejercicios,callback);
    }

    this.obtenerTodosProfesores=function(callback){
        obtener(this.profesores,callback);
    }

    this.obtenerTodosAlumnos=function(callback){
        obtener(this.alumnos,callback);
    }
    this.obtenerTodosCRA=function(callback){
        obtener(this.crasede,callback);
    }
    this.obtenerTodosCentros=function(callback){
        obtener(this.centros,callback);
    }

    function obtener(coleccion,callback){
        coleccion.find().toArray(function(error,col){
            callback(col);
        })
    }

    this.obtenerEjerciciosAcabados=function(callback){
        obtenerEjerciciosAcabados(this.ejerciciosAcabados,callback);
    }

    function obtenerEjerciciosAcabados(coleccion,callback){
        coleccion.find().toArray(function(error,col){
            callback(col);
            
        })
    }

    this.obtenerEjerciciosCriterio=function(criterio,callback){
        obtenerCriterio(this.ejercicios,criterio,callback);
    };

    this.obtenerEjerciciosAcabadosCriterio=function(criterio,callback){
        obtenerCriterio(this.ejerciciosAcabados,criterio, callback)
    }

    function obtenerCriterio(coleccion,criterio,callback){
        coleccion.find(criterio).toArray(function(error,col){
            callback(col);
        })
    }

	this.conectar=function(callback){
        var dao=this;
        mongo.connect("xxxxxxxxxxxxxxxxxxxxx",{useNewUrlParser:true},function(err, database) {
            if (err){
                console.log("No pudo conectar a la base de datos")
            }
            else{
                console.log("conectado a Mongo Mlab");
        
                database.db("craejercicios").collection("cra",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección cra");
                        dao.crasede=col;   
                    }
                    
                });

                database.db("craejercicios").collection("centros",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección centros");
                        dao.centros=col;   
                    }
                    
                });

                database.db("craejercicios").collection("profesores",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección profesores");
                        dao.profesores=col;   
                    }
                    
                });

                database.db("craejercicios").collection("alumnos",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección alumnos");
                        dao.alumnos=col;   
                    }
                    
                });

                database.db("craejercicios").collection("ejerciciosr",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección ejercicios");
                        dao.ejercicios=col;   
                    }
                    
                });
                database.db("craejercicios").collection("ejerciciosAcabados",function(err,col){
                    if (err){
                        console.log("No pude obtener la coleccion")
                    }
                    else{       
                        console.log("tenemos la colección ejerciciosAcabados");
                        dao.ejerciciosAcabados=col;   
                    }
                    
                });
                
                callback(database);
            }
        });
    }

}

module.exports.Dao=Dao;