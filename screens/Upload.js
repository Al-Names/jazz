import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

import { LinearGradient } from 'expo-linear-gradient';


export default function Upload() {

   const [card, setCard] = useState([{
      // id: uuid.v3(), 
      text:"",
      favorite: false
    }]);
    const [newCard ] = useState([]);

   const navigation = useNavigation()

    const saveCard = async () => {
    
        const value = await AsyncStorage.getItem("CARDS")
	    	// const n = value ? JSON.parse(value) : []
        let n = []
        // n = value ? JSON.parse(value) : []
	    	n.push(newCard)
		    await AsyncStorage.setItem("CARDS", JSON.stringify(...n, card)).then(() => navigation.navigate("Browse"))
  		  setCard({})
        console.log(card)
    }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={[" #4095c7", "#aadbf8", "#5fc1c9"]}
        start={{ x: 0,y: 0,}}
        end={{ x: 1, y: 1,}}
      >
        <TextInput
          value={card.text}
          onChangeText={setCard}
          style= {styles.textInput}
          multiline={true}
          autoFocus
          selectionColor="#fff"
        />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottom}
        >
          <Button style={styles.button} appearance="filled" onPress={saveCard}>
            Upload
          </Button>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#222B45',
    color: 'white',
   
    justifyContent: 'center',
  

    width: Dimensions.get("window").width
  },
  gradient: {
    padding: 30,
    paddingTop: 60,
    flex: 1,
   
    justifyContent: 'center',
    

    width: Dimensions.get("window").width,
    
  },
  textInput: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    color: "#597d8f", 
    backgroundColor: '#ddedf5',
    fontSize: 22,
    borderColor: '#4095c7',
    borderWidth: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
    
  },

  bottom: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 36,
  },

  button: {
      marginBottom: 30
  }
});
