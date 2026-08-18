import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../color/Colors";
import { auth } from "../service/firebaseconfig";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const firebaseError = error as { code: string; message?: string };
    switch (firebaseError.code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return firebaseError.message ?? "Something went wrong. Please try again.";
    }
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

interface CreateUserProps {
  initialEmail?: string;
  initialPassword?: string;
  onBack?: () => void;
}

/**
 * Self-contained sign-up flow using Firebase Auth (email/password).
 * `createUserWithEmailAndPassword` signs the user in immediately on success —
 * the caller watches `useFirebaseAuth().isSignedIn` to navigate onward.
 */
export function CreateUser({
  initialEmail = "",
  initialPassword = "",
  onBack,
}: CreateUserProps) {
  const scheme = useColorScheme();
  const theme = scheme === "light" ? Colors.light : Colors.dark;

  const [emailAddress, setEmailAddress] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, emailAddress, password);
      // No manual navigation here — the caller's isSignedIn watcher handles
      // it once Firebase's auth-state listener picks up the new session.
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.logoDot,
            { backgroundColor: theme.accent, shadowColor: theme.accent },
          ]}
        />
        <Text style={[styles.title, { color: theme.text }]}>
          Create your account
        </Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Sign up to get started
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
        title={isSubmitting ? "Creating account..." : "Sign up"}
        onPress={handleCreate}
        color={theme.accentAlt}
        disabled={isSubmitting}
      />
      {onBack ? (
        <Button title="Back to sign in" onPress={onBack} color={theme.muted} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
