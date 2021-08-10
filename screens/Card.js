import React, { useState } from 'react';
import { StyleSheet, View, TextInput,KeyboardAvoidingView, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Text, Card, List } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Browse() {

   const [cards, setCards, card] = useState([])
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
    const deleteCard = async () => {
      const value = await AsyncStorage.getItem("CARDS")
      const n = value ? JSON.parse(value) : []
         n.filter(card)
         await AsyncStorage.removeItem("CARDS", JSON.stringify(n)).then(() => navigation.navigate("Browse"))



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
        <View {...footerProps}>
          <Button style={styles.button} >
            Favorite
          </Button>
          <Button  
            onPress={deleteCard}
            style={styles.button} 
          >
             Delete
          </Button>
        </View>
      );
    
      const renderItem = (info, item) => (
        <Card
          style={styles.item}
          status='basic'
          header={headerProps => renderItemHeader(headerProps)}
          footer={renderItemFooter}
          onPress = {() => navigation.navigate("Card", {
            singleCard: item
          })} 
        >
          <Text category = 'h5'>
         
            {info.item}
          </Text>
        </Card>
      );
  return (
    <View style={{ backgroundColor: "#222B45", flex: 1 }}>
     
        <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={cards.reverse()}
            renderItem={renderItem}
        />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		fontSize: 20
	},

	item: {
		marginVertical: 4
	},
	title: {
		textAlign: "center",
		marginTop: 50
	},
  cards: {
		fontSize: 24
	}
});
