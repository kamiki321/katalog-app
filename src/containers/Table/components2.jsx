import React from 'react';
import DataKategoriTable from './DataKategoriTable';

const Kategori1 = () => {
  const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
  const filterByKategori = 'Humas'; // Specify the 'satker' value to filter by

  return (
    <div>
      <h3>Humas</h3>
      <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
    </div>
  );
};

const Kategori2 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Hukum'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Hukum</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori3 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Umum'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Umum</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori4 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Administrasi'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Administrasi</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori5 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Kesehatan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Kesehatan</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori6 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'IT'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>IT</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori7 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Pengelolaan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Pengelolaan</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};

const Kategori8 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterByKategori = 'Geografi'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Geografi</h3>
        <DataKategoriTable apiUrl={apiUrl} filterBy={filterByKategori} />
      </div>
    );
};




export { Kategori1, Kategori2, Kategori3, Kategori4, Kategori5, Kategori6, Kategori7, Kategori8 };
