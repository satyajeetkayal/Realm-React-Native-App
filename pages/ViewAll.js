import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Realm from 'realm';

const ViewAll = () => {
  const [data, setData] = useState([]);

  const realm = new Realm({path: 'UserDatabase.realm'});
  useEffect(() => {
    const user_details = realm.objects('user_details');
    console.log(user_details);
    setData(user_details);
  }, []);
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View key={item.user_id}>
            <Text>{item.user_id}</Text>
            <Text>{item.user_name}</Text>
            <Text>{item.user_contact}</Text>
            <Text>{item.user_address}</Text>
          </View>
        )}
      />
    </>
  );
};

export default ViewAll;

const styles = StyleSheet.create({});
