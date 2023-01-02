import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true, username: '', password: ''})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderInputFields = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state

    return (
      <>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            Username*
          </label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={this.onChangeUsername}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">
            Password*
          </label>
          <input
            className="input-field"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
        <button
          type="submit"
          className="login-button"
          onClick={this.onClickLogin}
        >
          Login
        </button>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/divotkgu2/image/upload/v1670143412/BookHub/LoginPage/bookhub-login-banne-image_jea4qh.jpg"
          alt="website login"
          className="login-md-banner-image"
        />
        <img
          src="https://res.cloudinary.com/divotkgu2/image/upload/v1670143412/BookHub/LoginPage/bookhub_banner_sm_oift4p.png"
          alt="login banner sm"
          className="login-sm-banner-image"
        />
        <div className="login-details-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/divotkgu2/image/upload/v1670159723/BookHub/4xbookhub_lnv288.png"
              alt="login website logo"
              className="book-hub-logo"
            />
            {this.renderInputFields()}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
