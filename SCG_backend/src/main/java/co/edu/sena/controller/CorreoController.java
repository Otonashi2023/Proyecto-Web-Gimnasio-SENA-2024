package co.edu.sena.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import co.edu.sena.models.service.CorreoService;

@RestController
@RequestMapping("/api/correo")
@CrossOrigin(origins= "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class CorreoController {

	@Autowired
	CorreoService correoService;
	
	@GetMapping("/send")
	public ResponseEntity<?> sendEmail(){
		correoService.enviarCorreoPrueba();
		return new ResponseEntity("Correo enviado con exito", HttpStatus.OK);
	}
}
