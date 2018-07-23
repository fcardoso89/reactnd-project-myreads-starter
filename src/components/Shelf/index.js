import React from 'react'
import Book from  '../Book'
import './styles.css'
import Loading from 'react-loading-components'


const shelfMessage = (message) => (
    <div> <h3>{message}</h3> </div>
)

const shelfForBooks = (books, handleMoveBook) => {
    if (books.length <= 0) {
        return shelfMessage("No books in this shelf")
    } else {
        return (
            <ol className="books-grid">
                {
                    books.map(book => (
                        <li key={book.id}>
                            <Book
                                shelf={book.shelf}
                                title={book.title}
                                authors={book.authors}
                                imageURL={(book.imageLinks && book.imageLinks.thumbnail) || ""}
                                handleMoveBook={(shelf) => { handleMoveBook(book, shelf) }}
                            />
                        </li>
                    ))
                }
            </ol>
        )
    }
}

const loadingComponent = () => (
    <Loading type='oval' width={60} height={60}  fill='#32CD32' />
)

// Stateless component
const Shelf = props => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            {props.loading ? loadingComponent() : shelfForBooks(props.books, props.handleMoveBook) }
        </div>
    </div>
)

export default Shelf