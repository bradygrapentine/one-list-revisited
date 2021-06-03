import axios from 'axios'
import React from 'react'

export function ToDoItem({ id, listName, complete, reloadAfterChange, text }) {
  async function toggleCompleteStatus() {
    console.log('Clicked!')
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${id}?access_token=${listName}`,
      { item: { complete: !complete } }
    )
    if (response.status === 200) {
      console.log(response.data)
      reloadAfterChange()
    }
  }
  return (
    <li onClick={toggleCompleteStatus} className={complete ? 'completed' : ''}>
      {text}
    </li>
  )
}
