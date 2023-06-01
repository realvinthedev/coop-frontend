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
               <Page>
                    <View style={styles.container}>
                         <Text style={styles.header}>Employee Payslip</Text>
                         <Text style={styles.header}>Date: {currentDate}</Text>
                         <Text style={styles.margin}></Text>
                         <View style={styles.row}><Text style={styles.title}>Profile</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Name</Text><Text style={styles.data}>{name}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Employee ID</Text><Text style={styles.data}>{employeeId}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Month</Text><Text style={styles.data}>{month}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Period</Text><Text style={styles.data}>{period}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Base Salary</Text><Text style={styles.data}>{default_base.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Bi Monthly Salary</Text><Text style={styles.data}>{default_bimonthly.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Daily</Text><Text style={styles.data}>{default_daily.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Hourly</Text><Text style={styles.data}>{default_hourly.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Minute</Text><Text style={styles.data}>{default_minute.toLocaleString()}</Text></View>
                       
                         
                         <View style={styles.row}><Text style={styles.title}>Earnings</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Regular Basic</Text><Text style={styles.data}>{grosspay_without_earnings !==0? grosspay_without_earnings.toLocaleString(): "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Allowance</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.allowance !== 0 ? filtered_additional[0]?.allowance.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Pay Adjustment Earnings</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.pay_adjustment_deduction !==0 ? filtered_additional[0]?.pay_adjustment_deduction.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Other Earnings</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.other_earnings !== 0? filtered_additional[0]?.other_earnings.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Sub Total</Text><Text style={styles.data}>{firstvalue !==0? firstvalue.toLocaleString() : "0.00"}</Text></View>
                         {/* <View style={styles.row}><Text style={styles.data}>Sub Total</Text><Text style={styles.data}>{final_earnings + ((grosspay_without_earnings !== 0) ? grosspay_without_earnings.toLocaleString() : "0.00")}</Text></View> */}


                         <View style={styles.row}><Text style={styles.title}>Deductions</Text></View>
                         <View style={styles.row}><Text style={styles.data}>SSS Contributions</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.sss !==0? filtered_additional[0]?.sss.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>HDMF Contributions</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.pagibig !==0? filtered_additional[0]?.pagibig.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>PhilHealth Contributions</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.philhealth !==0? filtered_additional[0]?.philhealth.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>WTAX</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.wtax !==0? filtered_additional[0]?.wtax.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Lodging</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.lodging !==0? filtered_additional[0]?.lodging.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Water and Electricity</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.water_electricity!==0? filtered_additional[0]?.water_electricity.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>HMO / Group Insurance</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.hmo!==0?filtered_additional[0]?.hmo.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>HHHC Savings</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.hhhc_savings!==0?filtered_additional[0]?.hhhc_savings.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>HHHC Membership</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.hhhc_membership_fee!==0? filtered_additional[0]?.hhhc_membership_fee.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Cash Advance / Loans</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.cash_advances!==0?filtered_additional[0]?.cash_advances.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Pay Adjustment - Deduction</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.pay_adjustment_deduction!==0?filtered_additional[0]?.pay_adjustment_deduction.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Other Deduction</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.other_deduction!==0? filtered_additional[0]?.other_deduction.toLocaleString() : "0.00"}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Sub Total</Text><Text style={styles.data}>{filtered_additional && filtered_additional[0]?.total_deduction!==0? filtered_additional[0]?.total_deduction.toLocaleString() : "0.00"}</Text></View>

                         <View style={styles.row}><Text style={styles.title}>Total</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Gross Pay</Text><Text style={styles.data}>{final_gross_pay.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Deductions</Text><Text style={styles.data}>{final_deduction.toLocaleString()}</Text></View>
                         <View style={styles.row}><Text style={styles.data}>Net Pay</Text><Text style={styles.data}>{final_net_pay.toLocaleString()}</Text></View>


                    </View>

               </Page>
          </Document>
     )
}

export default PayslipPrinter