import { React } from 'react'
import styles from '@/app/page.module.css'

export default function CustomerOrder({ customersOrders }){
    return (
    <main className={styles.main} >
      
      <table className={styles.table}border={"2px"} >
        <caption>
            <h3>(1) Cutomers Total Purchased Items and Total Quantity</h3>
        </caption>
        <thead className={styles.thead}>
          <tr>
            <th>Customer Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Purchased Items</th>
            <th>Total Quantity</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>

          {
          customersOrders.map(order => 
          <tr>
            <td>{order.customerID}</td>
            <td>{order.first_name}</td>
            <td>{order.last_name}</td>
            <td>{order.totalPurchasedItems}</td>
            <td>{order.totalQuantity}</td>
            </tr>
          )}

        </tbody>
        {/* <h3 className={styles.description} rowSpan={5}>(1) Cutomers Total Purchased Items and Total Quantity</h3> */}
      </table>
    </main>
    )
}