import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootTabParamList } from '../types/auth.d';
import SafeAreaView from 'components/SafeAreaView';
import Todo from 'screens/Todo';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
    return (
        <SafeAreaView noTop>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#3B82F6',
                    tabBarInactiveTintColor: '#6B7280',
                    tabBarStyle: {
                        paddingBottom: 5,
                        paddingTop: 5,
                        height: 65,
                    },
                    headerShown: true,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" size={size} color={color} />
                        ),
                        tabBarLabel: 'Home',
                    }}
                />
                            <Tab.Screen
                    name="Todo"
                    component={Todo}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="book-online" size={size} color={color} />
                        ),
                        tabBarLabel: 'Todo',
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" size={size} color={color} />
                        ),
                        tabBarLabel: 'Profile',
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" size={size} color={color} />
                        ),
                        tabBarLabel: 'Settings',
                        tabBarBadge: 1,
                        tabBarBadgeStyle: {
                            padding: 2
                        }
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}