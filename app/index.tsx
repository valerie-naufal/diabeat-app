import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth"; // or your own auth logic

export default function Index() {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Index"
  >;
  const router = useNavigation<NavigationProp>();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (isLoggedIn) router.replace("Dashboard");
    else router.replace("Login");
  }, [loading, isLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
