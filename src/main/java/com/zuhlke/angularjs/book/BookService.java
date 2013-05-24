package com.zuhlke.angularjs.book;

import java.util.List;

import javax.annotation.PostConstruct;
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
	
	@PostConstruct
	public void init() {
		// for demo application create books on start up
		createBook("Domain-Driven Design", "Eric Evans", "0-321-12521-5");
		createBook("Service-Oriented Architecture", "Thomas Erl", "0-13-185858-0");
		createBook("Java Persistence with Hibernate", "Christian Bauer, Gavin King", "1-932394-88-5");
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Book> getBooks() {
		return em.createQuery("select b from Book b order by b.title").getResultList();
	}
	
	@SuppressWarnings("unchecked") 
	public List<Book> getBooks(String query) {
		return em.createQuery("select b from Book b where lower(b.title) like :query or lower(b.author) like :query order by b.title")
				.setParameter("query", "%" + query.toLowerCase() + "%")
				.getResultList();
	}
	
	public Book getBook(Long id) {
		return em.find(Book.class, id);
	}

    public void saveBook(Book book) {
        em.merge(book);
    }
    
    public void deleteBook(Long id) {
    	em.remove(em.getReference(Book.class, id));
    }
    
    public void createBook(String title, String author, String isbn) {
    	saveBook(new Book(title, author, isbn));
    }
	

}

