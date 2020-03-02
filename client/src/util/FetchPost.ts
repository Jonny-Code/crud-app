export const FetchPost = async (data: any, dispatch: any) => {
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
