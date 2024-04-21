import DateInput from "components/Forms/DateInput";
import FormFileInput from "components/Forms/FormFileInput";
import FormSelect from "components/Forms/FormSelect";
import NumberInput from "components/Forms/NumberInput";
import Option from "components/Forms/Option";
import TextInput from "components/Forms/TextInput";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Container, Row } from "reactstrap";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const searchPurposeOptions = [
  "",
  "ADVOCATE HANDLING A DIVORCE PETITION",
  "FOREIGN MISSION CONFIRMING VALIDITY OF A MARRIAGE/DIVORCE",
  "SELF",
  "OTHER PURPOSES",
];
const searchCategoryOptions = [
  "",
  "MARRIAGE",
  "DIVORCE",
  "LICENSED PUBLIC PLACE OF WORSHIP",
  "SINGLE STATUS LETTER",
];

const marriageTypes = [
  "",
  "CHURCH MARRIAGE",
  "CIVIL MARRIAGE",
  "CUSTOMARY MARRIAGE",
  "ISLAMIC MARRIAGE",
  "MARRIAGE CONDUCTED ABROAD",
];

const districtList = [
  "",
  "Abim",
  "Adjumani",
  "Agago",
  "Alebtong",
  "Amolatar",
  "Amudat",
  "Amuria",
  "Amuru",
  "Apac",
  "Arua",
  "Budaka",
  "Bududa",
  "Bugiri",
  "Buhweju",
  "Buikwe",
  "Bukedea",
  "Bukomansimbi",
  "Bukwo",
  "Bulambuli",
  "Buliisa",
  "Bundibugyo",
  "Bunyangabu",
  "Bushenyi",
  "Busia",
  "Butaleja",
  "Butambala",
  "Butebo",
  "Buvuma",
  "Buyende",
  "Buikwe",
  "Dokolo",
  "Gomba",
  "Gulu",
  "Hoima",
  "Ibanda",
  "Iganga",
  "Isingiro",
  "Jinja",
  "Kaabong",
  "Kabale",
  "Kabarole",
  "Kaberamaido",
  "Kagadi",
  "Kaiso-Tonya",
  "Kakumiro",
  "Kalangala",
  "Kaliro",
  "Kalungu",
  "Kampala",
  "Kamuli",
  "Kamwenge",
  "Kanungu",
  "Kapchorwa",
  "Kasese",
  "Katakwi",
  "Kayunga",
  "Kibaale",
  "Kiboga",
  "Kiruhura",
  "Kisoro",
  "Kitgum",
  "Koboko",
  "Kole",
  "Kotido",
  "Kumi",
  "Kyankwanzi",
  "Kyegegwa",
  "Kyenjojo",
  "Kyotera",
  "Lamwo",
  "Lira",
  "Luuka",
  "Luwero",
  "Lwengo",
  "Lyantonde",
  "Manafwa",
  "Maracha",
  "Masaka",
  "Masindi",
  "Mayuge",
  "Mbale",
  "Mbarara",
  "Mitooma",
  "Mityana",
  "Moroto",
  "Moyo",
  "Mpigi",
  "Mubende",
  "Mukono",
  "Nakapiripirit",
  "Nakaseke",
  "Nakasongola",
  "Namayingo",
  "Namisindwa",
  "Namutumba",
  "Napak",
  "Nebbi",
  "Ngora",
  "Ntoroko",
  "Ntungamo",
  "Nwoya",
  "Otuke",
  "Oyam",
  "Pader",
  "Pallisa",
  "Rakai",
  "Rubanda",
  "Rubirizi",
  "Rukiga",
  "Rukungiri",
  "Sembabule",
  "Serere",
  "Sheema",
  "Sironko",
  "Soroti",
  "Ssembabule",
  "Wakiso",
  "Yumbe",
  "Zombo",
];
export default function DocumentSearch() {
  const [details, setDetails] = useState({
    aName: "",
    aEmail: "",
    aNumber: "",
    aNId: "",
    searchPurpose: "",
    searchCategory: "",
    oPurpose: "",
    mType: "",
    mrNum: "",
    mdate: "",
    gName: "",
    bName: "",
    drNum: "",
    dDate: "",
    hName: "",
    wName: "",
    cName: "",
    cDistrict: "",
    sslRM: "",
    sslName: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    aName: "",
    aEmail: "",
    aNumber: "",
    aNId: "",
    searchPurpose: "",
    searchCategory: "",
    oPurpose: "",
    mType: "",
    mrNum: "",
    mdate: "",
    gName: "",
    bName: "",
    drNum: "",
    dDate: "",
    hName: "",
    wName: "",
    cName: "",
    cDistrict: "",
    sslRM: "",
    sslName: "",
  });

  const [files, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      aName,
      aEmail,
      aNumber,
      aNId,
      searchPurpose,
      searchCategory,
      oPurpose,
      mType,
      mrNum,
      mdate,
      gName,
      bName,
      drNum,
      dDate,
      hName,
      wName,
      cName,
      cDistrict,
      sslRM,
      sslName,
    } = details;

    if (aName && aEmail && aNumber && aNId && searchPurpose && searchCategory) {
      if (searchPurpose === "OTHER PURPOSES") {
        if (searchCategory === "MARRIAGE") {
          if (mType && mrNum && mdate && gName && bName) {
          }
        } else if (searchCategory === "DIVORCE") {
          if (drNum && dDate && hName && wName) {
          }
        } else if (searchCategory === "LICENSED PUBLIC PLACE OF WORSHIP") {
          if (cName && cDistrict) {
          }
        } else {
          if (sslRM && sslName) {
          }
        }
      } else {
        if (searchCategory === "MARRIAGE") {
          if (oPurpose && mType && mrNum && mdate && gName && bName) {
          }
        } else if (searchCategory === "DIVORCE") {
          if (drNum && dDate && hName && wName && oPurpose) {
          }
        } else if (searchCategory === "LICENSED PUBLIC PLACE OF WORSHIP") {
          if (cName && cDistrict && oPurpose) {
          }
        } else {
          if (sslRM && sslName && oPurpose) {
          }
        }
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();

    const detailsKeys = Object.keys(details);

    detailsKeys.forEach((value) => {
      if (e.target.type !== "file") {
        if (e.target.name === value) {
          setDetails((elem) => {
            return { ...elem, [value]: e.target.value };
          });
          setErrorMsg((elem) => {
            return { ...elem, [value]: "" };
          });
        }
      } else {
        if (e.target.name === value) {
          const reader = new FileReader();
          reader.onload = function (e) {
            setFile((elem) => {
              return { ...elem, [value]: e.target.result };
            });
          };

          reader.readAsDataURL(e.target.files[0]);
          setDetails((elem) => {
            return { ...elem, [value]: e.target.files[0] };
          });
          setErrorMsg((elem) => {
            return { ...elem, [value]: "" };
          });
        }
      }
    });
  };
  return (
    <Container className="mt-5" fluid>
      <Card>
        <CardHeader>Search Civil Documents</CardHeader>
        <CardBody>
          <h3 className="bg-usrb text-white text-center">Applicant Details</h3>
          <Row>
            <TextInput
              value={details.aName}
              id="aName"
              labelText="Applicant Name"
              onChange={handleChange}
            />
            <TextInput
              value={details.aEmail}
              id="aEmail"
              labelText="Email"
              onChange={handleChange}
            />
            <TextInput
              value={details.aNumber}
              id="aNumber"
              labelText="Mobile Number"
              onChange={handleChange}
            />
            <FormFileInput
              value={details.aNId}
              labelText="Applicant National Id/ Passport"
              id="aNId"
              src={files?.aNId}
              onChange={handleChange}
            />
          </Row>
          <h3 className="bg-usrb text-white text-center">Search Details</h3>
          <Row>
            <FormSelect
              value={details.searchPurpose}
              id="searchPurpose"
              labelText="Purpose Of Search"
              onChange={handleChange}
            >
              {searchPurposeOptions.map((elem, index) => (
                <Option text="Purpose Of Search" key={index} elem={elem} />
              ))}
            </FormSelect>
            <FormSelect
              value={details.searchCategory}
              id="searchCategory"
              labelText="Category Of Search"
              onChange={handleChange}
            >
              {searchCategoryOptions.map((elem, index) => (
                <Option
                  text="Category Of Search"
                  key={index}
                  elem={elem}
                  index={index}
                />
              ))}
            </FormSelect>
            {details.searchPurpose === "OTHER PURPOSES" && (
              <TextInput
                value={details.oPurpose}
                id="oPurpose"
                labelText="Mention Other Purpose"
                handleChange={handleChange}
              />
            )}

            {details.searchCategory === "MARRIAGE" && (
              <FormSelect
                value={details.mType}
                id="mType"
                labelText="Marriage Type"
                onChange={handleChange}
              >
                {marriageTypes.map((elem, index) => (
                  <Option
                    text="Marriage Type"
                    key={index}
                    elem={elem}
                    id={index}
                  />
                ))}
              </FormSelect>
            )}
          </Row>
          {details.searchCategory === "MARRIAGE" && (
            <>
              <h3 className="bg-usrb text-white text-center">
                Marriage Details
              </h3>
              <Row>
                <NumberInput
                  value={details.mrNum}
                  id="mrNum"
                  labelText="Marriage Registration Number"
                  onChange={handleChange}
                />
                <DateInput
                  value={details.mdate}
                  id="mdate"
                  labelText="Marriage Date"
                  onChange={handleChange}
                />
                <TextInput
                  value={details.gName}
                  id="gName"
                  labelText="Groom Name"
                  onChange={handleChange}
                />
                <TextInput
                  value={details.bName}
                  id="bName"
                  labelText="Bride Name"
                  onChange={handleChange}
                />
              </Row>
            </>
          )}
          {details.searchCategory === "DIVORCE" && (
            <>
              <h3 className="bg-usrb text-white text-center">
                Divorce Details
              </h3>
              <Row>
                <NumberInput
                  value={details.drNum}
                  id="drNum"
                  labelText="Divorce Registration Number"
                  onChange={handleChange}
                />
                <DateInput
                  value={details.dDate}
                  id="dDate"
                  labelText="Divorce Date"
                  onChange={handleChange}
                />
                <TextInput
                  value={details.hName}
                  id="hName"
                  labelText="Husband Name"
                  onChange={handleChange}
                />
                <TextInput
                  value={details.wName}
                  id="wName"
                  labelText="Wife Name"
                  onChange={handleChange}
                />
              </Row>
            </>
          )}
          {details.searchCategory === "LICENSED PUBLIC PLACE OF WORSHIP" && (
            <>
              <h3 className="bg-usrb text-white text-center">
                Licensed Place Of Worship Details
              </h3>
              <Row>
                <TextInput
                  value={details.cName}
                  id="cName"
                  labelText="Church Name"
                  onChange={handleChange}
                />
                <FormSelect
                  value={details.cDistrict}
                  id="cDistrict"
                  labelText="District"
                  onChange={handleChange}
                >
                  {districtList.map((elem, index) => (
                    <Option text="Select District" key={index} elem={elem} />
                  ))}
                </FormSelect>
              </Row>
            </>
          )}
          {details.searchCategory === "SINGLE STATUS LETTER" && (
            <>
              <h3 className="bg-usrb text-white text-center">
                Single Status Letter Details
              </h3>
              <Row>
                <NumberInput
                  value={details.sslRM}
                  id="sslRM"
                  labelText="Single Status Letter Registration Number"
                  onChange={handleChange}
                />
                <TextInput
                  value={details.sslName}
                  id="sslName"
                  labelText="Name"
                  onChange={handleChange}
                />
              </Row>
            </>
          )}
          <Row className="justify-content-center">
            <>
              <Button className="bg-gray text-white" size="md">
                <i className="fa-regular fa-floppy-disk text-white mr-1"></i>
                Save
              </Button>
              <Button className="bg-usrb text-white" size="md" type="submit">
                <i class="fa-regular fa-paper-plane text-white mr-1"></i>
                Submit
              </Button>
              <Button className="bg-danger text-white" size="md">
                <i className="fa-solid fa-clock-rotate-left text-white mr-1"></i>
                Reset
              </Button>
            </>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
