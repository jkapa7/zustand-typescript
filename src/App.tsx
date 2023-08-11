//ZUSTAND NO PIDE CREAR UN PROVIDER, SOLO SE NECESITA EL STORE
import { useCounterStore } from "./store/counterStore";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

const App = () => {
  // EJECUTANDO LA FUNCION DEVUELVE TODO LO QUE TIENE EN EL ESTADO.
  //ACA ESTOY DICIENDO, DE TODOS LOS DATOS QUE TIENES EN STATE, DEVUELVE STATE.COUNT. EN ESTE CASO ESTOY TRAYENDO VALORES ATOMICOS
  // const count = useCounterStore((state) => state.count);
  // const title = useCounterStore((state) => state.title);

  //TAMBIEN PUEDO TRAERME EN UN OBJETO VARIAS COSAS DEL STATE, Y AL TRAERLAS EN UN OBJETO PUEDO CAMBIAR EL NOMBRE CON LAS QUE LAS VOY A GUARDAR
  const values = useCounterStore(
    (state) => ({
      count: state.count,
      title: state.title,
      posts: state.posts,
    }),
    shallow
  );

  //ESTA ES UNA FORMA DE TRAERLO
  // const incrementFunction = useCounterStore((state) => state.increment);

  //ESTA TAMBIEN, EL USECOUNTERSTORE DEVULEVE TODO LO QUE TIENE, Y DESESTRUCTURO LO QUE QUIERO
  const { incrementFunction, getPosts, multiply } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>
        {values.title}: {values.count}
      </h1>

      <button
        onClick={() => {
          incrementFunction(10);
        }}
      >
        Increment by 10
      </button>

      <button
        onClick={() => {
          multiply(2);
        }}
      >
        Multiply by 2
      </button>

      <section>
        {values.posts.map((value) => (
          <h4>{value.title}</h4>
        ))}
      </section>
    </div>
  );
};

export default App;
