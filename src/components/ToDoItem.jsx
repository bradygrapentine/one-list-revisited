import axios from 'axios'
import React from 'react'

export function ToDoItem(props) {
  async function toggleCompleteStatus() {
    console.log('Clicked!')
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items?${props.id}?access_token=${props.listName}`,
      { item: { complete: !props.complete } }
    )
    if (response.status === 200) {
      console.log(response.data)
      props.reloadAfterChange()
    }
  }
  return (
    <li
      onClick={toggleCompleteStatus}
      className={props.complete ? 'completed' : ''}
    >
      {props.text}
    </li>
  )
}
