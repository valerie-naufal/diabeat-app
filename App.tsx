import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "./types";
import DeviceScreen from "./app/profile/device";
import ProfileScreen from "./app/BottomTabs/profile";
import ModalSearchScreen from "./app/modal-search";
import DashboardDetailsScreen from "./app/dashboard-details";
import DashboardScreen from "./app/BottomTabs/dashboard";
import LogsScreen from "./app/BottomTabs/logs";
import LoginScreen from "./app/login";
import RegisterScreen from "./app/register";
import FoodLogsScreen from "./app/logs/food";
import GlucoseLogsScreen from "./app/logs/glucose";
import InsulinLogsScreen from "./app/logs/insulin";
import ConsumptionScreen from "./app/BottomTabs/consumption";
import HealthDataScreen from "./app/profile/health-data";
import AddScreen from "./app/BottomTabs/add";
import { useAuth } from "./hooks/useAuth";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Logs" component={LogsScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Consumption" component={ConsumptionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
     const { user, loading } = useAuth();
      if (loading) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={AppTabs} />
            <Stack.Screen
              name="DashboardDetails"
              component={DashboardDetailsScreen}
            />
            <Stack.Screen name="Food" component={FoodLogsScreen} />
            <Stack.Screen name="Glucose" component={GlucoseLogsScreen} />
            <Stack.Screen name="Insulin" component={InsulinLogsScreen} />
            <Stack.Screen name="ModalSearch" component={ModalSearchScreen} />
            <Stack.Screen name="Device" component={DeviceScreen} />
            <Stack.Screen name="HealthData" component={HealthDataScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
