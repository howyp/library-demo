package com.zuhlke.angularjs.staff;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Staff;

@Named @Stateless
public class StaffService {

	final Logger logger = LoggerFactory.getLogger(StaffService.class);
	
	@PersistenceContext
	private EntityManager entityManager;

	@PostConstruct
	public void init() {
		// for demo application create staff on start up
		createStaff("neil", "password", "Neil Moorcroft");
		createStaff("lynne", "password", "Lynne Johnson");
		createStaff("kev", "password", "Kevin Denver");
		
	}
	
	public Staff getStaffByUsername(String username) {
		try {
			return (Staff) entityManager
					.createQuery("select s from Staff s where s.username = :username")
					.setParameter("username", username)
					.getSingleResult();

		} catch (NoResultException nre) {
			return null;
		}
		
	}

	public void createStaff(String username, String password, String name) {
		entityManager.persist(new Staff(username, password, name));
	}
	
}
