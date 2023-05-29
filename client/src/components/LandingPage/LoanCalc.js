import React, { useState } from 'react'
import Slider from '@mui/joy/Slider';
import { Box, Button, styled, Typography, Container } from '@mui/material';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import ReactApexChart from "react-apexcharts";


const PrettySlider = styled(Slider)(({ theme }) => ({
    root: { color: 'red', height: 10 },
    thumb: { height: 25, width: 15, backgroundColor: 'white', border: '3px solid black', marginTop: -9, marginLeft: -9 },
    track: { height: 10, borderRadius: 9 },
    rail: { height: 10, borderRadius: 9 }


}));

const SliderMarkers = {
    marksTenure: [
        { value: 0, label: '0' },
        { value: 90, label: '90' },
        { value: 180, label: '180' },
        { value: 270, label: '270' },
        { value: 360, label: '360' },
    ],
    marksInt: [
        { value: 0, label: '0' },
        { value: 5, label: '5%' },
        { value: 10, label: '10%' },
        { value: 15, label: '15%' },
        { value: 20, label: '20%' },

    ],
    marksAmt: [
        { value: 0, label: "0" },
        { value: 1500000, label: "15L" },
        { value: 3000000, label: "30L" },
        { value: 4500000, label: "45L" },
        { value: 6000000, label: "60L" },

    ]
}

const LoanCalc = () => {

    const [pAmount, setpAmount] = useState(2755);
    const [interest, setinterest] = useState(7);
    const [duration, setduration] = useState(147);
    const maxvalue = 6000000;
    const intMax = 20;
    const maxDuration = 360;

    const intr = interest / 1200;
    const emi = duration ? Math.round(pAmount * intr / (1 - (Math.pow(1 / (1 + intr), duration)))) : 0;
    const totalAmt = duration * emi;
    var TotalAmountOfCredit = Math.round((emi / intr) * (1 - Math.pow((1 + intr), (-duration))));
    const TotalAmountofInterest = Math.round(totalAmt - TotalAmountOfCredit);


   


    return (
     

          <Box
               sx={{
             width: '80%',
             marginX: 'auto',
             marginTop: '5rem',

         }}>

              <Typography variant="h3"
                 sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", py: 3, textAlign: 'center' }}>EMI Calculator</Typography>
             <Box marginTop={2}>

                 <Typography gutterbottom="true">Loan Amount</Typography>

                 <PrettySlider value={pAmount}
                     marks={SliderMarkers.marksAmt}

                     onChange={(event, vAmt) => { setpAmount(vAmt) }} defaultValue={pAmount} max={maxvalue} />

             </Box>

             <Box marginTop={2}>

                 <Typography gutterbottom="true">Interest Rate %</Typography>

                 <PrettySlider value={interest}
                     marks={SliderMarkers.marksInt}

                     onChange={(event, vInt) => { setinterest(vInt) }} defaultValue={interest} max={intMax} />

             </Box>

             <Box marginTop={2}>

                 <Typography gutterbottom="true">Tenure (Months)</Typography>

                 <PrettySlider value={duration}
                     marks={SliderMarkers.marksTenure}

                     onChange={(event, vDur) => { setduration(vDur) }} defaultValue={duration} max={maxDuration} />

             </Box>
             <Box sx={{
                 display: 'flex',
                 justifyContent: 'space-evenly',
                 alignItems: 'center',
                 flexWrap: 'wrap'
             }}>
                 <Box>
                     <Table>
                      
                          
                            
                                   <TableHead>
                                       <TableRow>
                                           <TableCell>
                                               Loan Amount
                                           </TableCell>
                                           <TableCell>
                                               &#x20b9;{pAmount}
                                           </TableCell>


                                       </TableRow>

                                       <TableRow>
                                           <TableCell>
                                               Interest Rate (%)
                                           </TableCell>
                                           <TableCell>
                                               {interest}
                                           </TableCell>


                                       </TableRow>

                                       <TableRow>
                                           <TableCell>
                                               Tenure (months)
                                           </TableCell>
                                           <TableCell>
                                               {duration}
                                           </TableCell>


                                       </TableRow>

                                       <TableRow>
                                           <TableCell>
                                               EMI (Monthly)
                                           </TableCell>
                                           <TableCell>
                                               &#x20b9;{emi}
                                           </TableCell>


                                       </TableRow>

                                       <TableRow>
                                           <TableCell>
                                               Total Interest
                                           </TableCell>
                                           <TableCell>
                                               &#x20b9;{TotalAmountofInterest}
                                           </TableCell>


                                       </TableRow>

                                       <TableRow>
                                           <TableCell>
                                               Total Payment <br /> (Loan Amount + Interest)
                                           </TableCell>
                                           <TableCell>
                                               &#x20b9;{totalAmt ? totalAmt : 0}
                                           </TableCell>


                                       </TableRow>


                                   </TableHead>
                             

                   


                   </Table>
               </Box>
               <Box>

                   <ReactApexChart
                       options={{
                           chart: { type: "donut" },
                           colors: ["#275be8", "#c4e8ef"],
                           legend: {
                               show: true,
                               position: 'top',
                               labels: {
                                   colors: ["#275be8", "#c4e8ef"]
                               }
                           },
                           dataLabels: { enabled: true },
                           labels: ["Total Interest", "Loan Amount"],




                       }}

                       series={[TotalAmountofInterest, pAmount]}
                       type="donut"
                       width="350px"
                       height="350px"
                   />
                </Box>


           </Box>





          </Box> 


       


    )
}

export default LoanCalc;
