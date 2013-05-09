package com.zuhlke.angularjs.book;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Book;

@Named @Stateless
public class BookService {
	
	final Logger logger = LoggerFactory.getLogger(BookService.class);
	
	@PersistenceContext
	private EntityManager em;
	
	@SuppressWarnings("unchecked")
	public List<Book> getBooks() {
		return em.createQuery("select b from Book b order by b.title").getResultList();
	}
	
	@SuppressWarnings("unchecked") 
	public List<Book> getBooks(String query) {
		return em.createQuery("select b from Book b where b.title like :query order by b.title")
				.setParameter("query", query + "%")
				.getResultList();
	}
	
	public Book getBook(Long id) {
		return em.find(Book.class, id);
	}

    public void saveBook(Book book) {
    	logger.info("saving book {}", book);
        em.merge(book);
    }
	

}

