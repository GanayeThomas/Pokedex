import React from "react";

interface TypeFilterProps {
  onTypeChange: (value: string) => void;
}

function TypeFilter({ onTypeChange }: TypeFilterProps) {
  const pokemonTypes = [
    "water",
    "fire",
    "grass",
    "electric",
    "psychic",
    "normal",
    "fighting",
    "poison",
    "ground",
    "flying",
    "bug",
    "rock",
    "ghost",
    "ice",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];
  return (
      <select className="rounded-lg bg-gray-400 p-2"onChange={(e) => onTypeChange(e.target.value)} defaultValue="">
        <option value="">All types</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type.toLowerCase()}>
            {type}
          </option>
        ))}
      </select>

  );
}

export default TypeFilter;
