import React from 'react'
import styles from '@/app/page.module.css'

export default function CarNoPurchase({carsNotPurchased}) {
    console.log(carsNotPurchased)
  return (
    <main className={styles.main} >
      
    <table className={styles.table} border={"2px"}>
        <caption>
            <h3>(3) Cars That Were Not Purchased At All</h3>
        </caption>
      <thead className={styles.thead}>
        <tr>
          <th>Car ID</th>
          <th>Model</th>
          <th>Year</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Manufacturer ID</th>
          <th>Seller ID</th>
        </tr>
      </thead>

      <tbody className={styles.tbody}>

        {
        carsNotPurchased.map(car => 
        <tr>
          <td>{car.carID}</td>
          <td>{car.model_name}</td>
          <td>{new Date(car.year).getFullYear()}</td>
          <td>{Number(car.price)}</td>
          <td>{car.stock}</td>
          <td>
            <img className={styles.carImage} src={car.image} />
          </td>
          <td>{car.manufacturerIDFK}</td>
          <td>{car.sellerIDFK}</td>
        </tr>
        )}
       
      </tbody>
    
    </table>
  </main>
  )
}
