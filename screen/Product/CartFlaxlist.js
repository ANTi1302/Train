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
  const [productsOrigin, setProductsOrigin] = useState([]);
  const [refresh, setRefresh] = useState(false);
 
  // useEffect(() => {
  //   if(!products || !products.length) return;
  //   const listCart = products.map((p) => p.productId).join(',');
  //   console.log('----------------------');    
  //   console.log(JSON.parse(JSON.stringify(products)));
  //   console.log('----------------------');    

  //   db.transaction(tx => {
  //     tx.executeSql(
  //       `SELECT * FROM Products WHERE id IN (?)`,
  //       [listCart],
  //       (tx, results) => {
  //         if(results.rows){
  //           console.log(JSON.parse(JSON.stringify(results.rows)));
  //           setProductsOrigin([...results.rows]);
  //         } else {
  //           setProductsOrigin([]);
  //         }
  //       },
  //       error => {
  //         console.error('Error fetching data: ', error);
  //       }
  //     );
  //   });
  // }, [products]);

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
