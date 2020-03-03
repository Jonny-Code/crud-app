import React, { useEffect, useState } from "react";
import { Quotes } from "./Quotes";
import { getTimeCreated } from "../util/Dates";
import "../App.css";

export const DocumentPlaceholder: React.FC = () => {
  const [quote, setQuote] = useState({ person: "", quote: "" });
  useEffect(() => {
    setQuote(Quotes[Math.floor(Math.random() * Quotes.length)]);
  }, []);

  return (
    <>
      <div className="container text-center d-flex justify-content-center">
        <div className="row d-flex justify-content-center">
          <div
            style={{ minWidth: "20rem", maxWidth: "20rem" }}
            className="card m-2 px-2 py-3 bg-dark border-secondary"
          >
            <div className="d-flex justify-content-between">
              <div
                style={{ cursor: "pointer" }}
                className="col text-left text-muted font-weight-bold"
              >
                . . .
              </div>
              <div className="col d-flex justify-content-center align-items-center text-white">
                <h6 className="m-0 text-muted">{quote.person}</h6>
              </div>
              <div className="col text-right">
                <button className="btn btn-outline-secondary font-weight-bold py-1 px-2">
                  X
                </button>
              </div>
            </div>

            <p className="lead text-secondary">{quote.quote}</p>
            <small className="text-muted">{getTimeCreated()}</small>
          </div>
        </div>
      </div>
    </>
  );
};
