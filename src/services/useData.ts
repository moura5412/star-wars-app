import axios from "axios";
import { FilterType } from "../types/FilterType";

const BASE_URL = "https://swapi.dev/api";
const cache: Record<string, string | null> = {};

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
  if (cache[url]) return cache[url];
  
  try {
    const response = await axios.get(url);
    const name = response.data.name || response.data.title;
    cache[url] = name || null;
    return name;
  } catch (error) {
    console.error(`Erro ao buscar dados da URL ${url}:`, error);
    return null;
  }
};

const resolveReferences = async (item: any) => {
  const resolvedItem = { ...item };

  const referenceFields = ["homeworld", "species", "vehicles", "starships", "characters", "films", "pilots", "planets"];
  
  await Promise.all(referenceFields.map(async field => {
    if (item[field]) {
      const urls = Array.isArray(item[field]) ? item[field] : [item[field]];
      const resolvedNames = await Promise.all(urls.map(fetchNameFromUrl));
      resolvedItem[field] = Array.isArray(item[field]) ? resolvedNames : resolvedNames[0];
    }
  }));

  return resolvedItem;
};

export const fetchAllResources = async (filter?: FilterType) => {
  let allData: any[] = [];

  const processAndResolveData = async (endpoint: string, typeLabel: string) => {
    const data = await fetchAllData(endpoint);
    const resolvedData = await Promise.all(data.map(resolveReferences));
    return resolvedData.map(item => ({ ...item, type: typeLabel }));
  };

  switch(filter) {
    case 'people':
      allData = await processAndResolveData("people", "Pessoa");
      break;
    case 'planets':
      allData = await processAndResolveData("planets", "Planeta");
      break;
    case 'starships':
      allData = await processAndResolveData("starships", "Nave");
      break;
    case 'films':
      allData = await processAndResolveData("films", "Filme");
      break;
    default:
      const [people, planets, starships, films] = await Promise.all([
        processAndResolveData("people", "Pessoa"),
        processAndResolveData("planets", "Planeta"),
        processAndResolveData("starships", "Nave"),
        processAndResolveData("films", "Filme"),
      ]);

      allData = [...people, ...planets, ...starships, ...films];
  }

  return allData.sort((a, b) => {
    const nameA = a.name || a.title || "";
    const nameB = b.name || b.title || ""; 
    return nameA.localeCompare(nameB);
  });
};
