import React from 'react'
import Book from  '../Book'
import './styles.css'

// Stateless component
const Shelf = props => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    props.books.map(book => (
                        <li key={book.id}>
                        <Book 
                            shelf={book.shelf} 
                            title={book.title} 
                            authors={book.authors} 
                            imageURL={book.imageLinks.thumbnail}
                            handleMoveBook={(toShelf) => {
                                props.handleMoveBook(book, toShelf)
                            }}
                        />
                        </li>
                        )
                    )}
            </ol>
        </div>
    </div>
)

export default Shelf