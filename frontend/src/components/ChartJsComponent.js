import React from 'react';
import Chart from 'react-google-charts';

const ChartJSComponent = ({ data }) => {
    // Extract topics, city, region, and intensity data
    const chartData = [['Label', 'Intensity']];
    data.forEach(d => {
        chartData.push([`${d.topic},${d.region}`, d.intensity]);
    });

    return (
        <div>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'Intensity by Topics, City, and Region',
                    chartArea: { width: '50%' },
                    hAxis: { title: 'Intensity', minValue: 0 },
                    vAxis: { title: 'Label' },
                }}
            />
        </div>
    );
};

export default ChartJSComponent;
