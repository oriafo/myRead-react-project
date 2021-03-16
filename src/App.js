import React from 'react'
import * as BooksAPI from './BooksAPI'
import Categories from './component/categories'
import Header from './component/header'
import SearchButton from './component/searchButton'
import SearchField from './component/searchField'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    query:'',                             //Holds the inputed queries
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

  //Renders the search page based on the current state of "showSearchPage" state
  renderSearchPage =  () => {
    this.setState(() => ({
      showSearchPage: !this.state.showSearchPage,
    }))
    if( this.state.showSearchPage == true){
      this.setState({searchedBook:[]})
    }
    //this.setState({showSearchPage: !this.state.showSearchPage,});
    
  }

  //This method update the "search" state and also calls the search API
  updateQuery = (query) => {
    this.setState(() => ({
      query:query.trim()
    }))
    if (query.length > 0){
      BooksAPI.search(query).then((searchedBook) => {
      this.setState({
        searchedBook
    });
    })
    }
    if(query.length <= 0){
      this.setState({searchedBook:[]})
    }
  }
  
  //This method uses the Update API call to update the shelf the book belongs to
  moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => 
      this.updateBooks()
    )
  }

 render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>(
            <div className="list-books">
              <Header />
              <Categories books={this.state.books} orderBook={this.moveToShelf}/>
              <SearchButton showSearchPage={this.renderSearchPage} />
            </div>
        )}/> 

         <div>
      <Route exact path='/search' render={() =>(
        <SearchField showSearchPage={this.renderSearchPage}  queryProps={this.updateQuery} books={this.state.books} searchedBook={this.state.searchedBook} shelfFromSearch={this.moveToShelf} />
      )}/> 
      </div>
      </div>

     
    )
  }
}

export default BooksApp
