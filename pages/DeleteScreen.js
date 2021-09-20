import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Realm from 'realm';
import {useNavigation} from '@react-navigation/core';

const DeleteScreen = () => {
  const realm = new Realm({path: 'UserDatabase.realm'});
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();
  const deleteUser = () => {
    realm.write(() => {
      var ID = userId;
      if (
        realm.objects('user_details').filtered('user_id=' + userId).length > 0
      ) {
        realm.delete(
          realm.objects('user_details').filtered('user_id=' + userId),
        );

        var user_details = realm.objects('user_details');
        console.log(user_details);
        Alert.alert(
          'Success',
          'User deleted Successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Home'),
            },
          ],
          {cancelable: false},
        );
      } else {
        alert('Please insert a valid User ID');
      }
    });
  };
  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <TextInput
          style={{borderWidth: 0.4, bottom: 10}}
          placeholder="Enter User Id"
          //value={userId}
          onChangeText={text => setUserId(text)}
        />
        <Button title="Delete" onPress={deleteUser} />
      </View>
    </>
  );
};

export default DeleteScreen;

const styles = StyleSheet.create({});
