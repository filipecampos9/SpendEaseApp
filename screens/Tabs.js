import React from 'react';
import { StyleSheet, View, Image, Touchable, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import WalletScreen from './WalletScreen';
import AddTransactionScreen from './AddTransactionScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -40,
      justifyContent: 'center',
      alignItems: 'center',    
    }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#0E3452',
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ffffff',
          height: 100,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => 
          <View style={styles.container}>
            <Image
              source={require('../assets/icons/home.png')}
              resizeMode='contain'
              style={{ 
                width: 30,
                 height: 30,
                  tintColor: focused ? '#0E3452' : '#B0B0B0' }}
            />
          </View>
      }} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ 
        tabBarIcon: ({ focused }) => 
          <View style={styles.container}>
            <Image
              source={require('../assets/icons/chart-simple.png')}
              resizeMode='contain'
              style={{ 
                width: 30,
                 height: 30,
                  tintColor: focused ? '#0E3452' : '#B0B0B0' }}
            />
          </View>
      }} />
      <Tab.Screen name="AddTransaction" component={AddTransactionScreen} options={{ 
        tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/plus-hexagon.png')}
              resizeMode='contain'
              style={{ 
                width: 30,
                 height: 30,
                  tintColor: '#ffffff'
              }}
            />
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} />
        ),
      }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ 
        tabBarIcon: ({ focused }) => 
          <View style={styles.container}>
            <Image
              source={require('../assets/icons/wallet.png')}
              resizeMode='contain'
              style={{ 
                width: 30,
                 height: 30,
                  tintColor: focused ? '#0E3452' : '#B0B0B0' }}
            />
          </View>
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ 
        tabBarIcon: ({ focused }) => 
          <View style={styles.container}>
            <Image
              source={require('../assets/icons/user.png')}
              resizeMode='contain'
              style={{ 
                width: 30,
                 height: 30,
                  tintColor: focused ? '#0E3452' : '#B0B0B0' }}
            />
          </View>
      }} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#0E3452',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Tabs;
