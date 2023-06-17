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
          textAlign: 'left',
          fontSize: 12,
          width: '60%'
     },
     total: {
          marginTop: 50,
          textAlign: 'right',
          fontSize: 12,
          fontWeight: 'bold',
     },
     margin: {
          marginBottom: 50,
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


const EmployeePrinter = ({
     name,
     age,
     birthday,
     email,
     contact_number,
     address,
     incase_of_emergency,
     job_title,
     contract,
     department,
     is_active,
     base_salary,
     start_date,
     end_date,
     sss,
     pagibig,
     tin,
     philhealth,
     bank_name,
     bank_account_number,
     vacation_leave,
     sick_leave,
     emergency_leave,
     regular_ot,
     restday_ot,
     special_ot,
     legal_ot,

     restday_first_eight_ot,
     special_first_eight_ot,
     legal_first_eight_ot
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
                         <Text style={styles.header}>Employee Profile</Text>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.row}><Text style={styles.title}>Profile</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Name</Text><Text style={styles.data}>{name}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Age</Text><Text style={styles.data}>{age}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Birthday</Text><Text style={styles.data}>{birthday}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Email</Text><Text style={styles.data}>{email}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Contact Number</Text><Text style={styles.data}>{contact_number}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Address</Text><Text style={styles.data}>{address}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Emergency Contact</Text><Text style={styles.data}>{incase_of_emergency}</Text></View>

                         <View style={styles.row}><Text style={styles.title}>Job Details</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Job Title</Text><Text style={styles.data}>{job_title}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Contract</Text><Text style={styles.data}>{contract}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Department</Text><Text style={styles.data}>{department}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Is Active</Text><Text style={styles.data}>{is_active}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Base Salary</Text><Text style={styles.data}>{base_salary}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Start Date</Text><Text style={styles.data}>{start_date}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>End Date</Text><Text style={styles.data}>{end_date}</Text></View>

                         <View style={styles.row}><Text style={styles.title}>Overtime Percentage</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Restday - First 8 hours</Text><Text style={styles.data}>{restday_first_eight_ot}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Special Holiday - First 8 hours</Text><Text style={styles.data}>{special_first_eight_ot}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Legal Holiday - First 8 hours</Text><Text style={styles.data}>{legal_first_eight_ot}</Text></View>


                         <View style={styles.row}><Text style={styles.data}>Regular OT Percentage</Text><Text style={styles.data}>{regular_ot}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Restday OT Percentage</Text><Text style={styles.data}>{restday_ot}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Special OT Percentage</Text><Text style={styles.data}>{special_ot}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Legal OT Percentage</Text><Text style={styles.data}>{legal_ot}</Text></View>

                         <View style={styles.row}><Text style={styles.title}>Government Taxes</Text></View>
                         <View style={styles.row}><Text style={styles.data}>SSS Number</Text><Text style={styles.data}>{sss}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>PAGIBIG Number</Text><Text style={styles.data}>{pagibig}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>TIN Number</Text><Text style={styles.data}>{tin}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Philhealth Number</Text><Text style={styles.data}>{philhealth}</Text></View>

                         <View style={styles.row}><Text style={styles.title}>Bank Details</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Account Name</Text><Text style={styles.data}>{bank_name}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Account Number</Text><Text style={styles.data}>{bank_account_number}</Text></View>


                         <View style={styles.row}><Text style={styles.title}>Leave Credits</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Vacation Leave</Text><Text style={styles.data}>{vacation_leave}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Sick Leave</Text><Text style={styles.data}>{sick_leave}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Emergency Leave</Text><Text style={styles.data}>{emergency_leave}</Text></View>
                    </View>

               </Page>
          </Document>
     )
}

export default EmployeePrinter