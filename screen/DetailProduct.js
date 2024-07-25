import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Modal } from 'react-native';
import { Icons } from '../constant';
import ImageView from "react-native-image-viewing";
import Video from 'react-native-video';
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

const addToCart = (productId, name, quantity, image, moTa) => { 
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO cart (productId, name, quantity, image, moTa) VALUES (?, ?, ?, ?, ?)`,
      [productId, name, quantity, image, moTa],
      (txObj, resultSet) => {
        // navigation.navigate('Cart');
        console.log('Product added to cart:', resultSet.insertId);
      },
      (txObj, error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  });
};

function DetailProduct({ route, navigation }) {
  const [visible, setIsVisible] = useState(false);
  const {id, image, name, moTa } = route.params || {};
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoUri, setVideoUri] = useState('');
  const [quantity, setQuantity] = useState( 1);
  const [soLuongTonKho, setsoLuongTonKho] = useState(route.params.soLuong);
let mediaItems;
  try {
    mediaItems = JSON.parse(image);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    mediaItems = [];
  }

  const thumbnail = mediaItems.length > 0 ? mediaItems[0].uri : null;

  if (!route) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Data is missing</Text>
      </View>
    );
  }

  const renderMedia = () => {
    return mediaItems.map((item, index) => {
      if (item.uri.includes('.mp4')) {
        return (
          <TouchableOpacity key={index} onPress={() => {
            setVideoUri(item.uri);
            setVideoVisible(true);
          }}>
            <View style={{ width: 40, height: 30, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>Video</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity key={index} onPress={() => {
            setCurrentMediaIndex(index);
            setIsVisible(true);
          }}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        );
      }
    });
  };
  const handleIncrement = () => {
    if(soLuongTonKho<= quantity)return;
    setQuantity(prev => prev+1)
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
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
      <View style={{ flex: 25, flexDirection: 'column', backgroundColor: 'white', padding: 15 }}>
        <View style={{ flex: 25, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={{ width: 100, height: 100 }} />
        )}
        <View style={{flexDirection:'row', width:50, height:50, borderRadius:50}}>
        {renderMedia()}
      </View>
      </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{name}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>
              {moTa}
            </Text>
            <View style={{ flexDirection: 'row', padding: 10 }}>
            <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }} onPress={handleDecrement}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 15 }}>{quantity}</Text>
              <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }} onPress={handleIncrement}>
                <Text>+</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <Text style={{ color: '#134FEC', fontWeight: 'bold' }}>Mua sau</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 20, flexDirection: 'row' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', paddingTop: 30, fontSize: 12, marginTop: 10 }}>
            Mã giảm giá đã lưu
          </Text>
          <Text style={{ color: 'blue', fontWeight: 'bold', paddingLeft: 10, paddingTop: 30, fontSize: 12, marginTop: 10 }}>
            Xem tại đây
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 200,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 25, width: 60, backgroundColor: '#F2DD1B' }}></View>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}> Mã giảm giá</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              backgroundColor: '#0A5EB7',
              height: 40,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> Áp dụng</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 15 }}>
          <View style={{ flex: 20, flexDirection: 'row', paddingTop: 10 }}>
            <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 12 }}>
              Bạn có phiếu quà tặng Tiki/Got it/ Urbox?
            </Text>
            <Text style={{ fontWeight: 'bold', padding: 10, color: '#134FEC', fontSize: 12 }}>
              Nhập tại đây?
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 5, backgroundColor: 'white' }}>
        <View style={{ flex: 20, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 18, color: 'black' }}>
            Tổng tính
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={{ color: 'red', fontWeight: 'bold', padding: 10, fontSize: 20 }}>
           {moTa}
          </Text>
        </View>
      </View>
      <View style={{ flex: 15, backgroundColor: 'white' }}></View>
      <View style={{ flex: 10 }}>
        <View style={{ flex: 15, flexDirection: 'row', backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 17 }}>
            Thành tiền
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={{ color: 'red', fontWeight: 'bold', padding: 10, fontSize: 17 }}>
            {moTa}
          </Text>
        </View>
        <View style={{ flexDirection:'column'}}>
        <View style={{ backgroundColor: 'white', padding: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              height: 40,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {addToCart( id, name, quantity,image, moTa);
              // Điều hướng hoặc thông báo thành công
              navigation.navigate('Cart'); // Hoặc bất kỳ hành động nào khác bạn muốn thực hiện
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}> Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
          <Button
          color="red"
            style={{
              
              height: 40,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title='QUAY LẠI'
            onPress={() => {
          console.log('Button pressed');
          navigation.navigate('Home');
        }}
          >
           
          </Button>
        </View>
        </View>
      </View>
      <ImageView
        images={mediaItems.filter(item => !item.uri.includes('.mp4')).map(item => ({ uri: item.uri }))}
        imageIndex={currentMediaIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <Modal
        visible={videoVisible}
        transparent={true}
        onRequestClose={() => setVideoVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <Video
            source={{ uri: videoUri }}
            style={{ width: '100%', height: '100%' }}
            controls={true}
            resizeMode="contain"
          />
          <Button title="Close" onPress={() => setVideoVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

export default DetailProduct;