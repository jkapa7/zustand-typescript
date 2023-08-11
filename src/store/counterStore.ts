//ESTA FUNCION PERMITE CREAR UN ESTADO
import { create } from "zustand";

interface Post {
  id: number;
  title: string;
  body: string;
}

//DEFINO LA INTERFACE PARA ESTABLECER QUE VALORES LLEVARA EN ESTE CASO MI STORE
interface CounterState {
  count: number;
  title: string;
  incrementFunction: (value: number) => void;
  posts: Post[];
  getPosts: () => Promise<void>;
  multiply: (value: number) => void;
}

//EXPORTO ESTE ESTADO, TIENE UN COUNT 10, YA PUEDO ACCEDER A EL DESDE OTROS COMPONENTES
//ESTE ES EL UNICO OBJETO QUE SE VA A REQUERIR EN OTROS LADOS, POR LO QUE LAS "ACTIONS" QUE LO MODIFICAN TAMBIEN VAN EN EL,
export const useCounterStore = create<CounterState>((set, get) => ({
  count: 20,
  title: "Some title",
  //ESTA SERIA LA "ACTION". CREATE NOS DA EL METODO SET, PARA PODIFICAR VALORES DEL STATE
  incrementFunction: (value: number) =>
    set((state) => ({
      count: state.count + value,
    })),

  posts: [],

  getPosts: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    console.log(posts);
    set((state) => ({
      ...state,
      posts,
    }));
  },

  multiply: (value: number) => {
    //EL METODO GET TAMBIEN ES DE ZUSTAND, ME TRAE TODO LO QUE ESTE EN EL STATE
    const { count } = get();
    set({ count: count * value });
  },
}));
