import React from 'react'
import { Route, Link } from 'react-router-dom'

class SearchField extends React.Component{
    render(){   
      const query = this.props.query
      const books = this.props.books
      const searchedBook = this.props.searchedBook
        return(
            <div className="search-books">
                <div className="search-books-bar">  
                <Link to='/'>
                  <button className="close-search" onClick={() => this.props.showSearchPage()}>Close</button> 
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" 
                    value={this.props.query}
                    onChange={(event) => this.props.queryProps(event.target.value)}
                    />
                  </div>
                </div>
              


              <div className="search-books-results">
                <ol className="books-grid">
                  {searchedBook.map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `URL(${book.imageLinks.thumbnail})`}}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(event) => this.props.shelfFromSearch(book, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>  
              </div>
            </div>
        )
    }
}

export default SearchField
