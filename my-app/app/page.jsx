import Image from "next/image";
import styles from "./page.module.css";
import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo"

import CustomerOrder from "@/app/orders/CustomerOrder";
import TopCars from "@/app/cars/TopCars";
import CarNoPurchase from "@/app/cars/CarNoPurchase";

export default async function YourComponent() {
  let custOrderSum = await carSaleManagementRepo.getTotalOrdersPerCustomerWithSum()
  let topCars = await carSaleManagementRepo.getTopProductsAllTime()
  let carsNotPurchased = await carSaleManagementRepo.getProductTypesNeverPurchased()
  console.log(custOrderSum) 

  return (
    <>
    <CustomerOrder customersOrders={custOrderSum}></CustomerOrder>
    <TopCars topCars={topCars}></TopCars>
    <CarNoPurchase carsNotPurchased={carsNotPurchased}></CarNoPurchase>
    </>
    
  );
}
