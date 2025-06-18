import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import Icon from "./components/Icon";
import iconDelete from "./assets/eliminar.png";
import tarea from "./assets/tarea.png";
import iconModify from "./assets/modificar.png";

type Tarea = {
  texto: string;
  completado: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [failure, setFailure] = useState<string>("");
  const [lista, setLista] = useState<Tarea[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const agregar = () => {
    if (inputValue === "") {
      return;
    }
    setLista([...lista, { texto: inputValue, completado: false }]);
    setInputValue("");
    setSuccess("Tarea agregada correctamente");
    setFailure("");
  };

  const eliminar = (item: string) => {
    setLista(lista.filter((i) => i.texto !== item));
    setFailure("Tarea eliminada correctamente");
    setSuccess("");
  };

  const limpiar = () => {
    setLista([]);
    setSuccess("");
    setFailure("");
  };

  const modificar = (index: number) => {
    const nuevoValor = prompt("Ingresa la nueva tarea", lista[index].texto);
    if (nuevoValor === null || nuevoValor.trim() === "") {
      return;
    }

    const nuevaLista = [...lista];
    nuevaLista[index].texto = nuevoValor;
    setLista(nuevaLista);
    setSuccess("Tarea modificada correctamente");
    setFailure("");
  };

  const completado = (index: number) => {
    const nuevaLista = [...lista];
    nuevaLista[index].completado = !nuevaLista[index].completado;
    setLista(nuevaLista);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-amber-50 p-5 ml-50 rounded-2xl w-3xl">
        <h1 className="font-semibold  text-5xl text-black mt-5 flex gap-3">
          ToDo List{" "}
          <span>
            <Icon src={tarea} width={50} height={50} />
          </span>
        </h1>
        <div>
          <input
            value={inputValue}
            onChange={handleChange}
            className="bg-gray-200 rounded-4xl p-3 mt-20 w-lg mr-5"
            type="text"
            placeholder="Añade algo nuevo..."
          />
          <Button
            onClick={agregar}
            className="bg-green-400 p-3 border-green-600 border-2 rounded-full hover: cursor-pointer active:bg-green-300 font-bold"
          >
            Añadir
          </Button>
          <Button
            onClick={limpiar}
            className="bg-amber-600 ml-2 p-3 border-amber-700 border-2 rounded-full hover: cursor-pointer active:bg-amber-500 font-bold"
          >
            Limpiar
          </Button>
        </div>
        <div className="mt-5 mb-2 mr-95">
          <p className="text-green-600">{success && success}</p>
          <p className="text-red-500">{failure && failure}</p>
        </div>
        <div>
          <ul>
            {lista.map((item, index) => (
              <div className=" w-lg bg-gray-200 rounded-lg p-3 pb-1 mt-3 mr-25 mb-2 flex justify-between">
                <li
                  onClick={() => completado(index)}
                  className={`${
                    item.completado ? "line-through" : ""
                  } cursor-crosshair `}
                  key={index}
                >
                  {item.texto}
                </li>
                <div className="flex gap-8">
                  <Button
                    className="cursor-pointer"
                    onClick={() => modificar(index)}
                  >
                    <Icon src={iconModify} width={40} height={40} />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    onClick={() => eliminar(item.texto)}
                  >
                    <Icon src={iconDelete} width={40} height={40} />
                  </Button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
