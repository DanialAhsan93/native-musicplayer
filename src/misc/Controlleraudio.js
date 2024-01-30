import { useContext, useState } from "react";
import { Audio } from "expo-av";
import { AudioContext } from "../context/AudioProvider";


export const audiohandler = () => {
    // const [sound, setSound] = useState(null);
    // const [currentAudio, setcurrentAudio] = useState({})
    // const [isPlaying, setIsPlaying] = useState(false);

    const {sound, setSound, currentAudio, setcurrentAudio, isPlaying, setIsPlaying,
    icon, seticon, audioFiles,setcurrentAudioIndex} =  useContext(AudioContext)

    const playhandler = async (audio) => {
        const index = audioFiles.indexOf(audio)
        try {
            if (sound) {
                //  play/pause
                if (currentAudio.id === audio.id) {
                    isPlaying ?
                        [await sound.pauseAsync(), setIsPlaying(!isPlaying), seticon(false), setcurrentAudioIndex(index)]
                        :
                        [await sound.playAsync(), setIsPlaying(!isPlaying), seticon(true), setcurrentAudioIndex(index)];
                }

                // if (currentAudio.id === audio.id) {
                //     // If the same audio is pressed again, toggle play/pause
                //     if (isPlaying) {
                //         await sound.pauseAsync();
                //         setIsPlaying(false);
                //     } else {
                //         await sound.playAsync();
                //         setIsPlaying(true);
                //     }
                // }   same as above

                else {   // If a different audio is pressed, stop the current audio and play the new one                            
                    await sound.stopAsync();
                    await sound.unloadAsync();
                    const { sound: newSound } = await Audio.Sound.createAsync(
                        { uri: audio.uri },
                        { shouldPlay: true }
                    );
                    setSound(newSound);
                    setcurrentAudio(audio);
                    setIsPlaying(true);
                    seticon(true);
                    setcurrentAudioIndex(index)
                }
            } else {
                //  create and play the new audio on 1st press
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: audio.uri },
                    { shouldPlay: true }
                );
                setSound(newSound);
                setcurrentAudio(audio);
                setIsPlaying(true);
                seticon(true);
                // setcurrentAudioIndex(index)
            }
        }
        catch (error) {
            console.error('Error in handleAudio helper:');
        }
    }

    return (
        {playhandler}
    )

}



export default audiohandler;