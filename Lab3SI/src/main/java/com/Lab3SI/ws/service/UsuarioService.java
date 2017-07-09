package com.Lab3SI.ws.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Lab3SI.ws.model.Usuario;

@Service
public class UsuarioService {
	
	private Map<String, Usuario> usuarios = new HashMap<>();
	
	public Usuario cadastrar(Usuario usuario) {
		return this.usuarios.put(usuario.getEmail(), usuario);
	}
	
	public Usuario buscar(String email) {
		return this.usuarios.get(email);
	}
	

}
