package com.Lab3SI.ws.bd;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.Lab3SI.ws.model.SerieProfile;
import com.Lab3SI.ws.model.SerieWatchList;

@Repository
@Transactional
public class SerieProfileDAO {
	
	@PersistenceContext
	private EntityManager em;
	
	public SerieProfile salvarSerie(SerieProfile serie) {
	    em.persist(serie);
	    return serie;
	}

	public List<SerieProfile> getAllSeriesById(String id) {
		TypedQuery<SerieProfile> query = (TypedQuery<SerieProfile>) em.createNamedQuery("findSerieProfileByIdUser");
	    query.setParameter("id", id);
	    return query.getResultList();
	}

}
