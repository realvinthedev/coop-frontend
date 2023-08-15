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

const SavingsPrinter = ({ total_membershipfee, total_share, total_coop, total_special, total_kaya, total_karamay, total_others}) => {

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
                              <Text style={styles.item}>Membership Fee</Text>
                              <Text style={styles.data}>Share Capital</Text>
                              <Text style={styles.data}>Coop Savings</Text>
                              <Text style={styles.data}>Special Savings</Text>
                              <Text style={styles.data}>Kaya Savings</Text>
                              <Text style={styles.data}>Karamay Savings</Text>
                              <Text style={styles.data}>Others</Text>
                              
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.item}>{ total_membershipfee}</Text>
                              <Text style={styles.data}>{ total_share}</Text>
                              <Text style={styles.data}>{ total_coop}</Text>
                              <Text style={styles.data}>{ total_special}</Text>
                              <Text style={styles.data}>{ total_kaya}</Text>
                              <Text style={styles.data}>{ total_karamay}</Text>
                              <Text style={styles.data}>{ total_others}</Text>
                             
                         </View>

                    </View>
               </Page>
          </Document>
     )
}

export default SavingsPrinter