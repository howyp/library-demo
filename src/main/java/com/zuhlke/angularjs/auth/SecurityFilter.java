package com.zuhlke.angularjs.auth;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;
import com.zuhlke.angularjs.staff.StaffService;

@WebFilter("/api/*")
public class SecurityFilter implements Filter {

	final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);
	
	@Inject 
	private StaffService staffService;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
				
		String authz = req.getHeader("Authorization");
		
		if (authz == null) {
			resp.sendError(401);
			return;
		}
		
		String authzToken = authz.substring(6);
		String[] credentials = new String(Base64.decodeBase64(authzToken.getBytes())).split(":");
		logger.info("authz credentials {} {}", credentials[0], credentials[1]);
		
		Staff staff = staffService.getStaffByUsername(credentials[0]);
		if (staff == null || !staff.getPassword().equals(credentials[1])) {
			resp.sendError(401);
			return;
		}

		request.setAttribute("currentUser", staff);
	
		chain.doFilter(request, response);

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}

	
	
}
