export const FetchGet = async (dispatch: any) => {
  const res = await fetch("http://localhost:1337/api/v1/documents");
  const { data } = await res.json();
  dispatch({ type: "spread", docs: data });
};

export const FetchPost = async (dispatch: any, data: any) => {
  const res = await fetch("http://localhost:1337/api/v1/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const r = await res.json();
  r.success ? dispatch({ type: "add", docs: r.data }) : console.error(r.error);
};

export const FetchPut = async (dispatch: any, data: any) => {
  console.log(data);
  const res = await fetch("http://localhost:1337/api/v1/documents", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const r = await res.json();
  console.log(r);
  r.success
    ? dispatch({ type: "update", docs: r.data })
    : console.error(r.error);
};

export const FetchDelete = async (dispatch: any, id: string) => {
  const res = await fetch(`http://localhost:1337/api/v1/documents/${id}`, {
    method: "DELETE"
  });
  const r = await res.json();
  r.success ? dispatch({ type: "remove", _id: id }) : console.error(r.error);
};
