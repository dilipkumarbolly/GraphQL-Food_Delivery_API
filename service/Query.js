const repo = require("../repository/repo");
const { DelBoyType, UserType, menuType, orderType } = require("../model/types");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      description: "fetch user data ",
      resolve: async () => {
        const users = await repo.findAllUsers();
        return users;
      },
    },
    deliveryBoys: {
      type: GraphQLList(DelBoyType),
      description: "delivery boys data",
      resolve: async () => {
        const delboys = await repo.findAllDelBoys();
        return delboys;
      },
    },
    getAllItems: {
      type: GraphQLList(menuType),
      description: "menu card details by page and limit",
      args: {
        page: { type: GraphQLNonNull(GraphQLInt) },
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const menuItems = await repo.findMenuItems(args.page, args.limit);
        return menuItems;
      },
    },

    getAllItemByCategory: {
      type: GraphQLList(menuType),
      description: "get items by category",
      args: {
        category: { type: GraphQLNonNull(GraphQLString) },
        page: { type: GraphQLNonNull(GraphQLInt) },
        limit: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        if (args.category.trim().length === 0) {
          throw new Error("item category, page and limit required");
        } else {
          const itemsC = await repo.finditemByCategory(
            args.category,
            args.page,
            args.limit
          );
          return itemsC;
        }
      },
    },

    searchItemByName: {
      type: GraphQLList(menuType),
      description: "get items by name or a matching word",
      args: { name: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        const items = await repo.findItemsByName(args.name);
        return items;
      },
    },

    getOrderDetails: {
      type: GraphQLList(orderType),
      description: "get orderDetails by orderId",
      args: { orderId: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        const od = await repo.findOrderdetailsById(args.orderId);
        return od;
      },
    },
  }),
});

module.exports = {
  RootQueryType,
};
