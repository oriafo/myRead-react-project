import React from 'react'
//import {BrowserRouter} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Categories from './component/categories'
import Header from './component/header'
import SearchButton from './component/searchButton'
import SearchField from './component/searchField'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    query:"",                             //Holds the inputed queries
    books:[],                             //Hold all the books gotten with the getAll Api
    searchedBook:[],                      //Hhold all the books gotten baswed on the  search queries
    showSearchPage: false,
  }


  /*Calls the getAll book API imediatly after the App.js component is rendered to the Dom so that
   we can have access to the current available books on our shelf and we are calling the methods 
   where the getAll book API is implemented because of reuseability.*/
  componentDidMount(){
    this.updateBooks()
  }


/*This is the methods that calls the actual getAll book API. this was done because we want to be 
able to call the API anytime(reuseability) by other methods not only by componentDidMount method */
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
    if (query.length > 0){
    console.log(query.length)
      BooksAPI.search(query).then((searchedBook) => {
      this.setState({
       searchedBook
    });
    })
    }
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
        <Route exact path='/' render={() =>(
          this.state.showSearchPage ? (
            <SearchField showSearchPage={this.renderSearchPage}  queryProps={this.updateQuery} books={this.state.books} searchedBook={this.state.searchedBook} shelfFromSearch={this.moveToShelf}/>
          ) : (
            <div className="list-books">
              <Header />
              <Categories books={this.state.books} orderBook={this.moveToShelf}/>
              <SearchButton showSearchPage={this.renderSearchPage} />
            </div>
          )
        )}/> 
        
      </div>
    )
  }
}

export default BooksApp
