import fs from "fs-extra";
import path from "path";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sellerspath = path.join(process.cwd(), "app/data/seller.json");
const manufacturerpath = path.join(process.cwd(), "app/data/manufacturer.json");
const carpath = path.join(process.cwd(), "app/data/car.json");
const customerpath = path.join(process.cwd(), "app/data/customer.json");
const contactpath = path.join(process.cwd(), "app/data/contact_info.json");
const shippingpath= path.join(process.cwd(), "app/data/shipping_addres.json");
const bankpath= path.join(process.cwd(), "app/data/bank_account.json");
 const userpath= path.join(process.cwd(), "app/data/user.json");
 const orderpath= path.join(process.cwd(), "app/data/order.json");


async function seed() {

  try {
    const sellers = await fs.readJSON(sellerspath);
    const manufacturers = await fs.readJSON(manufacturerpath);
    const cars = await fs.readJSON(carpath);
    const customers = await fs.readJSON(customerpath);
    const shippings = await fs.readJSON(shippingpath);
    const contacts = await fs.readJSON(contactpath);
    const bankaccs = await fs.readJSON(bankpath);

      const users = await fs.readJSON(userpath);
    const orders = await fs.readJSON(orderpath);

     await prisma.order.deleteMany({}) 
    await prisma.bank_account.deleteMany({})


await prisma.contact_info.deleteMany({})

    await prisma.car.deleteMany({})
    await prisma.shipping_addres.deleteMany({})

    await prisma.seller.deleteMany({})
    await prisma.manufacturer.deleteMany({})
      
    await prisma.customer.deleteMany({})
    await prisma.user.deleteMany({})


  






    for (const seller of sellers) {
    
      await prisma.seller.create({ data: seller });
    }
    
    for (const manufacturer of manufacturers) {
    
      await prisma.manufacturer.create({ data: manufacturer });
    }
    for (const car of cars) {
    
      await prisma.car.create({ data: car });
    }
    for (const customer of customers) {
    
      await prisma.customer.create({ data: customer });
    }
    for (const contact of contacts) {
    
      await prisma.contact_info.create({ data: contact });
    }
    for (const shipping of shippings) {
    
      await prisma.shipping_addres.create({ data: shipping });
    }
    for (const bank of bankaccs) {
    
      await prisma.bank_account.create({ data: bank });
    }
    for (const user of users) {
    
      await prisma.user.create({ data: user });
    }
    for (const order of orders) {
    
      await prisma.order.create({ data: order });
    }
     


  } catch (error) {
    console.log(error);
    return { error: error.message };
  }

  console.log("Sample data created successfully!");
}

seed()
  .catch((error) => {
    console.error("Error populating database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
