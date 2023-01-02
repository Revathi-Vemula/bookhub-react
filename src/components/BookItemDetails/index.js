import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ContactUs from '../ContactUs'
import ApiFailureView from '../ApiFailureView'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class BookItemDetails extends Component {
  state = {bookItemDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const bookDetailsUrl = `https://apis.ccbp.in/book-hub/books/${id}`

    const response = await fetch(bookDetailsUrl, options)
    if (response.ok === true) {
      const bookDetailsArray = await response.json()
      const bookDetails = bookDetailsArray.book_details
      const formattedBookDetails = {
        authorName: bookDetails.author_name,
        aboutAuthor: bookDetails.about_author,
        aboutBook: bookDetails.about_book,
        coverPicture: bookDetails.cover_pic,
        id: bookDetails.id,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
      }
      this.setState({
        bookItemDetails: formattedBookDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="book-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height={25} width={25} />
    </div>
  )

  renderBookItemDetails = () => {
    const {bookItemDetails} = this.state
    const {
      authorName,
      aboutAuthor,
      aboutBook,
      coverPicture,
      rating,
      readStatus,
      title,
    } = bookItemDetails

    return (
      <div className="book-details-main-container">
        <div className="item-details-container">
          <div className="book-summary-container">
            <img src={coverPicture} alt={title} className="cover-image" />
            <div className="summary-details-container">
              <h1 className="book-title-name">{title}</h1>
              <p className="book-author-name">{authorName}</p>
              <div className="book-rating-details-container">
                <p className="book-avg-rating">Avg Rating</p>
                <BsFillStarFill color="#FBBF24" size={20} />
                <p className="book-rating">{rating}</p>
              </div>
              <p className="book-status-details">
                Status:<span className="book-read-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="separator" />
          <div className="author-book-details-container">
            <h1 className="about-heading">About Author</h1>
            <p className="about-desc">{aboutAuthor}</p>
            <h1 className="about-heading">About Book</h1>
            <p className="about-desc">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  onRetryGetBookDetails = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getBookItemDetails,
    )
  }

  renderApiFailureView = () => (
    <ApiFailureView onRetry={this.onRetryGetBookDetails} />
  )

  renderApiStatusResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderBookItemDetails()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderApiStatusResults()}
        <ContactUs />
      </>
    )
  }
}

export default BookItemDetails
