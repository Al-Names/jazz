import React, { useState } from 'react';
import { StyleSheet, View, TextInput,KeyboardAvoidingView, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Text, Card, List } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


export default function Browse() {

   const [cards, setCards, favoriteCard] = useState([])
   const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(
            () => {
                getCards()
            },
            [],
        )
    )
    
    const getCards = () =>  {
        AsyncStorage.getItem("CARDS").then((cards) => {
            setCards(JSON.parse(cards))
        })
    }
    const addToFavorites = async () => {
        const value = await AsyncStorage.getItem("FAVORITECARDS")
        const n = value ? JSON.parse(value) : []
        n.push(favoriteCard)
        await AsyncStorage.setItem("FAVORITECARDS", JSON.stringify(n)).then(() => navigation.navigate("Favorites"))
      
      
    }
    // const deleteCard = async () => {
    
    //      const singleCards = await cards.filter((card) => card !== singleCard)
    //      await AsyncStorage.setItem("CARDS", JSON.stringify(singleCards))
    //          then(() => navigation.navigate('Browse'))
 
         
    //  }
    // const deleteCard = async () => {
    //   setCards ( prevCards => {
    //     return prevCards.filter(card => card !== card);

    //   });
    // } 
    
  
    const renderItemHeader = (headerProps, item, id) => (
        <View {...headerProps}>
          <Text category='h6'>
            {/* {item.id}  */}
            Icons header
          </Text>
        </View>
      );
    
      const renderItemFooter = (footerProps, cards) => (
        <View {...footerProps} style = {styles.cardFooter}>
          <Button style={styles.button}
            onPress = { addToFavorites} >
            Favorite
          </Button>
          <Button  
            // onPress={ () => { navigation.navigate('Browse'); deleteCard; {
            //   singleCard: item
            // }} }    
            // onPress = {() => delnavigation.navigate("Browse", {
            //       singleCard: item
            //     })} 
           
            style={styles.button} 
          >
             Delete
          </Button>
        </View>
      );
    
      const renderItem = (item, info) => (
        <Card
          style={styles.cards}
          status='basic'
          header={headerProps => renderItemHeader(headerProps, info)}
          footer={renderItemFooter}
      
        >
          <Text category = 'h5' >
         
            {item.text}
          </Text>
        </Card>
      );
  return (
    <View style={styles.container}>
        <List
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={cards}
            renderItem={renderItem}
        /> 
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
 list: {
    flex: 1,
    backgroundColor: '#222B45',
    color: 'white',
      
    padding: 30,
   
   
    width: Dimensions.get("window").width
  
	},

  gradient: {
    flex: 1,
    padding: 30,
    
   
   
    justifyContent: 'center',
    
 width: Dimensions.get("window").width,
    
  },
	title: {
		textAlign: "center",
		marginTop: 50
	},
  cards: {
		fontSize: 24,
    flex: 1,
    padding: 20,
    paddingTop: 15,
    color: "#597d8f", 
    backgroundColor: '#ddedf5',
    marginVertical: 20,
    borderColor: '#4095c7',
    borderWidth: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
	},
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  }

});
