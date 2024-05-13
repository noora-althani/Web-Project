import React from 'react';
import styles from '@/app/page.module.css';

export default function UsersCount({ usersType }) {
  return (
    <main className={styles.main}>
      <table className={styles.table} border="2px">
        <caption>
          <h3>(6) Counting Users in our System.</h3>
        </caption>
        <thead className={styles.thead}>
          <tr>
            <th>Admins</th>
            <th>Customers</th>
            <th>Sellers</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          <tr>
            <td>{usersType.Admins}</td>
            <td>{usersType.Customers}</td>
            <td>{usersType.Sellers}</td>
          </tr>
          <tr>
            <td colSpan="3">
                <h5>Total: {usersType.Admins + usersType.Customers + usersType.Sellers} Users</h5>
            </td>
        </tr>
        </tbody>
      </table>
    </main>
  );
}
