package com.zuhlke.angularjs.auth;

import java.io.IOException;

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

@WebFilter("/api/*")
public class SecurityFilter implements Filter {

	final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);
	
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
			req.login(token.getUsername(), token.getPassword()); // or via an internal service?
			chain.doFilter(request, response);
		
		} catch (AuthenticationException e) {
			// failed to decrypt token, sending UNAUTHORIZED
			resp.sendError(401);
			
		} catch (ServletException e) {
			// login failed, sending FORBIDDEN
			resp.sendError(403);
		}
		
		
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}

	
	
}
