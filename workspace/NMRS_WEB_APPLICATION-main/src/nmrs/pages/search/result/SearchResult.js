import { useLocation } from "react-router-dom";
import { Button, Table } from "reactstrap";
import MarriageResult from "../marriage/MarriageResult";
import SSLResult from "../single_status_leter/SSLResult";

import ChurchResult from "../church/ChurchResult";
import DivorceResult from "../divorce/DivorceResult";

export default function SearchResult() {
  const { state } = useLocation();

  const { searchCategory } = state.details;
  return (
    <>
      {searchCategory === "MARRIAGE" && (
        <MarriageResult searchCategory={searchCategory} />
      )}

      {searchCategory === "SINGLE STATUS LETTER" && (
        <SSLResult searchCategory={searchCategory} />
      )}
      {searchCategory === "LICENSED PUBLIC PLACE OF WORSHIP" && (
        <ChurchResult searchCategory={searchCategory} />
      )}

      {searchCategory === "DIVORCE" && (
        <DivorceResult searchCategory={searchCategory} />
      )}
    </>
  );
}
