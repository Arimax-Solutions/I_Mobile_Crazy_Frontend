import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Button from "../crudbuttons/buttons";
import { backend_url } from "../../utill/utill";
import TopNavbar from "../topNavbar.tsx";

// Interfaces
interface Shop {
  shop_id: number;
  shop_name: string;
  address: string;
  email: string;
  contact_number: string;
  owner_nic: string;
  credit_limit: number;
  is_deleted: boolean;
  outstanding: number | null;
}

interface WholesaleOrder {
  wholesale_order_id: number;
  discount: number;
  actual_price: number;
  total_amount: number;
  date: string;
  shop: Shop;
  items: string[];
  imeis: Imei[];
}

interface Imei {
  id: number;
  imei: string;
  storage: string;
  colour: string;
  warranty: string | null;
  batteryHealth: number;
  price: number;
  status: string;
  modelId: Model;
  customer: string | null;
  shop: string | null;
  deleted: boolean;
  iosversion: number;
}

interface Model {
  id: number;
  name: string | null;
  imeiNumbers: string | null;
  stockAddedDate: string | null;
}

interface RetailOrder {
  retail_order_id: number;
  discount: number;
  actual_price: number;
  total_amount: number;
  date: string;
  items: string[];
  imeis: Imei[];
  customer: Customer;
}

interface ReturnOrder {
  return_order_id: number;
  reason: string;
  price: number;
  date: string;
}
interface Customer {
  customer_id: number;
  name: string;
  email: string;
  contact_phone: string;
  nic: string;
  outstandingAmount: number;
}

