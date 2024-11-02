import axios from "axios";
import { FilterType } from "../types/FilterType";

const BASE_URL = "https://swapi.dev/api";

export const fetchAllData = async (endpoint: string) => {
  try {
    let results: any[] = [];
    let nextPage = `${BASE_URL}/${endpoint}`;

    while (nextPage) {
      const response = await axios.get(nextPage);
      results = results.concat(response.data.results);
      nextPage = response.data.next;
    }

    return results;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    return [];
  }
};

const fetchNameFromUrl = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.name || response.data.title;
  } catch (error) {
    console.error(`Erro ao buscar dados da URL ${url}:`, error);
    return null;
  }
};

const resolveReferences = async (item: any) => {
  const resolvedItem = { ...item };

  if (item.homeworld) {
    resolvedItem.homeworld = await fetchNameFromUrl(item.homeworld);
  }

  if (item.species) {
    resolvedItem.species = await Promise.all(item.species.map(fetchNameFromUrl));
  }

  if (item.vehicles) {
    resolvedItem.vehicles = await Promise.all(item.vehicles.map(fetchNameFromUrl));
  }

  if (item.starships) {
    resolvedItem.starships = await Promise.all(item.starships.map(fetchNameFromUrl));
  }

  if (item.characters) {
    resolvedItem.characters = await Promise.all(item.characters.map(fetchNameFromUrl));
  }

  if (item.films) {
    resolvedItem.films = await Promise.all(item.films.map(fetchNameFromUrl));
  }

  if (item.pilots) {
    resolvedItem.pilots = await Promise.all(item.pilots.map(fetchNameFromUrl));
  }

  if (item.planets) {
    resolvedItem.planets = await Promise.all(item.planets.map(fetchNameFromUrl));
  }

  return resolvedItem; 
};

export const fetchAllResources = async (filter?: FilterType) => {
  let allData: any[] = [];

  switch(filter) {
    case 'people':
      const peopleFilter = await fetchAllData("people");
      const resolvedPeopleFilter = await Promise.all(peopleFilter.map(item => resolveReferences(item)));
      allData = resolvedPeopleFilter.map(item => ({ ...item, type: "Pessoa" }));
      break;

    case 'planets':
      const planetsFilter = await fetchAllData("planets");
      const resolvedPlanetsFilter = await Promise.all(planetsFilter.map(item => resolveReferences(item)));
      allData = resolvedPlanetsFilter.map(item => ({ ...item, type: "Planeta" }));
      break;

    case 'starships':
      const starshipsFilter = await fetchAllData("starships");
      const resolvedStarshipsFilter = await Promise.all(starshipsFilter.map(item => resolveReferences(item)));
      allData = resolvedStarshipsFilter.map(item => ({ ...item, type: "Nave" }));
      break;

    case 'films':
      const filmsFilter = await fetchAllData("films");
      const resolvedFilmsFilter = await Promise.all(filmsFilter.map(item => resolveReferences(item)));
      allData = resolvedFilmsFilter.map(item => ({ ...item, type: "Filme" }));
      break;

    default:
      const [people, planets, starships, films] = await Promise.all([
        fetchAllData("people"),
        fetchAllData("planets"),
        fetchAllData("starships"),
        fetchAllData("films"),
      ]);
      
      const resolvedPeople = await Promise.all(people.map(resolveReferences));
      const resolvedPlanets = await Promise.all(planets.map(resolveReferences));
      const resolvedStarships = await Promise.all(starships.map(resolveReferences));
      const resolvedFilms = await Promise.all(films.map(resolveReferences));

      allData = [
        ...resolvedPeople.map(item => ({ ...item, type: "Pessoa" })),
        ...resolvedPlanets.map(item => ({ ...item, type: "Planeta" })),
        ...resolvedStarships.map(item => ({ ...item, type: "Nave" })),
        ...resolvedFilms.map(item => ({ ...item, type: "Filme" })),
      ];
  }

  return allData.sort((a, b) => {
    const nameA = a.name || a.title || "";
    const nameB = b.name || b.title || ""; 
    return nameA.localeCompare(nameB);
  });
};