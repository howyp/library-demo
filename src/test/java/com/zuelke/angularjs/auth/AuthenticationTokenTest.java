package com.zuelke.angularjs.auth;

import org.junit.Assert;
import org.junit.Test;

import com.zuhlke.angularjs.auth.AuthenticationToken;

public class AuthenticationTokenTest {

	@Test
	public void should_encrypt_and_decrypt_credentials() throws Exception {
		String username = "username";
		String password = "password";
		
		String authToken = new AuthenticationToken(username, password).toEncyptedToken();
		
		AuthenticationToken token = new AuthenticationToken(authToken);
		
		Assert.assertEquals(username, token.getUsername());
		Assert.assertEquals(password, token.getPassword());
		
	}
}
