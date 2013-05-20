package com.zuhlke.angularjs.auth;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;
import com.zuhlke.angularjs.staff.StaffService;

@Path("/authenticate")
public class AuthenticationEndpoint {

	final Logger logger = LoggerFactory.getLogger(AuthenticationEndpoint.class);
	
	@Inject 
	private StaffService staffService;
	
	@POST @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
	public Response authenticate(LoginForm loginForm, @Context HttpServletRequest request) {

		Staff staff = staffService.getStaffByUsername(loginForm.getUsername());
		
		if (staff == null || !staff.getPassword().equals(loginForm.getPassword())) {
			throw new WebApplicationException(Response.Status.UNAUTHORIZED);
		}
		
		try {
			AuthenticationToken token = new AuthenticationToken(staff.getUsername(), staff.getPassword());
			return Response.ok().cookie(new NewCookie("authToken", token.toEncyptedToken())).build();

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new WebApplicationException(Response.Status.INTERNAL_SERVER_ERROR);
		}
	
	}
	
}

