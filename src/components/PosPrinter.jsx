import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



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
          textAlign: 'left',
          fontSize: 12,
          fontWeight: 'bold',
     },
     header: {
          flexDirection: 'row',
          marginBottom: 5,
          fontWeight: 'bold',
          fontSize: 12,
     },
     item: {
          width: '50%',
          fontSize: 12
     },
     data: {
          width: '50%',
          textAlign: 'right',
          fontSize: 12
     },
     total: {
          marginTop: 50,
          textAlign: 'right',
          fontSize: 12,
          fontWeight: 'bold',
     },
});


const PosPrinter = ({ data, currentdate, total, transactionnumber }) => {
     return (
          <Document>
               <Page>
                    <View style={styles.container}>
                         <Text style={styles.header}>Purchase Receipt</Text>
                         <Text style={styles.headers}>Transaction ID: {transactionnumber}</Text>
                         <Text style={styles.header}>Date: {currentdate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.header}>
                              <Text style={styles.item}>Code</Text>
                              <Text style={styles.data}>Product</Text>
                              <Text style={styles.data}>Description</Text>
                              <Text style={styles.data}>Quantity</Text>
                              <Text style={styles.data}>Price</Text>
                              <Text style={styles.data}>Total</Text>
                         </View>
                         {data.map((item, index) => (
                              <View style={styles.row} key={index}>
                                   <Text style={styles.item}>{item.product_code}</Text>
                                   <Text style={styles.data}>{item.product_name}</Text>
                                   <Text style={styles.data}>{item.product_description}</Text>
                                   <Text style={styles.data}>{item.product_quantity}</Text>
                                   <Text style={styles.data}>{item.product_selling_price}</Text>
                                   <Text style={styles.data}>{item.product_total}</Text>
                              </View>
                         ))}
                         <Text style={styles.total}>Total: {total}</Text>
                    </View>
               </Page>
          </Document>
     )
}

export default PosPrinter