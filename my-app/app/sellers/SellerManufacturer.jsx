import { React } from 'react'
import styles from '@/app/page.module.css'

export default function SellerManufacturer({ most_manufacturer }){
    console.log(most_manufacturer)
    return (
    <main className={styles.main} >
      
      <table className={styles.table}border={"2px"} >
        <caption>
            <h3>(4) Sellers and The Manufacturers The Dealt With The Most.</h3>
        </caption>
        <thead className={styles.thead}>
          <tr>
            <th>Seller Id</th>
            <th>Seller Name</th>
            <th>Manufacturer Id</th>
            <th>Manufacturer Name</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>

          {
          most_manufacturer.map(sm => 
          <tr>
            <td>{sm.sellerID}</td>
            <td>{sm.seller_name}</td>
            <td>{sm.most_manufacturer.manufacturerID}</td>
            <td>{sm.most_manufacturer.manufacturer_name}</td>
            </tr>
          )}

        </tbody>
        {/* <h3 className={styles.description} rowSpan={5}>(1) Cutomers Total Purchased Items and Total Quantity</h3> */}
      </table>
    </main>
    )
}