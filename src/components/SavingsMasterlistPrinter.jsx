import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from "react"


const customPageSize = { width: 936, height: 612 }; // 13 inches x 8.5 inches
const styles = StyleSheet.create({
     // container: {
     //      padding: 50,

     // },
     // row: {
     //      flexDirection: 'row',
     //      marginBottom: 5,
     // },
     // headers: {
     //      marginBottom: 50,
     //      textAlign: 'left',
     //      fontSize: 6.5,
     //      fontWeight: 'bold',
     // },
     // header: {
     //      flexDirection: 'row',
     //      marginBottom: 5,
     //      fontWeight: 'bold',
     //      fontSize: 6.5,
     // },
     // item: {
     //      width: '50%',
     //      fontSize: 6.5
     // },
     // data: {
     //      width: '50%',
     //      textAlign: 'right',
     //      fontSize: 6.5
     // },
     // total: {
     //      marginTop: 50,
     //      textAlign: 'right',
     //      fontSize: 6.5,
     //      fontWeight: 'bold',
     // },
     // margin: {
     //      marginBottom: 50,
     // }
     container: {
          padding: 50,
     },
     row: {
          flexDirection: 'row',
          marginBottom: 5,
          border: '1pt solid black', // Add border to row
     },
     headers: {
          marginBottom: 50,
          textAlign: 'left',
          fontSize: 6.5,
          fontWeight: 'bold',
     },
     header: {
          flexDirection: 'row',
          marginBottom: 5,
          fontWeight: 'bold',
          fontSize: 6.5,
     },
     item: {
          width: '50%',
          fontSize: 6.5,
          padding: 5, // Add padding to make it visible
     },
     data: {
          width: '50%',
          textAlign: 'right',
          fontSize: 6.5,
          padding: 5,
          
     },
     total: {
          marginTop: 50,
          textAlign: 'right',
          fontSize: 6.5,
          fontWeight: 'bold',
     },
     margin: {
          marginBottom: 50,
     },
});


const SavingsMasterlistPrinter = ({ data }) => {

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
               <Page size={customPageSize}>
                    <View style={styles.container}>
                         <Text style={styles.header}>Date Printed: {currentDate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.header}>
                              <Text style={styles.item}>Member ID</Text>
                              <Text style={styles.data}>Firstname</Text>
                              <Text style={styles.data}>Middlename</Text>
                              <Text style={styles.data}>Lastname</Text>
                              <Text style={styles.data}>Membership Date</Text>
                              <Text style={styles.data}>Status</Text>
                              <Text style={styles.data}>HHHC Membership Number</Text>
                              <Text style={styles.data}>BOD Res</Text>
                              <Text style={styles.data}>Coop Savings Account Number</Text>
                              <Text style={styles.data}>Special Savings Passbook Number</Text>
                              <Text style={styles.data}>Special Savings Account Number</Text>
                              <Text style={styles.data}>Passbook Series Number</Text>
                              <Text style={styles.data}>Affiliation Org</Text>
                              <Text style={styles.data}>Passbook Printed</Text>
                              <Text style={styles.data}>Remarks</Text>
                              <Text style={styles.data}>Notes</Text>

                         </View>
                         {data.map((item, index) => (
                              <View style={styles.row} key={index}>
                                   <Text style={styles.item}>{item.member_id}</Text>
                                   <Text style={styles.data}>{item.firstname}</Text>
                                   <Text style={styles.data}>{item.middlename}</Text>
                                   <Text style={styles.data}>{item.lastname}</Text>
                                   <Text style={styles.data}>{item.membership_date}</Text>
                                   <Text style={styles.data}>{item.status}</Text>
                                   <Text style={styles.data}>{item.hhhc_membership_number}</Text>
                                   <Text style={styles.data}>{item.bod_res}</Text>
                                   <Text style={styles.data}>{item.coop_savings_account_number}</Text>
                                   <Text style={styles.data}>{item.kaya_atm_card_number}</Text>
                                   <Text style={styles.data}>{item.kaya_atm_savings_account_number}</Text>
                                   <Text style={styles.data}>{item.passbook_series_number}</Text>
                                   <Text style={styles.data}>{item.affiliation_org}</Text>
                                   <Text style={styles.data}>{item.passbook_printed}</Text>
                                   <Text style={styles.data}>{item.remarks}</Text>
                                   <Text style={styles.data}>{item.notes}</Text>
                              </View>
                         ))}

                    </View>
               </Page>
          </Document>
     )
}

export default SavingsMasterlistPrinter