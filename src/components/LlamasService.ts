import { Llama } from "./Llama"

export async function fetchLlamas(): Promise<Llama[]> {
  return [
    {
      id: 1,
      name: "D'Artagnan",
    },
    {
      id: 2,
      name: "Athos",
    },
    {
      id: 3,
      name: "Porthos",
    },
    {
      id: 4,
      name: "Aramis",
    },
  ]
}
