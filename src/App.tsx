import './App.css'
import Button from './components/Button'
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [lista, setLista] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const agregar = () => {
    setLista([...lista, inputValue]);
  }

  const eliminar = (item: string) => {
    setLista(lista.filter((i) => i !== item));
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center bg-amber-50 p-3'>
      <h1 className='text-6xl text-white bg-purple-950 p-6 border-8 border-teal-500 rounded-2xl'>TODO-List</h1>
      <div>
        <input value={inputValue} onChange={handleChange} className='border-2 border-teal-500 mt-20 w-5xl mr-5' type="text" placeholder='Añade algo nuevo...' />
        <Button onClick={agregar} className='bg-green-400 p-3 border-amber-600 border-2 rounded-4xl hover: cursor-pointer active:bg-amber-600 font-bold'>Añadir</Button>
      </div>
      <div>
        <ul>
          {lista.map((item, index) => (
            <li key={index}>{item}<Button onClick={() => eliminar(item)} className='bg-red-400 ml-2 p-3 border-amber-600 border-2 rounded-4xl hover: cursor-pointer active:bg-red-800 font-bold'>Eliminar</Button></li>
          ))}
        </ul> 
      </div>
    </div>
    </>
  )
}

export default App;
