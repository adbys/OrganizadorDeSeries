package com.Lab3SI.ws.model;


public class Usuario {
	
	private String userName;
	private String email;
	private String password;
	
	
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
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}


}
