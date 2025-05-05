import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ScreenWrapper from "@/components/ScreenWrapper";
import { PermissionsAndroid, Platform } from "react-native";
import RNBluetoothClassic from "react-native-bluetooth-classic";

const device = {
  number: "HSUW34WHW",
  status: "Connected",
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Device">;
const router = useNavigation<NavigationProp>();

export default function DeviceScreen() {
  const [profile, setProfile] = useState<any>(null);
  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      console.log("Permission results:", granted);
    }
  };
  const connectToPico = async () => {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      console.log("Paired devices:", devices);

      const pico = devices.find(
        (d) =>
          d.name.includes("PicoW Sensor") ||
          d.name.includes("PicoW-Belt") ||
          d.address === "XX:XX:XX:XX:XX:XX"
      );
      if (!pico) {
        console.log("Pico not found");
        return;
      }

      const connected = await pico.connect();
      console.log("Connected:", connected);

      // Listen to data
      pico.onDataReceived((event) => {
        console.log("Data received from Pico:", event.data);
      });

      // To write to the Pico:
      await pico.write("Hello from React Native!\n");
    } catch (err) {
      console.error("Bluetooth error:", err);
    }
  };
  const writeToSecondPico = async (data: string) => {
    const devices = await RNBluetoothClassic.getBondedDevices();
    const picoOut = devices.find((d) => d.name.includes("PicoOut")); // Use actual name or address

    if (picoOut) {
      await picoOut.connect();
      await picoOut.write(data);
      console.log("Data sent to second Pico");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log("No profile found.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header></Header>
        <TouchableOpacity onPress={() => router.goBack()} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/icons/profile.svg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.fullName}</Text>

        <Text style={styles.label}>
          <Text style={styles.bold}>Device Number:</Text> {device.number}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Connection:</Text>{" "}
          <Text style={{ color: "green" }}>{device.status}</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await requestBluetoothPermissions();
            await connectToPico();
          }}
        >
          <Text style={styles.buttonText}>Connect Device</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, paddingTop: 40 },
  icon: { width: 28, height: 28, resizeMode: "contain" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 16,
  },
  name: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: "bold", color: Colors.primary },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  back: { marginTop: 24, alignSelf: "flex-start" },
});
