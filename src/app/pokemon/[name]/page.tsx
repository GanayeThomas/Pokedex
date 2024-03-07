"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface PokemonDetails {
  id: number; // Identifiant unique du Pokémon.
  name: string; // Nom du Pokémon.
  types: { type: { name: string } }[]; // Liste des types du Pokémon, chaque type ayant un nom.
  sprites: { front_default: string }; // Les sprites du Pokémon, avec ici uniquement le sprite de face par défaut.
  moves: { move: { name: string } }[]; // Liste des capacités du Pokémon, chaque capacité ayant un nom.
  description: string; // Description du Pokémon, ajoutée par rapport à la structure de base de l'API.
}

// Définition du composant fonctionnel PokemonDetailsPage.
const PokemonDetailsPage: React.FC = () => {
  // Déclaration de l'état pour stocker les détails du Pokémon, initialisé à null.
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    // Définition de la fonction asynchrone pour récupérer les détails du Pokémon sélectionné.
    const fetchPokemonDetails = async () => {
      try {
        // Extraction du nom du Pokémon à partir de l'URL de la page.
        const pathSegments = window.location.pathname.split("/");
        const pokemonName = pathSegments[pathSegments.length - 1];
        if (pokemonName) {
          // Première requête pour obtenir les informations de base du Pokémon.
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          // Seconde requête pour obtenir des informations supplémentaires de l'espèce, incluant la description.
          const speciesResponse = await axios.get(response.data.species.url);
          // Extraction de la description en français du Pokémon.
          const description = speciesResponse.data.flavor_text_entries.find(
            (entry: { language: { name: string } }) => entry.language.name === "fr"
          ).flavor_text;

          // Mise à jour de l'état avec les informations récupérées.
          setPokemonDetails({
            id: response.data.id,
            name: response.data.name,
            types: response.data.types,
            sprites: response.data.sprites,
            moves: response.data.moves,
            description: description,
          });
        }
      } catch (error) {
        // Gestion des erreurs éventuelles lors des requêtes.
        console.error(`Erreur lors de la récupération des détails :`, error);
      }
    };

    // Appel de la fonction de récupération des détails du Pokémon au montage du composant.
    fetchPokemonDetails();
  }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécutera qu'une fois après le premier rendu.

  // Affichage conditionnel : si les données du Pokémon ne sont pas encore chargées, afficher un message de chargement.
  if (!pokemonDetails) {
    return <div>Chargement...</div>;
  }

  // Rendu des détails du Pokémon une fois les données chargées.
  return (
    <div>
      <h1 className="text-center">{pokemonDetails.name}</h1>
      <p className="text-center">ID : {pokemonDetails.id}</p>
      <p className="text-center">
        Types : {pokemonDetails.types.map((type) => type.type.name).join(", ")}
      </p>
      <div className="flex justify-center">
        <img
          className="h-fit w-fit"
          src={pokemonDetails.sprites.front_default}
          alt={`${pokemonDetails.name} sprite`}
        />
      </div>
      <p className="text-center text-lg m-10">
        Description : {pokemonDetails.description}
      </p>
      <h2 className="text-center text-xl m-5 ">Capacités</h2>
      <ul className="flex flex-wrap justify-center gap-5 ">
        {pokemonDetails.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
};


export default PokemonDetailsPage;