import React, {Component, PropTypes} from 'react'
import styles from './Button.less'

const Button = props => {
  let option = {}
  try {
    eval(props.item.option)
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body}>
    <div className={styles.text}>
      {option.text}
    </div>
  </div>
}

export default Button
