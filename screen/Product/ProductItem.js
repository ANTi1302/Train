import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity, Image, Modal } from 'react-native';
import ImageView from 'react-native-image-viewing';
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

function ProductItem({ navigation, data = {} ,onDelete }) {
  const { id, image, name, moTa, soLuong} = data;
  const { productId, quantity} = data;
  const [visible, setIsVisible] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoUri, setVideoUri] = useState('');
  const [quantityUpdate, setQuantityUpdate] = useState(quantity);

  
  let mediaItems;
  try {
    mediaItems = JSON.parse(image);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    mediaItems = [];
  }

  const thumbnail = mediaItems.length > 0 ? mediaItems[0].uri : null;

  if (!data) {
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

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM cart;`,
        [],
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          console.log('Chạy lại khi nhấn nút xóa')
          if (onDelete) {
            console.log('Callback ???c g?i!')
            onDelete(); // Call the onDelete callback to refresh the FlatList
          }
          setCartItems(items);
          
        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    });
  };


  

  const handleDelete = (id) => {
    console.log('Attempting to delete item with id:', id);
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM cart WHERE id = ?;`,
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Item deleted successfully');
            
            // if (onDelete) onDelete(); // Execute the onDelete callback
            fetchCartItems(); // Cập nhật danh sách sau khi xóa
            
          } else {
            console.log('Failed to delete item with id:', id);
          }
        },
        error => {
          console.error('Error deleting item:', error);
        }
      );
    });
  };
  
  const updateQuantity = (productId, newQuantity) => {
    // if (newQuantity < 1 || product.soLuong < newQuantity) return;    
    if (newQuantity < 1) return;


    db.transaction(tx => {
      tx.executeSql(
        `UPDATE cart SET quantity = ? WHERE id = ?;`,
        [newQuantity, productId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Quantity updated successfully');
            fetchCartItems();

            setQuantityUpdate(newQuantity);
          } else {
            console.log('Failed to update quantity for product with id:', productId);
          }
        },
        error => {
          console.error('Error updating quantity:', error);
        }
      );
    });
  };

  return (
    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
      <Text style={{ paddingRight: 10 }}>{id}</Text>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={{ width: 100, height: 100 }} />
        )}
        <View style={{flexDirection:'row', width:50, height:50, borderRadius:50}}>
        {renderMedia()}
      </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'column', padding: 5 }}>
        <Text>{name}</Text>
        <Text style={{ color: 'red', paddingTop: 10 }}>{moTa}</Text>
        {quantity? 
        <View style={{flexDirection:'row'}}> 
        <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }} onPress={() => updateQuantity(id, quantity - 1)}>
                <Text>-</Text>
        </TouchableOpacity>
              <Text style={{ marginHorizontal: 15 }}>{quantityUpdate}</Text>
              <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }} onPress={() => updateQuantity(id, quantity + 1)}>
                <Text>+</Text>
              </TouchableOpacity></View>
              :
              <View>
              <Text style={{ color: 'red', paddingTop: 10 }}>SL:{soLuong}</Text>
              </View>
          }
      </View>
      <View style={{ flex: 1 }} />
      <Button
        title={soLuong?"Mua":"Xóa"}
        color="red"
        onPress={() => {
          if(quantity){
           
          handleDelete(id)
          }else{
            navigation.navigate('Details', { image, name, moTa, soLuong });
          }
        }}
        
      />
      
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

export default ProductItem;
