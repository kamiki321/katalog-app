import React from 'react';
import DataSatkerTable from './DataSatkerTable';

const Component1 = () => {
  const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
  const filterBySatker = 'Bainstrahan Kemhan'; // Specify the 'satker' value to filter by

  return (
    <div>
      <h3>Bainstrahan Kemhan</h3>
      <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
    </div>
  );
};

const Component2 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Baranahan Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Baranahan Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component3 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Biro Humas Setjen Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Biro Humas Setjen Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component4 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Biro Turdang Setjen Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Biro Turdang Setjen Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component5 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Ditjen Kuathan Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Ditjen Kuathan Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component6 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Ditjen Pothan Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Ditjen Pothan Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component7 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Ditjen Strahan Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Ditjen Strahan Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component8 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'lnspektorat Jenderal Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>lnspektorat Jenderal Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component9 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Pusdatin Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Pusdatin Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component10 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Puslaik Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Puslaik Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};

const Component11 = () => {
    const apiUrl = 'http://localhost:3333/api/v1/katalog/data';
    const filterBySatker = 'Pusrehab Kemhan'; // Specify the 'satker' value to filter by
  
    return (
      <div>
        <h3>Pusrehab Kemhan</h3>
        <DataSatkerTable apiUrl={apiUrl} filterBy={filterBySatker} />
      </div>
    );
};



export { Component1, Component2, Component3, Component4, Component5, Component6, Component7, Component8, Component9, Component10, Component11 };
