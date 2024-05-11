import { React } from 'react'
import styles from '@/app/page.module.css'

export default function TopCustomers({ topCustomers }){
    
    return (
    <main className={styles.main} >
      
      <table className={styles.table}border={"2px"} >
        <caption>
            <h3>(5) Customers With Most Orders Made and Their Countries.</h3>
        </caption>
        <thead className={styles.thead}>
          <tr>
            <th>Cusotmer Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>How Many Orders</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>

          {
          topCustomers.map(sm => 
          <tr>
            <td>{sm.customerID}</td>
            <td>{sm.first_name}</td>
            <td>{sm.last_name}</td>
            <td>{sm.orderCount}</td>
            <td>{sm.country}</td>
            </tr>
          )}

        </tbody>
      </table>
    </main>
    )
}