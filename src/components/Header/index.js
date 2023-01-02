import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'
import StatusContext from '../../context/StatusContext'
import './index.css'

class Header extends Component {
  state = {showHamburgerMenu: false}

  toggleHamburger = () => {
    this.setState(prevState => ({
      showHamburgerMenu: !prevState.showHamburgerMenu,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMenu = () => (
    <ul className="hamburger-menu-sm">
      {this.renderActions()}
      <li>
        <button
          type="button"
          className="close-button"
          onClick={this.toggleHamburger}
        >
          <IoIosCloseCircle size={25} color="#334155" />
        </button>
      </li>
    </ul>
  )

  renderActions = () => (
    <StatusContext.Consumer>
      {value => {
        const {activeTab, changeTab} = value

        const activeHomeTabStyle =
          activeTab === 'Home' ? 'active-tab' : 'inactive-tab'

        const activeShelvesTabStyle =
          activeTab === 'bookShelves' ? 'active-tab' : 'inactive-tab'

        const onClickHomeTab = () => {
          changeTab('Home')
        }

        const onClickBookShelvesTab = () => {
          changeTab('bookShelves')
        }

        return (
          <>
            <Link to="/" key="Home">
              <li>
                <button
                  type="button"
                  className={`action-button ${activeHomeTabStyle}`}
                  onClick={onClickHomeTab}
                >
                  Home
                </button>
              </li>
            </Link>
            <Link to="/shelf" key="bookShelves">
              <li>
                <button
                  type="button"
                  className={`action-button ${activeShelvesTabStyle}`}
                  onClick={onClickBookShelvesTab}
                >
                  BookShelves
                </button>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="button-logout"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </>
        )
      }}
    </StatusContext.Consumer>
  )

  render() {
    const {showHamburgerMenu} = this.state

    return (
      <div className="nav-container">
        <div className="navbar-header">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/divotkgu2/image/upload/v1670159723/BookHub/4xbookhub_lnv288.png"
              alt="website logo"
              className="bookhub-logo-header"
            />
          </Link>
          <ul className="actions-container">
            <li>
              <button
                type="button"
                className="hamburger-menu"
                onClick={this.toggleHamburger}
              >
                <GiHamburgerMenu size={25} color="#475569" />
              </button>
            </li>
            <ul className="actions-md">{this.renderActions()}</ul>
          </ul>
        </div>
        {showHamburgerMenu && this.renderMenu()}
      </div>
    )
  }
}

export default withRouter(Header)
