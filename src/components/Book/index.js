import React, { Component } from 'react'
import Animate from 'react-simple-animate';
import './styles.css'

class Book extends Component {
    render() {
        return (
            <Animate
                startAnimation={true}
                durationSeconds={0.3}
                delaySeconds={0.1}
                startStyle={{ "opacity": 0 }}
                endStyle={{ "opacity": 1 }}
            >
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imageURL}")` }}></div>
                        <div className="book-shelf-changer">
                            <select ref="bookStateSelector" value={this.props.shelf || "none"} onChange={ (e) => { 
                                if (this.refs.bookStateSelector.value !== 'None') {
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
                <div className="book-authors">{this.props.authors && this.props.authors.join(', ')}</div>
            </div>
        </Animate>
    )}
}
export default Book