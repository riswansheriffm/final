import { Card, CardBody, CardHeader, Container } from "reactstrap";

export default function ThankYou() {
  return (
    <Container>
      <Card>
        <CardHeader>
          <h2>Your Form Submitted Successfully</h2>
          <h4>Share your FeedBack</h4>
        </CardHeader>
        <CardBody>
          <iframe
            src="https://survey.zohopublic.in/zs/pHB0za"
            frameborder="0"
            style={{ height: "700px", width: "100%" }}
            marginwidth="0"
            marginheight="0"
            scrolling="auto"
            allow="geolocation"
          ></iframe>{" "}
          <iframe
            src="https://sign.zoho.in/zsguest?locale=en&sign_id=234b4d535f495623bfaaae597e6eef41b14224d0d8b2b0b77da90d8f2fa191c65f403f3da37855c05013f9ed3623a7d7cdd5efa92a2e9010b316459ddb867b31970369c1f7b9bd297d79cc7a66d7a826b787e891df05a3c8deabd98d216c85cb4f7da7fc8ce6b0ea5376c71aef7a488b90b069bb356d5e538bcb27c7bed66511a1c5c6dabcc9d7c8&frameorigin=https://srmn.vercel.app"
            frameborder="0"
            style={{ height: "700px", width: "100%" }}
            marginwidth="0"
            marginheight="0"
            scrolling="auto"
            allow="geolocation"
          ></iframe>
        </CardBody>
      </Card>
    </Container>
  );
}
