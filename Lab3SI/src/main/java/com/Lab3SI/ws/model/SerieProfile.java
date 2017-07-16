package com.Lab3SI.ws.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NamedQueries;
import org.hibernate.annotations.NamedQuery;

@NamedQueries({  
	@NamedQuery(
	name = "findSerieProfileByIdUser",
	query = "from serieProfile serieProfile where serieProfile.ownerId = :id"
	),
	@NamedQuery(
	name = "findSerieProfileById",
	query = "from serieProfile serieProfile where serieProfile.imdbId = :id"
	)
})
@Entity(name = "serieProfile")
@Table(name = "tb_serieProfile")
public class SerieProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String ownerId;
	@Column
	private String poster;
	@Column
	private String title;
	@Column
	private String imdbId;
	@Column(columnDefinition = "VARCHAR(600)")
	private String plot;
	@Column
	private String rated;
	@Column
	private String imdbRating;
	@Column
	private String classificacao;
	@Column
	private String episodio;

	public String getImdbId() {
		return this.imdbId;
	}
	
	public void setImdbId(String id) {
		this.imdbId = id;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPlot() {
		return plot;
	}
	public void setPlot(String plot) {
		this.plot = plot;
	}
	public String getRated() {
		return rated;
	}
	public void setRated(String rated) {
		this.rated = rated;
	}
	public String getImdbRating() {
		return imdbRating;
	}
	public void setImdbRating(String imdbRating) {
		this.imdbRating = imdbRating;
	}
	public String getClassificacao() {
		return classificacao;
	}
	public void setClassificacao(String classificacao) {
		this.classificacao = classificacao;
	}
	public String getEpisodio() {
		return episodio;
	}
	public void setEpisodio(String episodio) {
		this.episodio = episodio;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((imdbId == null) ? 0 : imdbId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SerieProfile other = (SerieProfile) obj;
		if (imdbId == null) {
			if (other.imdbId != null)
				return false;
		} else if (!imdbId.equals(other.imdbId))
			return false;
		return true;
	}
	

}
