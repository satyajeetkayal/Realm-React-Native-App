import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import Realm from 'realm';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const realm = new Realm({path: 'UserDatabase.realm'});
  const [userName, setUsername] = useState('');
  const [userContact, setUsercontact] = useState('');
  const [userAddress, setUseraddress] = useState('');

  const navigation = useNavigation();
  const registerUser = () => {
    console.log(userName, userContact, userAddress);

    if (userName) {
      if (userContact) {
        if (userAddress) {
          realm.write(() => {
            var ID =
              realm.objects('user_details').sorted('user_id', true).length > 0
                ? realm.objects('user_details').sorted('user_id', true)[0]
                    .user_id + 1
                : 1;
            realm.create('user_details', {
              user_id: ID,
              user_name: userName,
              user_contact: userContact,
              user_address: userAddress,
            });
            Alert.alert(
              'Sucess',
              'You are registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          });
        } else {
          alert('Please Fill Address');
        }
      } else {
        alert('Please Fill Contact');
      }
    } else {
      alert('Please Fill Name');
    }
  };
  return (
    <>
      <TextInput
        placeholder="Username"
        style={{borderWidth: 0.5, margin: 10}}
        value={userName}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Contact number"
        style={{borderWidth: 0.5, margin: 10}}
        value={userContact}
        onChangeText={text => setUsercontact(text)}
      />
      <TextInput
        placeholder="Address"
        style={{borderWidth: 0.5, margin: 10}}
        value={userAddress}
        onChangeText={text => setUseraddress(text)}
        multiline={true}
        maxLength={225}
        numberOfLines={5}
      />
      <Button title="Submit" onPress={registerUser} />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
