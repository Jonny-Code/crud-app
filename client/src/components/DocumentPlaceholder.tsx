import React, { useEffect, useState } from "react";
import { PlaceholderQuotes } from "./PlaceholderQuotes";

export const DocumentPlaceholder: React.FC = () => {
  const [quote, setQuote] = useState({ person: "", quote: "" });
  useEffect(() => {
    setQuote(
      PlaceholderQuotes[Math.floor(Math.random() * PlaceholderQuotes.length)]
    );
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
              <div className="col">{""}</div>
              <div className="col h4 p-1 m-0 text-secondary">
                {quote.person}
              </div>
              <div className="col text-right">
                <button className="btn btn-outline-secondary font-weight-bold py-1 px-2">
                  X
                </button>
              </div>
            </div>

            <p className="lead text-secondary">{quote.quote}</p>
            <small className="text-muted">{new Date().toUTCString()}</small>
          </div>
        </div>
      </div>
    </>
  );
};
