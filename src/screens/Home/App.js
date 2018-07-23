import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Shelf from '../../components/Shelf'
import './App.css'

class BooksApp extends Component {
  
  shelfs = [
    { title: "Currently Reading", shelfId: "currentlyReading" },
    { title: "Want to Read", shelfId: "wantToRead" },
    { title: "Read", shelfId: "read" }
  ]

  constructor(props) {
    super(props)
    this.state = {
      showSearchPage: false,
      books: [],
    }
  }

  componentDidMount() {
    this.fetchAll()
  }

  updateBooks = (newBooks) => {
    this.setState({ books: newBooks })
  }

  fetchAll = () => {
    BooksAPI
      .getAll()
      .then(this.updateBooks)
      .catch(this.showError)
  } 

  changeBookToShelf = (book, shelf) => {
    BooksAPI
      .update({ id: book.id }, shelf)
      .then(this.fetchAll)
      .catch(this.showError)
  }

  showError = (error) => {
    window.alert("Houve um erro tente novamente.");
  } 
  
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
                    books={this.state.books.filter(book => book.shelf === shelf.shelfId) }
                    handleMoveBook={(book, toShelf) => { 
                      this.changeBookToShelf(book, toShelf)
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
