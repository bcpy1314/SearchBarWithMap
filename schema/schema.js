const graphql = require("graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
} = graphql;

const fs = require("fs");
const csv = require("fast-csv");
const states = [];

fs.createReadStream("./states.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => states.push(row))
  .on("end", () => console.log(states));

const USState = new GraphQLObjectType({
  name: "USState",
  fields: () => ({
    state: { type: GraphQLString },
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
    name: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    state: {
      type: new GraphQLList(USState),
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from database
        const regex = new RegExp("^" + args.name, "i");
        return states.filter((obj) => regex.test(obj.name));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
