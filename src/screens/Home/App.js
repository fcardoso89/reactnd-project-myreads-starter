import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../../components/Shelf'
import './App.css'

class BooksApp extends Component {
  
  shelfs = [
    { title: "Currently Reading", shelfId: "currentlyReading" },
    { title: "Want to Read", shelfId: "wantToRead" },
    { title: "Read", shelfId: "read" }
  ]
  
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div> { 
                this.shelfs.map(shelf => (
                  <Shelf 
                    key={ shelf.title }
                    title={ shelf.title } 
                    books={this.props.books.filter(book => book.shelf === shelf.shelfId) }
                    handleMoveBook={(book, toShelf) => { 
                      this.props.changeBookToShelf(book, toShelf)
                    }}
                  />
                ))
              }
              </div>
            </div>
            <div className="open-search">
              <Link to={'/search'}>Teste</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
