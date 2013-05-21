package com.zuhlke.angularjs.auth;

import com.zuhlke.angularjs.model.Staff;

public class StaffAdapter {

	private Staff staff;
	
	public StaffAdapter(Staff staff) {
		this.staff = staff;
	}
	
	public long getId() {
		return staff.getId();
	}
	
	public String getUsername() {
		return staff.getUsername();
	}
	
	public String getName() {
		return staff.getName();
	}
	
}
