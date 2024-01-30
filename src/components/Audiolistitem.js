import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import Color from '../misc/Color';

const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

const handleIcon = (icon) => {
  if (icon) {
    return <FontAwesome name="pause" size={24} color="white" />
  }else{
    return <Entypo name="controller-play" size={24} color="white" />
  }
}

const Audiolistitem = ({ title, duration, onOptionPress, onAudioPress, icon, activeListItem }) => {
    //  console.log(activeListItem,"active")
    return (
        <>
            <View style={styles.mainContainer}>
                <View style={[styles.mainContainer, { width: "80%", justifyContent: "space-between" }]}>
                    <TouchableWithoutFeedback
                        onPress={onAudioPress}>
                        <View style={styles.leftContainer}>
                            <View style={styles.thumbnail}>
                                <Text style={styles.thumbnailText}>
                                    {activeListItem ? handleIcon(icon) : title[0] }

                                </Text>
                            </View>
                            <View
                                style={styles.textContainer}

                            >
                                <Text numberOfLines={1} style={styles.title}>
                                    {title}
                                </Text>
                                <Text style={styles.timeText}>
                                    {formatDuration(duration)}
                                </Text>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>

                    <View style={styles.rightContainer}>
                        <View
                            style={{
                                backgroundColor: "#07252A",
                                width: "100%",
                                height: "50%",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 50
                            }}
                        >
                            <Entypo
                                onPress={onOptionPress}
                                name='dots-three-vertical'
                                size={20}
                                color={Color.ACTIVE_FONT}

                            />

                        </View>

                    </View>

                </View>

            </View>

            <View style={styles.separator} />
        </>
    )
}

export default Audiolistitem
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        backgroundColor: "transparent",
    },
    leftContainer: {
        flexDirection: "row",
        marginTop: "8%",
        height: "auto",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        width: "85%",
    },
    rightContainer: {
        width: "15%",
        marginTop: "8%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
    },
    thumbnail: {
        height: "82%",
        width: "23%",
        borderRadius: 50,
        backgroundColor: Color.BG_CIRCLE,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "10%"
    },
    thumbnailText: {
        fontSize: 16,
        color: Color.ACTIVE_FONT
    },
    textContainer: {
        width: "70%",
    },
    title: {
        marginLeft: "3%",
        fontSize: 16,
        color: Color.ACTIVE_FONT

    },
    separator: {
        width: width,
        height: "3%",
        backgroundColor: "transparent"
    },
    timeText: {
        fontSize: 14,
        marginLeft: "3%",
        color: Color.ACTIVE_FONT
    },
})