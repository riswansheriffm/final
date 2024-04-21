import React, { useState } from "react";
import DateInput from "components/Forms/DateInput";
import FormSelect from "components/Forms/FormSelect";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Row,
  Table,
} from "reactstrap";

export default function Audittrails() {
  const [details, setDetails] = useState({
    role: "",
    userRole: "",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState([]); // Dummy data, replace with actual data from your backend

  const [errors, setErrors] = useState({});

  const userRoleOptions = {
    "Marriage Registration": ["Marriage"],
    "Single Status Letter": ["Single"],
    "Lost Certificate Retrieval": [
      "Lost Certificate Retrieval",
      "Church Admin",
      "Registrar",
    ],
    "Church Licensing": ["Church"],
    "Renewal Of Church License": ["Renewal Of Church "],
  };
  // ...

  const validateForm = () => {
    const errors = {};

    // Validate User Type
    if (!details.role) {
      errors.role = "Please select a User Type";
    }

    // Validate User Role
    if (!details.userRole) {
      errors.userRole = "Please select a User Role";
    }

    // Validate From Date
    if (!details.fromDate) {
      errors.fromDate = "Please select a From Date";
    } else if (!isValidDate(details.fromDate)) {
      errors.fromDate = "Invalid From Date";
    }

    // Validate To Date
    if (!details.toDate) {
      errors.toDate = "Please select a To Date";
    } else if (!isValidDate(details.toDate)) {
      errors.toDate = "Invalid To Date";
    }

    // Log values to console for debugging
    console.log("Validation Errors:", errors);
    console.log("Details:", details);

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const fetchData = async () => {
        try {
          const dummyData = [
            {
              id: 1,
              name: "Marriage Registration",
              action: "Marriage Registration",
              date: "17.09.2021 13:18",
            },
            {
              id: 1,
              name: "Single Status Letter",
              action: "Single Status Letter",
              date: "17.09.2021 13:18",
            },
            {
              id: 1,
              name: "Lost Certificate Retrieval",
              action: "Lost Certificate Retrieval",
              date: "17.09.2021 13:18",
            },
            {
              id: 2,
              name: "Church Licensing",
              action: "Church Licensing",
              date: "17.09.2021 13:18",
            },
            // Add more dummy data as needed
          ];
          const filteredData = dummyData.filter(
            (item) => item.action === details.role
          );
          setData(filteredData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      console.log("Form validation failed");
    }
  };

  // ...

  const handleChange = (event) => {
    const { id, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  return (
    <Container>
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h2 className="mb-0 text-lg font-weight-bold">Audit Log Details</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <FormSelect
                labelText="User Type"
                id="role"
                onChange={handleChange}
                value={details.role}
                hasError={errors.role}
                className="form-control-lg"
              >
                <option value="">Select User Type</option>
                <option value="Marriage Registration">
                  Marriage Registration
                </option>
                <option value="Single Status Letter">
                  Single Status Letter
                </option>
                <option value="Lost Certificate Retrieval">
                  Lost Certificate Retrieval
                </option>
                <option value="Church Licensing">Church Licensing</option>
                <option value="Renewal Of Church License">
                  Renewal Of Church License
                </option>
              </FormSelect>
              <FormSelect
                labelText="User Role"
                id="userRole"
                onChange={handleChange}
                value={details.userRole}
                hasError={errors.userRole}
                className="form-control-lg"
              >
                <option value="">Select User Role</option>
                {userRoleOptions[details.role] &&
                  userRoleOptions[details.role].map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
              </FormSelect>
              <DateInput
                id="fromDate"
                labelText="From Date"
                onChange={handleChange}
                value={details.fromDate}
                hasError={errors.fromDate}
                className="form-control-lg"
              />

              <DateInput
                id="toDate"
                labelText="To Date"
                onChange={handleChange}
                value={details.toDate}
                hasError={errors.toDate}
                className="form-control-lg"
              />
            </Row>

            <Row className="justify-content-center">
              <Button className="mt-4" color="primary" type="submit">
                Search Details
              </Button>
            </Row>
            <div style={{ overflowX: "auto" }}>
              <Table className="mt-4">
                <thead className="tableHeader">
                  {data.length > 0 ? (
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Action</th>

                      <th>Date</th>
                    </tr>
                  ) : (
                    <tr>
                      <th
                        colSpan="4"
                        className="noDataMessage"
                        style={{
                          fontSize: "13px",
                          fontWeight: "900",
                          padding: "15px",
                          textAlign: "center",
                        }}
                      >
                        No data available
                      </th>
                    </tr>
                  )}
                </thead>
                {data.length > 0 && (
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.action}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
