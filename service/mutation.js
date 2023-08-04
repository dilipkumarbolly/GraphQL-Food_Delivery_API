const uuid = require("uuid");
const repo = require("../repository/repo");
const { DelBoyType, UserType, menuType, orderType } = require("../model/types");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

let count = 00;
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    createUser: {
      type: UserType,
      description: "create user by name and location",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (
          args.name.trim().length === 0 ||
          args.location.trim().length === 0
        ) {
          throw new Error("Username and location required");
        } else {
          const user1 = {
            id: uuid.v4(),
            name: args.name,
            location: args.location,
          };
          await repo.createUser(user1);
          return user1;
        }
      },
    },
    //
    createDeliveryProfile: {
      type: DelBoyType,
      description: "Create deliver person profile by name, age and gender ",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        gender: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (args.name.trim().length === 0 || args.gender.trim().length === 0) {
          throw new Error("DeliveryGuy name, age and gender required");
        } else {
          const delboy1 = {
            id: uuid.v4(),
            name: args.name,
            age: args.age,
            gender: args.gender,
          };
          await repo.createDelBoy(delboy1);
          return delboy1;
        }
      },
    },

    createMenuItem: {
      type: menuType,
      description: "create menu by itemname category and price",
      args: {
        itemName: { type: GraphQLNonNull(GraphQLString) },
        category: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (
          args.itemName.trim().length === 0 ||
          args.category.trim().length === 0 ||
          args.price.trim().length === 0
        ) {
          throw new Error("itemName or category or price is missing");
        } else {
          const menu1 = {
            itemId: uuid.v4(),
            itemName: args.itemName,
            category: args.category,
            price: args.price,
          };
          await repo.createMenu(menu1);
          return menu1;
        }
      },
    },

    deleteMenuItem: {
      type: menuType,
      description: "delete menu by itemId",
      args: {
        itemId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (args.itemId.trim().length === 0) {
          throw new Error("itemId required");
        } else {
          const deletedData = await repo.deleteMenu(args.itemId);
          return deletedData;
        }
      },
    },

    deleteDelBoy: {
      type: DelBoyType,
      description: "delete deliveryBoy by id",
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        if (args.id.trim().length === 0) {
          throw new Error("id is required");
        } else {
          const deletedDelBoy = await repo.deletedelBoy(args.id);
          return deletedDelBoy;
        }
      },
    },

    updateAvailability: {
      type: DelBoyType,
      description: "update delivery boy status by id ",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (args.id.trim().length === 0 || args.status.trim().length === 0) {
          throw new Error("id required");
        } else {
          const updatedDelBoy = await repo.updateDelStatus(
            args.id,
            args.status
          );
          return updatedDelBoy;
        }
      },
    },

    deleteUser: {
      type: UserType,
      description: "delete user by id ",
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, args) => {
        if (args.id.trim().length === 0) {
          throw new Error("id required");
        } else {
          const deletedUser = await repo.deleteUserById(args.id);
          return deletedUser;
        }
      },
    },

    placeOrderByUserId: {
      type: orderType,
      description: "place order by userId and itemId",
      args: {
        userId: { type: GraphQLNonNull(GraphQLString) },
        itemId: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
      },
      resolve: async (parent, args) => {
        const existUser = await repo.findUserById(args.userId);
        if (!existUser) {
          throw new Error("please provide Correct userId");
        } else {
          const arr = [];
          for (const item of args.itemId) {
            const existingItem = await repo.findMenuByItemId(item);
            if (existingItem[0]) {
              arr.push({
                itemID: existingItem[0].itemId,
                itemName: existingItem[0].itemName,
                category: existingItem[0].category,
                Price: existingItem[0].price,
              });
            } else {
              throw new Error("please provide exact itemId");
            }
          }
          const deliveryPartner = await repo.findDelBoyStatus();
          if (!deliveryPartner) {
            throw new Error("please provide Correct deliveryBoy-Id");
          } else {
            const order = {
              orderId: `OD${new Date().getTime()}${++count}`,
              user: {
                userId: args.userId,
                userName: await existUser.name,
                cart: arr,
              },
              deliveryDetails: {
                deliveryPersonId: deliveryPartner.id,
                deliveryPersonName: deliveryPartner.name,
                deliveryLocation: existUser.location,
              },
              noOfItems: arr.length,
              totalAmount: arr.reduce((pre, obj) => {
                return pre + parseInt(obj.Price);
              }, 0),
            };
            await repo.createOrder(order);
            return order;
          }
        }
      },
    },
  }),
});

module.exports = {
  RootMutationType,
};
