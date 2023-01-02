import BookShelveItem from '../BookShelveItem'
import './index.css'

const FilterBar = props => {
  const {activeBookShelveFilter, changeFilter, bookshelvesList} = props

  const changeActiveBookShelveFilter = (label, value) => {
    changeFilter(label, value)
  }

  return (
    <div className="bookshelve-navigation-bar">
      <h1 className="heading-nav-bar">Bookshelves</h1>
      <ul className="navigation-bar-md">
        {bookshelvesList.map(eachShelve => (
          <BookShelveItem
            shelveDetails={eachShelve}
            key={eachShelve.id}
            isActive={eachShelve.label === activeBookShelveFilter}
            changeActiveFilter={changeActiveBookShelveFilter}
          />
        ))}
      </ul>
      <ul className="navigation-bar-sm">
        {bookshelvesList.map(eachShelve => (
          <BookShelveItem
            shelveDetails={eachShelve}
            key={eachShelve.id}
            isActive={eachShelve.label === activeBookShelveFilter}
            changeActiveFilter={changeActiveBookShelveFilter}
          />
        ))}
      </ul>
    </div>
  )
}

export default FilterBar
