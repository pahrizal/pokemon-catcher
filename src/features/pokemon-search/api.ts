import { APIResource, Pokemon, PokemonClient } from 'pokenode-ts'

export interface PokemonListItem extends APIResource {
  name: string
}

const api = new PokemonClient()

export default async function search(
  query: string = '',
  offset: number = 0,
  limit: number = 100000
) {
  const output: Pokemon[] = []
  // fetch list of pokemons names
  // we use limit 100000 to make sure all pokemons are fetched
  // since pokenode-ts cache the results, we are save to do this
  // at this moment :))
  const res = await api.listPokemons(offset, limit)
  const results = res.results as PokemonListItem[]
  const filtered: PokemonListItem[] = results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )
  for (const pokemon of filtered) {
    const pokemonSearch = await api.getPokemonByName(pokemon.name)
    output.push(pokemonSearch)
  }
  const total_pages = output.length / limit
  return { total_pages, data: output }
}

export async function searchPokemonById(id: number) {
  console.log('searching pokemon by id', id)
  const result = await api.getPokemonById(id)
  console.log(result)
  return result
}
