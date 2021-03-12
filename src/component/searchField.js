import React from 'react'
import BooksApp from '../App'

class SearchField extends React.Component{
    render(){   
      const query = this.props.query
      const books = this.props.books
      const searchedBook = this.props.searchedBook
        return(
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" onClick={() => this.props.showSearchPage(false)}>Close</button>
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
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `URL(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select>
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
