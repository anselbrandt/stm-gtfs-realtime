import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, fetchOptions?: {}) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, fetchOptions);
        const json: T = await response.json();
        setData(json);
      } catch (err) {
        const error: any = err;
        setError(error);
        console.log(error.toString());
      }
    };
    fetchData();
  }, []);

  return { data, error };
}
