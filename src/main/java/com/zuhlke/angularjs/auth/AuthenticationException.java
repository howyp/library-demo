package com.zuhlke.angularjs.auth;

public class AuthenticationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AuthenticationException(String msg, Throwable t) {
		super(msg, t);
	}
	
}
