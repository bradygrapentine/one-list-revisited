import axios from 'axios'
import React, { useState, useEffect } from 'react'
// @ts-ignore
import logo from './favicon.ico'
import { ToDoItemList } from './components/ToDoItemList'
import { PageFooter } from './components/PageFooter'

export function App() {
  const [todoItems, setTodoItems] = useState([]) // if no empty array here, react throws error ==> empty version of whatever API returns
  // { id: 1, text: 'Do a thing', complete: false },
  // { id: 2, text: 'Do something else', complete: false },
  // { id: 3, text: 'Do a third thing', complete: false },
  // { id: 4, text: 'Remind me about the important thing', complete: true },
  // //{
  // //   id: 5,
  // //   text: 'The important things are the important things',
  // //   complete: false,
  // // },
  //])

  // @ts-ignore
  useEffect(async function () {
    // this is where API access goes
    const response = await axios.get(
      'https://one-list-api.herokuapp.com/items?access_token=cohort42'
    )
    if (response.status == 200) {
      console.log(response.data)
      // response.data is an array of objects, since we hard-coded an array of the same form, API data formats in accordance with our specifications
      setTodoItems(response.data)
    }
    // only runs on mount
  }, [])

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          <ToDoItemList todoItems={todoItems} />
        </ul>
        <form>
          <input type="text" placeholder="Whats up?" />
        </form>
      </main>
      <PageFooter />
    </div>
  )
}
