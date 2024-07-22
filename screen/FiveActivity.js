import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icons } from '../constant';

function FiveActivity({ route, navigation }) {
  const { image, name, moTa, soLuong } = route.params || {};

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <View style={{ flex: 25, flexDirection: 'column', backgroundColor: 'white', padding: 15 }}>
        <View style={{ flex: 25, flexDirection: 'row' }}>
          <Image source={image} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{name}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>
              {moTa}
            </Text>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 15 }}>{soLuong}</Text>
              <TouchableOpacity style={{ height: 25, width: 25, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={{ flex: 15, flexDirection: 'row', backgroundColor: 'white', padding: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              height: 40,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}> TIẾN HÀNH ĐẶT HÀNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FiveActivity;
