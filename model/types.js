const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "list of users in db",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLNonNull(GraphQLString) },
    isDeleted: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

const orderType = new GraphQLObjectType({
  name: "order",
  description: "list of orders",
  fields: () => ({
    orderId: { type: GraphQLNonNull(GraphQLString) },
    user: {
      type: new GraphQLObjectType({
        name: "user",
        fields: {
          userId: { type: GraphQLNonNull(GraphQLString) },
          userName: { type: GraphQLNonNull(GraphQLString) },
          cart: {
            type: new GraphQLList(
              new GraphQLObjectType({
                name: "CartItem",
                fields: {
                  itemID: { type: GraphQLNonNull(GraphQLString) },
                  itemName: { type: GraphQLNonNull(GraphQLString) },
                  category: { type: GraphQLNonNull(GraphQLString) },
                  Price: { type: GraphQLNonNull(GraphQLString) },
                },
              })
            ),
          },
        },
      }),
    },
    deliveryDetails: {
      type: new GraphQLObjectType({
        name: "delDetails",
        fields: {
          deliveryPersonId: { type: GraphQLNonNull(GraphQLString) },
          deliveryPersonName: { type: GraphQLNonNull(GraphQLString) },
          deliveryLocation: { type: GraphQLNonNull(GraphQLString) },
        },
      }),
    },
    noOfItems: { type: GraphQLNonNull(GraphQLString) },
    totalAmount: { type: GraphQLNonNull(GraphQLString) },
    isDeleted: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

const DelBoyType = new GraphQLObjectType({
  name: "DelBoy",
  description: "delivery person data",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
    gender: { type: GraphQLNonNull(GraphQLString) },
    Status: { type: GraphQLNonNull(GraphQLString) },
    isDeleted: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

const menuType = new GraphQLObjectType({
  name: "Menu",
  description: "Menu card",
  fields: () => ({
    itemId: { type: GraphQLNonNull(GraphQLString) },
    itemName: { type: GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLString) },
    isDeleted: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

module.exports = { menuType, DelBoyType, orderType, UserType };
