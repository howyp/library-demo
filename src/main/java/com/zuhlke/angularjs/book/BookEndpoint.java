package com.zuhlke.angularjs.book;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zuhlke.angularjs.model.Book;

@Path("/books")
public class BookEndpoint {
	
	final Logger logger = LoggerFactory.getLogger(BookEndpoint.class);
	
	@Inject
	private BookService bookService;

	@GET @Produces(MediaType.APPLICATION_JSON)
	public List<Book> getBooks(@QueryParam("q") String query) {
		if (StringUtils.isBlank(query)) {
			return bookService.getBooks();
		} else {
			return bookService.getBooks(query);
		}
	}
	
	@GET @Path("/{id}") @Produces(MediaType.APPLICATION_JSON)
	public Book getBook(@PathParam("id") Long id) {
		Book book = bookService.getBook(id);
		if (book != null) return book;
		throw new WebApplicationException(Response.Status.NOT_FOUND);
	}

    @POST @Consumes(MediaType.APPLICATION_JSON)
    public void saveBook(Book book) {
    	throw new IllegalStateException("arrgggggg");
        //bookService.saveBook(book);
    }


}

