import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_MOVIES } from "../GraphQL/Queries";

function GetMovies() {
  const { error, loading, data } = useQuery(LOAD_MOVIES);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data) {
      setMovies(data.getAllMovies);
    }
  }, [data]);

  return (
    <div>
      {}
    </div>
  );
}

export default GetMovies;
