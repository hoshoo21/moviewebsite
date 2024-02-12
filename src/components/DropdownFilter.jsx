import React, { useState } from 'react';
import Select from 'react-select';
import './DropdownFilter.css';
const DropdownFilter = ({ Genres, Countries, handleAvanceSearch }) => {
  const [filter, setFilter] = useState('');
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleSearch = (evt) => {
    evt.preventDefault();
    handleAvanceSearch(country, filter, year);
  };
  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: '#1e2022',
      backgroundColor: state.isSelected ? 'rgba(189,197,209,.3)' : 'white',
      padding: '.5rem 3rem .5rem .5rem',
      cursor: 'pointer',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };
  let generes = Genres.map((Genre, idx) => {
    return { value: `${Genre.id}`, label: `${Genre.name}` };
  });

  let countryoptions = Countries.map((Country, idx) => {
    return { value: `${Country.iso_3166_1}`, label: `${Country.english_name}` };
  });

  const getYears = () => {
    let years = [];
    for (let i = 1930; i < 2024; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  };

  return (
    <div style={{ marginTop: '4rem', marginLeft: '10rem' }}>
      <div className="flex-row-container-filter">
        <div className="flex-row-item">
          <label htmlFor="filter">Genre: </label>
          <Select
            id="ddlfilter"
            name="filter"
            onChange={setFilter}
            styles={customStyles}
            options={generes}
          />
        </div>

        <div className="flex-row-item">
          <label htmlFor="year">Year: </label>
          <Select
            id="ddlyear"
            name="Year"
            onChange={setYear}
            styles={customStyles}
            options={getYears()}
          />
        </div>
        <div className="flex-row-item">
          <label htmlFor="year">Country: </label>
          <Select
            id="ddlContry"
            name="Contry"
            onChange={setCountry}
            styles={customStyles}
            options={countryoptions}
          />
        </div>
        <div className="flex-row-item">
          <label htmlFor=""> </label>
          <button
            style={{
              backgroundColor: 'teal',
              marginTop: '2rem',
              marginLeft: '-13rem',
            }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;
