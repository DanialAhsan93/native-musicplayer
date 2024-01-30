// import { Alert, Text, View } from 'react-native'
// import React, { Component, createContext } from 'react';
// import * as MediaLibrary from "expo-media-library";
// import { DataProvider } from 'recyclerlistview';


// export const AudioContext = createContext()
// export default class AudioProvider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             audioFiles: [],
//             permissionError: false,
//             dataProvider: new DataProvider((r1, r2) => r1 !== r2)
//         }
//     }
//     permissionAllert = () => {
//         Alert.alert("Permission Required", "This app needs to read some video file",
//             [{
//                 text: "I am ready",
//                 onPress: () => this.getPermission()
//             }, {
//                 text: "Cancel",
//                 onPress: () => this.permissionAllert()
//             }])
//     }
//     getAudioFiles = async () => {
//         const { dataProvider, audioFiles } = this.state
//         let media = await MediaLibrary.getAssetsAsync({
//             mediaType: 'audio'
//         })
//         media = await MediaLibrary.getAssetsAsync({
//             mediaType: 'audio',
//             first: media.totalCount,
//         })
//         this.setState({
//             dataProvider: dataProvider.cloneWithRows([
//                 ...audioFiles, ...media.assets
//             ]), audioFiles: [...audioFiles, ...media.assets]
//         })
//     }
//     getPermission = async () => {
//         // {
//         //     "canAskAgain": true,
//         //         "expires": "never",
//         //             "granted": false,
//         //                 "status": "undetermined"
//         // }

//         const permission = await MediaLibrary.getPermissionsAsync()
//         if (permission.granted) {
//             // we want to get all of the files
//             this.getAudioFiles()
//         }
//         if (!permission.granted && permission.canAskAgain) {
//             const { status, canAskAgain } = await MediaLibrary.
//                 requestPermissionsAsync();
//             if (status === 'denied' && canAskAgain) {
//                 this.permissionAllert()
//             }
//             if (!permission.canAskAgain && !permission.granted) {
//                 this.setState({ ...this.state, permissionError: true })
//             }
//             if (status === 'granted') {
//                 // we want to get all the audio files from the mobile
//                 this.getAudioFiles()
//             }
//             if (status === 'denied' && !canAskAgain) {
//                 //  We want to display some error to the user
//                 this.setState({ ...this.state, permissionError: true })
//             }
//         }
//     }

//     componentDidMount() {
//         this.getPermission()
//     }


//     render() {
//         const { audioFiles, dataProvider, permissionError } = this.state;
//         if (permissionError) {
//             return (
//                 <View style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}>
//                     <Text style={{
//                         fontSize: 25,
//                         textAlign: 'center',
//                         color: '#fff',
//                     }}>
//                         It looks like you haven't accepted the permission.
//                     </Text>
//                 </View>
//             )
//         }
//         return (
//             <AudioContext.Provider value={{ audioFiles, dataProvider }}>
//                 {this.props.children}
//             </AudioContext.Provider>
//         )
//     }
// }

import React, { useState, useEffect, createContext } from 'react';
import { Alert, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();


const AudioProvider = ({ children }) => {
    const [audioFiles, setAudioFiles] = useState([]);
    const [permissionError, setPermissionError] = useState(false);
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => r1 !== r2)
    );

    const [sound, setSound] = useState(null);
    const [currentAudio, setcurrentAudio] = useState({})
    const [isPlaying, setIsPlaying] = useState(false);
    const [icon, seticon] = useState(false)
    const [currentAudioIndex, setcurrentAudioIndex] = useState(null)

    const permissionAlert = () => {
        Alert.alert(
            'Permission Required',
            'This app needs to read some video files',
            [
                {
                    text: 'I am ready',
                    onPress: () => getPermission(),
                },
                {
                    text: 'Cancel',
                    onPress: () => permissionAlert(),
                },
            ]
        );
    };

    const getAudioFiles = async () => {
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });

        const allMedia = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });

        setDataProvider((prevDataProvider) =>
            prevDataProvider.cloneWithRows([...audioFiles, ...allMedia.assets])
        );

        setAudioFiles((prevAudioFiles) => [...prevAudioFiles, ...allMedia.assets]);
    };

    const getPermission = async () => {
        console.log("Getting permissions");

        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            getAudioFiles();
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } =
                await MediaLibrary.requestPermissionsAsync();

            if (status === 'denied' && canAskAgain) {
                permissionAlert();
            }

            if (!canAskAgain && !permission.granted) {
                setPermissionError(true);
            }

            if (status === 'granted') {
                getAudioFiles();
            }

            if (status === 'denied' && !canAskAgain) {
                setPermissionError(true);
            }
        }
    };

    useEffect(() => {
        console.log("Component mounted");
        getPermission();
    }, []);

    if (permissionError) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        textAlign: 'center',
                        color: '#fff',
                    }}
                >
                    It looks like you haven't accepted the permission.
                </Text>
            </View>
        );
    }

    return (
        <AudioContext.Provider value={{
            audioFiles,
            dataProvider,
            sound, setSound,
            currentAudio, setcurrentAudio,
            isPlaying, setIsPlaying,
            icon, seticon,
            currentAudioIndex,setcurrentAudioIndex,
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;