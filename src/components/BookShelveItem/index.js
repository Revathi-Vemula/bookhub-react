import './index.css'

const BookShelveItem = props => {
  const {shelveDetails, isActive, changeActiveFilter} = props
  const {label, value} = shelveDetails

  const getActiveShelveClassName = isActive
    ? 'active-shelve-button'
    : 'inactive-shelve-button'

  const onClickChangeActiveBookShelve = () => {
    changeActiveFilter(label, value)
  }

  return (
    <li className="book-shelve-item">
      <button
        type="button"
        onClick={onClickChangeActiveBookShelve}
        className={`shelve-button ${getActiveShelveClassName}`}
      >
        {label}
      </button>
    </li>
  )
}

export default BookShelveItem
