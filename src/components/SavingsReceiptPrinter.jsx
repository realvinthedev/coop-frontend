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


const SavingsReceiptPrinter = ({  
     savingsid,
     date,
     particulars,
     type,
     amount,
     reference_document,
     remarks2,
     name
}) => {

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
               <Page>
                    <View style={styles.container}>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.headers}>Name: {name}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.header}>
                              <Text style={styles.item}>Date</Text>
                              <Text style={styles.data}>Particulars</Text>
                              <Text style={styles.data}>Type</Text>
                              <Text style={styles.data}>Amount</Text>
                              <Text style={styles.data}>Reference Document</Text>
                              <Text style={styles.data}>Remarks</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.item}>{ date}</Text>
                              <Text style={styles.data}>{ particulars}</Text>
                              <Text style={styles.data}>{ type}</Text>
                              <Text style={styles.data}>{ amount}</Text>
                              <Text style={styles.data}>{ reference_document}</Text>
                              <Text style={styles.data}>{ remarks2}</Text>
                             
                         </View>

                    </View>
               </Page>
          </Document>
     )
}

export default SavingsReceiptPrinter