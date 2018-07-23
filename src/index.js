import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as BooksAPI from './BooksAPI'
import App from './screens/Home/App'
import SearchScreen from './screens/Search'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.fetchAll()
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

    updateBooks = (newBooks) => {
        this.setState({ books: newBooks })
    }

    showError = (error) => {
        window.alert("Houve um erro tente novamente.");
    } 

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} render={(props) => <App books={this.state.books} changeBookToShelf={this.changeBookToShelf} {...props} />} />
                    <Route path="/search" render={(props) => <SearchScreen books={this.state.books} changeBookToShelf={this.changeBookToShelf} {...props} />} />
                </Switch>
            </ BrowserRouter>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('root'))
