import { Llama } from "./Llama"

export async function fetchLlamas(): Promise<Llama[]> {
  return [
    {
      id: 1,
      name: "D'Artagnan",
      leashColor: "red",
    },
    {
      id: 2,
      name: "Athos",
      leashColor: "green",
    },
    {
      id: 3,
      name: "Porthos",
      leashColor: "blue",
    },
    {
      id: 4,
      name: "Aramis",
      leashColor: "yellow",
    },
  ]
}
