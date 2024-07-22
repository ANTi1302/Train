import React from 'react';
import { Text, View, Image, Button } from 'react-native';

function ProductItem({ navigation, data = {} }) {
  const { image, name, moTa, soLuong } = data;

  if (!data) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Data is missing</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
      <Image source={image} style={{ width: 50, height: 50 }} />
      <View style={{ flexDirection: 'column', padding: 5 }}>
        <Text>{name}</Text>
        <Text style={{ color: 'red', paddingTop: 10 }}>{moTa}</Text>
        <Text style={{ color: 'red', paddingTop: 10 }}>SL: {soLuong}</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Button
        title="Mua"
        color="red"
        onPress={() => {
          console.log('Button pressed');
          navigation.navigate('Details', { image, name, moTa, soLuong });
        }}
      />
    </View>
  );
}

export default ProductItem;
