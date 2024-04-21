import Index from "views/Index.js";

import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables";

import CivilMarriage from "screens/EndUsers/CivilMarriage/CivilMarriage";
import MainCard from "components/MainCard/MainCard";
import SingleStatusLetter from "screens/EndUsers/SingleStatusLetter";
import LostCertificateRetrieval from "screens/EndUsers/LostCertificateRetrieval/LostCertificateRetrieval";
import LicensingAChurch from "screens/ChurchAdmin/LicensingAChurch/LicensingAChurch";
import LicenseRenewal from "screens/ChurchAdmin/LicenseRenewal";

import DocumentSearch from "screens/Search/DocumentSearch";
import FAQ from "components/FooterContent/FAQ";
import UserCreation from "screens/Admin(NMRS)/UserCreation";

import Auduittrails from "../src/screens/Admin(NMRS)/Audittrail/index";
import MarriageApproval from "screens/ApprovalScreens/MarriageApproval";
import ApprovalTracking from "screens/ApprovalScreens/ApprovalTracking";

import ForgotPassword from "views/examples/Forgetpassword";
import StatusTracking from "components/StatusTracking/StatusTracking";
import SingleStatusApproval from "screens/ApprovalScreens/SingleStatusApproval";
import Create from "screens/Admin(NMRS)/FAQ-CRUD/Create";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-white",
    component: <Index />,
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar", "church_admin"],
  },
  {
    path: "/civilmarriage/registration",
    name: "Registration",
    icon: "ring",
    component: (
      <MainCard heading="Marriage Registration">
        <CivilMarriage />
      </MainCard>
    ),
    layout: "/admin",
  },
  {
    path: "/civilmarriage/status",
    name: "Status Tracking",
    icon: "ring",
    component: (
      <MainCard heading="Registration Status">
        <StatusTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar"],
  },

  {
    path: "/civilmarriage/approval",
    name: "Approval",
    icon: "ring",
    component: (
      <MainCard heading="Marriage Approval">
        <ApprovalTracking />
      </MainCard>
    ),
    layout: "/admin",
  },
  {
    path: "/singlestatusletter/apply",
    name: " Single Status Letter",
    icon: "fa-solid fa-person text-white",
    component: (
      <MainCard heading="Application Status">
        <SingleStatusLetter />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar"],
  },
  {
    path: "/singlestatusletter/status",
    name: " Single Status Letter",
    icon: "fa-solid fa-person text-white",
    component: (
      <MainCard heading="Application Status">
        <StatusTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar"],
  },

  {
    path: "/singlestatusletter/approval",
    name: "Single Status Letter",
    icon: "fa-solid fa-person text-white",
    component: (
      <MainCard heading="Single Status Letter">
        <ApprovalTracking />
      </MainCard>
    ),
    layout: "/admin",
  },
  {
    path: "/lostcertificateretrieval/status",
    name: "Retrieve Lost Certificate",
    icon: "lost",
    component: (
      <MainCard heading="Lost Certificate Retrieval">
        <StatusTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar"],
  },
  {
    path: "/lostcertificateretrieval/Approval",
    name: "Retrieve Lost Certificate",
    icon: "lost",
    component: (
      <MainCard heading="Lost Certificate Retrieval">
        <ApprovalTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "citizen", "superadmin", "registrar"],
  },
  {
    path: "/lostcertificateretrieval/Apply",
    name: "Retrieve Lost Certificate",
    icon: "lost",
    component: (
      <MainCard heading="Lost Certificate Retrieval">
        <LostCertificateRetrieval />
      </MainCard>
    ),
    layout: "/admin",
  },
  {
    path: "/churchlicensing/status",
    name: "Apply License For Church",
    icon: "fa-solid fa-church text-white",
    component: (
      <MainCard heading="Church Licensing">
        <StatusTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "church_admin", "superadmin"],
  },
  {
    path: "/churchlicensing/Approval",
    name: "Apply License For Church",
    icon: "fa-solid fa-church text-white",
    component: (
      <MainCard heading="Church Licensing">
        <ApprovalTracking />
      </MainCard>
    ),
    layout: "/admin",
    user: ["admin", "church_admin", "superadmin"],
  },
  {
    path: "/churchlicensing/apply",
    name: "Apply License For Church",
    icon: "fa-solid fa-church text-white",
    component: (
      <MainCard heading="Church Licensing">
        <LicensingAChurch />
      </MainCard>
    ),
    layout: "/admin",
  },

  {
    path: "/faq/create",
    name: "Create",
    icon: "fa-solid fa-church text-white",
    component: (
      <MainCard heading="Church Licensing">
        <Create />
      </MainCard>
    ),
    layout: "/admin",
  },
  // {
  //   path: "/licenserenewal",
  //   name: "Renew Church License",
  //   icon: "fa-solid fa-repeat text-white",
  //   component: (
  //     <MainCard
  //       heading="Renewal Of Church License"
  //       btnText="Renew Church License"
  //     />
  //   ),
  //   layout: "/admin",
  //   user: ["admin", "church_admin", "superadmin", "registrar"],
  // },
  // {
  //   path: "/licenserenewal/form",
  //   name: "Renew Church License",
  //   icon: "fa-solid fa-repeat text-white",
  //   component: (
  //     <MainCard heading="Renewal Of Church License">
  //       <LicenseRenewal />
  //     </MainCard>
  //   ),
  //   layout: "/admin",
  // },
  // {
  //   path: "/marriagesearch",
  //   name: "Search Marriage",
  //   icon: "fa-solid fa-magnifying-glass text-white",
  //   component: <DocumentSearch />,
  //   layout: "/admin",
  //   user: ["admin", "citizen", "church_admin", "superadmin", "registrar"],
  // },
  // {
  //   path: "/ApprovalScreen",
  //   name: "Approval",
  //   icon: "fa-solid fa-check text-white",
  //   component: <ApprovalTracking />,
  //   layout: "/admin",
  //   user: ["registrar"],
  // },
  // {
  //   path: "/Audittrail",
  //   name: "Audit Trail",
  //   icon: "fa-solid fa-magnifying-glass text-white",
  //   component: <Auduittrails />,
  //   layout: "/admin",
  //   user: ["admin", "citizen", "church_admin", "superadmin", "registrar"],
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    icon: "ni ni-key-25 text-info",
    component: <ForgotPassword />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/faq",
    name: "FAQ",
    icon: "ni ni-circle-08 text-pink",
    component: <FAQ />,
    layout: "/admin",
  },
  {
    path: "/usercreation",
    name: "User Creation",
    icon: "ni ni-circle-08 text-white",
    component: <UserCreation />,
    layout: "/admin",
  },
];
export default routes;
