package com.Lab3SI.ws.model;


public class Usuario {
	
	private String userName;
	private String email;
	private String password;
	
	public Usuario(String email) {
		this.email = email;
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
