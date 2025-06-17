import './App.css'
import Button from './components/Button'
import { useState } from 'react';
import Icon from './components/Icon';
import iconDelete from './assets/eliminar.png'
import tarea from './assets/tarea.png'

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [failure, setFailure] = useState<string>('');
  const [lista, setLista] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const agregar = () => {
    if (inputValue === '') {
      return;
    }
    setLista([...lista, inputValue]);
    setInputValue('');
    setSuccess('Tarea agregada correctamente');
    setFailure('');
  }

  const eliminar = (item: string) => {
    setLista(lista.filter((i) => i !== item));
    setFailure('Tarea eliminada correctamente');
    setSuccess('');
  }

  return (
    <>
    <div className='flex flex-col items-center justify-center bg-amber-50 p-5 ml-50 rounded-2xl w-3xl'>
      <h1 className='font-semibold  text-5xl text-black mt-5 flex gap-3'>ToDo List <span><Icon src={tarea} width={50} height={50}/></span></h1>
      <div>
        <input value={inputValue} onChange={handleChange} className='bg-gray-200 rounded-4xl p-3 mt-20 w-lg mr-5' type="text" placeholder='Añade algo nuevo...' />
        <Button onClick={agregar} className='bg-green-400 p-3 border-green-800 border-2 rounded-full hover: cursor-pointer active:bg-green-300 font-bold'>Añadir</Button>
      </div>
      <div className='mt-5 mb-2 mr-95'>
        <p className='text-green-600'>{success && success}</p>
        <p className='text-red-500'>{failure && failure}</p>
      </div>
      <div>
        <ul>
          {lista.map((item, index) => (
            <div className=' w-lg bg-gray-200 rounded-lg p-3 pb-1 mt-3 mr-25 mb-2 flex justify-between'>
              <li className='max-w-1' key={index}>{item}</li>
              <Button className='cursor-pointer' onClick={() => eliminar(item)}><Icon src={iconDelete} width={40} height={40}/></Button>
            </div>
          ))}
        </ul> 
      </div>
    </div>
    </>
  )
}

export default App;
