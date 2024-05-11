import Image from "next/image";
import styles from "./page.module.css";
import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

import CustomerOrder from "@/app/orders/CustomerOrder";
import TopCars from "@/app/cars/TopCars";
import CarNoPurchase from "@/app/cars/CarNoPurchase";
import SellerManufacturer from "@/app/sellers/SellerManufacturer";
import UsersCount from '@/app/users/UsersCount'
import TopCustomers from "@/app/customers/TopCustomers";

export default async function YourComponent() {
  let custOrderSum = await carSaleManagementRepo.getTotalOrdersPerCustomerWithSum();
  let topCars = await carSaleManagementRepo.getTopProductsAllTime();
  let carsNotPurchased = await carSaleManagementRepo.getProductTypesNeverPurchased();
  let most_manufacturer = await carSaleManagementRepo.getSellersWithMostManufacturer()
  let topCustomers = await carSaleManagementRepo.customersTop3Orders()
  let usersType = await carSaleManagementRepo.getUserTypeCounts()

  let cars = await carSaleManagementRepo.getCars();

  console.log(custOrderSum);
  
 

  return (
    <>
      <h1 className={styles.center}>Statistics:</h1>
      {/* statistics compontnts */}
      <CustomerOrder customersOrders={custOrderSum}></CustomerOrder>
      <TopCars topCars={topCars}></TopCars>
      <CarNoPurchase carsNotPurchased={carsNotPurchased}></CarNoPurchase>
      < SellerManufacturer  most_manufacturer={most_manufacturer}></ SellerManufacturer>
      <TopCustomers topCustomers={topCustomers}></TopCustomers>
      <UsersCount usersType={usersType}></UsersCount>


      {/*not really necessary*/}
      <h2 style={{ textAlign: 'center' }}>Listing Cars In System</h2>
      <main className={styles.grid}>
        
        {cars.map((car) => (
          <div key={car.carID} className={styles.card}>
            <img className={styles.img} src={car.image} alt={car.model_name} />
            <p>{car.model_name}</p>
            <p>{new Date(car.year).getFullYear()}</p>
            <p>{Number(car.price)}</p>
          </div>
        ))}
      </main>
    </>
  );
}
