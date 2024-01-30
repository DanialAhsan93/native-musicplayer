import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "./src/screens/AudioList";
const Tab = createBottomTabNavigator();
import Player from "./src/screens/Player"
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// import LoginScreen from "./src/screens/LoginScreen";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import PlayList from "./src/screens/PlayList";
import { Fontisto } from '@expo/vector-icons';


function BottomTabs() {
    return (
        <Tab.Navigator initialRouteName="Player" screenOptions={{
            tabBarStyle: {
                backgroundColor: "#07262B",
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity: 0.2,
                shadowRadius: 0,
                elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: -4,
                },
                borderTopWidth: 0,
            }
        }}>
            <Tab.Screen name="AudioList" component={AudioList} options={{
                tabBarLabel: "AudioList",
                headerShown: false,
                tabBarLabelStyle: {
                    color: 'white',
                },
                tabBarIcon: ({ focused }) => focused ? (
                    <Ionicons name="headset" size={24} color="white"  
                    style={{
                        backgroundColor:"#054954",
                        paddingVertical:'2%',
                        paddingHorizontal:'13%',
                        borderRadius: 10
                    }}
                    />
                    ) :
                    (
                        <Ionicons name="headset" size={24} color="white" />)

            }}
            />
            <Tab.Screen
                name="Player"
                component={Player}
                options={{
                    tabBarLabel: "Player",
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: 'white',
                    },
                    tabBarIcon: ({ focused }) => focused ? (
                        <Ionicons name="play-circle-sharp" size={26} color="white" 
                        style={{
                            backgroundColor:"#054954",
                            paddingVertical:'2%',
                            paddingHorizontal:'13%',
                            borderRadius: 10
                        }}
                        
                        />

                    ) :
                        (
                            <Ionicons name="play-circle-outline" size={24} color="white" />
                        )
                }}
            />
            <Tab.Screen
                name="Play List"
                component={PlayList}
                options={{
                    tabBarLabel: "Play List",
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: 'white',
                    },
                    tabBarIcon: ({ focused }) => focused ? (
                        <Fontisto name="play-list" size={20} color="white"   
                        style={{
                            backgroundColor:"#054954",
                            paddingVertical:'2%',
                            paddingHorizontal:'13%',
                            borderRadius: 10
                        }}
                         />

                    ) :
                        (
                            <Fontisto name="play-list" size={20} color="white" />
                        )
                }}
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation