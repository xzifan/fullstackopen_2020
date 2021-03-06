import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <React.Fragment >
      <button style={hideWhenVisible} className='toggleButton show' onClick={toggleVisibility}>{props.buttonLabel}</button>
      <button style={showWhenVisible} className='toggleButton hide' onClick={toggleVisibility}>{props.cancelLabel ||'cancel'}</button>
      {visible? <div >{props.children}</div>:<div style={{ display:'none' }}>{props.children}</div>}
    </React.Fragment >
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable