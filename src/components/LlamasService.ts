import { Llama } from "./Llama"

export async function fetchLlamas(): Promise<Llama[]> {
  return [
    {
      id: 1,
      name: "D'Artagnan",
    },
    {
      id: 1,
      name: "Athos",
    },
    {
      id: 1,
      name: "Porthos",
    },
    {
      id: 1,
      name: "Aramis",
    },
  ]
}
