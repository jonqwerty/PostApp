import React, {useState} from 'react' 
import * as ImagePicker from 'expo-image-picker';
import { Button, Image, View, Platform, StyleSheet, Alert} from 'react-native'
import * as Permissions from 'expo-permissions'


async function askForPermissions() {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )
    if (status !== 'granted') {
        Alert.alert('Помилка', 'Ви не надали права на створення знимки')
        return false
    }
    return true
}



export const PhotoPicker = ({ onPick }) => {
    const [image, setImage] = useState(null)

    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        }
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9]
        })

        setImage(img.uri)
        onPick(img.uri)
    }

    return (
            <View style={styles.wrapper}>
                <Button title='Зробити знимку' onPress={takePhoto}/>
                {image && <Image style={styles.image} source={{ uri: image }} />}
            </View>
        )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 100,
        marginTop: 10
    }
})