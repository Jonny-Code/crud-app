import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { Quotes } from "./Quotes";
import { FetchPost } from "../util/FetchPost";

interface Props {
  kind: string;
}

export const DocumentForm: React.FC<Props> = ({ kind }) => {
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

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formEl.current?.reset();
    let d = { ...form, createdAt: new Date().toUTCString() };
    FetchPost(d, dispatch);
  };

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let { person, quote } = Quotes[Math.floor(Math.random() * Quotes.length)];
    let d = { title: person, body: quote, createdAt: new Date().toUTCString() };
    FetchPost(d, dispatch);
  };

  return (
    <>
      <div className="container mt-5 p-3 bg-dark">
        <h2 className="text-white">Create Documents</h2>
        <form ref={formEl}>
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
