import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { FetchPut } from "../util/Fetch";

export const UpdateModal: React.FC<{ d: any }> = ({ d }) => {
  const [form, setForm] = useState({
    title: "",
    body: ""
  });
  const { dispatch } = useContext(AppContext);
  const formEl = useRef<HTMLFormElement>(null);

  const updateField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (d: any) => {
    formEl.current?.reset();
    FetchPut(dispatch, {
      _id: d._id,
      title: form.title,
      body: form.body,
      createdAt: d.createdAt
    });
  };

  return (
    <>
      <span
        data-toggle="modal"
        data-target={`#exampleModal_${d._id}`}
        style={{ cursor: "pointer" }}
      >
        . . .
      </span>

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
                <h6 className="modal-title text-white" id="exampleModalLabel">
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
              <form ref={formEl}>
                <input
                  onChange={updateField}
                  className="form-control mt-2 mb-2"
                  placeholder="title"
                  name="title"
                />
                <textarea
                  onChange={updateField}
                  placeholder="this is where you write the body..."
                  style={{ height: "8rem" }}
                  className="form-control mt-2 mb-2"
                  name="body"
                ></textarea>
                <div className="d-flex justify-content-center">
                  <button
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      handleUpdate(d);
                    }}
                    className="btn btn-success btn-lg m-3"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
