import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';

export default class ContactsScreen extends Component {
  state = {
    contacts: null,
  };
  componentDidMount() {
    if (Platform.OS === 'ios') {
      Contacts.getAll((err, contacts) => {
        if (err) {
          throw err;
        }
        // contacts returned
        this.setState({ contacts });
      });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
          } else {
            // contacts returned in Array
            this.setState({ contacts });
          }
        });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View>
              {/* {console.warn('item', item)} */}
              <Text style={styles.contact_details}>
                Name: {`${item.givenName} `}
                {item.familyName}
              </Text>
              {item.phoneNumbers.map(phone => (
                <Text style={styles.phones}>
                  {phone.label} : {phone.number}
                </Text>
              ))}
            </View>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 30,
  },
  phones: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contact_details: {
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
});
