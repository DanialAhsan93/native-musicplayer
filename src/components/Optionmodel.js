import { Modal, StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, TouchableNativeFeedbackBase } from 'react-native'
import React from 'react'
import Color from '../misc/Color'

const Optionmodel = ({ visible, onClose, currentItem, onPlayPress, onPlaylistPress }) => {

    const { filename } = currentItem
    return (
        <>
            <StatusBar hidden />
            <Modal animationType={'slide'} transparent visible={visible}>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>
                        {filename}
                    </Text>
                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback onPress={onPlayPress}>
                            <Text style={styles.option}>Play</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onPlaylistPress}>
                            <Text style={styles.option}>Add to playlist</Text>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default Optionmodel

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Color.BG_CIRCLE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10,
    },
    optionContainer: {
        padding: "4%"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: "4%",
        paddingBottom: "0%",
        color: Color.ACTIVE_FONT
    },
    option: {
        fontSize: 16,
        fontWeight: "bold",
        color: Color.ACTIVE_FONT,
        paddingVertical: "2%",
        letterSpacing: 1,
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: Color.MODAL_BG
    },
})