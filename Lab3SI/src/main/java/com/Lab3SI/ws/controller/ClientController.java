package com.Lab3SI.ws.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Lab3SI.ws.model.Usuario;

@RestController
public class ClientController {
	
	private Map<String, Usuario> usuarios = new HashMap<>();
	
	private Usuario cadastrar(Usuario usuario) {
		return this.usuarios.put(usuario.getEmail(), usuario);
	}
	
	private Usuario buscar(String email) {
		return this.usuarios.get(email);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/usuario",
					consumes=MediaType.APPLICATION_JSON_VALUE,
					produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
			Usuario usuarioCadastrado = this.cadastrar(usuario);
		
		return new ResponseEntity<Usuario>(usuarioCadastrado, HttpStatus.CREATED);
		
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/usuario/{email}",
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> buscarUsuario(@PathVariable String email) {
		Usuario usuarioBuscado = this.buscar(email);
		
		if (usuarioBuscado == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			
			return new ResponseEntity<Usuario>(usuarioBuscado, HttpStatus.OK);
		}
		
	
	}

}
