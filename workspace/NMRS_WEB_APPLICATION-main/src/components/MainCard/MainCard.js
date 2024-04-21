import StatusTracking from "components/StatusTracking/StatusTracking";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "reactstrap";

export default function MainCard({ children, heading, btnText }) {
  const location = useLocation();
  const breadcrumbData = location.pathname.split("/");
  let currentLink = "";

  return (
    <>
      {/* <Breadcrumb>
        {breadcrumbData.map((elem) => {
          if (elem !== "") currentLink += `/${elem}`;
          // console.log(currentLink);
          // return elem === "admin" ? (
          //   ""
          // ) : (
          return (
            <BreadcrumbItem className="text-capitalize" key={elem}>
              <Link to={currentLink} key={elem}>
                {elem}
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb> */}
      <Container fluid className="mt-2">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">
            <div className="text-center text-muted mb-1">
              <h2 className=" text-lg font-weight-bold">{heading}</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-2 py-lg-2">
            {btnText && <StatusTracking btnText={btnText} />}
            {!btnText && children}
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