export default function WholesaleOrderView() {
  const [visibleTable, setVisibleTable] = useState<
    "retail" | "wholesale" | "return" | null
  >(null);
  const [token, setToken] = useState<string>("");
  const [wholesaleOrders, setWholesaleOrders] = useState<WholesaleOrder[]>([]);
  const [retailOrders, setRetailOrders] = useState<RetailOrder[]>([]);
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>([]);

  const [selectedMonth, setSelectedMonth] = useState<string>("");



  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<
    WholesaleOrder | RetailOrder | ReturnOrder | null
  >(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  // Fetch data based on visibleTable change
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || !visibleTable) return;
      setLoading(true);
      try {
        if (visibleTable === "wholesale") {
          const response = await axios.get(
            `${backend_url}/api/wholesaleOrder`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setWholesaleOrders(response.data.data);
        } else if (visibleTable === "retail") {
          const response = await axios.get(`${backend_url}/api/retailOrder`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRetailOrders(response.data.data);
        } else if (visibleTable === "return") {
          const response = await axios.get(`${backend_url}/api/returnOrder`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReturnOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [visibleTable, token]);

  const handleTableVisibility = useCallback(
    (table: "retail" | "wholesale" | "return") => {
      setVisibleTable(table);
    },
    []
  );

  const handleViewOrderDetails = (
    order: WholesaleOrder | RetailOrder | ReturnOrder
  ) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const filteredWholesaleOrders = wholesaleOrders.filter((order) => {
    const orderDate = new Date(order.date);
    const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
    return selectedMonth ? orderMonth === selectedMonth : true;
  });

  const filteredRetailOrders = retailOrders.filter((order) => {
    const orderDate = new Date(order.date);
    const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
    return selectedMonth ? orderMonth === selectedMonth : true;
  });

  const filteredReturnOrders = returnOrders.filter((order) => {
    const orderDate = new Date(order.date);
    const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
    return selectedMonth ? orderMonth === selectedMonth : true;
  });

  return (
    <div className="m-4 w-full">
      <div className="m-4">
        <TopNavbar />
      </div>


      {/* Month Selector */}
      <div className="m-4">
        <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded w-full"
        >
          <option value="">All Months</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>


      {/* Buttons */}
      <div className="m-4 flex mt-5 gap-x-[1vw] justify-between">
        <Button
          onClick={() => handleTableVisibility("retail")}
          className="buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc="src/assets/icons/Add Btn.svg"
          iconAlt="Retail Orders"
        >
          Retail Orders
        </Button>
        <Button
          onClick={() => handleTableVisibility("wholesale")}
          className="buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc="src/assets/icons/Add Btn.svg"
          iconAlt="Wholesale Orders"
        >
          Wholesale
        </Button>
        <Button
          onClick={() => handleTableVisibility("return")}
          className="buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc="src/assets/icons/Add Btn.svg"
          iconAlt="Return Orders"
        >
          Return Orders
        </Button>
      </div>

      {/* Conditional rendering of tables */}
      {visibleTable && (
        <div className="m-4 mt-5 overflow-auto max-h-[50vh]">
          <table className="w-full text-white table-styles">
            <thead>
              <tr>
                {visibleTable === "return" ? (
                  <>
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Reason</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">View</th>
                  </>
                ) : (
                  <>
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Actual Price</th>
                    <th className="p-2 border">Total Amount</th>
                    <th className="p-2 border">Date</th>
                    {visibleTable === "wholesale" && (
                      <th className="p-2 border">Shop</th>
                    )}
                    <th className="p-2 border">View</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
            {visibleTable === "wholesale" &&
                filteredWholesaleOrders.map((order, index) => (
                    <tr key={index} className="cursor-pointer hover:bg-gray-600 ">
                      <td className="p-2 border">{order.wholesale_order_id}</td>
                      <td className="p-2 border">{order.discount}</td>
                      <td className="p-2 border">{order.actual_price}</td>
                      <td className="p-2 border">{order.total_amount}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">{order.shop?.shop_name || "N/A"}</td>
                      <td className="p-2 border">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleViewOrderDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                ))}

            {visibleTable === "retail" &&
                filteredRetailOrders.map((order, index) => (
                    <tr key={index} className="cursor-pointer hover:bg-gray-600 hover:font-bold">
                      <td className="p-2 border">{order.retail_order_id}</td>
                      <td className="p-2 border">{order.discount}</td>
                      <td className="p-2 border">{order.actual_price}</td>
                      <td className="p-2 border">{order.total_amount}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleViewOrderDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                ))}

            {visibleTable === "return" &&
                filteredReturnOrders.map((order, index) => (
                    <tr key={index} className="cursor-pointer hover:bg-gray-600 hover:font-bold">
                      <td className="p-2 border">{order.return_order_id}</td>
                      <td className="p-2 border">{order.reason}</td>
                      <td className="p-2 border">{order.price}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleViewOrderDetails(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for order details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">
              Order Details
            </h2>
            <div>
              {visibleTable === "wholesale" && (
                <div>
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).wholesale_order_id ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>Discount:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).discount || "N/A"}
                  </p>
                  <p>
                    <strong>Actual Price:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).actual_price || "N/A"}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).total_amount || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).date || "N/A"}
                  </p>
                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-blue-500">
                    Shop Details
                  </h2>
                  <p>
                    <strong>Shop Name :</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.shop_name || "N/A"}
                  </p>
                  <p>
                    <strong>Address :</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.address || "N/A"}
                  </p>
                  <p>
                    <strong>Email :</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Contact:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.contact_number ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>Owner nic:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.owner_nic || "N/A"}
                  </p>
                  <p>
                    <strong>Credit limit :</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.credit_limit ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>Outstanding :</strong>{" "}
                    {(selectedOrder as WholesaleOrder).shop?.outstanding ||
                      "N/A"}
                  </p>

                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-green-500">
                    Item Details
                  </h2>
                  <p>
                    <strong>Items:</strong>{" "}
                    {(selectedOrder as WholesaleOrder).items?.join(", ") ||
                      "N/A"}
                  </p>

                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Phones Details
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {(selectedOrder as WholesaleOrder).imeis.map(
                      (imei, index) => (
                        <li
                          key={index}
                          className="p-2 border-2 border-black rounded-lg"
                        >
                          <p>
                            <strong>IMEI:</strong> {imei.imei || "N/A"}
                          </p>
                          <p>
                            <strong>Storage:</strong> {imei.storage || "N/A"}
                          </p>
                          <p>
                            <strong>Colour:</strong> {imei.colour || "N/A"}
                          </p>
                          <p>
                            <strong>Warranty:</strong> {imei.warranty || "N/A"}
                          </p>
                          <p>
                            <strong>Battery Health:</strong>{" "}
                            {imei.batteryHealth || "N/A"}
                          </p>
                          <p>
                            <strong>Price:</strong> {imei.price || "N/A"}
                          </p>
                          <p>
                            <strong>Status:</strong> {imei.status || "N/A"}
                          </p>
                          <p>
                            <strong>Model Name:</strong>{" "}
                            {imei.modelId?.name || "N/A"}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              {visibleTable === "retail" && (
                <div>
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {(selectedOrder as RetailOrder).retail_order_id || "N/A"}
                  </p>
                  <p>
                    <strong>Discount:</strong>{" "}
                    {(selectedOrder as RetailOrder).discount || "N/A"}
                  </p>
                  <p>
                    <strong>Actual Price:</strong>{" "}
                    {(selectedOrder as RetailOrder).actual_price || "N/A"}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {(selectedOrder as RetailOrder).total_amount || "N/A"}
                  </p>
                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-blue-500">
                    Customer Details
                  </h2>
                  <p>
                    <strong>Customer Name:</strong>{" "}
                    {(selectedOrder as RetailOrder).customer?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {(selectedOrder as RetailOrder).customer?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Contact:</strong>{" "}
                    {(selectedOrder as RetailOrder).customer?.contact_phone ||
                      "N/A"}
                  </p>
                  <p>
                    <strong>NIC:</strong>{" "}
                    {(selectedOrder as RetailOrder).customer?.nic || "N/A"}
                  </p>
                  <p>
                    <strong>Outstanding Amount:</strong>{" "}
                    {(selectedOrder as RetailOrder).customer
                      ?.outstandingAmount || "N/A"}
                  </p>

                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-green-500">
                    Item Details
                  </h2>
                  <p>
                    <strong>Items:</strong>{" "}
                    {(selectedOrder as RetailOrder).items?.join(", ") || "N/A"}
                  </p>

                  <br />
                  <h2 className="text-2xl font-bold mb-4 text-red-500">
                    Phones Details
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {(selectedOrder as RetailOrder).imeis.map((imei, index) => (
                      <li
                        key={index}
                        className="p-2 border-2 border-black rounded-lg"
                      >
                        <p>
                          <strong>IMEI:</strong> {imei.imei || "N/A"}
                        </p>
                        <p>
                          <strong>Model Name:</strong>{" "}
                          {imei.modelId?.name || "N/A"}
                        </p>
                        <p>
                          <strong>Storage:</strong> {imei.storage || "N/A"}
                        </p>
                        <p>
                          <strong>Colour:</strong> {imei.colour || "N/A"}
                        </p>
                        <p>
                          <strong>Warranty:</strong> {imei.warranty || "N/A"}
                        </p>
                        <p>
                          <strong>Battery Health:</strong>{" "}
                          {imei.batteryHealth || "N/A"}
                        </p>
                        <p>
                          <strong>Price:</strong> {imei.price || "N/A"}
                        </p>
                        <p>
                          <strong>Status:</strong> {imei.status || "N/A"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {visibleTable === "return" && (
                <div>
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {(selectedOrder as ReturnOrder).return_order_id || "N/A"}
                  </p>
                  <p>
                    <strong>Reason:</strong>{" "}
                    {(selectedOrder as ReturnOrder).reason || "N/A"}
                  </p>
                  <p>
                    <strong>Price:</strong>{" "}
                    {(selectedOrder as ReturnOrder).price || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {(selectedOrder as ReturnOrder).date || "N/A"}
                  </p>
                </div>
              )}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
