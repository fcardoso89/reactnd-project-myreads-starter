import React, { Component } from 'react'
import './styles.css'

// Stateless component
class Book extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imageURL}")` }}></div>
                    <div className="book-shelf-changer">
                        <select ref="bookStateSelector" value={this.props.shelf} onChange={ (e) => { 
                            if (this.refs.bookStateSelector.value !== 'none') {
                                this.props.handleMoveBook(this.refs.bookStateSelector.value)
                            }
                            }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.author}</div>
    </div>
)
}
}
export default Book