import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './StackNavigator';
import AudioProvider from "./src/context/AudioProvider"
import Audiolistitem from './src/components/Audiolistitem';

const App = () => {
  return (
    <>
      <AudioProvider>
        <Navigation />
      </AudioProvider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})