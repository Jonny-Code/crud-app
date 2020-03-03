import React, { useReducer, useEffect } from "react";
import { AppContext, reducer } from "./contexts/AppContext";
import { CreateForm } from "./components/CreateForm";
import { Documents } from "./components/Documents";
import { DocumentPlaceholder } from "./components/DocumentPlaceholder";
import { FetchGet } from "./util/Fetch";

const App: React.FC = () => {
  const [docs, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    FetchGet(dispatch);
  }, []);

  return (
    <AppContext.Provider value={{ docs, dispatch }}>
      <div className="container bg-dark text-center px-4">
        <h1 className="text-light">Crud App</h1>

        {docs.length ? <Documents /> : <DocumentPlaceholder />}

        <div className="container mt-5 p-3 bg-dark">
          <h2 className="text-white">Create Documents</h2>
          <CreateForm />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
