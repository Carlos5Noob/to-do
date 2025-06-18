import "./App.css";
import Button from "./components/Button";
import { useState, useEffect } from "react";
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
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const tareas = localStorage.getItem("tareas");
    if (tareas) {
      setLista(JSON.parse(tareas));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tareas", JSON.stringify(lista));
    }
  }, [lista, loaded]);

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
      <div className="h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center bg-amber-50 p-5 mx-auto rounded-2xl w-full max-w-4xl">
          <h1 className="font-semibold text-3xl sm:text-5xl text-black flex gap-3 items-center text-center">
            ToDo List
            <span>
              <Icon src={tarea} width={40} height={40} />
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center mt-10 gap-3 w-full max-w-md">
            <input
              value={inputValue}
              onChange={handleChange}
              className="bg-gray-200 rounded-3xl p-3 w-full"
              type="text"
              placeholder="Añade algo nuevo..."
            />
            <Button
              onClick={agregar}
              className="bg-green-400 p-3 border-green-600 border-2 rounded-full hover:cursor-pointer active:bg-green-300 font-bold w-full sm:w-auto"
            >
              Añadir
            </Button>
            <Button
              onClick={limpiar}
              className="bg-amber-600 p-3 border-amber-700 border-2 rounded-full hover:cursor-pointer active:bg-amber-500 font-bold w-full sm:w-auto"
            >
              Limpiar
            </Button>
          </div>

          <div className="mt-5 mb-2 w-full max-w-md text-center">
            <p className="text-green-600">{success && success}</p>
            <p className="text-red-500">{failure && failure}</p>
          </div>

          <div className="w-full max-w-md">
            <ul>
              {lista.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg p-3 mt-3 flex justify-between items-center"
                >
                  <li
                    onClick={() => completado(index)}
                    className={`${
                      item.completado ? "line-through" : ""
                    } cursor-crosshair break-words max-w-[60%]`}
                  >
                    {item.texto}
                  </li>
                  <div className="flex gap-4">
                    <Button
                      className="cursor-pointer"
                      onClick={() => modificar(index)}
                    >
                      <Icon src={iconModify} width={30} height={30} />
                    </Button>
                    <Button
                      className="cursor-pointer"
                      onClick={() => eliminar(item.texto)}
                    >
                      <Icon src={iconDelete} width={30} height={30} />
                    </Button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
