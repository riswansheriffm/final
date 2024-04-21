import React from "react";
import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "reactstrap";

import { ToastContainer } from "react-toastify";
import styles from "./styles.module.css";

export default function MainCard({ children, heading }) {
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
            <div className="text-center  text-muted mb-1">
              <h1 className="text-usrb-light font-weight-bolder">{heading}</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-2 py-lg-2">{children}</CardBody>
        </Card>
        <ToastContainer className={styles.pre} />
      </Container>
    </>
  );
}
