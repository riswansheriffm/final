import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/Auth.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global/Global.css";

import Index from "../nmrs/pages/dashboard/Index.js";
import Register from "./pages/register/Register.js";
import ForgotPassword from "./pages/login/Forgetpassword.js";
import CivilMarriage from "./pages/end_users/civil_marriage/CivilMarriage.js";
import MainCard from "./components/main_card/MainCard.js";
import StatusTracking from "../nmrs/components/status_tracking/StatusTracking.js";
import ApprovalTracking from "../nmrs/pages/approval_screens/ApprovalTracking.js";
import LicenseRenewal from "./pages/church_admin/license_renewal/LicenseRenewal.js";
import SingleStatusLetter from "./pages/end_users/single_status_letter/SingleStatusLetter.js";
import LostCertificateRetrieval from "./pages/end_users/lost_certificate_retrieval/LostCertificateRetrieval.js";
import LicensingAChurch from "./pages/church_admin/licensing_a_church/LicensingAChurch.js";
import ProtectedRouteUser from "./routes/ProtectedRouteUser.js";

import Login from "./pages/login/Login.js";
import "react-toastify/dist/ReactToastify.css";
import DocumentSearch from "./pages/search/DocumentSearch.js";
import SearchResult from "./pages/search/result/SearchResult.js";
import FullSearchResult from "./pages/search/result/FullSearchResult.js";
import Favorite from "./pages/search/favorite/Favorite.js";
import ThankYou from "./pages/thankyou/ThankYou.js";
import UserCreation from "./pages/admin/user_creation/UserCreation.js";
import UserCreationChurch from "./pages/church_super_admin/user_creation/UserCreation.js";
import Create from "./pages/admin/faq/Create.js";
import ListView from "./pages/admin/faq/ListView.js";
import Payment from "./pages/admin/Payment/Payment.js";
import Profile from "./pages/profile/UserProfile.js";
import ChurchProfile from "./pages/profile/ChurchProfile.js";
import ListView_church from "./pages/church_super_admin/church_creation/Listview_church.js";
import Church from "./pages/church_super_admin/search/Church.js";
import Marriage from "./pages/church_super_admin/search/Marriage.js";

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" />} />
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgetpassword" element={<ForgotPassword />} />
      </Route>
      <Route element={<ProtectedRouteUser />}>
        <Route path="/index" element={<Index />} />
        <Route
          path="/civilmarriage/registration"
          element={
            <MainCard heading="Marriage Registration">
              <CivilMarriage />
            </MainCard>
          }
        />
        <Route
          path="/civilmarriage/status"
          element={
            <MainCard heading="Marriage Application Status">
              <StatusTracking />
            </MainCard>
          }
        />
        <Route
          path="/civilmarriage/approval"
          element={
            <MainCard heading="Marriage Applications Approval">
              <ApprovalTracking />
            </MainCard>
          }
        />

        <Route
          path="/singlestatusletter/apply"
          element={
            <MainCard heading="Single Status Letter Application">
              <SingleStatusLetter />
            </MainCard>
          }
        />
        <Route
          path="/singlestatusletter/status"
          element={
            <MainCard heading="Single Status Letter Application Status">
              <StatusTracking />
            </MainCard>
          }
        />
        <Route
          path="/singlestatusletter/approval"
          element={
            <MainCard heading="Single Status Letter Applications Approval">
              <ApprovalTracking />
            </MainCard>
          }
        />
        <Route
          path="/lostcertificateretrieval/apply"
          element={
            <MainCard heading="Lost Certificate Retrieval">
              <LostCertificateRetrieval />
            </MainCard>
          }
        />
        <Route
          path="/lostcertificateretrieval/status"
          element={
            <MainCard heading="Lost Certificate Retrieval Application Status">
              <StatusTracking />
            </MainCard>
          }
        />
        <Route
          path="/lostcertificateretrieval/approval"
          element={
            <MainCard heading="Lost Certificate Retrieval Applications Approval">
              <ApprovalTracking />
            </MainCard>
          }
        />

        <Route
          path="/churchlicensing/apply"
          element={
            <MainCard heading="Church License Application">
              <LicensingAChurch />
            </MainCard>
          }
        />
        <Route
          path="/churchlicensing/status"
          element={
            <MainCard heading="Church License Application Status">
              <StatusTracking />
            </MainCard>
          }
        />
        <Route
          path="/churchlicensing/approval"
          element={
            <MainCard heading="Church License Applications Approval">
              <ApprovalTracking />
            </MainCard>
          }
        />
        <Route
          path="/document/search"
          element={
            <MainCard heading="Document Search">
              <DocumentSearch />
            </MainCard>
          }
        />
        <Route
          path="/LicenseRenewal/apply"
          element={
            <MainCard heading="License Renewal Application">
              <LicenseRenewal />
            </MainCard>
          }
        />
        <Route
          path="/document/result"
          element={
            <MainCard heading="Search Result">
              <SearchResult />
            </MainCard>
          }
        />
        <Route
          path="/LicenseRenewal/Status"
          element={
            <MainCard heading="License Renewal Application Status">
              <StatusTracking />
            </MainCard>
          }
        />
        <Route
          path="/document/fullresult"
          element={
            <MainCard heading="Detailed Search Result">
              <FullSearchResult />
            </MainCard>
          }
        />
        <Route
          path="/LicenseRenewal/approval"
          element={
            <MainCard heading="License Renewal Applications Approval">
              <ApprovalTracking />
            </MainCard>
          }
        />
        <Route
          path="/document/favorite"
          element={
            <MainCard heading="Favorite">
              <Favorite />
            </MainCard>
          }
        />
        <Route
          path="/civilmarriage/thankyou"
          element={
            <MainCard heading="">
              <ThankYou />
            </MainCard>
          }
        />

        <Route
          path="/admin/usercreation"
          element={
            <MainCard heading="User Creation">
              <UserCreation />
            </MainCard>
          }
        />
        <Route
          path="/churchAdmin/usercreation"
          element={
            <MainCard heading="User Creation">
              <UserCreationChurch />
            </MainCard>
          }
        />
        <Route
          path="/admin/faqcrud"
          element={
            <MainCard heading="Frequently Asked Question - CRUD">
              <ListView />
            </MainCard>
          }
        />

        <Route
          path="/admin/payment"
          element={
            <MainCard heading="Payment">
              <Payment />
            </MainCard>
          }
        />
        <Route
          path="/profile"
          element={
            <MainCard heading="Search Churches">
              <Marriage />
            </MainCard>
          }
        />
        <Route path="/church/profile" element={<ChurchProfile />} />

        <Route
          path="/churchAdmin/Addchurch"
          element={
            <MainCard heading="Frequently Asked Question - CRUD">
              <ListView_church />
            </MainCard>
          }
        />
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
      </Route>
      <Route path="*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
}
