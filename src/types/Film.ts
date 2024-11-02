export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];   // Array de URLs dos personagens
    planets: string[];      // Array de URLs dos planetas
    starships: string[];    // Array de URLs das naves
    vehicles: string[];     // Array de URLs dos veículos
    species: string[];      // Array de URLs das espécies
    created: string;
    edited: string;
    url: string;
  }
  