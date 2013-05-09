package com.zuhlke.angularjs.model;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity @Table(name = "member")
public class Member implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4385853346788015259L;

	@Id 
	@GeneratedValue(generator = "member_id", strategy = GenerationType.TABLE)
	@TableGenerator(name = "member_id", pkColumnValue = "member")
	@Column(name = "member_id")
	private Long id;
	
	@Basic(optional = false) 
	@Column(name = "membership_number")
	private String membershipNumber;
	
	@Basic(optional = false) 
	@Column(name = "name")
	private String name;
	
	@Basic(optional = false) 
	@Column(name = "address")
	private String address;
	
	@Basic(optional = false) 
	@Column(name = "age")
	private Integer age;

	Member() {}

	public Member(String name) {
		this.name = name;
	}
	
	public Long getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getMembershipNumber() {
		return membershipNumber;
	}
	
	public void setMembershipNumber(String membershipNumber) {
		this.membershipNumber = membershipNumber;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}
	
	@Override
	public String toString() {
		return String.format("member id: %s, name: %s, membership number: %s", getId(), getName(), getMembershipNumber());
	}
	
}
