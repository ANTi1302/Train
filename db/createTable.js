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

// Tạo bảng sản phẩm nếu chưa tồn tại
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
      },
      error => {
        console.error('Error creating table: ', error);
      }
    );
  });
};

createTable();

const insertProduct = (product) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Products (name, moTa, soLuong, image) VALUES (?, ?, ?, ?)`,
      [product.name, product.moTa, product.soLuong, product.image],
      (tx, results) => {
        console.log('Data inserted successfully: ', results);
      },
      error => {
        console.error('Error inserting data: ', error);
      }
    );
  });
};

const initialProducts = [
    {
      key: '1',
      name: 'Ca nấu lẩu, nấu mì mini1',
      moTa: '150.000đ',
      soLuong: '1',
      image: Icons.ImageItem1Product,
    },
    {
      key: '2',
      name: 'Ca nấu lẩu, nấu mì mini2',
      moTa: '150.000đ',
      soLuong: '2',
      image: Icons.ImageItem1Product,
    },
    {
      key: '3',
      name: 'Ca nấu lẩu, nấu mì mini3',
      moTa: '150.000đ',
      soLuong: '6',
      image: Icons.ImageItem2Product,
    },
    {
      key: '4',
      name: 'Ca nấu lẩu, nấu mì mini4',
      moTa: '150.000đ',
      soLuong: '5',
      image: Icons.ImageItem3Product,
    },
    {
      key: '5',
      name: 'Ca nấu lẩu, nấu mì mini5',
      moTa: '150.000đ',
      soLuong: '1',
      image: Icons.ImageItem4Product,
    },
    {
      key: '6',
      name: 'Ca nấu lẩu, nấu mì mini6',
      moTa: '150.000đ',
      soLuong: '3',
      image: Icons.ImageItem5Product,
    },
    {
      key: '7',
      name: 'Ca nấu lẩu, nấu mì mini7',
      moTa: '150.000đ',
      soLuong: '3',
      image: Icons.ImageItem6Product,
    },
];

initialProducts.forEach(product => insertProduct(product));

