import React, { useState } from 'react';
import { StyleSheet, View, TextInput,KeyboardAvoidingView, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, Card, List } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


export default function Browse() {

   const [cards, setCards, favoriteCard] = useState([{}])
   const [card] = useState({})
   const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(
            () => {
                getCards()
            },
            [{}],
        )
    )
    
    // const getCards = () =>  {
    //     AsyncStorage.getItem("CARDS").then((cards) => {
    //         setCards(cards)
    //     })
    // }
    const getCards = async  () =>  {
      let cards = []
      try {
       cards =  await AsyncStorage.getItem("CARDS", JSON.parse(cards))
       .then(() => {
                setCards({
                  
                })
            })
      } catch (error) {
        
      }

  console.log(cards.text)
      // let n = []
     
      // .then((cards) => {
      //     setCards(cards)
      // })
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
        <View {...headerProps} style = {styles.cardHeader}>
         <Icon size={40} color="#bcc7cc" name="ios-warning-outline" />

        
         <Icon size={40} color="#bcc7cc" name="information" />
          
        </View>
      );
    
      const renderItemFooter = (footerProps, item) => (
        <View {...footerProps} style = {styles.cardFooter}>
          <Icon color="#597d8f" name="heart-circle" size={60}style={styles.button}
            onPress = { addToFavorites} />
          
       
          {/* <Button  
            // onPress={ () => { navigation.navigate('Browse'); deleteCard; {
            //   singleCard: item
            // }} }    
            onPress={ () => { console.log(cards)
               }} 
            // onPress = {() => delnavigation.navigate("Browse", {
            //       singleCard: item
            //     })} 
           
            style={styles.button} 
          >
             Delete
          </Button> */}
        </View>
      );
    
      const renderItem = (item, cards, info) => (
        <Card
          style={styles.cards}
          status='basic'
          header={headerProps => renderItemHeader(headerProps, info)}
          footer={renderItemFooter}
      
        ><View style={styles.cardText}>
          <Text category = 'h5' >
         
            {item.text}
          </Text>
          </View>
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
    flexDirection: 'column',

    paddingTop: 15,
   
    backgroundColor: '#ddedf5',
    marginVertical: 20,
    borderColor: '#4095c7',
    borderWidth: 8,
    borderRadius:25,
   
 
    height: 450
	},
  cardText:{
    flex: 2,
    fontSize: 24,
    padding: 20,
    color: "#597d8f", 
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },

  cardFooter: {
    flex: 1,
    flexDirection: 'row',
 
    alignItems:  'baseline'

  }

});
