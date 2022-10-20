import { useState } from 'react'
import { Loading } from '../components/Loading'
import { PokemonListRow } from '../components/PokemonListRow'
import { usePokemon } from '../hooks/usePokemon'
import { Pokemon } from '../interfaces/fetchAllPokemonsResponse'

export const HomePage = () => {

    const { isLoading, pokemons } = usePokemon()
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    const filteredPokemons = ():  Pokemon[] => {
        if (search.length === 0)
            return pokemons.slice(currentPage, currentPage + 5)

        // Si hay algo en la caja de texto
        const filtered = pokemons.filter( poke => poke.name.includes(search))

        return filtered.slice(currentPage, currentPage + 5)
    }

    const nextPage = () => {
        if (pokemons.filter( poke => poke.name.includes(search)).length > currentPage +5 )
        setCurrentPage( currentPage + 5)
    }

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage( currentPage - 5)
        }
    }

    const onSearchChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setSearch(value)

    return (
        <div className="mt-5">
            <h1>Listado de Pokemons</h1>
            <hr />

            <input 
                type="text" 
                className="mb-2 form-control"
                placeholder="Buscar Pokemon"
                value={ search }
                onChange={ onSearchChange }
            />

            <div className="d-flex justify-content-center">
                <button 
                    className="btn btn-primary"
                    onClick={ previousPage }
                >anterior</button>

                <div style={{ width: '5px' }}></div>

                <button 
                    className="btn btn-primary"
                    onClick={ nextPage }
                >siguiente</button>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th style={{ width: "20%"}}>ID</th>
                        <th style={{ width: "40%"}}>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        filteredPokemons().map(poke => <PokemonListRow key={ poke.id } {...poke} />)
                    }

                </tbody>
            </table>

            {
                isLoading && <Loading />
            }
                
        </div>
    )
}
