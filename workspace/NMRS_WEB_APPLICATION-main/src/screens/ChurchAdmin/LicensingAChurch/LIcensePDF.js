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
    margin: 5,
    padding: 5,
    textAlign: "center",
    fontSize: "40px",
  },
  section: {
    margin: 4,
    padding: 4,
    fontSize: "20px",
    textAlign: "center",
  },
});
export default function LicensePdf({ name, church, county, district, doA }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Certificate Of License</Text>
        </View>
        <View style={styles.section}>
          <Text>This is to certify that</Text>
        </View>
        <View style={styles.section}>
          <Text style={{ textDecoration: "underline" }}>{name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Who Has Given Evidence That God Has Called Him Into</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>The Gospel Ministry</Text>
        </View>
        <View style={styles.section}>
          <Text>Was Licensed To Preach The Gospel Of Jesus Christ As</Text>
        </View>
        <View style={styles.section}>
          <Text>
            He May Have Opportunity And To Exercise His Gifts In The Work Of The
            Ministry
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            by<Text style={{ textDecoration: "underline" }}>{church}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{ textDecoration: "underline" }}>
            <Text>{county}</Text> <Text>{district}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            on the{" "}
            <Text style={{ textDecoration: "underline" }}>
              {doA.split("/")[0]}st
            </Text>{" "}
            day of{" "}
            <Text style={{ textDecoration: "underline" }}>
              {getMonthName(doA.split("/")[1])}
            </Text>{" "}
            in the year{" "}
            <Text style={{ textDecoration: "underline" }}>
              {doA.split("/")[2]}
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}
