import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import StatusContext from './context/StatusContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    activeTab: 'Home',
  }

  changeTab = tabId => {
    this.setState({activeTab: tabId})
  }

  render() {
    const {activeTab} = this.state

    return (
      <StatusContext.Provider
        value={{
          activeTab,
          changeTab: this.changeTab,
        }}
      >
        <Switch>
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </StatusContext.Provider>
    )
  }
}

export default App
