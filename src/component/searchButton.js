import React from 'react'
import { Route, Link } from 'react-router-dom'

class SearchButton extends React.Component{
    render(){
        return(
            <div className="open-search">
             <Link to='/search'>
              <button onClick={() => this.props.showSearchPage(true)}>Add a book</button>
               </Link>
            </div>
        )
    }
}

export default SearchButton             