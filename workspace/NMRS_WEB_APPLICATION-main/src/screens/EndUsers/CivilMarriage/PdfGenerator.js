import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "long" });
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  header: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    fontSize: "40px",
  },
  section: {
    margin: 4,
    padding: 4,
    fontSize: "30px",
    textAlign: "center",
  },
});
export default function PdfGenerator({
  gName = "John Doe ",
  bName = "Jane Smith",
  placeofMarriage = "Uganda Church",
  doMarriage = "2024-02-28",
  celebrant = "Paul",
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Certificate Of Marriage</Text>
        </View>
        <View style={styles.section}>
          <Text>This is to certify that</Text>
        </View>
        <View style={styles.section}>
          <Text>
            <Text style={{ textDecoration: "underline" }}>{gName}</Text> and{" "}
            <Text style={{ textDecoration: "underline" }}>{bName}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text>were united in marriage</Text>
        </View>
        <View style={styles.section}>
          <Text>
            at{" "}
            <Text style={{ textDecoration: "underline" }}>
              {placeofMarriage}
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            on the{" "}
            <Text style={{ textDecoration: "underline" }}>
              {doMarriage.split("-")[2]}
            </Text>{" "}
            day of{" "}
            <Text style={{ textDecoration: "underline" }}>
              {getMonthName(doMarriage.split("-")[1])}
            </Text>{" "}
            in the year{" "}
            <Text style={{ textDecoration: "underline" }}>
              {doMarriage.split("-")[0]}
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            officially by{" "}
            <Text style={{ textDecoration: "underline" }}>{celebrant}</Text>{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
