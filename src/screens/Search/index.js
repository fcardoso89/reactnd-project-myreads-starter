import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from "throttle-debounce"
import Loading from 'react-loading-components'
import * as BooksAPI from '../../BooksAPI'
import Book from '../../components/Book'
import './styles.css'

class SearchScreen extends Component {

    constructor(props){
        super(props)
        this.autocompleteSearchDebounce = debounce(300, this.autocompleteSearch)
        this.state = {
            query: null,
            books: [],
            searching: false
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
        
        this.setState({ searching: true })

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
        this.setState({ 
            books: ((result.error || null) === null) ? result : [],
            query: query, 
            searching: false
        })
    }

    loadingComponent = () => (
        <Loading type='oval' width={60} height={60} fill='#32CD32' />
    )

    screenMessage = (message) => (
        <div> <h2>{message}</h2> </div>
    )

    searchResults = (books, myBooks) => {

        if(books.length <= 0) {
            return this.screenMessage("No Results")
        } else {
            return (
                <ol className="books-grid">{
                    books.map((book) => {
                        const viewedBook = myBooks.filter(myBook => (myBook.id === book.id))[0]
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
                }
                </ol>
            )
        }
    } 

    render() {
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
                    {this.state.searching ? this.loadingComponent() : this.searchResults(this.state.books, this.props.books)}
                </div>
            </div>
        )
    }
}

export default SearchScreen