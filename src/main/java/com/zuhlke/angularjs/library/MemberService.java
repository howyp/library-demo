package com.zuhlke.angularjs.library;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Member;

@Named @Stateless
public class MemberService {
	
	final Logger logger = LoggerFactory.getLogger(MemberService.class);
	
	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Member> getMembers() {
		return em.createQuery("select m from Member m order by m.name").getResultList();
	}
	
	public Member getMemberByMembershipNumber(String number) {
		return (Member) em.createQuery("select m from Member m where n.membershipNumber = :number")
				.setParameter("number", number)
				.getSingleResult();
	}

}

