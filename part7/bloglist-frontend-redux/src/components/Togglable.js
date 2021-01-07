import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'

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
      <Button style={hideWhenVisible} className='toggleButton show' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      <Button style={showWhenVisible} className='toggleButton hide' onClick={toggleVisibility}>{props.cancelLabel ||'cancel'}</Button>
      {visible? <div >{props.children}</div>:<div style={{ display:'none' }}>{props.children}</div>}
    </React.Fragment >
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable