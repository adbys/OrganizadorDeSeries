package com.Lab3SI.ws.model;


public class Usuario {
	
	private String userName;
	private String email;
	private String password;
	
	public Usuario(String nome, String email, String senha) {
		this.email = email;
		this.userName = nome;
		this.password = senha;
	}
	
	
	public String getUserName() {
		return this.userName;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setPassword(String newPassword) {
		this.password = newPassword;
	}


}
