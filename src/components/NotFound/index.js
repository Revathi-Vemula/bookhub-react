import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickRedirectToHome = () => {
    history.replace('/')
  }

  return (
    <div className="path-not-found-container">
      <img
        src="https://res.cloudinary.com/divotkgu2/image/upload/v1670941161/BookHub/path-not-found-image_kzz1gg.png"
        className="image-path-not-found"
        alt="not found"
      />
      <h1 className="heading-path-not-found">Page Not Found</h1>
      <p className="page-not-found-desc">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button
          type="button"
          className="button-back-home"
          onClick={onClickRedirectToHome}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
