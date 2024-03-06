"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "@/interface";

interface PokemonDetailsProps {
  pokemonName: string;
}

const PokemonDetails: FC<PokemonDetailsProps> = ({ pokemonName }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (pokemonName) {

      Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      ]).then(([pokemonRes, speciesRes]) => {
        setPokemon(pokemonRes.data); 
        setDescription(speciesRes.data.flavor_text_entries[0].flavor_text);
      }).catch(error => {
        console.error("Erreur lors de la récupération des données du Pokémon: ", error);  
      });
    }
  }, [pokemonName]);
  return (
    <div>
      {pokemon ? (
        <div>
          <p className="flex justify-center"> #{pokemon.id}</p>
          <p className="flex justify-center">{pokemon.name}</p>
          <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>Description: {description}</p>
          <p>Sorts utilisables:</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PokemonDetails;