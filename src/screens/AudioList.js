import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView,
    ImageBackground, Dimensions, ActivityIndicator
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import Audiolistitem from '../components/Audiolistitem';
import Screen from '../components/Screen';
import Optionmodel from '../components/Optionmodel';
import { audiohandler } from '../misc/Controlleraudio';

function AudioList({ navigation }) {
    const [optionmodelvisible, setoptionmodelvisible] = useState(false);
    const [currentItem, setcurrentItem] = useState({});
    const { playhandler} = audiohandler();
    const { icon, currentAudioIndex } = useContext(AudioContext)

    console.log(currentAudioIndex, "provider")

    const audioContext = useContext(AudioContext)
    const layoutProvider = new LayoutProvider(
        (index) => index, (_, dim) => {
            dim.width = Dimensions.get('window').width;
            dim.height = 100;
        }
    );

    const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(audioContext.audioFiles);


    const handleAudioPress = (audio) => {
        playhandler(audio);
    };


    const rowRenderer = (_, item, index ) => {
        console.log(index,"index")
        try {
            return (
                <Audiolistitem
                    title={item.filename}
                    icon={icon}
                    activeListItem={currentAudioIndex === index}
                    duration={item.duration}
                    onAudioPress={() => handleAudioPress(item)}
                    onOptionPress={() => {
                        setcurrentItem((prevItem) => {
                            return { ...prevItem, ...item };
                        });
                        setoptionmodelvisible(!optionmodelvisible)
                    }}
                    audioId={item.id}
                />
            );
        } catch (error) {
            console.error('Error in rowRenderer:', error);
            return null;
        }
    };

    return (

        <ImageBackground
            source={require('../../assets/images/bckgrndimg.jpg')}
            resizeMode="cover"
            style={styles.backgroundimage}
        >
            <View style={styles.overlay} />
            <Screen>
                {audioContext.audioFiles.length > 0 ? (
                    <RecyclerListView
                        layoutProvider={layoutProvider}
                        dataProvider={dataProvider}
                        rowRenderer={rowRenderer}
                        extendedState={{ icon }}
                    />
                ) : (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                <Optionmodel
                    visible={optionmodelvisible}
                    onClose={() => setoptionmodelvisible(!optionmodelvisible)}
                    currentItem={currentItem}
                    onPlayPress={() => console.log("onPlayPress")}
                    onPlaylistPress={() => console.log("onPlaylistPress")}

                />

            </Screen>

        </ImageBackground>

    )
}

export default AudioList

const styles = StyleSheet.create({
    backgroundimage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.48)"
    },
    listContainer: {
        width: '95%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '4%',
        zIndex: 5
    },
    manTitle: {
        width: '100%',
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 5
    },

})