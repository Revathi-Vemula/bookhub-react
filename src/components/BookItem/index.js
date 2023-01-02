import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {authorName, coverPicture, id, rating, readStatus, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="link-style">
      <li className="book-item-container">
        <img src={coverPicture} className="book-cover-picture" alt={title} />
        <div className="book-details-container">
          <h1 className="book-title">{title}</h1>
          <p className="author-name">{authorName}</p>
          <div className="rating-details-container">
            <p className="avg-rating">Avg Rating</p>
            <BsFillStarFill color="#FBBF24" size={20} />
            <p className="rating">{rating}</p>
          </div>
          <p className="book-status">
            Status : <span className="read-status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
