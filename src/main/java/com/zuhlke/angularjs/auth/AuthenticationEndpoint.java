package com.zuhlke.angularjs.auth;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/authenticate")
public class AuthenticationEndpoint {

	final Logger logger = LoggerFactory.getLogger(AuthenticationEndpoint.class);
	
	@POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> authenticate(LoginForm loginForm, @Context HttpServletRequest request) {
		try {
			String username = loginForm.getUsername();
			String password = loginForm.getPassword();
			request.login(username, password);
			return Collections.singletonMap("authToken", new AuthenticationToken(username, password).toEncyptedToken());
			
		} catch (Exception e) {
			logger.warn("failed login attempt", e);
			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
		}
	}
	
}
