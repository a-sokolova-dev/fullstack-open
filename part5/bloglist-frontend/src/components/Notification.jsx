import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: '#f0f0f0',
    fontSize: 16,
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    padding: 10,
    marginBottom: 10
  }

  const className = type === 'error' ? 'error' : 'success'

  return (
    <div className={className} style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
