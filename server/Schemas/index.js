const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const movieData = require("../movies2.json");

const MovieType = require("./TypeDefs/MovieType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllMovies: {
      type: new GraphQLList(MovieType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return movieData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
      },
      resolve(parent, args) {
        movieData.push({
          id: movieData.length + 1,
          title: args.firstName,
          year: args.lastName,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
