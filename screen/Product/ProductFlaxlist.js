import React, { useState, useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import ProductItem from './ProductItem';
import SQLite from 'react-native-sqlite-storage';
import { Icons } from '../../constant';
import { useNavigation } from '@react-navigation/native';

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

function ProductFlatlist() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = () => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Products`,
          [],
          (tx, results) => {
            const rows = results.rows;
            let productsArray = [];
            for (let i = 0; i < rows.length; i++) {
              productsArray.push(rows.item(i));
            }
            setProducts(productsArray);
          },
          error => {
            console.error('Error fetching data: ', error);
          }
        );
      });
    };

    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity 
        style={{ position: 'absolute', right: 10, top: 560, zIndex: 1 }}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      >
        <Image 
          source={Icons.Bonus} 
          style={{ width: 40, height: 40, borderRadius:50 }} 
        />
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductItem data={item} navigation={navigation} />}
      />
    </View>
  );
}

export default ProductFlatlist;
