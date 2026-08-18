import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../color/Colors";
import { CreateUser } from "../components/CreateUser";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { auth } from "../service/firebaseconfig";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const firebaseError = error as { code: string; message?: string };
    switch (firebaseError.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return firebaseError.message ?? "Something went wrong. Please try again.";
    }
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export default function MainScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useFirebaseAuth();
  const scheme = useColorScheme();
  const theme = scheme === "light" ? Colors.light : Colors.dark;

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
    }
  }, [isSignedIn, router]);

  const handleSignIn = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      // No manual navigation here — the isSignedIn effect above handles it
      // once Firebase's auth-state listener picks up the new session.
    } catch (error) {
      // Firebase intentionally collapses "wrong password" and "no such
      // account" into the same auth/invalid-credential code (anti-enumeration),
      // so we can't reliably auto-switch to sign-up here — the user picks
      // "Create an account instead" themselves if they don't have one yet.
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || isSignedIn) {
    return null;
  }

  if (mode === "signUp") {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <View style={styles.container}>
          <CreateUser
            initialEmail={emailAddress}
            initialPassword={password}
            onBack={() => setMode("signIn")}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={[
              styles.logoDot,
              { backgroundColor: theme.accent, shadowColor: theme.accent },
            ]}
          />
          <Text style={[styles.title, { color: theme.text }]}>Welcome</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Sign in to continue
          </Text>
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor={theme.muted}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          editable={!isSubmitting}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor={theme.muted}
          secureTextEntry={true}
          onChangeText={setPassword}
          editable={!isSubmitting}
        />
        {errorMessage ? (
          <Text style={[styles.errorText, { color: theme.accentAlt }]}>
            {errorMessage}
          </Text>
        ) : null}
        <Button
          title={isSubmitting ? "Signing in..." : "Sign in"}
          onPress={handleSignIn}
          color={theme.accentAlt}
          disabled={isSubmitting}
        />
        <Button
          title="Create an account instead"
          onPress={() => setMode("signUp")}
          color={theme.muted}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 18,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    textAlign: "center",
  },
});
