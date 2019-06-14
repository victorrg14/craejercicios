var sendgrid = require("sendgrid")("xxxxxxxxxxx");
var url="https://craejercicios.herokuapp.com/";
//var url="http://127.0.0.1:5000/";


module.exports.enviarEmail=function(direccion,key,msg){


	var email = new sendgrid.Email();
	email.addTo(direccion);
	email.setFrom('victorrubengomezgarcia@gmail.com');
	email.setSubject('confirmar cuenta');
	email.setHtml('<body style="background-color:#F0F4EC; border-style: solid; border-width: medium;"> <h1 style= "font-family:courier; text-align:center;">Bienvenido a Lectocra</h1> <p style="font-family:courier; text-align:center;"> Estimado '+direccion+' confírmenos la cuenta en el siguiente enlace!</p> <p style="font-family:courier; text-align:center;"><a href="'+url+'confirmarProfesor/'+direccion+'/'+key+'">'+msg+'</a></p> <h3 style="font-family:courier; text-align:center;">LECTOCRA</h3> </body>');

	sendgrid.send(email);	
}

module.exports.enviarEmailRecordar=function(direccion,key,msg){


	var email = new sendgrid.Email();
	email.addTo(direccion);
	email.setFrom('victorrubengomezgarcia@gmail.com');
	email.setSubject('Recordar contraseña');
	email.setHtml('<body style="background-color:#889CCF; border-style: solid; border-width: medium;"> <h1 style= "font-family:courier; text-align:center; font-weight:bold;">Recordar Contraeña</h1> <p style="font-family:courier; text-align:center;"> Estimado '+direccion+' ahora puede iniciar sesión sin contraeña</p> <p style="font-family:courier; text-align:center; font-weight:bold; color:red;"><a href="'+url+'confirmarProfesor/'+direccion+'/'+key+'">'+msg+'</a></p> <h3 style="font-family:courier; text-align:center;">LECTOCRA</h3> </body>');

	sendgrid.send(email);	
}

module.exports.enviarEmailAddor=function(direccion,msg){
	var email = new sendgrid.Email();
	email.addTo(direccion);
	email.setFrom('victorrubengomezgarcia@gmail.com');
	email.setSubject('Recordar contraseña');
	email.setHtml('<p>'+msg+'</p>');
	sendgrid.send(email);	
}


