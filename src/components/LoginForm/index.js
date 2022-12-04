import {Component} from 'react'
import {
  LoginContainer,
  LoginBannerMdImage,
  LoginBannerSmImage,
  LoginDetailsContainer,
  LoginFormContainer,
  BookHubLogoImg,
  InputContainer,
  InputLabel,
  SuperScript,
  Input,
  ErrorMessage,
  LoginButton,
} from './styledComponents'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  renderInputFields = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state

    return (
      <>
        <InputContainer>
          <InputLabel htmlFor="username">
            Username <SuperScript>*</SuperScript>
          </InputLabel>
          <Input
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">
            password <SuperScript>*</SuperScript>
          </InputLabel>
          <Input
            type="text"
            id="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
        </InputContainer>
        {showErrorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <LoginButton>Login</LoginButton>
      </>
    )
  }

  render() {
    const {username, password} = this.state

    return (
      <LoginContainer>
        <LoginBannerMdImage
          src="https://res.cloudinary.com/divotkgu2/image/upload/v1670143412/BookHub/LoginPage/bookhub-login-banne-image_jea4qh.jpg"
          alt="login banner"
        />
        <LoginBannerSmImage
          src="https://res.cloudinary.com/divotkgu2/image/upload/v1670143412/BookHub/LoginPage/bookhub_banner_sm_oift4p.png"
          alt="login banner sm"
        />
        <LoginDetailsContainer>
          <LoginFormContainer>
            <BookHubLogoImg
              src="https://res.cloudinary.com/divotkgu2/image/upload/v1670155450/BookHub/bookhublogo_tmhr2b.png"
              alt="bookhub logo"
            />
            {this.renderInputFields()}
          </LoginFormContainer>
        </LoginDetailsContainer>
      </LoginContainer>
    )
  }
}

export default LoginForm
