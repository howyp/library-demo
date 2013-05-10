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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;
import com.zuhlke.angularjs.staff.StaffService;

@WebFilter("/api/*")
public class SecurityFilter implements Filter {

	final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);
	
	@Inject StaffService staffService;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		// allow access to authentication service
		if (req.getRequestURI().equals(req.getContextPath() + "/api/authenticate")) {
			chain.doFilter(request, response);
			return;
		}

		// otherwise Authorisation header must be provided
		String authz = req.getHeader("Authorization");
		if (authz == null) {
			resp.sendError(401);
			return;
		}
		
		// attempt to login using encrypted credentials
		try {
			AuthenticationToken token = new AuthenticationToken(authz);
			Staff staff = staffService.getStaffByUsername(token.getUsername());
			if (!staff.getPassword().equals(token.getPassword())) {
				// invalid password, sending UNAUTHORIZED
				resp.sendError(401);
			}
			// authentication ok - add current user to request scope
			request.setAttribute("currentUser", staff);
			chain.doFilter(request, response);
		
		} catch (AuthenticationException e) {
			// failed to decrypt token, sending UNAUTHORIZED
			resp.sendError(401);
			
		}
		
		
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}

	
	
}
