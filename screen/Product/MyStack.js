import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SQLite from 'react-native-sqlite-storage';
import ProductFlaxlist from './ProductFlaxlist';
import DetailProduct from '../DetailProduct';
import {AppState, Button, Image} from 'react-native';
import CartFlatlist from './CartFlaxlist';
import { Icons } from '../../constant';

const Stack = createNativeStackNavigator();

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
  },
);
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        moTa TEXT,
        soLuong INTEGER,
        image TEXT
      )`,
      [],
      () => {
        console.log('Table created successfully');
        insertInitialData();
      },
      error => {
        console.error('Error creating table: ', error);
      },
    );
  });
};
const createCartTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId TEXT,
        name TEXT,
        quantity INTEGER,
        image TEXT,
        moTa TEXT
      );`
    );
  });
};


const initialProducts = [
  {
    key: '1',
    name: 'Ca nấu lẩu, nấu mì mini1',
    moTa: '150.000đ',
    soLuong: '1',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      },
    ]),
  },
  {
    key: '2',
    name: 'Ca nấu lẩu, nấu mì mini2',
    moTa: '150.000đ',
    soLuong: '2',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      },
    ]),
  },
  {
    key: '3',
    name: 'Ca nấu lẩu, nấu mì mini3',
    moTa: '150.000đ',
    soLuong: '6',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
      },
    ]),
  },
  {
    key: '4',
    name: 'Ca nấu lẩu, nấu mì mini4',
    moTa: '150.000đ',
    soLuong: '5',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
      },
    ]),
  },
  {
    key: '5',
    name: 'Ca nấu lẩu, nấu mì mini5',
    moTa: '150.000đ',
    soLuong: '1',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
      },
    ]),
  },
  {
    key: '6',
    name: 'Ca nấu lẩu, nấu mì mini6',
    moTa: '150.000đ',
    soLuong: '3',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
      },
    ]),
  },
  {
    key: '7',
    name: 'Ca nấu lẩu, nấu mì mini7',
    moTa: '150.000đ',
    soLuong: '3',
    image: JSON.stringify([
      {
        uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
      },
      {
        uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
      },
      {
        uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
      },
    ]),
  },
];

const insertProduct = product => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Products (name, moTa, soLuong, image) VALUES (?, ?, ?, ?)`,
      [product.name, product.moTa, product.soLuong, product.image],
      (tx, results) => {
        console.log('Data inserted successfully: ', results);
      },
      error => {
        console.error('Error inserting data: ', error);
      },
    );
  });
};

// const insertInitialData = () => {
//   initialProducts.forEach(product => insertProduct(product));
// };
const deleteData = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM Products', [], (tx, results) => {
      console.log('Data deleted');
    });
  });
};
const deleteDataCart = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM cart', [], (tx, results) => {
      console.log('Data deleted');
    });
  });
};
// Lắng nghe sự kiện thay đổi trạng thái của ứng dụng
// AppState.addEventListener('change', nextAppState => {
//   if (nextAppState === 'inactive' || nextAppState === 'background') {
//     // Gọi hàm xóa dữ liệu khi ứng dụng bị đóng hoặc đưa vào nền
//     deleteData();
//     deleteDataCart();
//   }
// });
function MyStack() {
  useEffect(() => {
    createTable();
    createCartTable();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{title: 'Danh sách sản phẩm'}}
          component={ProductFlaxlist}
        />
        <Stack.Screen
          name="Details"
          options={{title: 'Thông tin chi tiết'}}
          component={DetailProduct}
        />
        <Stack.Screen
          name="Cart"
          options={{title: 'Giỏ hàng'}}
          component={CartFlatlist}
        />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

export default MyStack;
