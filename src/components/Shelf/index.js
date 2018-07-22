import React from 'react'
import Book from  '../Book'
import './styles.css'

// Stateless component
const Shelf = props => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map(book => (<li><Book title={book.title} author={book.author} imageURL={book.imageURL}/></li>))}
            </ol>
        </div>
    </div>
)

export default Shelf