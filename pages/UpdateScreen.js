import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import Realm from 'realm';
import {useNavigation} from '@react-navigation/native';

const UpdateScreen = () => {
  const realm = new Realm({path: 'UserDatabase.realm'});
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');
  const [userContact, setUsercontact] = useState('');
  const [userAddress, setUseraddress] = useState('');

  const searchUser = () => {
    console.log(userId);
    var user_details = realm
      .objects('user_details')
      .filtered('user_id=' + userId);
    console.log(user_details);

    if (user_details.length > 0) {
      setUsername(user_details[0].user_name);
      setUsercontact(user_details[0].user_contact);
      setUseraddress(user_details[0].user_address);
    } else {
      alert('No User found');
      setUsername('');
      setUsercontact('');
      setUseraddress('');
    }
  };

  const updateUser = () => {
    if (userName) {
      if (userContact) {
        if (userAddress) {
          realm.write(() => {
            var ID = userId;
            console.log('ID', ID);
            var obj = realm
              .objects('user_details')
              .filtered('user_id = ' + userId);
            console.log('obj', obj);
            if (obj.length > 0) {
              obj[0].user_name = userName;
              obj[0].user_contact = userContact;
              obj[0].user_address = userAddress;

              Alert.alert(
                'Success',
                'User Updated Successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {cancelable: false},
              );
            } else {
              alert('User Updation Failed');
            }
          });
        } else {
          alert('Please Enter Address');
        }
      } else {
        alert('Please Enter Contact');
      }
    } else {
      alert('Please Enter Username');
    }
  };

  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black', bottom: 10}}
          placeholder="Enter User Id"
          value={userId}
          onChangeText={text => setUserId(text)}
        />
        <Button title="Search" onPress={searchUser} />
      </View>

      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black'}}
          placeholder="Username"
          value={userName}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.5, borderColor: 'black'}}
          maxLength={10}
          keyboardType="numeric"
          placeholder="Contact Number"
          value={'' + userContact}
          onChangeText={text => setUsercontact(text)}
        />
      </View>
      <View style={{margin: 10}}>
        <TextInput
          style={{borderWidth: 0.3, borderColor: 'black', bottom: 10}}
          multiline={true}
          maxLength={225}
          numberOfLines={5}
          placeholder="Address"
          value={userAddress}
          onChangeText={text => setUseraddress(text)}
        />
        <Button title="Update" onPress={updateUser} />
      </View>
    </>
  );
};
export default UpdateScreen;

const styles = StyleSheet.create({});
