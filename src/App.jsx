import { useEffect, useState } from 'react'
import './App.css'
import Button from './Components/Button'

function App() {
    const [inputValue, setInputValue] = useState("")
    const [editInputValue, setEditInputValue] = useState("")
    const [todo, setTodo] = useState([])
    useEffect(()=>{
      const localTodos = localStorage.getItem("todo") || []
      localTodos != [] ? setTodo(JSON.parse(localTodos)) : setTodo(localTodos)
    },[])

  const foo = () => {
    if (!inputValue) {
      alert("Fill empty fields");
      return;
    }
    const obj = {
      text: inputValue,
      isEdit: false,
    };
    todo.unshift(obj)
    setTodo(todo)
    localStorage.setItem("todo",JSON.stringify(todo))
    setInputValue("");
  }

  const edit = (elem)=>{
      todo.forEach((ele)=>{
          ele.isEdit = false
      })

      todo[elem].isEdit = true
      setTodo([...todo])
      setEditInputValue(todo[elem].text)
  }

  const del = (elem)=>{
    todo.splice(elem,1)
    setTodo([...todo])
    localStorage.setItem("todo",JSON.stringify(todo))
  }

  const editFoo = (elem)=>{
   
    if(!editInputValue){
      alert("dosn't save empty value")
      return
    }
    todo[elem].text = editInputValue
    todo[elem].isEdit = false
    setTodo([...todo])
    localStorage.setItem("todo",JSON.stringify(todo))
  }

  const cancel = (elem)=>{
      todo[elem].isEdit = false
      setTodo([...todo])
  }

  return (
    <>
      <h1 className='font-bold text-[35px] text-center bg-purple-400 text-white'>Todo</h1>
      <div className='mx-auto w-[95%] max-w-[550px] border mt-4 flex'>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='focus:outline-none px-2 flex-1' type="text" placeholder='Enter Todo!' />
        <Button text="Add Todo" customFunction={foo} cClass="bg-green-500 p-2" />
      </div>

        {todo.length != 0 ? <ul className='w-[95%] max-w-[850px] mx-auto mt-6 border px-2 h-[70vh] overflow-auto'>
        <h1 className='font-bold text-2xl'>TODOS:</h1>
        {todo.map((value, index) => {
      
          return value.isEdit ? (
            <li key={index} className='flex justify-between items-center my-2 border-2 border-green-400'>

            <input value={editInputValue}
                onChange={(e) => setEditInputValue(e.target.value)}
                className='focus:outline-none px-2 flex-1'
                type="text"
            />

            <Button text="Save" customFunction={() => editFoo(index)} cClass="bg-green-500 p-2 w-20" />
            <Button text="Cancel" customFunction={() => cancel(index)} cClass="bg-red-500 p-2 w-20" />
            </li>
            ) : 
            (<li key={index} className='bg-slate-200 p-2 flex justify-between items-center my-2'>{value.text}<span className='flex gap-1'><Button text="Edit" cClass="bg-green-500 w-20" customFunction={() =>edit(index)}/><Button text="Del" cClass="bg-red-500 w-20" customFunction={()=> del(index)}/></span></li>)
         

        })}
      
      </ul> : ""}
      
    </>

  )
}

export default App