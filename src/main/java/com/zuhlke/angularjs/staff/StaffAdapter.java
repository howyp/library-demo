package com.zuhlke.angularjs.staff;

import com.zuhlke.angularjs.model.Staff;

public class StaffAdapter {

	private Staff staff;
	
	public StaffAdapter(Staff staff) {
		this.staff = staff;
	}
	
	public String getUsername() {
		return staff.getUsername();
	}
	
	public String getName() {
		return staff.getName();
	}
	
}
