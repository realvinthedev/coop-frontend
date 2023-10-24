import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from "react"



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
     margin: {
          marginBottom: 50,
     }
});


const ProductPrinter = ({ data, currentdate }) => {

     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })
   

     return (
          <Document>
               <Page orientation='landscape'>
                    <View style={styles.container}>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.header}>
                              <Text style={styles.item}>Code</Text>
                              <Text style={styles.data}>Product</Text>
                              <Text style={styles.data}>Description</Text>
                              <Text style={styles.data}>Cost Price</Text>
                              <Text style={styles.data}>Selling Price</Text>
                              <Text style={styles.data}>Stocks</Text>

                         </View>
                         {data.map((item, index) => (
                              <View style={styles.row} key={index}>
                                   <Text style={styles.item}>{item.product_code}</Text>
                                   <Text style={styles.data}>{item.product_name}</Text>
                                   <Text style={styles.data}>{item.product_description}</Text>
                                   <Text style={styles.data}>{item.product_cost_price}</Text>
                                   <Text style={styles.data}>{item.product_selling_price}</Text>
                                   <Text style={styles.data}>{item.product_stock}</Text>
                              </View>
                         ))}
                    </View>
               </Page>
          </Document>
     )
}

export default ProductPrinter