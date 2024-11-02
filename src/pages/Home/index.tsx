import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Input, Spin } from "antd";
import FilterButtons from "../../components/FilterButtons";
import { DataItem } from "../../types/DataItem";
import { fetchAllResources } from "../../services/useData";
import { FilterType } from "../../types/FilterType";

import "./home.css";

const { Search } = Input;

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType>("main");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allData =
        filter === "main"
          ? await fetchAllResources()
          : await fetchAllResources(filter);
      const formattedData: DataItem[] = allData.map((item) => ({
        key: item.url,
        name: item.name || item.title,
        type: item.type,
        details: generateDetails(item),
        fullDetails: generateFullDetails(item),
      }));
      setData(formattedData);
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  const handleFilterChange = (filterType: FilterType) => setFilter(filterType);

  const generateDetails = (item: any) => {
    const detailsMap: { [key: string]: string } = {
      Pessoa: `Nome: ${item.name} | Altura: ${item.height} | Peso: ${item.mass} | Cabelo: ${item.hair_color} | Pele: ${item.skin_color}`,
      Planeta: `Nome: ${item.name} | Rotação: ${item.rotation_period} | Diâmetro: ${item.diameter} | Clima: ${item.climate}`,
      Nave: `Nome: ${item.name} | Modelo: ${item.model} | Custo: ${item.cost_in_credits} | Comprimento: ${item.length}`,
      Filme: `Título: ${item.title} | Episódio: ${item.episode_id} | Diretor: ${item.director} | Lançamento: ${item.release_date}`,
    };
    return detailsMap[item.type] || "Detalhes desconhecidos";
  };

  const generateFullDetails = (item: any) => {
    const fullDetailsMap: { [key: string]: string } = {
      Pessoa: `Nome: ${item.name} | Altura: ${item.height} | Peso: ${item.mass} | Cabelo: ${item.hair_color} | Pele: ${item.skin_color} | Olho: ${item.eye_color} | Data de nascimento: ${item.birth_year} | Sexo: ${item.gender} | Planeta natal: ${item.homeworld} | Espécie: ${item.species} | Veículos: ${item.vehicles} | Naves: ${item.starships}`,
      Planeta: `Nome: ${item.name} | Período de rotação: ${item.rotation_period} | Período de órbita: ${item.orbital_period} | Diâmetro: ${item.diameter} | Clima: ${item.climate} | Gravidade: ${item.gravity} | Terreno: ${item.terrain} | Água de superfície: ${item.surface_water} | População: ${item.population} | Residentes: ${item.residents} | Filmes: ${item.films}`,
      Nave: `Nome: ${item.name} | Modelo: ${item.model} | Fabricante: ${item.manufacturer} | Custo: ${item.cost_in_credits} | Comprimento: ${item.length} | Velocidade máxima: ${item.max_atmosphering_speed} | Tripulação: ${item.crew} | Passageiros: ${item.passengers} | Capacidade de carga: ${item.cargo_capacity} | Consumíveis: ${item.consumables} | Classificação de hiperespaço: ${item.hyperdrive_rating} | Classe da nave: ${item.starship_class} | Pilotos: ${item.pilots} | Filmes: ${item.films}`,
      Filme: `Título: ${item.title} | Episódio: ${item.episode_id} | Diretor: ${item.director} | Produtor: ${item.producer} | Ano de lançamento: ${item.release_date} | Personagens: ${item.characters} | Planetas: ${item.planets} | Naves: ${item.starships} | Veículos: ${item.vehicles} | Espécies: ${item.species}`,
    };
    return fullDetailsMap[item.type] || "Detalhes desconhecidos";
  };

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Tipo", dataIndex: "type", key: "type" },
    { title: "Detalhes", dataIndex: "details", key: "details" },
    {
      title: "Ações",
      key: "actions",
      render: (text: string, record: DataItem) => (
        <Button onClick={() => showModal(record)}>Ver Detalhes</Button>
      ),
    },
  ];

  const showModal = (item: DataItem) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    if (value.length >= 3) setSearchTerm(value);
    else setSearchTerm("");
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: "center" }}>Banco de Dados Star Wars</h1>
      <FilterButtons
        activeFilter={filter}
        onFilterChange={handleFilterChange}
        loading={loading}
      />
      <Search
        placeholder="Buscar Dados Star Wars"
        enterButton="Buscar"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          bordered
          pagination={{ pageSize: 10 }}
          rowKey="key"
        />
      )}
      <Modal
        title="Detalhes"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>,
        ]}
      >
        {selectedItem && (
          <>
            <p>
              <strong>Nome:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Informações Adicionais:</strong>{" "}
              {selectedItem.fullDetails}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}
