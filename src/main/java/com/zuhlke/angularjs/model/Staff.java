package com.zuhlke.angularjs.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity @Table(name = "staff")
public class Staff implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3128309722400571169L;

	@Id 
	@GeneratedValue(generator = "staff_id", strategy = GenerationType.TABLE)
	@TableGenerator(name = "staff_id", pkColumnValue = "staff")
	@Column(name = "staff_id")
	private Long id;
	
	@Basic(optional = false) 
	@Column(name = "username")
	private String username;
	
	@Basic(optional = false) 
	@Column(name = "password")
	private String password;
	
	@Basic(optional = false) 
	@Column(name = "name")
	private String name;
	
	Staff() {}

	public Staff(String username, String password, String name) {
		this.username = username;
		this.password = password;
		this.name = name;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return String.format("staff id: %s, username: %s, name: %s", getId(), getUsername(), getName());
	}
	
}
