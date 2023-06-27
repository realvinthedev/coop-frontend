import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from "react"



const styles = StyleSheet.create({
     container: {
          padding: 50,

     },
     headers: {
          marginBottom: 50,
          textAlign: 'left',
          fontSize: 7,
          fontWeight: 'bold',
     },
     header: {
          flexDirection: 'row',
          marginBottom: 5,
          fontWeight: 'bold',
          fontSize: 7,
     },
     item: {
          width: '50%',
          fontSize: 7
     },
     data: {
          textAlign: 'left',
          fontSize: 7,
          width: '60%'
     },
     total: {
          marginTop: 50,
          textAlign: 'right',
          fontSize: 7,
          fontWeight: 'bold',
     },
     margin: {
          marginBottom: 20,
     },
     table: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left'
     },
     row: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          marginBottom: 5
     },
     title: {
          width: '100%',
          backgroundColor: 'orange',
          color: 'white',
          padding: '5px',
     }
});


const PayslipPrinter = ({
     month,
     period,
     name,
     employeeId,
     filtered_additional,
     filtered_employee_dtr,
     default_base,
     default_bimonthly,
     default_daily,
     default_hourly,
     default_minute,
     grosspay_without_earnings,
     final_gross_pay,
     final_deduction,
     final_earnings,
     final_net_pay
}) => {

     const [currentDate, setCurrentDate] = useState(() => {
          const date = new Date();

          let day = date.getDate().toString().padStart(2, '0');;
          let month = (date.getMonth() + 1).toString().padStart(2, '0');;
          let year = date.getFullYear();

          let currentDate = `${month}-${day}-${year}`;
          return currentDate
     })

     const calculatefinal = () => {
          return final_earnings + grosspay_without_earnings
     }
     const firstvalue = calculatefinal();
     return (
          <Document>
               <Page orientation='landscape'>
                    <View style={styles.container}>
                         <Text style={styles.header}>Employee Payslip</Text>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.row}><Text style={styles.title}>Earnings</Text></View>
                         <View style={styles.header}>
                              <Text style={styles.item}>Details</Text>
                              <Text style={styles.data}>Days</Text>
                              <Text style={styles.data}>Hours</Text>
                              <Text style={styles.data}>Mins</Text>
                              <Text style={styles.data}>Amount</Text>
                         </View>

                    </View>

               </Page>
          </Document>
     )
}

export default PayslipPrinter