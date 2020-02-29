import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const Documents: React.FC = () => {
  const { docs, dispatch } = useContext(AppContext);

  const handleDelete = async (str: string) => {
    const res = await fetch(`http://localhost:1337/api/v1/documents/${str}`, {
      method: "DELETE"
    });
    const r = await res.json();
    console.log(r);
    r.success ? dispatch({ type: "remove", _id: str }) : console.error(r.error);
  };

  return (
    <div className="container text-center">
      <div className="row d-flex justify-content-center">
        {docs.map((d: any, x: number) => (
          <div
            style={{ width: "20rem" }}
            key={x}
            className="card m-2 px-2 py-3 bg-dark border-secondary shadow-lg"
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
                        <h5
                          className="modal-title text-white"
                          id="exampleModalLabel"
                        >
                          {d.title}
                        </h5>
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
                          // onChange={updateField}
                        />
                        <textarea
                          placeholder="this is where you write the body..."
                          style={{ height: "8rem" }}
                          className="form-control mt-2 mb-2"
                          name="body"
                          // onChange={updateField}
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
              <div className="col h4 p-1 m-0 text-white">{d.title}</div>
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

            <p className="lead text-white">{d.body}</p>
            <small className="text-light">{d.createdAt}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
