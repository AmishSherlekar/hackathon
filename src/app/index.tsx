import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../color/Colors";

interface RoleOption {
  key: "seeker" | "giver";
  route: "/seeker" | "/giver";
  glyph: string;
  title: string;
  description: string;
}

const ROLES: RoleOption[] = [
  {
    key: "seeker",
    route: "/seeker",
    glyph: "🔎",
    title: "I'm a Job Seeker",
    description: "Build your profile and get matched to roles",
  },
  {
    key: "giver",
    route: "/giver",
    glyph: "💼",
    title: "I'm a Job Giver",
    description: "Post openings and find the right candidates",
  },
];

export default function Index() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "light" ? Colors.light : Colors.dark;

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
          <Text style={[styles.title, { color: theme.text }]}>
            Welcome
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Choose how you want to use the app
          </Text>
        </View>

        <View style={styles.cardStack}>
          {ROLES.map((role) => (
            <Pressable
              key={role.key}
              onPress={() => router.push(role.route)}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: theme.surfaceAlt, borderColor: theme.border },
                ]}
              >
                <Text style={styles.glyph}>{role.glyph}</Text>
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  {role.title}
                </Text>
                <Text style={[styles.cardDescription, { color: theme.muted }]}>
                  {role.description}
                </Text>
              </View>
              <Text style={[styles.chevron, { color: theme.accent }]}>›</Text>
            </Pressable>
          ))}
        </View>
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
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 44,
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
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 8,
  },
  cardStack: {
    gap: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  glyph: {
    fontSize: 22,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    fontSize: 26,
    fontWeight: "300",
    marginLeft: 8,
  },
});
