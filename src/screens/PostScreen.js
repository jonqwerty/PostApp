import React, {useEffect, useCallback} from 'react' 
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import { useDispatch, useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { THEME } from '../theme'
import { toggleBooked } from '../store/actions/post'
import { State } from 'react-native-gesture-handler'

export const PostScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const postId = navigation.getParam('postId')

    const post = DATA.find(p => p.id === postId)

    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

     useEffect(() => {
         navigation.setParams({booked})
     }, [booked])

    const toggleHandler = useCallback( () => {
        console.log('lalala')
        dispatch(toggleBooked(postId))
    }, [dispatch, postId] )

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Видалення поста",
            "Ви дійсно бажаєте видалити пост?",
            [
              
              {
                text: "Відмінити",
                style: "cancel"
              },
              { text: "Видалити", style: 'destructive', onPress: () => {} }
            ]
          );
    }

    return (
        <ScrollView >
           <Image source={{uri: post.img}} style={styles.image} />
           <View style={styles.textWrap}>
               <Text style={styles.title}>{post.text}</Text>
           </View>
           <Button title="Видалити" color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}
PostScreen.navigationOptions = ({navigation}) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? 'ios-star' : 'ios-star-outline'

    return {
        headerTitle: 'Пост від ' + new Date(date).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Take foto" iconName={iconName} onPress={toggleHandler} />
            </HeaderButtons>
            )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})