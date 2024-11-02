import React, { useState } from "react";
import { Button } from "antd";
import { FilterType } from "../../types/FilterType";

import "./filterButtons.css";

interface FilterButtonsProps {
  activeFilter?: FilterType;
  onFilterChange: (filterType: FilterType) => void;
  loading: boolean;
}

export default function FilterButtons({
  activeFilter,
  onFilterChange,
  loading,
}: FilterButtonsProps) {
  const [filter, setFilter] = useState<FilterType>(activeFilter || "main");

  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
    onFilterChange(filterType);
  };

  return (
    <div className="filter-buttons">
      <Button
        type="primary"
        onClick={() => handleFilterChange("main")}
        className={filter === "main" ? "active" : ""}
        loading={loading}
      >
        Todos
      </Button>
      <Button
        type="primary"
        onClick={() => handleFilterChange("people")}
        className={filter === "people" ? "active" : ""}
        loading={loading}
      >
        Personagens
      </Button>
      <Button
        type="primary"
        onClick={() => handleFilterChange("planets")}
        className={filter === "planets" ? "active" : ""}
        loading={loading}
      >
        Planetas
      </Button>
      <Button
        type="primary"
        onClick={() => handleFilterChange("starships")}
        className={filter === "starships" ? "active" : ""}
        loading={loading}
      >
        Naves
      </Button>
      <Button
        type="primary"
        onClick={() => handleFilterChange("films")}
        className={filter === "films" ? "active" : ""}
        loading={loading}
      >
        Filmes
      </Button>
    </div>
  );
}
