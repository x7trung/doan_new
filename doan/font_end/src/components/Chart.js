
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

const data = [
    {
        name: "Tháng 1",
        uv: 5000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Tháng 2",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Tháng 3",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Tháng 4",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "Tháng 5",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Tháng 6",
        uv: 2390,
        pv: 3800,
        amt: 2500
    },

];

export default function Chart() {
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            <linearGradient id="uv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="pv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
        </LineChart>
    );
}
