import React from 'react';
export const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Oops! Halaman tidak ditemukan.</h1>
      <p style={styles.message}>
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Dikarenakan Hak akses yang terbatas. 
        Jika anda ingin meng-akses halaman ini, anda harus mempunyai hak-akes atau role 'Admin'.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f0f0f0', // Warna latar belakang abu-abu
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem',
  },
  message: {
    fontSize: '1rem',
    textAlign: 'center',
  },
};

