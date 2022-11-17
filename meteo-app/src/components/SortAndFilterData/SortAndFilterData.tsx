import React, { useState } from "react";
import { WeatherReport } from "../WeatherDataDisplay/WeatherDataDisplay";
import "./SortAndFilterData.scss";

export type SortState = "default" | "ascending" | "descending";
export type SortValue = "temperature" | "city" | "date";

interface SortAndFilterDataProps {
  sortState: SortState;
  setSortState: React.Dispatch<React.SetStateAction<SortState>>;
  setSortValue: React.Dispatch<React.SetStateAction<SortValue>>;
  weatherData: WeatherReport[];
  filterState: string;
  setFilterState: React.Dispatch<React.SetStateAction<string>>;
}

export const SortAndFilterData = ({
  sortState,
  setSortState,
  setSortValue,
  weatherData,
  filterState,
  setFilterState,
}: SortAndFilterDataProps) => {
  const [showSelect, setShowSelect] = useState(false);

  const changeSortValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilterState("default");
    setSortValue(e.currentTarget.value as SortValue);
    setShowSelect(true);
    setSortState("default");
  };

  return (
    <div className="sortAndFilterData">
      <div className="sortAndFilterData__sort">
        <p>Sort by:</p>
        <button
          className="sortAndFilterData__sort-btn"
          value="temperature"
          onClick={changeSortValue}
        >
          temp
        </button>
        <button
          className="sortAndFilterData__sort-btn"
          value="date"
          onClick={changeSortValue}
        >
          date
        </button>
        <button
          className="sortAndFilterData__sort-btn"
          value="city"
          onClick={changeSortValue}
        >
          city
        </button>
        {showSelect && (
          <select
            className="sortAndFilterData__sort-select"
            value={sortState}
            onChange={(e) => setSortState(e.target.value as SortState)}
          >
            <option value="default" disabled>
              default
            </option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </select>
        )}
      </div>
      <div className="sortAndFilterData__filter">
        <p>Filter by City:</p>
        <select
          className="sortAndFilterData__filter-select"
          value={filterState}
          onChange={(e) => {
            setFilterState(e.target.value);
            setShowSelect(false);
          }}
        >
          <option value="default">default</option>
          {weatherData.map((weatherData) => {
            return (
              <option value={weatherData.city} key={weatherData.id}>
                {weatherData.city}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
