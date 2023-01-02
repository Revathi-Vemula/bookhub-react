import './index.css'

const ApiFailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="api-failure-container">
      <img
        src="https://res.cloudinary.com/divotkgu2/image/upload/v1670503906/BookHub/api-failure-img2x_utlgpg.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-message">Something went wrong, Please try again.</p>
      <button type="button" onClick={onClickRetry} className="btn-try-again">
        Try Again
      </button>
    </div>
  )
}

export default ApiFailureView
