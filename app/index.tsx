import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth"; // or your own auth logic

export default function Index() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (isLoggedIn) router.replace("/dashboard");
    else router.replace("/login");
  }, [loading, isLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
