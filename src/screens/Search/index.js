import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../../components/Book'
import './styles.css'

class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            query: null,
            myBooks: [],
            books: []
        }
    }

    componentDidMount() {
        
        if(this.state.myBooks.length === 0) {
            this.fetchAll()
        }

        const search = this.props.location.search
        const params = new URLSearchParams(search)
        const newQuery = params.get('query')
        this.search(newQuery)
    }

    search = query => {

        if((this.state.query === query) || (query === '')) {
            this.setState({ books:[], query: null })
            return
        }

        BooksAPI
            .search(query)
            .then((result) => { this.setState({ books: result || [], query: query }) })
            .catch(this.showError)
    }

    showError = (error) => {
        window.alert("Houve um erro tente novamente.", error);
    } 

    changeBookToShelf = (book, shelf) => {
        BooksAPI
            .update({ id: book.id }, shelf)
            .then(() => { this.fetchAll() }) 
            .catch(this.showError)
    }

    fetchAll = () => {
        BooksAPI
            .getAll()
            .then((result) => { this.setState({ myBooks: result}) })
            .catch(this.showError)
    } 

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Teste</Link>
                    <div className="search-books-input-wrapper">
                        <form action="/search">
                            <input type="text" id="search-field" name="query" placeholder="Search by title or author" />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{
                        this.state.books.map((book) => {
                            const selectedBook = this.state.myBooks.filter(myBook => (myBook.id === book.id))[0]
                            return (
                                <li key={book.id}>
                                    <Book
                                        shelf={selectedBook && selectedBook.shelf}
                                        title={book.title}
                                        authors={book.authors}
                                        imageURL={book.imageLinks.thumbnail}
                                        handleMoveBook={(shelf) => {
                                            this.changeBookToShelf(book, shelf)
                                        }}
                                    />
                                </li>
                            )
                        })
                        }</ol>
                </div>
            </div>
        )
    }
}

export default SearchScreen