import pokemonApi from "../api/pokemonApi"
import { FetchAllPokemonsResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonsResponse"

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {

    const resp = await pokemonApi.get<FetchAllPokemonsResponse>('/pokemon?limit=101')
    const smallPokemonList = resp.data.results

    return transformSmallPokemonIntoPokemonList(smallPokemonList)
}

const transformSmallPokemonIntoPokemonList = ( smallPokemonList: SmallPokemon[]): Pokemon[] => {

    const pokemonArr = smallPokemonList.map( poke => {

        const id = poke.url.split('/')[6]
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return {
            id,
            pic,
            name: poke.name
        }
    })

    return pokemonArr
}