package com.Lab3SI.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Lab3SI.ws.bd.UsuarioDAO;
import com.Lab3SI.ws.model.Usuario;

@RestController
public class ClientController {
	
	@Autowired
	UsuarioDAO usuarioDAO;
	
	

    @CrossOrigin
	@RequestMapping (method=RequestMethod.GET, value="/ajax", produces="application/json")
	public Usuario ajax() {
		System.out.println("chamou");
		return new Usuario();
	}
    
    @CrossOrigin
	@RequestMapping (method=RequestMethod.POST, value="/doLogin")
	public Usuario doLogin(@RequestBody Usuario usuario) {
    	Usuario retorno =  usuarioDAO.consultaUsuario((String) usuario.getEmail());
    	System.out.println(retorno);
		return retorno;
	}
    
    @CrossOrigin
 	@RequestMapping (method=RequestMethod.POST, value="/cadastrar")
 	public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
     	System.out.println("cadastro request");
     	return usuarioDAO.salvarUsuario(usuario);
     	
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
