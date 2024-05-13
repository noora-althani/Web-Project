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
    let parsedID = parseInt(userID);
    try {
      return prisma.user.findUnique({
        where: { userID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getCustomerById(customerID) {
    let parsedID = parseInt(customerID);
    try {
      return prisma.customer.findUnique({
        where: { customerID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getManufacturerById(manufacturerID) {
    let parsedID = parseInt(manufacturerID);
    try {
      return prisma.manufacturer.findUnique({
        where: { manufacturerID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getOrderById(orderID) {
    let parsedID = parseInt(orderID);
    try {
      return prisma.order.findUnique({
        where: { orderID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getCarById(carID) {
    let parsedID = parseInt(carID);
    try {
      return prisma.car.findUnique({
        where: { carID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async getSellerById(sellerID) {
    let parsedID = parseInt(sellerID);
    try {
      return prisma.seller.findUnique({
        where: { sellerID: parsedID },
      });
    } catch (error) {
      return { error: error.message };
    }
  }
  async getCarsByName(model) {
    return await prisma.car.findMany({
      where: {
        model_name: {
          contains: model.toLowerCase(),
        },
      },
    });
  }

  async addCar(car) {
    try {
      return prisma.car.create({ data: car });
    } catch (error) {
      return { error: error.message };
    }
  }

  async addOrder(order) {
    try {
      return prisma.order.create({ data: order });
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateCar(carID, updatedCar) {
    let parsedID = parseInt(carID);
    return prisma.car.update({
      data: updatedCar,
      where: {
        carID: parsedID,
      },
    });
  }
  catch(error) {
    return { error: error.message };
  }

  async getCarsByCustomerId(custId) {
    let parsedID = parseInt(custId);
    const cars = await prisma.car.findMany({
      where: {
        orders: {
          some: {
            customerIDFK: parsedID,
          },
        },
      },
      include: {
        orders: true,
      },
    });
    return cars;
  }

  async getCarsBySellerId(sId) {
    let parsedID = parseInt(sId);
    const cars = await prisma.car.findMany({
      where: {
        sellerIDFK: parsedID,
      },
    });
    return cars;
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
    try {
      //return all customers with how many items they purchased along with the cusotmers info
      const customersWithOrders = await prisma.customer.findMany({
        include: {
          cstorder: true, //include orders for each customer
        },
      });

      //calculate total quantity for each customer
      const customersWithTotalQuantity = customersWithOrders.map((customer) => {
        const totalQuantity = customer.cstorder.reduce(
          (acc, order) => acc + order.quantity,
          0
        );
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
              model_name: true,
            },
          },
          quantity: true,
        },
        orderBy: [{ quantity: "desc" }],
        take: 3,
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
        select: { carIDFK: true },
      });

      const purchasedCarIDsArray = purchasedCarIDs.map(
        (order) => order.carIDFK
      );

      const carsNeverPurchased = allCars.filter(
        (car) => !purchasedCarIDsArray.includes(car.carID)
      );

      return carsNeverPurchased;
    } catch (error) {
      console.error("Error getting product types never purchased:", error);
      throw error;
    }
  }

  //(4) get manufacturers and sellers they delt with
  async getSellersWithMostManufacturer() {
    const sellersWithMostManufacturer = await prisma.seller.findMany({
      include: {
        cars: {
          include: {
            carmanf: true,
          },
        },
      },
    });

    const result = sellersWithMostManufacturer.map((seller) => {
      const manufacturerCount = seller.cars.reduce((acc, car) => {
        const manufacturerId = car.carmanf.manufacturerID;
        acc[manufacturerId] = acc[manufacturerId] ? acc[manufacturerId] + 1 : 1;
        return acc;
      }, {});
      const mostManufacturerId = Object.keys(manufacturerCount).reduce((a, b) =>
        manufacturerCount[a] > manufacturerCount[b] ? a : b
      );
      const mostManufacturer = seller.cars.find(
        (car) => car.carmanf.manufacturerID === parseInt(mostManufacturerId)
      ).carmanf;

      return {
        sellerID: seller.sellerID,
        seller_name: seller.seller_name,
        most_manufacturer: {
          manufacturerID: mostManufacturer.manufacturerID,
          manufacturer_name: mostManufacturer.manufacturer_name,
        },
      };
    });

    return result;
  }

  //(5) gets top 3 customers with most orderes and customer country
  async customersTop3Orders() {
    try {
      const topCustomers = await prisma.customer.findMany({
        include: {
          cstorder: true,
          shaddres: {
            select: {
              country: true,
            },
          },
        },
        orderBy: {
          cstorder: {
            _count: "desc",
          },
        },
        take: 3,
      });

      const formattedResult = topCustomers.map((customer) => {
        const { customerID, first_name, last_name, shaddres } = customer;
        const orderCount = customer.cstorder.length;
        const country = shaddres[0].country;
        return {
          customerID,
          first_name,
          last_name,
          orderCount,
          country,
        };
      });
      return formattedResult;
    } catch (error) {
      console.error("Error fetching top customers:", error.message);
      return { error: error.message };
    }
  }

  //(6)counts how many admins, sellers, customers in the system
  async getUserTypeCounts() {
    try {
      const userTypeCounts = await prisma.user.groupBy({
        by: ["type"],
        _count: true,
      });

      let adminCount = 0;
      let customerCount = 0;
      let sellerCount = 0;
      userTypeCounts.forEach((userTypeCount) => {
        const { type, _count } = userTypeCount;
        if (type === "Admin") {
          adminCount = _count;
        } else if (type === "customer") {
          customerCount = _count;
        } else if (type === "seller") {
          sellerCount = _count;
        }
      });

      return {
        Admins: adminCount,
        Customers: customerCount,
        Sellers: sellerCount,
      };
    } catch (error) {
      console.error("Error fetching user type counts:", error.message);
      return { error: error.message };
    }
  }

  //------------------------------------------------------------------------

  //tables with relations
  async getContactInfos() {
    try {
      return prisma.contact_info.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }
  async getContactInfoByCustomerId(custId) {
    let parsedID = parseInt(custId);
    const contanct = await prisma.contact_info.findMany({
      where: {
        customerIDFk: parsedID,
      },
    });
    return contanct;
  }

  async getAddresses() {
    try {
      return prisma.shipping_addres.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAddressByCustId(custId) {
    let parsedID = parseInt(custId);
    const contanct = await prisma.shipping_addres.findMany({
      where: {
        customerIDFK: parsedID,
      },
    });
    return contanct;
  }

  async getBankAccounts() {
    try {
      return prisma.bank_account.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  async getBankAccountByCustId(custId) {
    let parsedID = parseInt(custId);
    const contanct = await prisma.bank_account.findMany({
      where: {
        customerIDFK: parsedID,
      },
    });
    return contanct;
  }

  async updateBankAccount(accountNo, updatedAccount) {
    let parsedID = parseInt(accountNo)
    try {
      return prisma.bank_account.update({
        data: updatedAccount,
        where: {
          accountID: parsedID,
        },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  //Customer Relations
  //get customers and their contant info
  async getCustomersAndTheirContanctInfos() {
    try {
      const customersWithOrders = await prisma.customer.findMany({
        include: {
          coninfo: true,
        },
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
        include: {
          coninfo: true,
        },
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
        include: {
          bankacc: true,
        },
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
        include: {
          shaddres: true,
        },
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
        include: {
          orders: true,
        },
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
        include: {
          cars: true,
        },
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
        include: {
          cars: true,
        },
      });

      return customersWithOrders;
    } catch (error) {
      console.error("Error getting total orders per customer:", error);
      throw error;
    }
  }
}

export default new CarSaleManagmentRepo();
