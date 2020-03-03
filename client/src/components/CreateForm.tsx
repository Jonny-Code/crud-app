import React, { useState, useContext, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { FetchPost } from "../util/Fetch";
import { getTimeCreated } from "../util/Dates";
import { Quotes } from "./Quotes";

export const CreateForm: React.FC = () => {
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
    FetchPost(dispatch, { ...form, createdAt: getTimeCreated() });
  };

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let { person, quote } = Quotes[Math.floor(Math.random() * Quotes.length)];
    let d = { title: person, body: quote, createdAt: getTimeCreated() };
    FetchPost(dispatch, d);
  };

  return (
    <>
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
    </>
  );
};
