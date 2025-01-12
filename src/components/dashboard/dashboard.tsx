import { useCallback, useEffect, useMemo, useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { backend_url } from "../../utill/utill";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import TopNavbar from "../topNavbar.tsx";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import dailCost from "../../assets/icons/daily cost.svg";
import icon1 from "../../assets/icons/icon 1.svg";
import icon2 from "../../assets/icons/icon 2.svg";
import icon3 from "../../assets/icons/icon 3.svg";
import icon4 from "../../assets/icons/icon 4.svg";
import logo from "../../assets/images/logo2.png";

interface StockData {
  [model: string]: number;
}

const data = [
  { name: "Label 1", value: 36638465.14 },
  { name: "Label 2", value: 8141881.2 },
  { name: "Label 3", value: 4070940.6 },
  { name: "Label 4", value: 12212821.83 },
  { name: "Label 5", value: 12212821.83 },
];

interface Order {
  id: number;
  amount: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4848"];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [stockData, setStockData] = useState<StockData>({});
  const [totalIncomeMonth, setTotalIncomeMonth] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [orderCountWholesale, setOrderCountWholesale] = useState(0);
  const [dailyCost, setDailyCost] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const [dailyCosts, setDailyCosts] = useState<any[]>([]);
  useEffect(() => {
    if (isModalOpen1) {
      // Fetch stock data only when the modal is open
      const fetchStockData = async () => {
        try {
          const response = await axios.get(
            `${backend_url}/api/imei/count/sale`
          );
          setStockData(response.data);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      };
      fetchStockData();
    }
  }, [isModalOpen1]);

  useEffect(() => {
    // Consolidate fetch calls into one useEffect to reduce separate fetch requests
    const fetchData = async () => {
      try {
        const [
          dailyCostRes,
          totalIncomeMonthRes,
          orderCountRes,
          soldCountRes,
          orderCountWholesaleRes,
          dailyCostsRes,
          retailRes,
          wholesaleRes,
          returnRes,
        ] = await Promise.all([
          axios.get(`${backend_url}/api/dailyCost/monthly/cost`),
          axios.get(`${backend_url}/api/retailOrder/monthly`),
          axios.get(`${backend_url}/api/retailOrder/order/count`),
          axios.get(`${backend_url}/api/imei/sold-count-this-month`),
          axios.get(`${backend_url}/api/wholesaleOrder/count-this-month`),
          fetch(`${backend_url}/api/dailyCost/today`),
          axios.get(`${backend_url}/api/retailOrder/today`),
          axios.get(`${backend_url}/api/retailOrder/wholesale/today`),
          axios.get(`${backend_url}/api/retailOrder/return/today`),
        ]);

        // Set each state based on respective API responses
        setDailyCost(dailyCostRes.data.data);
        setTotalIncomeMonth(totalIncomeMonthRes.data);
        setOrderCount(Math.floor(orderCountRes.data));
        setSoldCount(soldCountRes.data);
        setOrderCountWholesale(orderCountWholesaleRes.data);
        const dailyCostsData = await dailyCostsRes.json();
        if (dailyCostsRes.ok) setDailyCosts(dailyCostsData.data);

        // Combine orders data
        const combinedOrders = [
          ...retailRes.data,
          ...wholesaleRes.data,
          ...returnRes.data,
        ];
        setOrders(combinedOrders);
        calculateTotalIncome(combinedOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalIncome = useCallback(
    (orders: any) => {
      const total = orders.reduce(
        (sum: any, order: any) => sum + order.total_amount,
        0
      );
      setTotalIncome(total);
    },
    [orders]
  );

  const today = new Date().toLocaleDateString();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1);
  };

  const saveToPDF = () => {
    const input = document.getElementById("pdf-content");
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        // Define margins and header positioning
        const headerMarginTop = 10;
        const headerMarginLeft = 10;

        // Function to add header content
        const addHeader = () => {
          // Set the color for the header background (dark green)
          pdf.setFillColor(0, 128, 0); // RGB for dark green

          // Draw a rectangle covering the top part of the page (header area)
          pdf.rect(0, 0, 100, 50, "F"); // Adjust the height (50) if needed
          // Draw the right rounded end
          pdf.ellipse(100, 0, 50, 50, "F");

          // Header
          pdf.setFontSize(20);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(0, 100, 0);
          pdf.text("INCOME REPORT", 205, 30, { align: "right" });

          pdf.setFontSize(15);
          pdf.setFont("helvetica");
          pdf.setTextColor(0, 0, 0);
          pdf.text(`Date: ${new Date().toLocaleDateString()}`, 205, 35, {
            align: "right",
          });

          // "I MOBILE CRAZY" Text
          pdf.setFontSize(18);
          pdf.setTextColor(255, 255, 255);
          pdf.text(
            "I MOBILE CRAZY",
            headerMarginLeft + 60,
            headerMarginTop + 10,
            {
              align: "center",
            }
          );

          // Additional Information
          pdf.setFontSize(10);
          pdf.setTextColor(255, 255, 255);
          pdf.text(
            "Distributors of Mobile",
            headerMarginLeft + 55,
            headerMarginTop + 15,
            {
              align: "center",
            }
          );
          pdf.text(
            "Phones & Accessories",
            headerMarginLeft + 55,
            headerMarginTop + 20,
            {
              align: "center",
            }
          );

          // Add the logo on top of the dark green background
          pdf.addImage(logo, "PNG", headerMarginLeft, headerMarginTop, 30, 30);

          // Set font settings for the header text
          pdf.setFontSize(12);
          pdf.setTextColor(0, 0, 0); // Set text color to white for contrast on green background

          // Add income-related text on the white background
          pdf.text(
            `Daily Income: ${totalIncome.toFixed(2)}`,
            205,
            headerMarginTop + 35,
            { align: "right" }
          );
          pdf.text(
            `Daily Cost: ${dailyCost.toFixed(2)}`,
            205,
            headerMarginTop + 40,
            { align: "right" }
          );
          pdf.text(
            `Total Income: ${netIncome.toFixed(2)}`,
            205,
            headerMarginTop + 45,
            { align: "right" }
          );
        };

        // Add header to the first page
        addHeader();

        // Add the image to the first page
        pdf.addImage(imgData, "PNG", 0, 60, imgWidth, imgHeight);
        heightLeft -= pageHeight - 60;

        // Add additional pages if needed
        while (heightLeft > 0) {
          pdf.addPage();
          addHeader();
          pdf.addImage(imgData, "PNG", 0, 60, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save("income-report.pdf");
      });
    } else {
      console.error("The element with the specified ID was not found.");
    }
  };

  /*const saveToPDFStock = () => {
    const input = document.getElementById("pdf-content");
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Add header
        pdf.setFontSize(12);
        pdf.setTextColor(40);
        pdf.text("Stock Report", 14, 20);
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

        pdf.addImage(imgData, "PNG", 0, 40, imgWidth, imgHeight);
        heightLeft -= pageHeight - 40;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.text("Stock Report", 14, 20);
          pdf.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

          position = heightLeft - imgHeight;
          pdf.addImage(imgData, "PNG", 0, position + 40, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("stock-report.pdf");
      });
    }
  };*/

  const saveToPDFStock = () => {
    const input = document.getElementById("pdf-content");
    let rowCount = 0; // Declare rowCount here
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        const topMargin = 20;
        const pageWidth = 210;

        const leftMargin = 10;
        const centerX = pageWidth / 2; // Center the content

        const imgX = centerX - imgWidth / 2; // Center image horizontally
        const imgY = 33;

        // Calculate circle properties
        const centerFX = imgX + imgWidth / 2;
        const centerY = imgY + imgHeight / 2;
        const radius = Math.min(imgWidth, imgHeight) / 2;

        // Draw a white circle behind the image
        pdf.setFillColor(255, 255, 255);
        pdf.circle(centerFX, centerY, radius, 'F');

        // Set dark green background for the upper section
        pdf.setFillColor(0, 100, 0);
        pdf.rect(leftMargin, topMargin, 80, 40, 'F');

        // Draw the right rounded end
        pdf.ellipse(leftMargin + 80, topMargin + 20, 20, 20, 'F');

        // Header
        pdf.setFontSize(20);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 100, 0);
        pdf.text("STOCK REPORT", pageWidth - 20, topMargin + 10, { align: "right" });

        // "I MOBILE CRAZY" Text
        pdf.setFontSize(18);
        pdf.setTextColor(255, 255, 255);
        pdf.text("I MOBILE CRAZY", 69, 40, { align: "center" });

        // Additional Information
        pdf.setFontSize(10);
        pdf.setTextColor(255, 255, 255);
        pdf.text("Distributors of Mobile", 62, 45, { align: "center" });
        pdf.text("Phones & Accessories", 62, 50, { align: "center" });

        // Set grey color for the watermark
        const greyShade = 200;
        pdf.setFillColor(greyShade, greyShade, greyShade);

        // Draw page border
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(leftMargin, topMargin, pageWidth - 2 * leftMargin, pageHeight - 2 * topMargin);

        // Define the starting vertical position and spacing for address
        const newY = topMargin + 15;
        const lineSpacing = 5;

        pdf.setTextColor(0, 0, 0);
        pdf.text("Galekade junction, Halthota road,", pageWidth - 42, newY, { align: "right" });
        pdf.text("Raigama, Bandaragama.", pageWidth - 57, newY + lineSpacing, { align: "right" });
        pdf.text("Hotline: 076 311 0859", pageWidth - 62.5, newY + 2 * lineSpacing, { align: "right" });
        pdf.text("Email: imobilecrazybandaragama@gmail.com", pageWidth - 21, newY + 3 * lineSpacing, { align: "right" });
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, newY + 4 * lineSpacing, { align: "right" });

        const addTableRowsToPDF = (startIndex: any) => {
          const rows = Array.from(input.querySelectorAll("tbody tr"));
          rows.slice(startIndex, startIndex + 20).forEach((row, index) => {
            const cells = row.querySelectorAll("td");
            const modelName = cells[0].innerText;
            const count = cells[1].innerText;

            // Define the vertical position to place the rows 30px from the bottom of the page
            const bottomOffset = 50; // 30px from the bottom
            const rowHeight = 10; // Assuming 10px height per row for spacing
            const rowY = pageHeight - bottomOffset - (index * rowHeight) - rowHeight;

            // Center the table rows in the page
            const rowX = 14;
            const modelX = rowX + (pageWidth - rowX * 2) / 2 - 30; // Adjust model name position
            const countX = modelX + 100; // Adjust count position

            pdf.text(modelName, modelX, rowY);
            pdf.text(count, countX, rowY); // Adjust text position for the count column
          });
        };


// Add content (table rows)
        addTableRowsToPDF(0);
        heightLeft -= pageHeight - 40;

        while (heightLeft >= 0) {
          pdf.addPage();

          // Place header and date on each page
          pdf.text("Stock Report", 14, 20);
          pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, 30, { align: "right" });  // Right-align date

          heightLeft -= imgHeight;
          pdf.addImage(imgData, "PNG", imgX, heightLeft + 40, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // Add next set of rows (20 per page)
          addTableRowsToPDF(rowCount * 20);
          rowCount++; // Increment rowCount here
        }


        pdf.save("stock-report.pdf");
      });
    }
  };






  useEffect(() => {
    setNetIncome(totalIncome - dailyCost);
  }, [totalIncome, dailyCost]);

  const productData = useMemo(
    () =>
      Object.keys(stockData).map((key) => ({
        name: key,
        popularity: stockData[key],
        color: stockData[key],
      })),
    [stockData]
  );
  const navigation = useNavigate();

  const hanldeDailyCostOnClick = () => {
    navigation("/expencess");
  };

  const hanldeCheckImeiOnClick = () => {
    navigation("/checkImei");
  };

  const totalStockCount = Object.values(stockData).reduce(
    (acc, count) => acc + count,
    0
  );
  return (
    <div className="m-4 w-full">
      <div className="m-4">
        <TopNavbar />

        {/* Buttons */}
        <div className="flex flex-wrap justify-around mt-5 gap-5">
          {/*Income Report*/}
          <div>
            <button
              className="buttons-styles w-full sm:w-auto"
              onClick={toggleModal}
            >
              Income Report
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded shadow-lg w-full max-w-full max-h-full z-60">
                  <h2 className="text-xl mb-4">Income Report</h2>

                  <div className="flex justify-end mt-4">
                    <button
                      className="buttons-styles bg-danger text-white rounded px-4 py-2"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                    <button
                      className="buttons-styles bg-primary text-white rounded px-4 py-2 ml-4"
                      onClick={saveToPDF}
                    >
                      Save as PDF
                    </button>
                  </div>

                  <div id="pdf-content">
                    <table className="max-w-8l w-full mx-auto bg-white">
                      <thead>
                        <tr>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            OrderId
                          </th>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            Brand
                          </th>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            Name
                          </th>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            Customer/Shop Name
                          </th>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            Date
                          </th>
                          <th className="py-6 px-8 border bg-green-800 text-white text-xl">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order: any) => (
                          <>
                            {/* Display items */}
                            {order.items?.map((item: any) => (
                              <tr
                                key={`${
                                  order.retail_order_id ||
                                  order.wholesale_order_id ||
                                  order.return_order_id
                                }-item-${item.item_id}`}
                              >
                                <td className="py-6 px-8 border">
                                  {order.retail_order_id ||
                                    order.wholesale_order_id ||
                                    order.return_order_id}
                                </td>
                                <td className="py-6 px-8 border">
                                  {item.brand}
                                </td>
                                <td className="py-6 px-8 border">
                                  {item.name}
                                </td>
                                <td className="py-6 px-8 border">
                                  {order.customer
                                    ? order.customer.name
                                    : order.shop.shop_name}
                                </td>
                                <td className="py-6 px-8 border">
                                  {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="py-6 px-8 border">
                                  {order.total_amount}
                                </td>
                              </tr>
                            ))}

                            {/* Display imeis */}
                            {order.imeis?.map((imei: any) => (
                              <tr
                                key={`${
                                  order.retail_order_id ||
                                  order.wholesale_order_id ||
                                  order.return_order_id
                                }-imei-${imei.id}`}
                              >
                                <td className="py-6 px-8 border">
                                  {order.retail_order_id ||
                                    order.wholesale_order_id ||
                                    order.return_order_id}
                                </td>
                                <td className="py-6 px-8 border">
                                  {imei.modelId?.name || "N/A"}
                                </td>
                                <td className="py-6 px-8 border">
                                  {imei.imei}
                                </td>
                                <td className="py-6 px-8 border">
                                  {order.customer
                                    ? order.customer.name
                                    : order.shop.shop_name}
                                </td>
                                <td className="py-6 px-8 border">
                                  {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="py-6 px-8 border">
                                  {order.total_amount}
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </tbody>
                    </table>

                    {/* Space between tables */}
                    <div className="my-6" />

                    {/* Daily Cost Heading */}
                    <h2 className="text-2xl font-bold text-center mb-4">
                      Daily Cost
                    </h2>

                    <table className="max-w-6xl w-full mx-auto bg-white border">
                      <thead>
                        <tr>
                          <th className="py-4 px-6 border bg-green-800 text-white">
                            Date
                          </th>
                          <th className="py-4 px-6 border bg-green-800 text-white">
                            Amount
                          </th>
                          <th className="py-4 px-6 border bg-green-800 text-white">
                            Reason
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyCosts.map((cost) => (
                          <tr key={cost.daily_cost_id}>
                            <td className="py-4 px-6 border">
                              {new Date(cost.date).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 border">
                              {cost.amount.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 border">{cost.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      Daily Income of {today}
                    </h3>
                    <p className="text-xl">{totalIncome.toFixed(2)}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      Daily Cost of {today}
                    </h3>
                    <p className="text-xl">{dailyCost.toFixed(2)}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      Net Income of {today}
                    </h3>
                    <p className="text-xl">{netIncome.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/*Stock Report*/}
          <div>
            <button
              className="buttons-styles w-full sm:w-auto"
              onClick={toggleModal1}
            >
              Stock Report
            </button>

            {isModalOpen1 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-xl mb-4">Stock Report</h2>
                    <div id="pdf-content" className="max-h-96 overflow-y-scroll">
                      <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-200">
                          <th className="border px-4 py-2 text-left">Model Name</th>
                          <th className="border px-4 py-2 text-left">Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(stockData)
                            .sort((a, b) => {
                              const modelA = a[0].toLowerCase();
                              const modelB = b[0].toLowerCase();

                              // Define the custom order for iPhone models (base, Pro, Pro Max)
                              const modelOrder = [
                                '7 plus', '8 plus', 'se2', 'x', 'xs', '11', '11 pro', '11 pro max',
                                '12', '12 pro', '12 pro max', '13', '13 pro', '13 pro max',
                                '14', '14 pro', '14 pro max', '15', '15 pro', '15 pro max', // Add more as needed
                              ];

                              // A helper function to get the base model name
                              const getBaseModelName = (model:any) => {
                                if (model.includes('pro max')) return model.replace('pro max', ''); // Remove "pro max"
                                if (model.includes('pro')) return model.replace('pro', ''); // Remove "pro"
                                return model;
                              };

                              // Compare models by their base name and then by Pro/Pro Max suffix
                              const baseModelA = getBaseModelName(modelA);
                              const baseModelB = getBaseModelName(modelB);

                              const indexA = modelOrder.findIndex(model => baseModelA.includes(model));
                              const indexB = modelOrder.findIndex(model => baseModelB.includes(model));

                              // Sort first by base model order and then handle Pro/Pro Max distinction
                              if (indexA === indexB) {
                                // Further sort by suffix (Pro Max should come last)
                                if (modelA.includes('pro max') && !modelB.includes('pro max')) return 1;
                                if (!modelA.includes('pro max') && modelB.includes('pro max')) return -1;
                                return 0;
                              }

                              return indexA - indexB;
                            })
                            .map(([model, count]) => (
                                <tr key={model}>
                                  <td className="border px-4 py-2">{model}</td>
                                  <td className="border px-4 py-2">{count}</td>
                                </tr>
                            ))}
                        <tr className="font-bold">
                          <td className="border px-4 py-2">Total</td>
                          <td className="border px-4 py-2">{totalStockCount}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                          className="bg-red-500 text-white py-2 px-4 rounded"
                          onClick={toggleModal1}
                      >
                        Close
                      </button>
                      <button
                          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                          onClick={saveToPDFStock}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
            )}







          </div>

          <button
            className="daily_cost-buttons-styles p-1 rounded-xl w-full sm:w-auto flex items-center"
            onClick={hanldeDailyCostOnClick}
          >
            Daily Cost
            <img
              src={dailCost}
              className="ml-2"
              alt="icon"
            />
          </button>

          <button
            className="daily_cost-buttons-styles p-1 rounded-xl w-full sm:w-auto flex items-center"
            onClick={hanldeCheckImeiOnClick}
          >
            Check IMEI
            <img
              src={dailCost}
              className="ml-2"
              alt="icon"
            />
          </button>
        </div>

        {/* 1st row */}
        <div className="flex justify-between mt-5">
          <div className="background-colour-today-sales-div p-3 rounded-lg flex-1 mr-4">
            <div className="ml-2 mt-1">
              <span className="text-white text-lg font-bold">
                Today's Sales
              </span>
              <br />
              <span className="text-xs text-gray-400">Sales Summary</span>
            </div>
            <div className="flex justify-between w-full text-white mt-2">
              <div className="custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center">
                <div className="mb-2">
                  <img
                    src={icon1}
                    alt="icon"
                    className="mx-auto"
                  />
                </div>
                <div className="text-2xl">{totalIncomeMonth}</div>
                <div className="text-sm">Total Sales</div>
                <div className="text-xs text-yellow-500">This month</div>
              </div>

              <div className="custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center">
                <div className="mb-2">
                  <img
                    src={icon2}
                    alt="icon"
                    className="mx-auto"
                  />
                </div>
                <div className="text-2xl">{orderCount}</div>
                <div className="text-sm">Retail Orders</div>
                <div className="text-xs text-green-500">This month</div>
              </div>

              <div className="custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center">
                <div className="mb-2">
                  <img
                    src={icon3}
                    alt="icon"
                    className="mx-auto"
                  />
                </div>
                <div className="text-2xl">{orderCountWholesale}</div>{" "}
                {/* Display the number */}
                <div className="text-sm">Wholesale Orders</div>
                <div className="text-xs text-purple-500">This month</div>
              </div>

              <div className="custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center">
                <div className="mb-2">
                  <img
                    src={icon4}
                    alt="icon"
                    className="w-fit mx-auto"
                  />
                </div>
                <div className="text-2xl">{soldCount}</div>
                <div className="text-sm">Retail Phone Sold</div>
                <div className="text-xs text-blue-500">This month</div>
              </div>
            </div>
          </div>

          {/* 1st Row Right Side Chart */}
          <div className="background-colour-today-sales-div text-white flex-1 p-3 rounded-lg">
            <div className="ml-2 mt-1">
              <span className="text-white text-lg font-bold">
                Total Earning
              </span>
              <br />
            </div>
            <div className="flex justify-center items-center h-full">
              <div className="h-[30vh] w-full ">
                <Gauge
                  className="text-white"
                  value={75}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                      fontWeight: "bold",
                      fill: "red",
                      transform: "translate(0px, 0px)",
                    },
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row lg:justify-between mt-5 gap-4">
          <div className="background-colour-today-sales-div p-3 rounded-lg flex-1">
            <div className="ml-2 mt-1">
              <span className="text-white text-lg font-bold">Top Products</span>
              <br />
            </div>
            <div className="flex justify-center">
              {productData.length > 0 ? (
                <BarChart
                  width={600}
                  height={300}
                  data={productData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="popularity" fill="#8884d8">
                    {productData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="background-colour-today-sales-div text-white flex-1 p-3 rounded-lg">
            <div className="ml-2 mt-1">
              <span className="text-white text-lg font-bold">Income</span>
              <br />
            </div>
            <div className="flex justify-center items-center h-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3rd Row */}
        {/*<div className='flex flex-col lg:flex-row mt-2 gap-4'>
           3rd Row 1st Div
          <div className='background-colour-today-sales-div flex-1 rounded-lg p-1'>
            <div className="ml-2 p-3">
              <span className="text-white text-lg font-bold">Sales Increment</span><br />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

           3rd Row 2nd Div
          <div className='background-colour-today-sales-div flex-1 rounded-lg'>
            <div className="ml-2 p-3">
              <span className="text-white text-lg font-bold">Weekly Order Increment</span><br />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyOrderIncrementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>*/}
      </div>
    </div>
  );
}
