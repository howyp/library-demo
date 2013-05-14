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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		
		if (req.getRequestURI().equals(req.getContextPath() + "/api/authenticate")) {
			chain.doFilter(request, response);
			return;
		}

		String authz = null;
		if (req.getCookies() != null) {
			for (Cookie c : req.getCookies()) {
				if (c.getName().equals("authToken")) {
					authz = c.getValue();
				}
			}
		}		
		
		logger.info("auth token {}", authz);
		
		if (authz == null) {
			resp.sendError(401);
			return;
		}
		
		try {
			AuthenticationToken token = new AuthenticationToken(authz);
			Staff staff = staffService.getStaffByUsername(token.getUsername());
			if (!staff.getPassword().equals(token.getPassword())) {
				resp.sendError(401);
			}
			request.setAttribute("currentUser", staff);
			chain.doFilter(request, response);
		
		} catch (AuthenticationException e) {
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
