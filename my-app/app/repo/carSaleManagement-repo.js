import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CarSaleManagmentRepo {
    //get All
  async getSellers() {
    try {
      return prisma.seller.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getCars() {
    try {
      return prisma.car.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getOrders() {
    try {
      return prisma.order.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getManufacturers() {
    try {
      return prisma.manufacturer.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getCustomers() {
    try {
      return prisma.customer.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getUsers() {
    try {
      return prisma.user.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  //get By ID
  async getUserById(userID) {
    let parsedID = parseInt(userID)
    try {
      return prisma.user.findUnique({
        where:{ userID: parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getCustomerById(customerID) {
    let parsedID = parseInt(customerID)
    try {
      return prisma.customer.findUnique({
        where:{ customerID:parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getManufacturerById(manufacturerID) {
    let parsedID = parseInt(manufacturerID)
    try {
      return prisma.manufacturer.findUnique({
        where:{ manufacturerID: parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  
  async getOrderById(orderID) {
    let parsedID = parseInt(orderID)
    try {
      return prisma.order.findUnique({
        where:{orderID: parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  
  async getCarById(carID) {
    let parsedID = parseInt(carID)
    try {
      return prisma.car.findUnique({
        where:{ carID: parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getSellerById(sellerID) {
    let parsedID = parseInt(sellerID)
    try {
      return prisma.seller.findUnique({
        where:{ sellerID: parsedID }
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  //---------------------------------PART B--------------------------------

  //(1) The total amount of purchases (for all buyers) per product and per year,
  async getTotalOrdersPerCustomer() {
    //return all customers with how many items they purchased - without seller info
    const ordersPerCustomer = await prisma.order.groupBy({
      by: ["customerIDFK"],
      _sum: { quantity: true },
      _count: { customerIDFK: true },
    });

    return ordersPerCustomer;
  }


 async getTotalOrdersPerCustomerWithSum() {
  try { //return all customers with how many items they purchased along with the cusotmers info
    const customersWithOrders = await prisma.customer.findMany({
      include: {
        cstorder: true, //include orders for each customer
      },
    });

    //calculate total quantity for each customer
    const customersWithTotalQuantity = customersWithOrders.map(customer => {
      const totalQuantity = customer.cstorder.reduce((acc, order) => acc + order.quantity, 0);
      return {
        ...customer,
        totalPurchasedItems: customer.cstorder.length,
        totalQuantity,
      };
    });

    return customersWithTotalQuantity;
  } catch (error) {
    console.error("Error getting total orders per customer:", error);
    throw error;
  }
}

  //(2) The most 3 products bought over the last 6 months -> not last 6 months because we don't have purchased at date 
  //so this is the best 3 products bought over all. (not sure about)
  async getTopProductsAllTime() {
    try {
      const topProducts = await prisma.order.findMany({
        select: {
          carorder: {
            select: {
              model_name: true
            }
          },
          quantity: true
        },
        orderBy: [{ quantity: 'desc' }],
        take: 3
      });
  
      return topProducts;
    } catch (error) {
      console.error("Error getting top products:", error);
      throw error;
    }
  }
  

  //(3) The cars types never purchased,
  async getProductTypesNeverPurchased() {
    try {
      const allCars = await prisma.car.findMany();
  
      const purchasedCarIDs = await prisma.order.findMany({
        select: { carIDFK: true }
      });
  
      const purchasedCarIDsArray = purchasedCarIDs.map(order => order.carIDFK);

      const carsNeverPurchased = allCars.filter(car => !purchasedCarIDsArray.includes(car.carID));
  
      return carsNeverPurchased;
    } catch (error) {
      console.error("Error getting product types never purchased:", error);
      throw error;
    }
  }
  
  
  //(4)

  //(5)

  //(6)



//------------------------------------------------------------------------

    //tables with relations

    //Customer Relations
    //get customers and their contant info
    async getCustomersAndTheirContanctInfos() {
        try {
            const customersWithOrders = await prisma.customer.findMany({
                include:{
                    coninfo: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }

      //get customers with orders info
      async getCustomersAndTheirOrdersInfo() {
        try {
            const customersWithOrders = await prisma.customer.findMany({
                include: {
                  cstorder: true, 
                },
                include:{
                    coninfo: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }
      //get cusomters and their bank accounts info
      async getCustomersAndTheirBankAccountInfo() {
        try {
            const customersWithOrders = await prisma.customer.findMany({
                include:{
                    bankacc: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }
      //get customers and their shipping addresses
      async getCustomersAndTheirShippingInfo() {
        try {
            const customersWithOrders = await prisma.customer.findMany({
                include:{
                    shaddres: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }
      
      //Car Relation
      //get cars and their orders
      async getCarsAndTheirOrders() {
        try {
            const customersWithOrders = await prisma.car.findMany({
                include:{
                    orders: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }

      //Manufacturers Relation
      //get manufacturers and thier cars
      async getManufacturersAndTheirCars() {
        try {
            const customersWithOrders = await prisma.manufacturer.findMany({
                include:{
                    cars: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }

      //Sellers Relation
      //get sellers and their cars
      async getSellersAndTheirCars() {
        try {
            const customersWithOrders = await prisma.manufacturer.findMany({
                include:{
                    cars: true,
                }
              });
          
              return customersWithOrders;
        } catch (error) {
          console.error("Error getting total orders per customer:", error);
          throw error;
        }
      }

      
}

export default new CarSaleManagmentRepo();
