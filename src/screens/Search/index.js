import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from "throttle-debounce"
import * as BooksAPI from '../../BooksAPI'
import Book from '../../components/Book'
import './styles.css'

class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.autocompleteSearchDebounce = debounce(300, this.autocompleteSearch)
        this.state = {
            query: null,
            books: []
        }
    }

    changeQuery = event => {
        this.setState({ query: event.target.value }, () => {
            this.autocompleteSearchDebounce(this.state.query);
        });
    };

    autocompleteSearch = query => {
        this.search(query);
    };

    search = query => {
        if(query) {
            BooksAPI
                .search(query)
                .then((result) => { this.showSearchResult(result, query) })
                .catch(this.showError)
        } else {
            this.showSearchResult([], query)
        }
    }

    showError = (error) => {
        window.alert(`Error: ${error}`);
    } 

    showSearchResult = (result, query) => {
        if ((result.error || null) === null) {
            this.setState({ books: result, query: query })
        } else {
            this.setState({ books: [], query: query })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Teste</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            id="search-field"
                            name="query" 
                            placeholder="Search by title or author"
                            onChange={this.changeQuery}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{
                        this.state.books.map((book) => {
                            const viewedBook = this.props.books.filter(myBook => (myBook.id === book.id))[0]
                            return (
                                <li key={book.id}>
                                    <Book
                                        shelf={viewedBook && viewedBook.shelf}
                                        title={book.title}
                                        authors={book.authors}
                                        imageURL={(book.imageLinks && book.imageLinks.thumbnail) || ""}
                                        handleMoveBook={(shelf) => {
                                            this.props.changeBookToShelf(book, shelf)
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