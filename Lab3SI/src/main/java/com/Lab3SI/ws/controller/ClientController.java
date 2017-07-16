package com.Lab3SI.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.Lab3SI.ws.bd.SerieProfileDAO;
import com.Lab3SI.ws.bd.SerieWatchDAO;
import com.Lab3SI.ws.bd.UsuarioDAO;
import com.Lab3SI.ws.model.SerieProfile;
import com.Lab3SI.ws.model.SerieWatchList;
import com.Lab3SI.ws.model.Usuario;

@RestController
public class ClientController {
	
	@Autowired
	UsuarioDAO usuarioDAO;
	@Autowired
	SerieWatchDAO serieWatchDAO;
	@Autowired
	SerieProfileDAO serieProfileDAO;
	

    
    @CrossOrigin
	@RequestMapping (method=RequestMethod.GET, value="/getWatchSeries/{id}", produces="application/json")
	public List<SerieWatchList> getWatchSeriesById(@PathVariable String id) {
		System.out.println("get watch series");
		return serieWatchDAO.getAllSeriesById(id);
	}

    @CrossOrigin
	@RequestMapping (method=RequestMethod.GET, value="/getProfileSeries/{id}", produces="application/json")
	public List<SerieProfile> getProfileSeriesById(@PathVariable String id) {
		System.out.println("get profile series");
		return serieProfileDAO.getAllSeriesById(id);
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
    
    @CrossOrigin
 	@RequestMapping (method=RequestMethod.POST, value="/saveWatch")
 	public SerieWatchList saveWatch(@RequestBody SerieWatchList serie) {
     	System.out.println("salvarSerie");
     	return serieWatchDAO.salvarSerie(serie);
     	
 	}
    
    @CrossOrigin
 	@RequestMapping (method=RequestMethod.POST, value="/saveProfile")
 	public SerieProfile saveProfile(@RequestBody SerieProfile serie) {
     	System.out.println("salvarSerie");
     	System.out.println(serie.getPlot());
     	return serieProfileDAO.salvarSerie(serie);
     	
 	}

    
}
