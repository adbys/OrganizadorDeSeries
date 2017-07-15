package com.Lab3SI.ws.bd;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
	    return usuario;
	}
	
/*	public List<Usuario> consultaObjeto(String email) {
	    TypedQuery<Usuario> query = (TypedQuery<Usuario>) em.createNamedQuery("emailQuery");
	    query.setParameter("email", email);
	    System.out.println(query.getFirstResult());
	    return query.getResultList();
	}*/


	
}
