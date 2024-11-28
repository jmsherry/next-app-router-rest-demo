import { useState, useEffect, useRef } from "react";
import type Car from "@/types/Car";

export async function fetchCars(cookie = "") {
  const hostName = typeof window === 'undefined' ? 'http://localhost:3000' : 'https://nextjs-fullstack-rest-demo.vercel.app/';
  try {
    const res = await fetch(
      `${hostName}/api/cars`,
      cookie
        ? {
            headers: {
              cookie,
            },
          }
        : {}
    );

    if (!res.ok) {
      throw res;
    }

    const json: Car[] = await res.json();

    return json;
  } catch (err) {
    throw err;
  }
}

export function useFetchCars(
  { required }: { required: boolean } = { required: false }
) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let isMounted = useRef(false); 

  useEffect(
    () => {

      if (!loading && cars) {
        return;
      }
      setLoading(true);
      isMounted.current = true;

      fetchCars()
        .then((cars) => {
          // Only set the car if the component is still mounted
          if (isMounted) {
            setCars(cars);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            if (err instanceof Error) setError(err.message);
            if (err instanceof Response) setError(err.statusText);
          }
        });

      return () => {
        isMounted.current = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { cars, loading, error };
}
