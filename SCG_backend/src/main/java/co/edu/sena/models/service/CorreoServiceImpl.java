package co.edu.sena.models.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class CorreoServiceImpl implements CorreoService{

	@Autowired
	JavaMailSender javaMailSender;
	
	@Override
	public void enviarCorreoPrueba() {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("kaitocrv2gmail.com");
        message.setTo("kaitocrv2@gmail.com");
        message.setSubject("Prueba envio email simple");
        message.setText("este es el contenido del email");
        javaMailSender.send(message);
		
	}
	
	/*@Override
	public void enviarCorreoRecuperacion(String correo, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(kaitocrv2@gmail.com);
        message.setSubject("Recuperación de Contraseña");
        message.setText("Para cambiar su contraseña, use el siguiente token: " + token);
        javaMailSender.send(message);
		
	}*/

}
