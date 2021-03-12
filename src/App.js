import React from 'react'
import * as BooksAPI from './BooksAPI'
import Categories from './component/categories'
import Header from './component/header'
import SearchButton from './component/searchButton'
import SearchField from './component/searchField'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    query:"",                             //holds the inputed queries
    books:[],                             //hold all the books gotten with the getAll Api
    //shelf:[],
    searchedBook:[],                      //hold all the books gotten baswed on the  search queries
    showSearchPage: false,
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  renderSearchPage =  (showSearchPage) => {
    this.setState({showSearchPage: showSearchPage,});
    if (showSearchPage == false){
    this.setState({searchedBook:[]})
    }
  }

  updateQuery = (query) => {
   this.setState({
     query,
    searchedBook: this.state.books.filter(
      book => book.title === query
    )});
  }
  
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchField showSearchPage={this.renderSearchPage}  queryProps={this.updateQuery} books={this.state.books} searchedBook={this.state.searchedBook}/>
        ) : (
          <div className="list-books">
            <Header />
            <Categories />
            <SearchButton showSearchPage={this.renderSearchPage}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
