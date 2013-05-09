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

@Entity @Table(name = "book")
public class Book implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5541659969794633170L;

	@Id 
	@GeneratedValue(generator = "book_id", strategy = GenerationType.TABLE)
	@TableGenerator(name = "book_id", pkColumnValue = "book")
	@Column(name = "book_id")
	private Long id;
	
	@Basic(optional = false) 
	@Column(name = "title")
	private String title;
	
	@Basic(optional = false) 
	@Column(name = "isbn")
	private String isbn;
	
	Book() { }
	
	public Book(String title) {
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getIsbn() {
		return isbn;
	}
	
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	
	@Override
	public String toString() {
		return String.format("book id: %s, title: %s, isbn: %s", getId(), getTitle(), getIsbn());
	}
	

}
