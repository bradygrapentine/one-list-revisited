import React from 'react'
// @ts-ignore
import logo from '../favicon.ico'

export function PageFooter() {
  return (
    <footer>
      <p>
        <img src={logo} height="42" alt="logo" />
      </p>
      <p>&copy; 2020 Suncoast Developers Guild</p>
    </footer>
  )
}
