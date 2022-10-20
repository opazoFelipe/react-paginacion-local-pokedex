import { Pokemon } from "../interfaces/fetchAllPokemonsResponse"

export const PokemonListRow = ({ id, name, pic }: Pokemon) => {
    return (
        <tr>
            <td className="align-middle">{ id }</td>
            <td className="align-middle">{ name }</td>
            <td className="align-middle">
                <img src={ pic } alt="poke image" />
            </td>
        </tr>
    )
}
