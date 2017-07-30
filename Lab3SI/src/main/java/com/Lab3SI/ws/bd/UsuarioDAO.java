package com.Lab3SI.ws.bd;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;

import com.Lab3SI.ws.model.Usuario;

@Repository
@Transactional
public class UsuarioDAO {

	@PersistenceContext
	private EntityManager em;
	
	public Usuario salvarUsuario(Usuario usuario) {
		em.persist(usuario);
		System.out.println("Usuario Salvo");
		return usuario;
	}
	
	public Usuario consultaUsuario(String email) {
	    TypedQuery<Usuario> query = (TypedQuery<Usuario>) em.createNamedQuery("findUserByEmail");
	    query.setParameter("email", email);
	    System.out.println(query);
	    return query.getSingleResult();
	}


	
}
