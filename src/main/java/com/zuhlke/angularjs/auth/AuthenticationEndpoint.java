package com.zuhlke.angularjs.auth;

import java.util.Collections;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;
import com.zuhlke.angularjs.staff.StaffService;

@Path("/authenticate")
public class AuthenticationEndpoint {

	final Logger logger = LoggerFactory.getLogger(AuthenticationEndpoint.class);
	
	@Inject StaffService staffService;
	
	@PUT @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> authenticate(LoginForm loginForm, @Context HttpServletRequest request) {
		Staff staff = staffService.getStaffByUsername(loginForm.getUsername());
		if (!staff.getPassword().equals(loginForm.getPassword())) {
			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
		}
		try {
			AuthenticationToken token = new AuthenticationToken(staff.getUsername(), staff.getPassword());
			return Collections.singletonMap("authToken", token.toEncyptedToken());

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	
	}
	
}
