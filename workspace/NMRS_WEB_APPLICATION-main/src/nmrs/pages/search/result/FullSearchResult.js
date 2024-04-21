import { useLocation } from "react-router-dom";

import FullMarriageResult from "../marriage/FullMarriageResult";
import FullSSLResult from "../single_status_leter/FullSSLResult";
import FullDivorceResult from "../divorce/FullDivorceResult";
import FullChurchResult from "../church/FullChurchResult";

export default function FullSearchResult() {
  const { state } = useLocation();

  const { searchCategory } = state;
  return (
    <>
      {searchCategory === "MARRIAGE" && <FullMarriageResult />}

      {searchCategory === "SINGLE STATUS LETTER" && <FullSSLResult />}

      {searchCategory === "LICENSED PUBLIC PLACE OF WORSHIP" && (
        <FullChurchResult />
      )}
      {searchCategory === "DIVORCE" && <FullDivorceResult />}
    </>
  );
}
