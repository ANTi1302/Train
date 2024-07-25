import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import ProductItem from './ProductItem';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'productDatabase.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.error('Error opening database: ', error);
  }
);

function CartFlatlist({ navigation,onDelete }) {
  const [products, setProducts] = useState([]); 
  const [refresh, setRefresh] = useState(false);

  const fetchProductCart = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM cart`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let productsArray = [];
          for (let i = 0; i < rows.length; i++) {
            productsArray.push(rows.item(i));
          }
          console.log('Load lại cart : ' + productsArray.length);
          setProducts(productsArray);
        },
        error => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  };

  useEffect(() => {
    fetchProductCart();
   }, []);
  
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => 
        <ProductItem 
          data={item}
          navigation={navigation}
          onDelete={() => fetchProductCart()}
          />
      }
    />
  );
}

export default CartFlatlist;
