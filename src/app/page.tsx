"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCollection from "@/components/PokemonCard/PokemonCollection";
import TypeFilter from "@/components/TypeFilter/TypeFilter";
import { Pokemon } from "@/interface";

// Définition de l'interface pour structurer les données de chaque Pokémon.
interface Pokemons {
  name: string;
  url: string;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    // Fonction asynchrone pour charger initialement les Pokémon
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
      setNextUrl(res.data.next);

      // Récupérer les détails de chaque Pokémon en parallèle
      const pokemonPromises = res.data.results.map((pokemon: Pokemons) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      );

      // Attendre que toutes les requêtes soient terminées
      const pokemonResults = await Promise.all(pokemonPromises);
      const newPokemons = pokemonResults.map((response) => response.data);

      // Filtrer les doublons en utilisant un Map
      const pokemonMap = new Map(pokemons.map((pokemon) => [pokemon.id, pokemon]));
      newPokemons.forEach((pokemon) => {
        if (!pokemonMap.has(pokemon.id)) {
          pokemonMap.set(pokemon.id, pokemon);
        }
      });

      // Mettre à jour l'état avec les nouveaux Pokémon, en éliminant les doublons
      setPokemons(Array.from(pokemonMap.values()));
    };

    getPokemon();
  }, []); // Le tableau de dépendances vide indique que cet effet ne s'exécute qu'au montage du composant

  const nextPage = async () => {
    // Vérifiez si nextUrl n'est pas vide pour éviter des appels inutiles
    if (nextUrl) {
      const res = await axios.get(nextUrl);
      setNextUrl(res.data.next);

      // Logique similaire à getPokemon pour gérer la pagination et les doublons
      const pokemonPromises = res.data.results.map((pokemon: Pokemons) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      );
      const pokemonResults = await Promise.all(pokemonPromises);
      const newPokemons = pokemonResults.map((response) => response.data);

      // Utilisez un Map pour mettre à jour l'état en évitant les doublons
      const pokemonMap = new Map(pokemons.map((pokemon) => [pokemon.id, pokemon]));
      newPokemons.forEach((pokemon) => {
        if (!pokemonMap.has(pokemon.id)) {
          pokemonMap.set(pokemon.id, pokemon);
        }
      });

      setPokemons(Array.from(pokemonMap.values()));
    }
  };

  // Gestion du changement de type de Pokémon
  const handleTypeChange = (type: string) => {
    setFilterType(type);
  };

  // Filtrage des Pokémon en fonction du type sélectionné
  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      filterType === "" || pokemon.types.some((t) => t.type.name === filterType)
  );

  // Rendu de l'interface utilisateur
  return (
    <main>
      <TypeFilter onTypeChange={handleTypeChange} />
      <PokemonCollection pokemons={filteredPokemons} />
      <button className="rounded-lg bg-gray-400 mt-5" onClick={nextPage}>
        Charger plus
      </button>
    </main>
  );
}
