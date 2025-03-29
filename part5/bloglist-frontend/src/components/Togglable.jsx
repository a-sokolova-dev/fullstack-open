import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => ({
    toggleVisibility
  }))

  return (
    <div>
      {visible
        ? <div>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
          </div>
        : <button onClick={toggleVisibility}>{buttonLabel}</button>}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Togglable
