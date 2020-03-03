import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { FetchDelete } from "../util/Fetch";
import { UpdateModal } from "./UpdateModal";
import "../App.css";

interface Doc {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
}

export const Documents: React.FC = () => {
  const { docs, dispatch } = useContext(AppContext);

  const handleDelete = (str: string) => {
    FetchDelete(dispatch, str);
  };

  return (
    <div className="container text-center">
      <div className="row d-flex justify-content-center">
        {docs.map((d: Doc, x: number) => (
          <div
            style={{ width: "20rem" }}
            key={x}
            className="card m-2 px-2 py-3 bg-dark border-muted shadow-lg"
          >
            <div className="d-flex justify-content-between">
              <div className="col text-left text-white font-weight-bold">
                <UpdateModal d={d} />
              </div>
              <div className="col-6 d-flex justify-content-center align-items-center text-white">
                <h6 className="m-0">{d.title}</h6>
              </div>
              <div className="col text-right">
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleDelete(d._id);
                  }}
                  className="btn btn-outline-danger font-weight-bold rounded py-1 px-2"
                >
                  X
                </button>
              </div>
            </div>

            <p className="ellipsis-body lead text-white mt-3">{d.body}</p>
            <small className="text-light mt-auto">{d.createdAt}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
