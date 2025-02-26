import { useState, useEffect } from "react";

// Custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // refactoring post method
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);

  // dealing with errors
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setMethod(method);
  };
  useEffect(() => {
    const fetchData = async () => {
      // loading
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]); // if url changes, triggers this function because of useEffect

  //refactoring POST
  useEffect(() => {
    const httpRequest = async () => {
      if (method == "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      } else if (method == "DELETE") {
        const productId = config.body ? JSON.parse(config.body).id : null;
        const res = await fetch(`${url}/${productId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          setCallFetch(true);
          setData((prevData) =>
            prevData.filter((item) => item.id != productId)
          );
        }
      }
    };
    if (method) httpRequest();
  }, [config, method, url]);
  return { data, httpConfig, loading, error };
};
