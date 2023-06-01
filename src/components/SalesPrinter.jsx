import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
     container: {
          padding: 50,
     },
     row: {
          flexDirection: 'row',
          marginBottom: 5,
     },
     headers: {
          marginBottom: 50,
          fontSize: 10,
          fontWeight: 'bold',
     },
     header: {
          flexDirection: 'row',
          marginBottom: 5,
     },
     item: {
          width: '300px',
          fontSize: 10,
          border: 1,
          borderColor: 'red',
     },
     item_date: {
          width: '20%',
          fontSize: 10,
          border: 1,
          padding: 5,
          borderColor: 'black',
     },
     item_date_noborder: {
          width: '20%',
          fontSize: 10,
          padding: 5,
     },
     item_date_margin: {
          width: '20%',
          fontSize: 10,
          border: 1,
          padding: 5,
          borderColor: 'black',
     },
     head: {
          width: '350px',
          fontSize: 10,
          border: 1,
          borderColor: 'red',
     },
     head_date: {
          width: '20%',
          fontSize: 10,
          padding: 5,
          border: 1,
          borderColor: 'black',
     },
     items: {
          width: '150px',
          marginRight: '150px',
          border: 1,
          borderColor: 'red',
     },
     total: {
          marginTop: 50,
          fontSize: 10,
          fontWeight: 'bold',
     },
     margin: {
          marginBottom: 50,
     },
     m_row: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          marginBottom: 5,
     },
     m_data: {
          textAlign: 'left',
          fontSize: 10,
          width: '60%',
     },
});

const SalesPrinter = ({ data, gross, cost, profit }) => {
     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();
          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let year = date.getFullYear();
          let currentDate = `${month}-${day}-${year}`;
          return currentDate;
     });
     const newData = [...data].sort((a, b) => {
          const dateA = new Date(a.pos_date);
          const dateB = new Date(b.pos_date);
          return dateA - dateB;
     });

     const ItemRow = () => (
          <View style={styles.row}>
               <Text style={styles.item_date_noborder}></Text>
               <Text style={styles.item_date_noborder}></Text>
               <Text style={styles.item_date_margin}>Total</Text>
               <Text style={styles.item_date}>{gross}</Text>
               <Text style={styles.item_date}>{cost}</Text>
               <Text style={styles.item_date}>{profit}</Text>
          </View>
     );

     return (
          <Document>
               <Page orientation="landscape">
                    <View style={styles.container}>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.margin} />
                         <View style={styles.header}>
                              <Text style={styles.head_date}>Date</Text>
                              <Text style={styles.head_date}>Transaction ID</Text>
                              <Text style={styles.head_date}>Number of Items</Text>
                              <Text style={styles.head_date}>Total Sales</Text>
                              <Text style={styles.head_date}>Total Actual Cost</Text>
                              <Text style={styles.head_date}>Total Net Profit</Text>
                         </View>
                         {newData ? (
                              newData.map((newData, index) => (
                                   <View style={styles.row} key={index}>
                                        <Text style={styles.item_date}>{newData.pos_date}</Text>
                                        <Text style={styles.item_date}>{newData.pos_transaction_id}</Text>
                                        <Text style={styles.item_date}>{newData.pos_items.length}</Text>
                                        <Text style={styles.item_date}>{newData.pos_total}</Text>
                                        <Text style={styles.item_date}>{newData.pos_cost_total}</Text>
                                        <Text style={styles.item_date}>{newData.pos_total - newData.pos_cost_total}</Text>
                                   </View>
                              ))
                         ) : (
                              <Text>No data available</Text>
                         )}
                          <Text style={styles.margin}></Text>
                         <ItemRow />
                    </View>
               </Page>
          </Document>
     );
};

export default SalesPrinter;