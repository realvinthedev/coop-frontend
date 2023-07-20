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


const SavingsPrinter = ({ total_membershipfee, total_kayasavings, total_loans, total_captial, total_others, total_savings, total_housing}) => {

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
                              <Text style={styles.data}>Capital</Text>
                              <Text style={styles.data}>Savings</Text>
                              <Text style={styles.data}>Loans</Text>
                              <Text style={styles.data}>Special Savings</Text>
                              <Text style={styles.data}>Housing Equity</Text>
                              <Text style={styles.data}>Others</Text>
                              
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.item}>{ total_membershipfee}</Text>
                              <Text style={styles.data}>{ total_captial}</Text>
                              <Text style={styles.data}>{ total_savings}</Text>
                              <Text style={styles.data}>{ total_loans}</Text>
                              <Text style={styles.data}>{ total_kayasavings}</Text>
                              <Text style={styles.data}>{ total_housing}</Text>
                              <Text style={styles.data}>{ total_others}</Text>
                             
                         </View>

                    </View>
               </Page>
          </Document>
     )
}

export default SavingsPrinter