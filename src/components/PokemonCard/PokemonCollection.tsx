import { Pokemon } from "@/interface";
import React from "react";
import PokemonList from "../PokemonList/PokemonList";

interface Props {
  pokemons: Pokemon[];
}

function PokemonCollection(props: Props) {
  const { pokemons } = props;

  return (
    <div>
        <div className="font-bold text-4xl text-center p-7">
          Pokedex
        </div>
      <div className="flex flex-wrap justify-center gap-10">
        {pokemons.map((pokemon) => (
          <div className="border border-black w-fit h-fit">
            <PokemonList
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}
              type={pokemon.types[0].type.name}
            />
        </div>
      ))}
    </div>
  </div>
  );
}

export default PokemonCollection;
