import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./Analytics.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Analytics() {
  const [totalChats, setTotalChats] = useState(null);
  const [resolvedPercentage, setResolvedPercentage] = useState(null);
  const [weekData, setWeekData] = useState([]);
  const [replyTime, setReplyTime] = useState(null);

  const circleStyle = {
    background: `conic-gradient(#00D907 ${
      resolvedPercentage * 3.6
    }deg, #e0e0e0 0deg)`,
  };

  useEffect(() => {
    const getResolvedTickets = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/analytics/resolved`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResolvedPercentage(res.data.resolvedPercentage);
    };
    getResolvedTickets();
  }, []);

  useEffect(() => {
    const getTotalChats = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/analytics/total-chats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTotalChats(res.data.totalChats);
    };
    getTotalChats();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // const missedChatTimestamps = [
  //   "2024-04-01T10:00:00Z", // Week 1
  //   "2024-04-02T12:00:00Z", // Week 1
  //   "2024-04-03T14:30:00Z", // Week 1
  //   "2024-04-05T16:00:00Z", // Week 1
  //   "2024-04-07T09:00:00Z", // Week 1
  //   "2024-04-03T14:30:00Z", // Week 1
  //   "2024-04-05T16:00:00Z", // Week 1
  //   "2024-04-07T09:00:00Z", // Week 1
  //   "2024-04-03T14:30:00Z", // Week 1
  //   "2024-04-05T16:00:00Z", // Week 1
  //   "2024-04-07T09:00:00Z", // Week 1
  //   "2024-04-08T11:00:00Z", // Week 2
  //   "2024-04-10T15:00:00Z", // Week 2
  //   "2024-04-12T13:00:00Z", // Week 2
  //   "2024-04-14T18:00:00Z", // Week 2
  //   "2024-04-15T17:00:00Z", // Week 2
  //   "2024-04-10T15:00:00Z", // Week 2
  //   "2024-04-12T13:00:00Z", // Week 2
  //   "2024-04-14T18:00:00Z", // Week 2
  //   "2024-04-15T17:00:00Z", // Week 2
  //   "2024-04-17T09:30:00Z", // Week 3
  //   "2024-04-18T16:15:00Z", // Week 3
  //   "2024-04-19T11:00:00Z", // Week 3
  //   "2024-04-21T12:45:00Z", // Week 3
  //   "2024-04-23T14:30:00Z", // Week 4
  //   "2024-04-24T10:30:00Z", // Week 4
  //   "2024-04-25T15:30:00Z", // Week 4
  //   "2024-04-27T17:30:00Z", // Week 5
  //   "2024-04-30T11:00:00Z", // Week 5
  //   "2024-05-02T13:30:00Z", // Week 5
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  //   "2024-05-03T14:45:00Z", // Week 6
  //   "2024-05-04T12:00:00Z", // Week 6
  // ];

  useEffect(() => {
    const fetchReplyTime = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/analytics/reply-time`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data.averageReplyTime);
      setReplyTime(res.data.averageReplyTime);
    };
    fetchReplyTime();
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/analytics/missed-chats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const timestamps = res.data.missedChatTimestamps;

      if (timestamps.length === 0) {
        const emptyWeeks = Array.from({ length: 10 }, (_, i) => ({
          label: `Week ${i + 1}`,
          count: 0,
        }));
        setWeekData(emptyWeeks);
        return;
      }

      timestamps.sort((a, b) => new Date(a) - new Date(b));

      const firstDate = new Date(timestamps[0]);
      let currentWeekStart = new Date(firstDate);
      let currentWeekEnd = new Date(firstDate);
      currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

      let count = 0;
      let weekNumber = 1;
      const weeks = [];

      for (const time of timestamps) {
        const chatDate = new Date(time);

        if (chatDate <= currentWeekEnd) {
          count++;
        } else {
          weeks.push({
            label: `Week ${weekNumber}`,
            count,
          });

          currentWeekStart.setDate(currentWeekStart.getDate() + 7);
          currentWeekEnd.setDate(currentWeekEnd.getDate() + 7);

          count = 1;
          weekNumber++;
        }
      }

      weeks.push({
        label: `Week ${weekNumber}`,
        count,
      });

      while (weeks.length < 10) {
        weekNumber++;
        weeks.push({
          label: `Week ${weekNumber}`,
          count: 0,
        });
      }
      setWeekData(weeks);
    };

    fetchData();
  }, []);
  const data = {
    labels: weekData.map((item) => item.label),
    datasets: [
      {
        label: "Missed Chats",
        data: weekData.map((item) => item.count),
        borderColor: "#00D907",
        backgroundColor: "#00D907",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#000000",
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} chats`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        title: {
          display: true,
          text: "Weeks",
        },
        ticks: {
          callback: function (val, index) {
            return `Week ${index + 1}`;
          },
        },
      },
    },
  };

  return (
    <div className="container-dashboard">
      <div className="inner-container-dashboard">
        <SideBar />
        <div className="right-inner-dashboard">
          <h3 className="heading-dashboard">Analytics</h3>
          <div className="main-content-analytics">
            <div className="missed-chats-analytics">
              <h4>Missed Chats</h4>
              <Line options={options} data={data} />
            </div>
            <div className="average-time-analytics">
              <h4>Average Reply Time</h4>
              <div className="average-time-div">
                <p>
                  For highest customer satisfaction rates you should aim to
                  reply to an incoming customer's message in 15 seconds or less.
                  Quick responses will get you more conversations, help you earn
                  customers trust and <br /> make more sales.
                </p>
                <h2>{replyTime} secs</h2>
              </div>
            </div>
            <div className="resolved-tickets-analytics">
              <h4>Resolved Tickets</h4>
              <div className="resolved-div">
                <p>
                  A callback system on a website, as well as proactive
                  invitations, help to attract even more customers. A separate
                  round button for ordering a call with a small animation helps
                  to motivate more <br /> customers to make calls.
                </p>
                <div className="circle-wrapper">
                  <div className="circle" style={circleStyle}>
                    <div className="circle-inner">
                      <span>{resolvedPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="total-chats-analytics">
              <h4>Total Chats</h4>
              <div className="total-chats-div">
                <p>
                  This metric Shows the total number of chats for all Channels
                  for the selected the selected period{" "}
                </p>
                <h2>{totalChats} Chats</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
