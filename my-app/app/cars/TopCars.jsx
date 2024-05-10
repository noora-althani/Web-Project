import React from 'react'
import styles from '@/app/page.module.css'
import { Span } from 'next/dist/trace'


export default function TopCars({topCars}) {
  return (
     <main className={styles.main} >
      
      <table className={styles.table} border={"2px"}>
        <caption>
            <h3>(2) Top 3 Purchased Car Models of All Time</h3>
        </caption>

        <thead className={styles.thead}>
          <tr>
            <th>Car Model Name</th>
            <th>Quantity Sold</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>

          {
          topCars.map(car => 
          <tr>
            <td>{car.carorder.model_name}</td>
            <td>{car.quantity}</td>
          </tr>
          )}

        </tbody>
        {/* <h3 className={styles.description}>(2) Top 3 Purchased Car Models of All Time</h3> */}
      </table>
    </main>
  )
}
