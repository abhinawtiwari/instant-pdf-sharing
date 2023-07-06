import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message}) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
    {message}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Message
