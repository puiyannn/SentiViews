import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    { polarity: 'Positive', percentage: 12, color:'grey' },
    { polarity: 'Negative', percentage: 7, color:'black', },
  ];

const Pie = () => {

    return(
        <Chart data={data}>
            <PieSeries 
                color='black'
                valueField='percentage' 
                argumentField='polarity'/>
            <Legend/>
            {/* <Animation/> */}
        </Chart>

    )
};

export default Pie

// export default class Demo extends React.PureComponent {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         data,
//       };
//     }
  
//     render() {
//       const { data: chartData } = this.state;
  
//       return (
//         <Paper>
//           <Chart
//             data={chartData}
//           >
//             <PieSeries
//               valueField="area"
//               argumentField="country"
//             />
//             <Title
//               text="Area of Countries"
//             />
//             <Animation />
//           </Chart>
//         </Paper>
//       );
//     }
//   }