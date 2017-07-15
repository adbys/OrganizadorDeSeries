package com.Lab3SI.ws.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Lab3SI.ws.model.ObjetoTeste;
import com.Lab3SI.ws.model.Usuario;
//import com.Lab3SI.ws.service.UsuarioService;

@RestController
public class ClientController {
	
//	@Autowired
//	UsuarioService usuarioService;
    @CrossOrigin
	@RequestMapping (method=RequestMethod.GET, value="/ajax", produces="application/json")
	public Usuario ajax() {
		System.out.println("chamou");
		return new Usuario();
	}
    
    @CrossOrigin
	@RequestMapping (method=RequestMethod.POST, value="/doLogin")
	public Usuario doLogin(@RequestBody Usuario json) {
    	System.out.println("login request");
    	Usuario usuario = new Usuario();
    	System.out.println(json.getEmail());
    	if(json.getEmail().equalsIgnoreCase("teste")) {
    		System.out.println("emailteste");
    		usuario.setEmail("asdasdsa");
    	}
    	usuario.setPassword("teste1");
    	usuario.setUserName("teste1");
    	
		return usuario;
	}
    

/*	@RequestMapping(method=RequestMethod.POST, value="/usuario",
					consumes=MediaType.APPLICATION_JSON_VALUE,
					produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
			Usuario usuarioCadastrado = usuarioService.cadastrar(usuario);
		
		return new ResponseEntity<Usuario>(usuarioCadastrado, HttpStatus.CREATED);
		
	}*/
	
//	@RequestMapping(method=RequestMethod.GET, value="/usuario/{email}",
//			produces=MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<Usuario> buscarUsuario(@PathVariable String email) {
		//Usuario usuarioBuscado = usuarioService.buscar(email);
		
	//	if (usuarioBuscado == null) {
		//	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		} else {
			
	//		return new ResponseEntity<Usuario>(usuarioBuscado, HttpStatus.OK);
//		}
		
	
//	}

}
