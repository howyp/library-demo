package com.zuhlke.angularjs.staff;

import javax.inject.Inject;
import javax.ws.rs.Path;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/staff")
public class StaffEndpoint {

	final Logger logger = LoggerFactory.getLogger(StaffEndpoint.class);

	@Inject
	private StaffService staffService;


}
