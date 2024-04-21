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
    type: "",
    userName: "",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState([]); // Dummy data, replace with actual data from your backend

  const [errors, setErrors] = useState({});

  const userRoleOptions = {
    "End User": ["Aakash", "Balaji", "Chandru"],
    "Church Admin": ["Danial", "Thomsan", "Christopher"],
    Registrar: ["Dinesh", "Elumalai", "Fahad"],
    "Church Super Admin": ["Gokul", "Harish", "Inba"],
  };

  const userRoleKeys = Object.keys(userRoleOptions);

  const validateForm = () => {
    const errors = {};

    // Validate User Type
    if (!details.type) {
      errors.type = "Please select a User Type";
    }

    // Validate User Role
    if (!details.userName) {
      errors.userName = "Please select a User Name";
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
              name: "Aakash",
              loginDate: "03/02/2024",
              loginTime: "12:25:18",
              logoutDate: "03/02/2024",
              logoutTime: "13:45:37",
              userType: "End User",
            },
            {
              id: 2,
              name: "Balaji",
              loginDate: "3/5/2024",
              loginTime: "09:30:42",
              logoutDate: "3/5/2024",
              logoutTime: "11:20:58",
              userType: "End User",
            },
            {
              id: 3,
              name: "Chandru",
              loginDate: "3/4/2024",
              loginTime: "15:10:56",
              logoutDate: "3/4/2024",
              logoutTime: "16:45:21",
              userType: "End User",
            },
            {
              id: 4,
              name: "Danial",
              loginDate: "3/5/2024",
              loginTime: "18:55:11",
              logoutDate: "3/5/2024",
              logoutTime: "20:40:28",
              userType: "Church Admin",
            },
            {
              id: 5,
              name: "Thomsan",
              loginDate: "3/7/2024",
              loginTime: "10:20:35",
              logoutDate: "3/7/2024",
              logoutTime: "12:00:49",
              userType: "Church Admin",
            },
            {
              id: 6,
              name: "Christopher",
              loginDate: "3/2/2024",
              loginTime: "21:45:50",
              logoutDate: "3/2/2024",
              logoutTime: "23:15:10",
              userType: "Church Admin",
            },
            {
              id: 7,
              name: "Dinesh",
              loginDate: "3/5/2024",
              loginTime: "13:30:15",
              logoutDate: "3/5/2024",
              logoutTime: "15:05:25",
              userType: "Registrar",
            },
            {
              id: 8,
              name: "Elumalai",
              loginDate: "3/1/2024",
              loginTime: "17:10:30",
              logoutDate: "3/1/2024",
              logoutTime: "18:50:45",
              userType: "Registrar",
            },
            {
              id: 9,
              name: "Fahad",
              loginDate: "3/7/2024",
              loginTime: "14:55:55",
              logoutDate: "3/7/2024",
              logoutTime: "16:30:20",
              userType: "Registrar",
            },
            {
              id: 10,
              name: "Gokul",
              loginDate: "3/4/2024",
              loginTime: "20:35:22",
              logoutDate: "3/4/2024",
              logoutTime: "21:55:40",
              userType: "Church Super Admin",
            },
            {
              id: 11,
              name: "Harish",
              loginDate: "3/3/2024",
              loginTime: "14:40:45",
              logoutDate: "3/3/2024",
              logoutTime: "16:20:05",
              userType: "Church Super Admin",
            },
            {
              id: 12,
              name: "Inba",
              loginDate: "3/6/2024",
              loginTime: "11:05:10",
              logoutDate: "3/6/2024",
              logoutTime: "12:35:30",
              userType: "Church Super Admin",
            },
          ];

          const filteredData = dummyData.filter((item) => {
            const dateA = item.loginDate.split("/").reverse().join("-");

            const dateB = item.logoutDate.split("/").reverse().join("-");

            return (
              (item.userType === details.type &&
                item.name === details.userName &&
                dateA >= details.fromDate &&
                dateA <= details.toDate) ||
              (dateB >= details.fromDate && dateB <= details.toDate)
            );
          });
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
                id="type"
                onChange={handleChange}
                value={details.type}
                hasError={errors.type}
                className="form-control-lg"
              >
                <option value="">Select User Type</option>

                {userRoleKeys.map((elem) => {
                  return <option key={elem}>{elem}</option>;
                })}
              </FormSelect>
              <FormSelect
                labelText="User Name"
                id="userName"
                onChange={handleChange}
                value={details.userName}
                hasError={errors.userName}
                className="form-control-lg"
              >
                <option value="">Select User Name</option>
                {userRoleOptions[details.type] &&
                  userRoleOptions[details.type].map((elem) => (
                    <option key={elem} value={elem}>
                      {elem}
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
            <Card>
              <CardBody>
                <div style={{ overflowX: "auto" }}>
                  <Table className="mt-4">
                    <thead className="tableHeader">
                      {data.length > 0 ? (
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Login Date and Time</th>
                          <th>Logout Date and Time</th>
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
                        {data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.loginDate + " " + item.loginTime}</td>
                            <td>{item.logoutDate + " " + item.logoutTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}
