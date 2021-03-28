import React from 'react' 
import {View, Text, StyleSheet, Button, FlatList} from 'react-native'
import { Post } from '../components/Post'
import { DATA } from '../data'

export const MainScreen = ({navigation}) => {
    const goToPost = () => {
        navigation.navigate('Post')
    }
    return (
        <View style={styles.wrapper}>
            <FlatList 
            data={DATA}
            keyExtractor={post => post.id.toString()}
            renderItem={({item}) => <Post post={item} /> }
            />
        </View>
    )
}

MainScreen.navigationOptions = {
    headerTitle: 'Мій блог'
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    }
})