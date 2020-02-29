import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { PlaceholderQuotes } from "./PlaceholderQuotes";

export const DocumentForm = () => {
  const [form, setForm] = useState({
    title: "",
    body: ""
  });
  const { dispatch } = useContext(AppContext);

  const updateField = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    let d = { ...form, createdAt: new Date().toUTCString() };
    const res = await fetch("http://localhost:1337/api/v1/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(d)
    });
    const r = await res.json();
    dispatch({
      type: "add",
      docs: r.data
    });
    console.log(r);
  };
  const handleGenerate = (e: any) => {
    e.preventDefault();
    let { person, quote } = PlaceholderQuotes[
      Math.floor(Math.random() * PlaceholderQuotes.length)
    ];
    dispatch({
      type: "add",
      docs: { title: person, body: quote, createdAt: new Date().toUTCString() }
    });
  };

  return (
    <>
      <div className="container mt-5 p-3 bg-dark">
        <h2 className="text-white">Create Documents</h2>
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
          <div className="d-flex justify-content-center">
            <button onClick={handleSave} className="btn btn-success btn-lg m-3">
              Save
            </button>
            <button
              onClick={handleGenerate}
              className="btn btn-success btn-lg m-3"
            >
              Generate quote
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
