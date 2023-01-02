import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import ApiFailureView from '../ApiFailureView'
import ContactUs from '../ContactUs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import StatusContext from '../../context/StatusContext'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAl',
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedApiUrl = `https://apis.ccbp.in/book-hub/top-rated-books`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const topRatedApiResponse = await fetch(topRatedApiUrl, options)
    if (topRatedApiResponse.ok === true) {
      const topRatedBooks = await topRatedApiResponse.json()

      const formattedTopRatedBooks = topRatedBooks.books.map(eachBook =>
        this.getFormattedTopRatedBooks(eachBook),
      )
      this.setState({
        topRatedBooks: formattedTopRatedBooks,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getFormattedTopRatedBooks = bookItem => ({
    authorName: bookItem.author_name,
    coverPicture: bookItem.cover_pic,
    id: bookItem.id,
    title: bookItem.title,
  })

  onRetry = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getTopRatedBooks,
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height={35} width={35} />
    </div>
  )

  renderTopRatedBooksSlider = () => {
    const {topRatedBooks} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPicture, authorName} = eachBook

          return (
            <Link to={`/books/${id}`} className="link-item-top-rated">
              <li className="book-item" key={id}>
                <img src={coverPicture} className="cover-picture" alt={title} />
                <h1 className="top-rated-title">{title}</h1>
                <p className="top-rated-author-name">{authorName}</p>
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderTopRatedVideos = () => (
    <StatusContext.Consumer>
      {value => {
        const {changeTab} = value

        const onClickChangeTab = () => {
          changeTab('bookShelves')
        }

        return (
          <div className="top-rated-books-container">
            <div className="top-rated-heading-button-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <Link to="/shelf">
                <button
                  type="button"
                  className="find-books-button-md"
                  onClick={onClickChangeTab}
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderTopRatedBooksSlider()}
          </div>
        )
      }}
    </StatusContext.Consumer>
  )

  renderHomeFailureView = () => <ApiFailureView onRetry={this.onRetry} />

  renderApiStatusResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderTopRatedVideos()
      case apiStatusConstants.failure:
        return this.renderHomeFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <StatusContext.Consumer>
        {value => {
          const {changeTab} = value

          const onClickChangeTabSm = () => {
            changeTab('bookShelves')
          }

          return (
            <>
              <Header />
              <div className="home-container">
                <div className="top-home-container">
                  <h1 className="heading-home">
                    Find Your Next Favorite Books?
                  </h1>
                  <p className="home-desc">
                    You are in the right place. Tell us what titles or genres
                    you have enjoyed in the past, and we will give you
                    surprisingly insightful recommendations.
                  </p>
                  <Link to="/shelf">
                    <button
                      type="button"
                      className="find-books-button-sm"
                      onClick={onClickChangeTabSm}
                    >
                      Find Books
                    </button>
                  </Link>
                </div>
                {this.renderApiStatusResults()}
              </div>
              <ContactUs />
            </>
          )
        }}
      </StatusContext.Consumer>
    )
  }
}

export default Home
