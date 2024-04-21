import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
    textAlign: "center",
  },
  underline: {
    textDecoration: "underline",
  },
  signatureLine: {
    marginTop: 50,
    borderTop: "1px solid black",
    width: "60%",
    alignSelf: "center",
  },
  signatureText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
});

export default function SingleStausCertificate({ doA, aName }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Single Status Letter</Text>
        </View>
        <View style={styles.section}>
          <Text>To whom it may concern,</Text>
        </View>
        <View style={styles.section}>
          <Text>This is to certify that</Text>
        </View>
        <View style={styles.section}>
          <Text>
            <Text style={styles.underline}>{aName}</Text>
          </Text>
        </View>
        {/* <View style={styles.section}>
                    <Text>born on {dateOfBirth}</Text>
                    <Text>in {placeOfBirth}</Text>
                    <Text>nationality: {nationality}</Text>
                    <Text>gender: {gender}</Text>
                </View> */}
        <View style={styles.section}>
          <Text>is currently single to the best of our knowledge.</Text>
        </View>
        <View style={styles.section}>
          <Text>This letter is issued on {doA}</Text>
          {/* <Text>by {officerName}</Text> */}
        </View>
        <View style={styles.signatureLine}></View>
        <Text style={styles.signatureText}>{`Signature: ${aName}`}</Text>
      </Page>
    </Document>
  );
}
