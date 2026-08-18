import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../color/Colors";

interface StatItem {
  label: string;
  value: string;
}

interface ContactItem {
  icon: string;
  label: string;
}

interface JobHistoryItem {
  title: string;
  client: string;
  date: string;
  pay: string;
  status: "Completed" | "Cancelled";
}

const STATS: StatItem[] = [
  { label: "Work done", value: "12" },
  { label: "Liked Job", value: "8" },
  { label: "Profile Score", value: "86%" },
];

const SKILLS: string[] = [
  "Plumber",
  "Ac Technician",
  "Gas Line",
  "Tv repair",
  "Your wish",
];

const CONTACT: ContactItem[] = [
  { icon: "✉", label: "asmitasherlekar@gmail.com" },
  { icon: "☎", label: "+1 (555) 012-3344" },
  { icon: "📍", label: "San Francisco, CA" },
];

const JOB_HISTORY: JobHistoryItem[] = [
  {
    title: "Kitchen Sink Repair",
    client: "R. Patel",
    date: "Aug 2, 2026",
    pay: "$85",
    status: "Completed",
  },
  {
    title: "AC Unit Maintenance",
    client: "S. Nguyen",
    date: "Jul 21, 2026",
    pay: "$140",
    status: "Completed",
  },
  {
    title: "Water Heater Install",
    client: "M. Alvarez",
    date: "Jul 9, 2026",
    pay: "$210",
    status: "Completed",
  },
  {
    title: "TV Wall Mount",
    client: "J. Kim",
    date: "Jun 30, 2026",
    pay: "$60",
    status: "Cancelled",
  },
  {
    title: "Gas Line Inspection",
    client: "D. Osei",
    date: "Jun 14, 2026",
    pay: "$95",
    status: "Completed",
  },
];

export default function Seeker() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = scheme === "light" ? Colors.light : Colors.dark;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable
            hitSlop={12}
            style={[
              styles.editButton,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.editGlyph, { color: theme.accentAlt }]}>
              ✎
            </Text>
          </Pressable>

          <Text style={[styles.topTitle, { color: theme.text }]}>Profile</Text>

          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={[
              styles.backButton,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.backGlyph, { color: theme.accent }]}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.heroSection}>
          <View
            style={[
              styles.avatarRing,
              { borderColor: theme.accent, backgroundColor: theme.surface },
            ]}
          >
            <Image
              source={require("../../assets/img/prof.jpg")}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.name, { color: theme.text }]}>Mani Maaoww</Text>
          <Text style={[styles.role, { color: theme.accent }]}>
            Frontend Developer · Job Seeker
          </Text>
          <Text style={[styles.location, { color: theme.muted }]}>
            San Francisco, CA
          </Text>
        </View>

        <View
          style={[
            styles.statsCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          {STATS.map((stat, index) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.muted }]}>
                {stat.label}
              </Text>
              {index < STATS.length - 1 && (
                <View
                  style={[
                    styles.statDivider,
                    { backgroundColor: theme.border },
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <Section title="Skills" theme={theme}>
          <View style={styles.chipRow}>
            {SKILLS.map((skill) => (
              <View
                key={skill}
                style={[
                  styles.chip,
                  {
                    backgroundColor: theme.surfaceAlt,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: theme.accent }]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Job History" theme={theme}>
          {JOB_HISTORY.map((job, index) => (
            <View
              key={`${job.title}-${job.date}`}
              style={[
                styles.jobRow,
                index < JOB_HISTORY.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                },
              ]}
            >
              <View style={styles.jobInfo}>
                <Text style={[styles.jobTitle, { color: theme.text }]}>
                  {job.title}
                </Text>
                <Text style={[styles.jobMeta, { color: theme.muted }]}>
                  {job.client} · {job.date}
                </Text>
              </View>
              <View style={styles.jobRight}>
                <Text style={[styles.jobPay, { color: theme.text }]}>
                  {job.pay}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        job.status === "Completed"
                          ? theme.accentAlt + "22"
                          : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          job.status === "Completed"
                            ? theme.accentAlt
                            : theme.muted,
                      },
                    ]}
                  >
                    {job.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Section>

        <Section title="Contact" theme={theme}>
          {CONTACT.map((item) => (
            <View key={item.label} style={styles.contactRow}>
              <Text style={styles.contactGlyph}>{item.icon}</Text>
              <Text style={[styles.contactText, { color: theme.muted }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </Section>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: theme.accent }]}
        >
          <Text style={styles.primaryButtonText}>Edit Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SectionProps {
  title: string;
  theme: (typeof Colors)["light"] | (typeof Colors)["dark"];
  children: React.ReactNode;
}

function Section({ title, theme, children }: SectionProps) {
  return (
    <View
      style={[
        styles.section,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backGlyph: {
    fontSize: 22,
    marginLeft: -2,
    fontWeight: "600",
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  editButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  editGlyph: {
    fontSize: 15,
  },
  heroSection: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  avatarRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  role: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 6,
  },
  location: {
    fontSize: 12,
    marginTop: 4,
  },
  statsCard: {
    flexDirection: "row",
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  statValue: {
    fontSize: 17,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
  statDivider: {
    position: "absolute",
    right: 0,
    top: "15%",
    bottom: "15%",
    width: 1,
  },
  section: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  resumeRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  resumeGlyph: {
    fontSize: 20,
    marginRight: 10,
  },
  resumeTextWrap: {
    flex: 1,
  },
  resumeName: {
    fontSize: 13,
    fontWeight: "600",
  },
  resumeMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  resumeAction: {
    fontSize: 12,
    fontWeight: "700",
  },
  jobRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  jobInfo: {
    flex: 1,
    paddingRight: 12,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  jobMeta: {
    fontSize: 11,
    marginTop: 3,
  },
  jobRight: {
    alignItems: "flex-end",
  },
  jobPay: {
    fontSize: 13,
    fontWeight: "700",
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  contactGlyph: {
    fontSize: 14,
    width: 26,
  },
  contactText: {
    fontSize: 13,
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#0a0a0f",
    fontSize: 15,
    fontWeight: "700",
  },
});
