import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import FilterBar from '../FilterBar'
import Header from '../Header'
import ApiFailureView from '../ApiFailureView'
import ContactUs from '../ContactUs'
import BookItem from '../BookItem'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    booksData: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    activeBookShelveFilter: 'All',
    activeBookShelveValue: 'ALL',
  }

  componentDidMount() {
    this.getBookShelveDetails()
  }

  getBookShelveDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput, activeBookShelveValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const getBooksUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeBookShelveValue}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    console.log(getBooksUrl)
    const booksResponse = await fetch(getBooksUrl, options)
    if (booksResponse.ok === true) {
      const booksData = await booksResponse.json()
      const formattedBooksData = booksData.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPicture: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        booksData: formattedBooksData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-bar-container">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          className="search-input"
          id="searchInput"
        />
        <button
          type="button"
          className="search-icon-container"
          onClick={this.getBookShelveDetails}
          testid="searchButton"
        >
          <BsSearch size={22} color="#94a3b8" />
        </button>
      </div>
    )
  }

  changeActiveShelveFilter = (label, value) => {
    this.setState(
      {activeBookShelveFilter: label, activeBookShelveValue: value},
      this.getBookShelveDetails,
    )
  }

  onRetry = () => {
    this.setState(
      {apiStatus: apiStatusConstants.initial},
      this.getBookShelveDetails,
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={25} width={25} color="#0284c7" />
    </div>
  )

  renderApiFailureView = () => <ApiFailureView onRetry={this.onRetry} />

  renderNoSearchResultsView = () => {
    const {searchInput} = this.state

    return (
      <div className="search-not-found-container">
        <img
          src="https://res.cloudinary.com/divotkgu2/image/upload/v1670913149/BookHub/No-Search-results_nbjlxq.png"
          className="search-not-found"
          alt="search not found"
        />
        <p className="not-search-p">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookItems = () => {
    const {booksData} = this.state
    const isBooksDataEmpty = booksData.length === 0

    if (isBooksDataEmpty) {
      return this.renderNoSearchResultsView()
    }

    return (
      <>
        <ul className="book-shelve-details-container">
          {booksData.map(eachBook => (
            <BookItem bookDetails={eachBook} key={eachBook.id} />
          ))}
        </ul>
        <ContactUs />
      </>
    )
  }

  renderBookApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookItems()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeBookShelveFilter} = this.state

    return (
      <>
        <Header />
        <div className="bookshelves-main-container">
          <div className="search-bar-sm">{this.renderSearchBar()}</div>
          <FilterBar
            activeBookShelveFilter={activeBookShelveFilter}
            changeFilter={this.changeActiveShelveFilter}
            bookshelvesList={bookshelvesList}
          />
          <div className="bookshelves-container">
            <div className="bookshelve-name-and-search-bar">
              <h1 className="shelve-name">{activeBookShelveFilter} Books</h1>
              <div>{this.renderSearchBar()}</div>
            </div>
            {this.renderBookApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
