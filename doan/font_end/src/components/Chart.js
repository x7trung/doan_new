
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";



const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{label}</p>
                <p className="label">{`Lợi nhuận: ${payload[0].value.toLocaleString()}đ`}</p>
                <p className="label">{`Tiền vốn : ${payload[1].value.toLocaleString()}đ`}</p>

            </div>
        );
    }

    return null;
};


export default function Chart({ data }) {
    function formatYAxis(value) {
        return value / 1000000 + " tr"
    }
    return (
        <LineChart
            width={1200}
            height={513}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="income" stroke="#82ca9d" />

        </LineChart>
    );
}
