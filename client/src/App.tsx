import React, { useReducer, useEffect } from "react";
import { AppContext } from "./contexts/AppContext";
import { DocumentForm } from "./components/DocumentForm";
import { Documents } from "./components/Documents";
import { DocumentPlaceholder } from "./components/DocumentPlaceholder";

function reducer(state: any, payload: any) {
  switch (payload.type) {
    case "add":
      return [...state, payload.docs];
    case "spread":
      return [...state, ...payload.docs];
    case "remove":
      return state.filter((i: any) => i._id !== payload._id);

    default:
      return [];
  }
}

const App: React.FC = () => {
  const [docs, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const res = await fetch("http://localhost:1337/api/v1/documents");
    const { data } = await res.json();
    dispatch({ type: "spread", docs: data });
  };

  return (
    <AppContext.Provider value={{ docs, dispatch }}>
      <div className="container bg-dark text-center px-4">
        <h1 className="text-light">Crud App</h1>

        {docs.length ? <Documents /> : <DocumentPlaceholder />}

        <DocumentForm />
      </div>
    </AppContext.Provider>
  );
};

export default App;
