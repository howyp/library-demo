package com.zuhlke.angularjs.auth;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;

@Path("/authenticate")
public class AuthenticationEndpoint {

	final Logger logger = LoggerFactory.getLogger(AuthenticationEndpoint.class);
	
	@GET @Produces(MediaType.APPLICATION_JSON)
	public StaffAdapter authenticate(@Context HttpServletRequest request) {
		Staff staff = (Staff) request.getAttribute("currentUser");
		return new StaffAdapter(staff);
	}
	
}

