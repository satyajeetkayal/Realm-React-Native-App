import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Realm from 'realm';

const ViewScreen = () => {
  const [Data, setData] = useState([]);
  const [userId, setUserId] = useState('');

  const realm = new Realm({path: 'UserDatabase.realm'});
  const viewUser = () => {
    console.log(userId);
    var user_details = realm
      .objects('user_details')
      .filtered('user_id=' + userId);
    console.log(user_details);
    if (user_details.length > 0) {
      setData(user_details[0]);
    } else {
      alert('User Not Found.');
      setData('');
    }
  };
  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <TextInput
          style={{borderWidth: 0.4, bottom: 10}}
          placeholder="Enter User Id"
          onChangeText={text => setUserId(text)}
        />
        <Button title="View" onPress={viewUser} />
      </View>
      <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
        <Text>{Data.user_id}</Text>
        <Text>{Data.user_name}</Text>
        <Text>{Data.user_contact}</Text>
        <Text>{Data.user_address}</Text>
      </View>
    </>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({});
