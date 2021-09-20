import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Realm from 'realm';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: {type: 'int', default: 0},
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });
  }, []);
  return (
    <>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="Update" onPress={() => navigation.navigate('Update')} />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="View" onPress={() => navigation.navigate('View')} />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button
          title="View All"
          onPress={() => navigation.navigate('ViewAll')}
        />
      </View>
      <View
        style={{
          margin: 10,
          padding: 10,
          width: Dimensions.get('window').width - 20,
        }}>
        <Button title="Delete" onPress={() => navigation.navigate('Delete')} />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
