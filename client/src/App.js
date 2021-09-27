import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import IconButton from "@material-ui/core/IconButton";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MaterialTable from '@material-table/core';
import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme, makeStyles } from "@material-ui/core/styles";

const LOAD_MOVIES = `
{
  getAllMovies {
    title
    year
  }
}`

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});


function App() {
  const [movies, setMovies] = React.useState();

  React.useEffect(() =>{
    fetch("http://localhost:6969/graphql", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      }, body: JSON.stringify({query: LOAD_MOVIES})
    }).then(data => {return data.json()})
    .then(data => setMovies(Object.values(data.data)[0]))
  }, []);
  
  

  const columns = [
    {title: "Title", field: "title"},
    {title: "Year", field: "year"}
  ]

  const [theme, setTheme] = useState(true);
  const classes = useStyles();
  const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const appliedTheme = createTheme(theme ? light : dark);

  console.log(movies)
  //const result = Object.values(movies)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appliedTheme}>
      <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => setTheme(!theme)}
          >
            {icon}
          </IconButton>
      <div>
      
          <MaterialTable 
          title="Movies"
          columns={columns}
          data={movies}
          options={{
            pageSize: 10,
            pageSizeOptions: [5,10,15],
            toolbar: true,
            paging: true
        }}/>

      </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

export const light = {
  palette: {
  type: 'light',
  },
  }
  export const dark = {
  palette: {
  type: 'dark',
  },
  }