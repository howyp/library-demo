package com.zuelke.angularjs.auth;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.zuhlke.angularjs.auth.SecurityFilter;
import com.zuhlke.angularjs.model.Staff;
import com.zuhlke.angularjs.staff.StaffService;

@RunWith(MockitoJUnitRunner.class)
public class SecurityFilterTest {

	@Mock HttpServletRequest request;
	@Mock HttpServletResponse response;
	@Mock FilterChain chain;
	@Mock StaffService staffService;
	
	@InjectMocks SecurityFilter filter = new SecurityFilter();
	
	@Test
	public void shouldReturn401ForMissingCredentials() throws Exception {
		
		when(request.getHeader("Authorization")).thenReturn(null);
		
		filter.doFilter(request, response, chain);
		
		verify(response).sendError(401);
		
	}
	

	@Test
	public void shouldReturnStaffForValidUser() throws Exception {
		
		Staff staff = new Staff("neil", "password", "Neil");
		
		when(request.getHeader("Authorization")).thenReturn("Basic bmVpbDpwYXNzd29yZA==");
		when(staffService.getStaffByUsername("neil")).thenReturn(staff);
		
		filter.doFilter(request, response, chain);
		
		verify(request).setAttribute("currentUser", staff);
		verify(chain).doFilter(request, response);
		
	}
	
	@Test
	public void shouldReturn401ForInvalidUser() throws Exception {
		
		when(request.getHeader("Authorization")).thenReturn("Basic bmVpbDpwYXNzd29yZA==");
		when(staffService.getStaffByUsername("neil")).thenReturn(null);
		
		filter.doFilter(request, response, chain);
		
		verify(response).sendError(401);
		
	}
	
	@Test
	public void shouldReturn401ForInvalidPassword() throws Exception {
		
		Staff staff = new Staff("neil", "pwd", "Neil");
		
		when(request.getHeader("Authorization")).thenReturn("Basic bmVpbDpwYXNzd29yZA==");
		when(staffService.getStaffByUsername("neil")).thenReturn(staff);
		
		filter.doFilter(request, response, chain);
		
		verify(response).sendError(401);

	}
	
	
}
