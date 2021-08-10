import React, { useState } from 'react';
import { StyleSheet, View, TextInput,KeyboardAvoidingView, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Text, Card, List } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Favorites() {

   const [favoriteCards, setFavoriteCards] = useState([])
  //  const {favoriteCard} = route.params
   const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(
            () => {
                getFavoriteCards()
            },
            [],
        )
    )
    const getFavoriteCards = () =>  {
        AsyncStorage.getItem("FAVORITECARDS").then((favoriteCards) => {
            setFavoriteCards(JSON.parse(favoriteCards))

        })
    }
    // const getFavoriteCards = async () =>  {
    //     const favoriteCards = await cards.filter((card) => card === favoriteCard)
    //     await AsyncStorage.setItem("CARDS", JSON.stringify(favoriteCards))

        
    // }
    const removeFavoriteCard = async () =>  {
        const favoriteCards = await cards.filter((card) => card !== favoriteCard)
        await AsyncStorage.setItem("FAVORITECARDS", JSON.stringify(favoriteCards))
            then(() => navigation.navigate('Favorites'))

        
    }
    const renderItemHeader = (headerProps, info) => (
        <View {...headerProps}>
          <Text category='h6'>
            {/* {info.item.title} {info.index + 1} */}
            Icons header
          </Text>
        </View>
      );
    
      const renderItemFooter = (footerProps) => (
        <Button {...footerProps} onPress = {removeFavoriteCard} style = {styles.button}>
          Remove Favorite
        </Button>
      );
    
      const renderItem = (item, info) => (
        <Card
          style={styles.cards}
          status='basic'
          header={headerProps => renderItemHeader(headerProps, info)}
          footer={renderItemFooter}
    
        >
          <Text category = 'h5'>
         
          {item.info}
          </Text>

        </Card>
      );
  return (
    <View style={styles.container}>
        <List
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={favoriteCards.reverse()}
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
    padding: 30,
   
    alignItems: 'center',
    justifyContent: 'center',

    width: Dimensions.get("window").width
  },
  list: {
    flex: 1,
    backgroundColor: '#222B45',
    color: 'white',
      
    padding: 15,
    
   
    width: Dimensions.get("window").width
  
	},
  bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
  },

  button: {
      marginBottom: 30
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
	}
});
