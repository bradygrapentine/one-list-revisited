import axios from 'axios'
import React, { useState, useEffect } from 'react'
// @ts-ignore
// import logo from './favicon.ico'
// import { ToDoItemList } from './components/ToDoItemList'
import { PageFooter } from './components/PageFooter'
import { ToDoItem } from './components/ToDoItem'

export function App() {
  const [todoItems, setTodoItems] = useState([])
  const [listName, setListName] = useState(localStorage.getItem('list-name'))
  const [newToDoText, setNewToDoText] = useState('')
  // const [newToDoItems, setNewToDoItems] = useState([])

  async function loadTheItems() {
    const response = await axios.get(
      `https://one-list-api.herokuapp.com/items?access_token=${listName}`
    )
    if (response.status == 200) {
      console.log(response.data)
      // response.data is an array of objects, since we hard-coded an array of the same form, API data formats in accordance with our specifications
      setTodoItems(response.data)
    }
    // only runs on mount
  }

  useEffect(
    function () {
      // this is where API access goes

      loadTheItems()
      // calling the inner function in the outer function to avoid js throwing
      // an error because main use effect fn was async
    },
    [listName]
  )

  // function handleClick42() {
  //   setListName('cohort42')
  // }
  // function handleClick21() {
  //   setListName('cohort21')
  // }
  // function handleIllustriousVoyage() {
  //   setListName('illustriousvoyage')
  // }

  async function handleCreateNewItem(event) {
    event.preventDefault()
    const response = await axios.post(
      `https://one-list-api.herokuapp.com/items?access_token=${listName}`,
      {
        item: {
          text: newToDoText,
        },
      }
    )
    if (response.status === 201) {
      loadTheItems()
    }
    setNewToDoText('')
  }

  function handleChangeListName(newListName) {
    setListName(newListName)
    localStorage.setItem('list-name', newListName)
  }

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          <li>
            <button onClick={() => handleChangeListName('cohort42')}>
              Cohort 42
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeListName('cohort21')}>
              Cohort 21
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeListName('illustriousvoyage')}>
              Illustrious Voyage
            </button>
          </li>
          <ul>
            {todoItems.map(function (todoItem) {
              return (
                <ToDoItem
                  key={todoItem.id}
                  listName={listName}
                  reloadAfterChange={loadTheItems}
                  complete={todoItem.complete}
                  text={todoItem.text}
                ></ToDoItem>
              )
            })}
          </ul>
          {/* <ToDoItemList todoItems={todoItems} /> */}
        </ul>
        <form onSubmit={handleCreateNewItem}>
          <input
            type="text"
            placeholder="Whats up?"
            value={newToDoText}
            onChange={(event) => setNewToDoText(event.target.value)}
          />
        </form>
      </main>
      <PageFooter />
    </div>
  )
}
