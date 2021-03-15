import React from 'react'
//import {BrowserRouter} from 'react-router-dom'
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
    searchedBook:[],                      //hold all the books gotten baswed on the  search queries
    showSearchPage: false,
  }

  //calls the getAll book API
  componentDidMount(){
    this.updateBooks()
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  //Renders the search page
  renderSearchPage =  () => {
    this.setState({showSearchPage: !this.state.showSearchPage,});
    // if (this.state.showSearchPage == false){
    //   this.setState({searchedBook:''})
    // }
  }

  //update the search state and also calls the search API
  updateQuery = (query) => {
    this.setState(() => ({
      query:query.trim()
    }))
    console.log(query)
    BooksAPI.search(query).then((searchedBook) => {
      this.setState({
       searchedBook
    });
    })
    if(query.length <= 0){
      this.setState({searchedBook:''})
    }
  }
  
  moveToShelf = (book, shelf) => {
    console.log("pleasessss:", this.shelf)
    BooksAPI.update(book, shelf).then(() => 
    this.updateBooks()
    )
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchField showSearchPage={this.renderSearchPage}  queryProps={this.updateQuery} books={this.state.books} searchedBook={this.state.searchedBook} shelfFromSearch={this.moveToShelf}/>
        ) : (
          <div className="list-books">
            <Header />
            <Categories books={this.state.books} orderBook={this.moveToShelf}/>
            <SearchButton showSearchPage={this.renderSearchPage} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
