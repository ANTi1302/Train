import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const ImageVideoSlider = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState('');

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item); // Log d? li?u c?a t?ng item

    if (item.type === 'video') {
      return (
        <TouchableOpacity onPress={() => {
          setModalVideoUrl(item.url);
          setIsModalVisible(true);
        }}>
          <View >
            <Video
              source={{ uri: item.url }}
              
              resizeMode="cover"
              paused
              repeat
            />
            <Text>Tap to watch video</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View >
          <Image source={{ uri: item.url }} />
        </View>
      );
    }
  };

  return (
    <View >
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        layout={'default'}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        
      >
        <Video
          source={{ uri: modalVideoUrl }}
        
          resizeMode="contain"
          controls
        />
      </Modal>
    </View>
  );
};

export default ImageVideoSlider;
