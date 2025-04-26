import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  View
} from "react-native";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({
  children,
  style,
  contentContainerStyle,
  safeArea = true,
  scrollable = true,
}: {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  safeArea?: boolean;
  scrollable?: boolean;
}) {
  const Wrapper = safeArea ? SafeAreaView : View;
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <Wrapper style={{ flex: 1 }}>
        <Container
          style={[styles.container, style]}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Container>
      </Wrapper>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 0,
    paddingTop: 0,
  },
});
