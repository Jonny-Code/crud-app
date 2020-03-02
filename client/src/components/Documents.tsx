import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import "../App.css";

interface Doc {
  title: string;
  body: string;
  createdAt: string;
  _id: string;
}

export const Documents: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    body: ""
  });
  const { docs, dispatch } = useContext(AppContext);

  const handleDelete = async (str: string) => {
    const res = await fetch(`http://localhost:1337/api/v1/documents/${str}`, {
      method: "DELETE"
    });
    const r = await res.json();
    r.success ? dispatch({ type: "remove", _id: str }) : console.error(r.error);
  };
  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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
              <div
                style={{ cursor: "pointer" }}
                className="col text-left text-white font-weight-bold"
                data-toggle="modal"
                data-target={`#exampleModal_${d._id}`}
              >
                . . .
              </div>

              <div
                className="modal fade"
                id={`exampleModal_${d._id}`}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog bg-dark" role="document">
                  <div className="modal-content bg-dark">
                    <div className="d-flex justify-content-center modal-header border-secondary">
                      <div className="col">{""}</div>
                      <div className="col">
                        <h6
                          className="modal-title text-white"
                          id="exampleModalLabel"
                        >
                          {d.title}
                        </h6>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span className="text-white" aria-hidden="true">
                            &times;
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="modal-body">
                      <p className="text-white">{d.body}</p>
                    </div>
                    <div className="container mt-1 p-3 bg-dark">
                      <form>
                        <input
                          className="form-control mt-2 mb-2"
                          placeholder="title"
                          name="title"
                          onChange={updateField}
                        />
                        <textarea
                          placeholder="this is where you write the body..."
                          style={{ height: "8rem" }}
                          className="form-control mt-2 mb-2"
                          name="body"
                          onChange={updateField}
                        ></textarea>
                      </form>
                    </div>

                    <div className="modal-footer border-secondary justify-content-center">
                      <button type="button" className="btn btn-success">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-center align-items-center text-white">
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
