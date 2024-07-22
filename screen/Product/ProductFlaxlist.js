import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import ProductItem from './ProductItem';
import { Icons } from '../../constant';

function ProductFlaxlist({ navigation }) {
  const [product, setProduct] = useState([
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
  ]);

  return (
    <FlatList
      data={product}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <ProductItem data={item} navigation={navigation} />}
    />
  );
}

export default ProductFlaxlist;
