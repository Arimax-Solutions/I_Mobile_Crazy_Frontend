import React, { useEffect, useRef, useState } from "react";
import TopNavbar from "../topNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../../utill/utill.ts";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import logo from "../../assets/images/logo2.png";

export interface WholesalePhone {
  id: string;
  imei: string;
  modelName: string;
  storage: string;
  colour: string;
  ios_version: string;
  battery_health: string;
  price: number;
  status: string;
  warranty: string;
  isDeleted: boolean;
}

export interface WholesaleItem {
  item_id: string;
  category: string;
  brand: string;
  name: string;
  colour: string;
  warranty_period: string;
  qty: number;
  price: number;
}

export interface ProceedPaymentProps {
  wholesalePhones: WholesalePhone[];
  wholesaleItems: WholesaleItem[];
  shopName: string;
  shopContactNumber: string;
  shopId: string;
  outstanding: number;
  address: string;
  shopEmail: string;
  shopOwnerNic: string;
  shopCreditLimit: number;
}

interface Item {
  item_id: number;
  category: string;
  brand: string;
  name: string;
  colour: string;
  warranty_period: string;
  qty: number;
  price: number;
}

interface Phone {
  id: number;
  modelName: string;
  imei: string;
  storage: string;
  colour: string;
  ios_version: string;
  battery_health: string;
  price: number;
  warranty: string;
}

interface ReturnPhone {
  id: string;
  modelName: string;
  imei: string;
  storage: string;
  colour: string;
  price: number;
  warranty: string;
}

const ProceedPayment: React.FC<any> = (props: any) => {
  console.log(props);
  const navigate = useNavigate();
  const { orderType } = useParams<{ orderType: string }>();
  const [orderId, setOrderId] = useState<string>("");
  const location = useLocation() as unknown as { state: ProceedPaymentProps };
  const {
    wholesalePhones,
    wholesaleItems,
    shopName,
    shopId,
    shopContactNumber,
    outstanding,
    address,
    shopEmail,
    shopOwnerNic,
    shopCreditLimit,
  }: any = location.state || {
    wholesalePhones: [],
    wholesaleItems: [],
    shopName: "",
    shopContactNumber: "",
    shopId: "",
    outstanding: 0,
    address: "",
    shopEmail: "",
    shopOwnerNic: "",
    shopCreditLimit: 0,
  };

  const {
    phones,
    items,
    customerName,
    contactNumber,
    customerId,
    customerOutstanding,
  }: any = location.state || {
    phones: [],
    items: [],
    customerName: "",
    contactNumber: "",
    customerId: "",
    customerOutstanding: "",
  };

  const {
    returnPhones,
    shopNameReturn,
    shopIdReturn,
    shopContactNumberReturn,
    outstandingReturn,
  }: any = location.state || {
    returnPhones: [],
    shopNameReturn: "",
    shopIdReturn: "",
    shopContactNumberReturn: "",
    outstandingReturn: "",
  };

  function generateRetailOrderId() {
    // Retrieve the current sequence number from local storage
    let sequenceNumber = parseInt(
      localStorage.getItem("sequenceNumber") || "1",
      10
    );

    // Format the sequence number with leading zeros (e.g., 001, 002, ...)
    const formattedNumber = sequenceNumber.toString().padStart(3, "0");

    // Increment the sequence number for the next call
    sequenceNumber++;

    // Store the updated sequence number in local storage
    localStorage.setItem("sequenceNumber", sequenceNumber.toString());

    // Generate the retail_order_id in the desired format
    return `B00-${formattedNumber}`;
  }

  useEffect(() => {
    // Generate and set the order ID when the component mounts
    const id = generateRetailOrderId();
    setOrderId(id);
  }, []);

  switch (orderType) {
    case "retail-order":
      const discountRef = useRef(null);
      const [discount, setDiscount] = useState(0);
      const [subtotal, setSubtotal] = useState(0);
      const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
      const [balance, setBalance] = useState(0);
      const [customerAmount, setCustomerAmount] = useState(0);
      const [formattedCustomerAmount, setFormattedCustomerAmount] = useState("");

      useEffect(() => {
        calculateTotals(discount, customerAmount);
      }, [discount, customerAmount, phones, items, customerOutstanding]);

      const formatNumber = (value:any) => {
        // Remove non-numeric characters
        const cleanedValue = value.replace(/\D/g, '');
        // Format as currency with commas
        return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const handleDiscountChange = (e: any) => {
        const value =  parseFloat(e.target.value) || 0;
        setDiscount(value);
      };

      /*const handleCustomerAmountChange = (e) => {
          const value = parseFloat(e.target.value) || 0;
          setCustomerAmount(value);
        };*/

      const handleCustomerAmountChange = (e:any) => {
        const inputValue = e.target.value;

        // Parse the input value to float and set it as the raw customer amount
        const cleanedValue = inputValue.replace(/,/g, ''); // Remove commas for raw value
        const numericValue = parseFloat(cleanedValue) || 0; // Parse to float or default to 0

        setCustomerAmount(numericValue); // Update raw amount
        setFormattedCustomerAmount(formatNumber(inputValue)); // Update formatted value
      };

      const calculateTotals = (discountValue: any, customerAmountValue: number) => {
        const totalPhonePrice = phones.reduce((sum:any, phone:any) => {
          // Remove commas and parse the price
          const price = parseFloat(phone.price.replace(/,/g, '') || 0);
          return sum + (price || 0);
        }, 0);

        const totalItemPrice = items.reduce(
          (sum: number, item: Item) => sum + item.price * item.qty,
          0
        );
        const subtotalValue = totalPhonePrice + totalItemPrice - customerOutstanding;
        const totalAfterDiscountValue = subtotalValue - discountValue;
        const balanceValue = customerAmountValue - totalAfterDiscountValue;

        setSubtotal(subtotalValue);
        setTotalAfterDiscount(totalAfterDiscountValue);
        setBalance(balanceValue);

        return {
          subtotal: subtotalValue,
          totalAfterDiscount: totalAfterDiscountValue,
        };
      };

    function parsePriceRetail(price: string | number): number {
      if (typeof price === 'string') {
        return parseFloat(price.replace(/,/g, '')); // Remove commas and convert to number
      }
      return price; // Return as is if it's already a number
    }

      const saveOrder = async () => {
        console.log(`Saving order with discount`);
        const { subtotal } = calculateTotals(discount, customerAmount);

        console.log(
          "SubTotal : " +
            subtotal +
            "  Discount : " +
            discount +
            "  Customer Amount : " +
            customerAmount +
            "  Total After Discount : " +
            (subtotal - discount)
        );
        const order = {
          retail_order_id: generateRetailOrderId(),
          shop_id: shopId,
          discount: discount,
          actual_price: subtotal,
          total_amount: subtotal - discount,
          date: new Date().toISOString(), // Or any date you want to set
          is_deleted: false,
          customer: {
            customer_id: customerId,
            name: customerName,
            contact_phone: contactNumber,
            outstanding_balance: customerOutstanding,
          },
          items: items.map((item: Item) => ({
            item_id: item.item_id,
            category: item.category,
            brand: item.brand,
            name: item.name,
            colour: item.colour,
            warranty_period: item.warranty_period,
            qty: item.qty,
            price: item.price,
          })),
          imeis: phones.map((phone: Phone) => ({
            id: phone.id, // This needs to be included if you're tracking phones by id
            model: phone.modelName,
            imei: phone.imei,
            storage: phone.storage,
            colour: phone.colour,
            ios_version: phone.ios_version,
            battery_health: phone.battery_health,
            price: parsePriceRetail(phone.price),
            warranty: phone.warranty,
          })),
        };


        try {
          const response = await axios.post(
            `${backend_url}/api/retailOrder`,
            order
          );
          const doc = new jsPDF();

          const img = new Image();
          img.src = logo;

          img.onload = function () {
            const topMargin = 20;
            const sectionMargin = 10;
            const rowHeight = 10;
            const pageWidth = 210;
            const pageHeight = 297;
            const leftMargin = 10;
            const leftInsideMargin = 20;

            const imgWidth = 20;
            const imgHeight = imgWidth * (img.height / img.width);
            const imgX = 20;
            const imgY = 33;

// Calculate circle properties
            const centerFX = imgX + imgWidth / 2;
            const centerY = imgY + imgHeight / 2;
            const radius = Math.min(imgWidth, imgHeight) / 2;

// Draw a white circle behind the image
            doc.setFillColor(255, 255, 255);
            doc.circle(centerFX, centerY, radius, 'F');

// Now draw your image on top of the circle
            doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);


// Set dark green background for the upper section
            doc.setFillColor(0, 100, 0);
            doc.rect(leftMargin, topMargin, 80, 40, 'F');

// Draw the right rounded end
            doc.ellipse(leftMargin + 80, topMargin + 20, 20, 20, 'F');

// Header
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 100, 0);
            doc.text("INVOICE", pageWidth - 20, topMargin + 10, { align: "right" });

// "I MOBILE CRAZY" Text
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255);
            doc.text("I MOBILE CRAZY", 69, 40, {
              align: "center",
            });

// Additional Information
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text("Distributors of Mobile", 62, 45, {
              align: "center",
            });
            doc.text("Phones & Accessories", 62, 50, {
              align: "center",
            });

// Set grey color for the watermark
            const greyShade = 200;
            doc.setFillColor(greyShade, greyShade, greyShade);

// Add the watermark image with reduced opacity
            doc.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight, "", "NONE");

// Draw page border on top of the watermark
            doc.setDrawColor(0, 0, 0);
            doc.rect(leftMargin, topMargin, pageWidth - 2 * leftMargin, pageHeight - 2 * topMargin);


            // Define the starting vertical position and spacing
            const newY = topMargin + 15;
            const lineSpacing = 5;

            doc.setTextColor(0, 0, 0);
            doc.text(
                "Galekade junction, Halthota road,",
                pageWidth - 42,
                newY,
                { align: "right" }
            );
            doc.text(
                "Raigama, Bandaragama.",
                pageWidth - 57,
                newY + lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Hotline: 076 311 0859",
                pageWidth - 62.5,
                newY + 2 * lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Email: imobilecrazybandaragama@gmail.com",
                pageWidth - 21,
                newY + 3 * lineSpacing,
                { align: "right" }
            );

            // Customer and Invoice Details
            const customerY = topMargin + 50;
            doc.setFontSize(12);
            doc.text("BILL TO:", leftInsideMargin, customerY);
            doc.text(order.customer.name, leftInsideMargin, customerY + 5);
            doc.text(
                order.customer.contact_phone,
                leftInsideMargin,
                customerY + 10
            );

            doc.text(
                `Bill No : ${order.retail_order_id}`,
                pageWidth - 70,
                customerY
            );
            doc.text(
                `Invoice Date: ${new Date(order.date).toLocaleDateString()}`,
                pageWidth - 70,
                customerY + 5
            );

            // Initialize Y positions
            let startY = customerY + 30;

            // Check if there are items to display
            if (order.items.length > 0) {
              doc.setFillColor(0, 100, 0);
              const headers = ["Items", "Quantity", "Price", "Amount"];
              const headerStartX = [
                leftInsideMargin,
                leftMargin + 90,
                leftMargin + 120,
                leftMargin + 150,
              ];


              doc.setTextColor(255, 255, 255); // White text color
              doc.rect(
                  leftInsideMargin,
                  startY - rowHeight,
                  170,
                  rowHeight,
                  "F"
              );

              doc.setFontSize(12);
              headers.forEach((header, index) => {
                const x = headerStartX[index] + 2;
                const y = startY - rowHeight / 2 + 4;
                doc.text(header, x, y, { align: "left" });
              });

              // Reset text color for table content
              doc.setTextColor(0, 0, 0);

              // Start Y for items
              let itemsStartY = startY + 8;

              // Include item data
              order.items.forEach((item: any, index: number) => {
                doc.text(
                    `${item.name} - ${item.warranty_period} WARRANTY`,
                    leftInsideMargin,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${item.qty}`,
                    leftMargin + 100,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${item.price.toFixed(2)}`,
                    leftMargin + 120,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${(item.qty * item.price).toFixed(2)}`,
                    leftMargin + 150,
                    itemsStartY + index * 10
                );
              });

              // Draw items border
              doc.setFillColor(0, 100, 0);
              doc.rect(
                  leftInsideMargin,
                  startY,
                  170,
                  9
              );

              // Update Y for IMEIs
              startY = itemsStartY + order.items.length * 10 + sectionMargin;
            }

            // Check if there are IMEIs to display
            if (order.imeis.length > 0) {
              // Table headers for IMEI
              const imeiHeaders = ["Model","Storage" , "IMEI" ,"Warranty", "Price"];
              const imeiHeaderStartX = [
                leftInsideMargin,
                leftMargin + 40,
                leftMargin + 70,
                leftMargin + 120,
                leftMargin + 150,
              ];

              doc.setFillColor(0, 100, 0);
              doc.setTextColor(255, 255, 255);
              doc.rect(
                  leftInsideMargin,
                  startY - rowHeight,
                  170,
                  rowHeight,
                  "F"
              );

              doc.setFontSize(12);
              imeiHeaders.forEach((header, index) => {
                const x = imeiHeaderStartX[index] + 2;
                const y = startY - rowHeight / 2 + 4;
                doc.text(header, x, y, { align: "left" });
              });

              // Reset text color for table content
              doc.setTextColor(0, 0, 0);

              // Start Y for IMEI data
              let imeiStartY = startY + 8;

              // Include IMEI data
              order.imeis.forEach((imei: any, index: number) => {
                doc.text(
                    `${imei.model}`,
                    leftInsideMargin,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.storage}`,
                    leftMargin + 40,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.imei}`,
                    leftMargin + 70,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.warranty}`,
                    leftMargin + 120,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.price}`,
                    leftMargin + 150,
                    imeiStartY + index * 10
                );
              });

              // Draw IMEI border
              doc.setFillColor(0, 100, 0);
              doc.rect(
                  leftInsideMargin,
                  startY,
                  170,
                  9
              );

              // Update Y for summary
              startY = imeiStartY + order.imeis.length * 10 + sectionMargin;
            }

// Footer
            const footerY = pageHeight - 60;
            const footerStartY = footerY - 30;
            doc.setFontSize(12);

// Right-aligned actual price, discount, and total amount in footer
            doc.text(
                `Actual Price: ${order.actual_price.toFixed(2)}`,
                190,
                footerStartY,
                { align: "right" }
            );
            doc.text(
                `Discount: ${order.discount.toFixed(2)}`,
                190,
                footerStartY + 5,
                { align: "right" }
            );
            doc.text(
                `Total Amount: ${order.total_amount.toFixed(2)}`,
                190,
                footerStartY + 10,
                { align: "right" }
            );

// Warranty terms and conditions below the amounts
            // Set font size for the footer
            doc.setFontSize(10);
            const warrantyOffsetY = footerStartY + 20;

// Array of footer text
            const footerText = [
              "Warranty terms & conditions!",
              " >  One year software warranty.",
              " >  Warranty void if stickers damaged or removed.",
              " >  Item should be in good condition.",
              " >  Bill must be presented, No cash returns.",
            ];

// Draw the footer text
            footerText.forEach((line, index) => {
              doc.text(line, leftInsideMargin, warrantyOffsetY + index * 5);
            });

// Thank you text
            const thankYouText = "Thank you for shopping with us!";
            const developerText = "Developed by Arimax Solutions";

// Calculate the width and center X position for the thank you text
            const textWidth = doc.getTextWidth(thankYouText);
            const centerX = (pageWidth - textWidth) / 2;
            const thankYouY = pageHeight - 40;

// Set font size for thank you text and render it
            doc.setFontSize(12);
            doc.text(thankYouText, centerX, thankYouY);

// Calculate Y position for the developer text
            const developerY = thankYouY + 20;

// Set a smaller font size for the developer text and render it
            doc.setFontSize(10);
            doc.text(developerText, 85, developerY - 15);

// Draw a dark green filled rectangle above the thank you text
            const rectY = thankYouY+8;

            doc.setFillColor(0, 100, 0);
            doc.roundedRect(leftInsideMargin, rectY, 170, 4, 4, 4, 'F');

            // Save the PDF
            doc.save(`${order.customer.name}.bill.pdf`);
          };

          await Swal.fire({
            title: "Success!",
            text: "Order saved successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(`/order`);

          // Update the UI after successful save
          console.log("Order saved successfully:", response.data);
        } catch (error) {
          // SweetAlert error message
          await Swal.fire({
            title: "Error!",
            text: "Error saving order",
            icon: "error",
            confirmButtonText: "OK",
          });

          console.error("Error saving order:", error);
        }
      };

      return (
        <div className="m-4 w-full">
          <div className="m-4">
            <TopNavbar />
          </div>
          <div className="bg-[#14141E] rounded-md p-3 text-white">
            <div className="flex justify-between">
              <div>
                <button className="mr-4">Cash Payment</button>
                <button>Card Payment</button>
              </div>
              <div>
                <p className="text-3xl text-[#5386ED] mr-10">{orderId}</p>
              </div>
            </div>
            <hr className="my-3" />
            <div className="flex">
              <div className="flex-1 p-4">
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="font-bold px-6 py-2 ">Customer</th>
                      <th className="font-bold px-6 py-2 ">Contact Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-2 ">{customerName}</td>
                      <td className="px-6 py-2 ">{contactNumber}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="space-y-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="font-bold px-6 py-4 text-left">
                          Model Name
                        </th>
                        <th className="font-bold px-6 py-4 text-left">
                          Imei Number
                        </th>
                        <th className="font-bold px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phones.map((phone: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-2">{phone.modelName}</td>
                          <td className="px-6 py-2">{phone.imei}</td>
                          <td className="px-6 py-2">{phone.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <hr className="my-3" />

                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="font-bold px-6 py-4 text-left">
                          Item Name
                        </th>
                        <th className="font-bold px-6 py-4 text-left">
                          Quantity
                        </th>
                        <th className="font-bold px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-2">{item.name}</td>
                          <td className="px-6 py-2">{item.qty}</td>
                          <td className="px-6 py-2">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="h-full w-1 bg-[#717171] mx-5"></div>
              </div>
              <div className="flex-1">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-[#5386ED] text-xl py-2 px-4">
                        Make Payment
                      </th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Subtotal</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{subtotal}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p className="text-red-500">OutStanding</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p className="text-red-500">
                            {customerOutstanding.toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Discount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <input
                            type="number"
                            ref={discountRef}
                            onChange={handleDiscountChange}
                            className="bg-[#1E1E1E] text-white px-2 py-1 rounded-md"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Total Amount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{totalAfterDiscount.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Customer Amount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          {/*<input
                            type="number"
                            value={customerAmount}
                            onChange={(e) =>
                              setCustomerAmount(parseFloat(e.target.value) || 0)
                            }
                            className="bg-[#1E1E1E] text-white px-2 py-1 rounded-md"
                          />*/}
                          <input
                              type="text" // Changed from "number" to "text"
                              value={formattedCustomerAmount} // Use formatted value
                              onChange={handleCustomerAmountChange}
                              className="bg-[#1E1E1E] text-white px-2 py-1 rounded-md"
                              placeholder="Customer Amount"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Balance</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{balance.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex flex-col gap-2 mt-3">
                  <button className="bg-[#5356EC] p-2" onClick={saveOrder}>
                    Confirm Payment
                  </button>
                  <button className="border-2 border-[#5356EC] p-2 bg-[#343434]">
                    Cancel Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "wholesale-order":
      const discountRefWholesale = useRef<HTMLInputElement>(null);
      const [discountWholesale, setDiscountWholesale] = useState<number>(0);
      const [subtotalWholesale, setSubtotalWholesale] = useState<number>(0);
      const [totalAfterDiscountWholesale, setTotalAfterDiscountWholesale] =
        useState<number>(0);
      const [balanceWholesale, setBalanceWholesale] = useState<number>(0);
      const [customerAmountWholesale, setCustomerAmountWholesale] = useState<number>(0);

      useEffect(() => {
        calculateTotalsWholesale(discountWholesale, customerAmountWholesale);
      }, [
        discountWholesale,
        customerAmountWholesale,
        wholesalePhones,
        wholesaleItems,
        outstanding,
      ]);

      const formatWholesaleNumber = (value:any) => {
        // Remove non-numeric characters
        const cleanedValue = value.replace(/\D/g, '');
        // Format as currency with commas
        return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const handleDiscountChangeWholesale = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setDiscountWholesale(value);
      };

      /*const calculateTotalsWholesale = (
        discountValueWholesale: number,
        customerAmountValueWholesale: number
      ) => {
        const totalPhonePriceWholesale = parseFloat(
          wholesalePhones
            .reduce(
              (sum: number, wholesalePhone: any) =>
                sum + parseFloat(wholesalePhone.price || 0),
              0
            )
            .toFixed(2)
        );*/

      const calculateTotalsWholesale = (discountValueWholesale: number, customerAmountValueWholesale: number) => {
        const totalPhonePriceWholesale = parseFloat(
            wholesalePhones
                .reduce((sum: number, wholesalePhone: any) => {
                  // Clean the price by removing non-numeric characters (like commas)
                  const price = parseFloat(wholesalePhone.price?.replace(/,/g, '') || '0');
                  return sum + price;
                }, 0)
                .toFixed(2) // Ensure two decimal places for total
        );

        const totalItemPriceWholesale = parseFloat(
          wholesaleItems
            .reduce(
              (sum: number, wholesaleItem: any) =>
                sum +
                (parseFloat(wholesaleItem.price) || 0) *
                  (parseFloat(wholesaleItem.qty) || 0),
              0
            )
            .toFixed(2)
        );

        const subtotalValueWholesale = parseFloat(
          (
            totalPhonePriceWholesale +
            totalItemPriceWholesale -
            parseFloat(outstanding || 0)
          ).toFixed(2)
        );
        console.log("Subtotal 1: " + subtotalValueWholesale);

        const totalAfterDiscountValueWholesale = parseFloat(
          (subtotalValueWholesale - discountValueWholesale).toFixed(2)
        );

        const balanceValueWholesale = parseFloat(
          (
            customerAmountValueWholesale - totalAfterDiscountValueWholesale
          ).toFixed(2)
        );

        setSubtotalWholesale(subtotalValueWholesale);
        setTotalAfterDiscountWholesale(totalAfterDiscountValueWholesale);
        setBalanceWholesale(balanceValueWholesale);

        console.log("Total phones: " + totalPhonePriceWholesale);
        console.log("Total items: " + totalItemPriceWholesale);
        console.log("Subtotal 2 : " + subtotalValueWholesale);

        return {
          subtotalWholesale: subtotalValueWholesale,
          totalAfterDiscountWholesale: totalAfterDiscountValueWholesale,
        };
      };


    function parsePrice(price: string | number): number {
      if (typeof price === 'string') {
        return parseFloat(price.replace(/,/g, '')); // Remove commas and convert to number
      }
      return price; // Return as is if it's already a number
    }

      const saveOrderWholesale = async () => {
        console.log("Saving order...");
        const { subtotalWholesale, totalAfterDiscountWholesale } =
          calculateTotalsWholesale(discountWholesale, customerAmountWholesale);

        const wholesaleOrder = {
          wholesale_order_id: generateRetailOrderId(),
          discount: discountWholesale,
          actual_price: subtotalWholesale,
          total_amount: totalAfterDiscountWholesale,
          date: new Date().toISOString(),
          is_deleted: false,
          shop: {
            shop_id: shopId,
            shop_name: shopName,
            address: address,
            email: shopEmail,
            contact_number: shopContactNumber,
            outstanding_balance: outstanding,
            owner_nic: shopOwnerNic,
            credit_limit: shopCreditLimit,
          },
          items: wholesaleItems.map((wholesaleItem: WholesaleItem) => ({
            item_id: wholesaleItem.item_id,
            category: wholesaleItem.category,
            brand: wholesaleItem.brand,
            name: wholesaleItem.name,
            colour: wholesaleItem.colour,
            warranty_period: wholesaleItem.warranty_period,
            qty: wholesaleItem.qty,
            price: wholesaleItem.price,
          })),
          imeis: wholesalePhones.map((wholesalePhone: WholesalePhone) => ({
            id: wholesalePhone.id,
            imei: wholesalePhone.imei,
            model: wholesalePhone.modelName,
            storage: wholesalePhone.storage,
            colour: wholesalePhone.colour,
            ios_version: wholesalePhone.ios_version,
            battery_health: wholesalePhone.battery_health,
            price: parsePrice(wholesalePhone.price),
            status: wholesalePhone.status,
            warranty: wholesalePhone.warranty,
            isDeleted: wholesalePhone.isDeleted,
          })),
        };

        try {
          const response = await axios.post(
            `${backend_url}/api/wholesaleOrder`,
            wholesaleOrder
          );
          const doc = new jsPDF();

          const img = new Image();
          img.src = logo; // Path to your uploaded image

          img.onload = () => {
            const topMargin = 20;
            const sectionMargin = 10;
            const rowHeight = 10;
            const pageWidth = 210;
            const pageHeight = 297;
            const leftMargin = 10;
            const leftInsideMargin = 20;

            const imgWidth = 20;
            const imgHeight = imgWidth * (img.height / img.width);
            const imgX = 20;
            const imgY = 33;

// Calculate circle properties
            const centerFX = imgX + imgWidth / 2;
            const centerY = imgY + imgHeight / 2;
            const radius = Math.min(imgWidth, imgHeight) / 2;

// Draw a white circle behind the image
            doc.setFillColor(255, 255, 255);
            doc.circle(centerFX, centerY, radius, 'F');

// Now draw your image on top of the circle
            doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);


// Set dark green background for the upper section
            doc.setFillColor(0, 100, 0);
            doc.rect(leftMargin, topMargin, 80, 40, 'F');

// Draw the right rounded end
            doc.ellipse(leftMargin + 80, topMargin + 20, 20, 20, 'F');

// Header
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 100, 0);
            doc.text("INVOICE", pageWidth - 20, topMargin + 10, { align: "right" });

// "I MOBILE CRAZY" Text
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255);
            doc.text("I MOBILE CRAZY", 69, 40, {
              align: "center",
            });

// Additional Information
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text("Distributors of Mobile", 62, 45, {
              align: "center",
            });
            doc.text("Phones & Accessories", 62, 50, {
              align: "center",
            });

// Set grey color for the watermark
            const greyShade = 200;
            doc.setFillColor(greyShade, greyShade, greyShade);

// Add the watermark image with reduced opacity
            doc.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight, "", "NONE");

// Draw page border on top of the watermark
            doc.setDrawColor(0, 0, 0);
            doc.rect(leftMargin, topMargin, pageWidth - 2 * leftMargin, pageHeight - 2 * topMargin);


            // Define the starting vertical position and spacing
            const newY = topMargin + 15;
            const lineSpacing = 5;

            doc.setTextColor(0, 0, 0);
            doc.text(
                "Galekade junction, Halthota road,",
                pageWidth - 42,
                newY,
                { align: "right" }
            );
            doc.text(
                "Raigama, Bandaragama.",
                pageWidth - 57,
                newY + lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Hotline: 076 311 0859",
                pageWidth - 62.5,
                newY + 2 * lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Email: imobilecrazybandaragama@gmail.com",
                pageWidth - 21,
                newY + 3 * lineSpacing,
                { align: "right" }
            );


            // Customer and Invoice Details
            const customerY = topMargin + 50;
            doc.setFontSize(12);
            doc.text("BILL TO:", leftInsideMargin, customerY);
            doc.text(wholesaleOrder.shop.shop_name, leftInsideMargin, customerY + 5);
            doc.text(
                wholesaleOrder.shop.contact_number,
                leftInsideMargin,
                customerY + 10
            );

            doc.text(
                `Bill No : ${wholesaleOrder.wholesale_order_id}`,
                pageWidth - 70,
                customerY
            );
            doc.text(
                `Invoice Date: ${new Date(wholesaleOrder.date).toLocaleDateString()}`,
                pageWidth - 70,
                customerY + 5
            );

            // Initialize Y positions
            let startY = customerY + 30;

            if (wholesaleOrder.items.length > 0) {
              doc.setFillColor(0, 100, 0);
              const headers = ["Items", "Quantity", "Price", "Amount"];
              const headerStartX = [
                leftInsideMargin,
                leftMargin + 90,
                leftMargin + 120,
                leftMargin + 150,
              ];


              doc.setTextColor(255, 255, 255); // White text color
              doc.rect(
                  leftInsideMargin,
                  startY - rowHeight,
                  170,
                  rowHeight,
                  "F"
              );

              doc.setFontSize(12);
              headers.forEach((header, index) => {
                const x = headerStartX[index] + 2;
                const y = startY - rowHeight / 2 + 4;
                doc.text(header, x, y, { align: "left" });
              });

              // Reset text color for table content
              doc.setTextColor(0, 0, 0);

              // Start Y for items
              let itemsStartY = startY + 8;

              // Include item data
              wholesaleOrder.items.forEach((item: any, index: number) => {
                doc.text(
                    `${item.name} - ${item.warranty_period} WARRANTY`,
                    leftInsideMargin,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${item.qty}`,
                    leftMargin + 100,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${item.price.toFixed(2)}`,
                    leftMargin + 120,
                    itemsStartY + index * 10
                );
                doc.text(
                    `${(item.qty * item.price).toFixed(2)}`,
                    leftMargin + 150,
                    itemsStartY + index * 10
                );
              });

              // Draw items border
              doc.setFillColor(0, 100, 0);
              doc.rect(
                  leftInsideMargin,
                  startY,
                  170,
                  9
              );

              // Update Y for IMEIs
              startY = itemsStartY + wholesaleOrder.items.length * 10 + sectionMargin;
            }

            if (wholesaleOrder.imeis.length > 0) {
              // Table headers for IMEI
              const imeiHeaders = ["Model","Storage" , "IMEI" ,"Warranty", "Price"];
              const imeiHeaderStartX = [
                leftInsideMargin,
                leftMargin + 40,
                leftMargin + 70,
                leftMargin + 120,
                leftMargin + 150,
              ];

              doc.setFillColor(0, 100, 0);
              doc.setTextColor(255, 255, 255);
              doc.rect(
                  leftInsideMargin,
                  startY - rowHeight,
                  170,
                  rowHeight,
                  "F"
              );

              doc.setFontSize(12);
              imeiHeaders.forEach((header, index) => {
                const x = imeiHeaderStartX[index] + 2;
                const y = startY - rowHeight / 2 + 4;
                doc.text(header, x, y, { align: "left" });
              });

              // Reset text color for table content
              doc.setTextColor(0, 0, 0);

              // Start Y for IMEI data
              let imeiStartY = startY + 8;

              // Include IMEI data
              wholesaleOrder.imeis.forEach((imei: any, index: number) => {
                doc.text(
                    `${imei.model}`,
                    leftInsideMargin,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.storage}`,
                    leftMargin + 40,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.imei}`,
                    leftMargin + 70,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.warranty}`,
                    leftMargin + 120,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.price}`,
                    leftMargin + 150,
                    imeiStartY + index * 10
                );
              });

              // Draw IMEI border
              doc.setFillColor(0, 100, 0);
              doc.rect(
                  leftInsideMargin,
                  startY,
                  170,
                  9
              );

              // Update Y for summary
              startY = imeiStartY + wholesaleOrder.imeis.length * 10 + sectionMargin;
            }


            const footerY = pageHeight - 60;
            const footerStartY = footerY - 30;
            doc.setFontSize(12);

// Right-aligned actual price, discount, and total amount in footer
            doc.text(
                `Actual Price: ${wholesaleOrder.actual_price.toFixed(2)}`,
                190,
                footerStartY,
                { align: "right" }
            );
            doc.text(
                `Discount: ${wholesaleOrder.discount.toFixed(2)}`,
                190,
                footerStartY + 5,
                { align: "right" }
            );
            doc.text(
                `Total Amount: ${wholesaleOrder.total_amount.toFixed(2)}`,
                190,
                footerStartY + 10,
                { align: "right" }
            );

            // Set font size for the footer
            doc.setFontSize(10);
            const warrantyOffsetY = footerStartY + 20;

            const footerText = [
              "Warranty terms & conditions!",
              " >  Warranty void if stickers damaged or removed.",
              " >  Bill must be presented, No cash returns.",
            ];

// Draw the footer text
            footerText.forEach((line, index) => {
              doc.text(line, leftInsideMargin, warrantyOffsetY + index * 5);
            });

// Thank you text
            const thankYouText = "Thank you for shopping with us!";
            const developerText = "Developed by Arimax Solutions";

// Calculate the width and center X position for the thank you text
            const textWidth = doc.getTextWidth(thankYouText);
            const centerX = (pageWidth - textWidth) / 2;
            const thankYouY = pageHeight - 40;

// Set font size for thank you text and render it
            doc.setFontSize(12);
            doc.text(thankYouText, centerX, thankYouY);

// Calculate Y position for the developer text
            const developerY = thankYouY + 20;

// Set a smaller font size for the developer text and render it
            doc.setFontSize(10);
            doc.text(developerText, 85, developerY - 15);

// Draw a dark green filled rectangle above the thank you text
            const rectY = thankYouY+8;

            doc.setFillColor(0, 100, 0);
            doc.roundedRect(leftInsideMargin, rectY, 170, 4, 4, 4, 'F');

            // Save the PDF
            doc.save(`${wholesaleOrder.shop.shop_name}.bill.pdf`);
          };

          await Swal.fire({
            title: "Success!",
            text: "Wholesale order saved successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(`/order`);

          console.log("Wholesale order saved successfully:", response.data);
        } catch (error) {
          await Swal.fire({
            title: "Error!",
            text: "Error saving wholesale order",
            icon: "error",
            confirmButtonText: "OK",
          });

          console.error("Error saving wholesale order:", error);
        }
      };

      return (
        <div className="m-4 w-full">
          <div className="m-4">
            <TopNavbar />
          </div>
          <div className="bg-[#14141E] rounded-md p-3 text-white">
            <div className="flex justify-between">
              <div>
                <button className="mr-4">Cash Payment</button>
                <button>Card Payment</button>
              </div>
              <div>
                <p className="text-3xl text-[#5386ED] mr-10">{orderId}</p>
              </div>
            </div>
            <hr className="my-3" />
            <div className="flex">
              <div className="flex-1 p-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="font-bold px-6 py-2">Shop Name</th>
                      <th className="font-bold px-6 py-2">Shop Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-2">{shopName}</td>
                      <td className="px-6 py-2">{shopContactNumber}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="space-y-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="font-bold px-6 py-4 text-left">
                          Model Name
                        </th>
                        <th className="font-bold px-6 py-4 text-left">
                          Imei Number
                        </th>
                        <th className="font-bold px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wholesalePhones.map(
                        (wholesalePhone: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-2">
                              {wholesalePhone.modelName}
                            </td>
                            <td className="px-6 py-2">{wholesalePhone.imei}</td>
                            <td className="px-6 py-2">
                              {wholesalePhone.price}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>

                  <hr className="my-3" />

                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="font-bold px-6 py-4 text-left">
                          Item Name
                        </th>
                        <th className="font-bold px-6 py-4 text-left">
                          Quantity
                        </th>
                        <th className="font-bold px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wholesaleItems.map(
                        (wholesaleItem: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-2">{wholesaleItem.name}</td>
                            <td className="px-6 py-2">{wholesaleItem.qty}</td>
                            <td className="px-6 py-2">{wholesaleItem.price}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="h-full w-1 bg-[#717171] mx-5"></div>
              </div>
              <div className="flex-1">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-[#5386ED] text-xl py-2 px-4">
                        Make Payment
                      </th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Subtotal</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{subtotalWholesale.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p className="text-red-500">Outstanding</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p className="text-red-500">
                            -{outstanding.toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Discount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <input
                            ref={discountRefWholesale}
                            type="number"
                            placeholder="0.00"
                            className="bg-[#14141E] border border-[#3A3A3A] text-[#717171] p-1 rounded-lg"
                            value={discountWholesale}
                            onChange={handleDiscountChangeWholesale}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p className="text-[#5386ED]">Total</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p className="text-[#5386ED]">
                            {totalAfterDiscountWholesale.toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Customer Amount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <input
                              type="text" // Change to text to allow formatted value with commas
                              placeholder="0.00"
                              className="bg-[#14141E] border border-[#3A3A3A] text-[#717171] p-1 rounded-lg"
                              value={formatWholesaleNumber(customerAmountWholesale.toString())} // Format value for display
                              onChange={(e) => {
                                const numericValue = parseFloat(e.target.value.replace(/,/g, '')); // Remove commas for actual numeric value
                                setCustomerAmountWholesale(numericValue || 0); // Handle NaN case
                              }}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Balance</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{balanceWholesale.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={saveOrderWholesale}
                    className="bg-[#5386ED] rounded-lg text-white px-4 py-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "return-order":
      const discountRefReturn = useRef(null);
      const [discountReturn, setDiscountReturn] = useState(0);
      const [subtotalReturn, setSubtotalReturn] = useState(0);
      const [totalAfterDiscountReturn, setTotalAfterDiscountReturn] =
        useState(0);
      const [balanceReturn, setBalanceReturn] = useState(0);
      const [customerAmountReturn, setCustomerAmountReturn] = useState(0);

      useEffect(() => {
        calculateTotalsReturn(discountReturn, customerAmountReturn);
      }, [
        discountReturn,
        customerAmountReturn,
        returnPhones,
        outstandingReturn,
      ]);
      const formatNumberReturn = (value: string) => {
        // Remove non-numeric characters
        const cleanedValue = value.replace(/\D/g, '');
        // Format as currency with commas
        return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const handleDiscountChangeReturn = (e: any) => {
        const value = parseFloat(e.target.value) || 0;
        setDiscountReturn(value);
      };

      const calculateTotalsReturn = (
        discountValueReturn: number,
        customerAmountValueReturn: number
      ) => {
        const totalPhonePriceReturn = returnPhones.reduce(
          (sum: any, returnPhone: any) =>
            sum + (parseFloat(returnPhone.price) || 0),
          0
        );
        const subtotalValueReturn =
          totalPhonePriceReturn - (parseFloat(outstanding) || 0);
        const totalAfterDiscountValueReturn =
          subtotalValueReturn - discountValueReturn;
        const balanceValueReturn =
          customerAmountValueReturn - totalAfterDiscountValueReturn;

        setSubtotalReturn(subtotalValueReturn);
        setTotalAfterDiscountReturn(totalAfterDiscountValueReturn);
        setBalanceReturn(balanceValueReturn);

        return {
          subtotalReturn: subtotalValueReturn,
          totalAfterDiscountReturn: totalAfterDiscountValueReturn,
        };
      };

      const saveOrderReturn = async () => {
        console.log("Saving order...");
        const { subtotalReturn, totalAfterDiscountReturn } =
          calculateTotalsReturn(discountReturn, customerAmountReturn);

        function parsePriceReturn(price: string | number): number {
          if (typeof price === 'string') {
            return parseFloat(price.replace(/,/g, '')); // Remove commas and convert to number
          }
          return price; // Return as is if it's already a number
        }

        const returnOrder = {
          return_order_id: generateRetailOrderId(),
          discount: discountReturn,
          actual_price: subtotalReturn,
          total_amount: totalAfterDiscountReturn,
          date: new Date().toISOString(),
          is_deleted: false,
          shop: {
            shop_id: shopIdReturn,
            shop_name: shopNameReturn,
            contact_number: shopContactNumberReturn,
          },
          imeis: returnPhones.map((returnPhone: ReturnPhone) => ({
            id: returnPhone.id,
            model: returnPhone.modelName,
            imei: returnPhone.imei,
            storage: returnPhone.storage,
            colour: returnPhone.colour,
            price: parsePriceReturn(returnPhone.price),
            warranty: returnPhone.warranty,
          })),
        };

        try {
          const response = await axios.post(
            `${backend_url}/api/returnOrder`,
            returnOrder
          );
          const doc = new jsPDF();

          const img = new Image();
          img.src = logo; // Path to your uploaded image

          img.onload = function () {
            const topMargin = 20;
            const sectionMargin = 10;
            const rowHeight = 10;
            const pageWidth = 210;
            const pageHeight = 297;
            const leftMargin = 10;
            const leftInsideMargin = 20;

            const imgWidth = 20;
            const imgHeight = imgWidth * (img.height / img.width);
            const imgX = 20;
            const imgY = 33;

// Calculate circle properties
            const centerFX = imgX + imgWidth / 2;
            const centerY = imgY + imgHeight / 2;
            const radius = Math.min(imgWidth, imgHeight) / 2;

// Draw a white circle behind the image
            doc.setFillColor(255, 255, 255);
            doc.circle(centerFX, centerY, radius, 'F');

// Now draw your image on top of the circle
            doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);


// Set dark green background for the upper section
            doc.setFillColor(0, 100, 0);
            doc.rect(leftMargin, topMargin, 80, 40, 'F');

// Draw the right rounded end
            doc.ellipse(leftMargin + 80, topMargin + 20, 20, 20, 'F');

// Header
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 100, 0);
            doc.text("INVOICE", pageWidth - 20, topMargin + 10, { align: "right" });

// "I MOBILE CRAZY" Text
            doc.setFontSize(18);
            doc.setTextColor(255, 255, 255);
            doc.text("I MOBILE CRAZY", 69, 40, {
              align: "center",
            });

// Additional Information
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text("Distributors of Mobile", 62, 45, {
              align: "center",
            });
            doc.text("Phones & Accessories", 62, 50, {
              align: "center",
            });

// Set grey color for the watermark
            const greyShade = 200;
            doc.setFillColor(greyShade, greyShade, greyShade);

// Add the watermark image with reduced opacity
            doc.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight, "", "NONE");

// Draw page border on top of the watermark
            doc.setDrawColor(0, 0, 0);
            doc.rect(leftMargin, topMargin, pageWidth - 2 * leftMargin, pageHeight - 2 * topMargin);


            // Define the starting vertical position and spacing
            const newY = topMargin + 15;
            const lineSpacing = 5;

            doc.setTextColor(0, 0, 0);
            doc.text(
                "Galekade junction, Halthota road,",
                pageWidth - 42,
                newY,
                { align: "right" }
            );
            doc.text(
                "Raigama, Bandaragama.",
                pageWidth - 57,
                newY + lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Hotline: 076 311 0859",
                pageWidth - 62.5,
                newY + 2 * lineSpacing,
                { align: "right" }
            );
            doc.text(
                "Email: imobilecrazybandaragama@gmail.com",
                pageWidth - 21,
                newY + 3 * lineSpacing,
                { align: "right" }
            );


            const customerY = topMargin + 50;
            doc.setFontSize(12);
            doc.text("BILL TO:", leftInsideMargin, customerY);
            doc.text(returnOrder.shop.shop_name, leftInsideMargin, customerY + 5);
            doc.text(
                returnOrder.shop.contact_number,
                leftInsideMargin,
                customerY + 10
            );

            doc.text(
                `Bill No : ${returnOrder.return_order_id}`,
                pageWidth - 70,
                customerY
            );
            doc.text(
                `Invoice Date: ${new Date(returnOrder.date).toLocaleDateString()}`,
                pageWidth - 70,
                customerY + 5
            );

            // Initialize Y positions
            let startY = customerY + 30;

            if (returnOrder.imeis.length > 0) {
              // Table headers for IMEI
              const imeiHeaders = ["Model","Storage" , "IMEI" , "Price"];
              const imeiHeaderStartX = [
                leftInsideMargin,
                leftMargin + 40,
                leftMargin + 70,
                leftMargin + 130,
              ];

              doc.setFillColor(0, 100, 0);
              doc.setTextColor(255, 255, 255);
              doc.rect(
                  leftInsideMargin,
                  startY - rowHeight,
                  170,
                  rowHeight,
                  "F"
              );

              doc.setFontSize(12);
              imeiHeaders.forEach((header, index) => {
                const x = imeiHeaderStartX[index] + 2;
                const y = startY - rowHeight / 2 + 4;
                doc.text(header, x, y, { align: "left" });
              });

              // Reset text color for table content
              doc.setTextColor(0, 0, 0);

              // Start Y for IMEI data
              let imeiStartY = startY + 8;

              // Include IMEI data
              returnOrder.imeis.forEach((imei: any, index: number) => {
                doc.text(
                    `${imei.model}`,
                    leftInsideMargin,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.storage}`,
                    leftMargin + 40,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.imei}`,
                    leftMargin + 70,
                    imeiStartY + index * 10
                );
                doc.text(
                    `${imei.price}`,
                    leftMargin + 130,
                    imeiStartY + index * 10
                );
              });

              // Draw IMEI border
              doc.setFillColor(0, 100, 0);
              doc.rect(
                  leftInsideMargin,
                  startY,
                  170,
                  9
              );

              // Update Y for summary
              startY = imeiStartY + returnOrder.imeis.length * 10 + sectionMargin;
            }

            // Footer
            const footerY = pageHeight - 60;
            const footerStartY = footerY - 30;
            doc.setFontSize(12);

            doc.text(
                `Actual Price: ${returnOrder.actual_price.toFixed(2)}`,
                190,
                footerStartY,
                { align: "right" }
            );
            doc.text(
                `Discount: ${returnOrder.discount.toFixed(2)}`,
                190,
                footerStartY + 5,
                { align: "right" }
            );
            doc.text(
                `Total Amount: ${returnOrder.total_amount.toFixed(2)}`,
                190,
                footerStartY + 10,
                { align: "right" }
            );

// Warranty terms and conditions below the amounts
            // Set font size for the footer
            /*doc.setFontSize(10);
            const warrantyOffsetY = footerStartY + 20;*/

/*
// Array of footer text
            const footerText = [
              "Warranty terms & conditions!",
              " >  One year software warranty.",
              " >  Warranty void if stickers damaged or removed.",
              " >  Item should be in good condition.",
              " >  Bill must be presented, No cash returns.",
            ];
*/

/*// Draw the footer text
            footerText.forEach((line, index) => {
              doc.text(line, leftInsideMargin, warrantyOffsetY + index * 5);
            });*/

// Thank you text
            const thankYouText = "Thank you for shopping with us!";
            const developerText = "Developed by Arimax Solutions";

// Calculate the width and center X position for the thank you text
            const textWidth = doc.getTextWidth(thankYouText);
            const centerX = (pageWidth - textWidth) / 2;
            const thankYouY = pageHeight - 40;

// Set font size for thank you text and render it
            doc.setFontSize(12);
            doc.text(thankYouText, centerX, thankYouY);

// Calculate Y position for the developer text
            const developerY = thankYouY + 20;

// Set a smaller font size for the developer text and render it
            doc.setFontSize(10);
            doc.text(developerText, 85, developerY - 15);

// Draw a dark green filled rectangle above the thank you text
            const rectY = thankYouY+8;

            doc.setFillColor(0, 100, 0);
            doc.roundedRect(leftInsideMargin, rectY, 170, 4, 4, 4, 'F');

            // Save the PDF
            doc.save(`${returnOrder.shop.shop_name}.bill.pdf`);
          };
          await Swal.fire({
            title: "Success!",
            text: "Return order saved successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/order")
          console.log("Return order saved successfully:", response.data);
        } catch (error) {
          // SweetAlert error message
          await Swal.fire({
            title: "Error!",
            text: "Error saving return order",
            icon: "error",
            confirmButtonText: "OK",
          });

          console.error("Error saving wholesale order:", error);
        }
      };

      return (
        <div className="m-4 w-full">
          <div className="m-4">
            <TopNavbar />
          </div>
          <div className="bg-[#14141E] rounded-md p-3 text-white">
            <div className="flex justify-between">
              <div>
                <button className="mr-4">Cash Payment</button>
                <button>Card Payment</button>
              </div>
              <div>
                <p className="text-3xl text-[#5386ED] mr-10">{orderId}</p>
              </div>
            </div>
            <hr className="my-3" />
            <div className="flex">
              <div className="flex-1 p-4">
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="font-bold px-6 py-2 ">Shop Name</th>
                      <th className="font-bold px-6 py-2 ">Shop Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-2 ">{shopNameReturn}</td>
                      <td className="px-6 py-2 ">{shopContactNumberReturn}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="space-y-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="font-bold px-6 py-4 text-left">
                          Model Name
                        </th>
                        <th className="font-bold px-6 py-4 text-left">
                          Imei Number
                        </th>
                        <th className="font-bold px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnPhones.map((returnPhone: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-2">{returnPhone.modelName}</td>
                          <td className="px-6 py-2">{returnPhone.imei}</td>
                          <td className="px-6 py-2">{returnPhone.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <hr className="my-3" />
                </div>
              </div>

              <div>
                <div className="h-full w-1 bg-[#717171] mx-5"></div>
              </div>
              <div className="flex-1">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-[#5386ED] text-xl py-2 px-4">
                        Make Payment
                      </th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Subtotal</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{subtotalReturn.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p className="text-red-500">OutStanding</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p className="text-red-500">
                            {outstandingReturn.toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Discount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <input
                            type="number"
                            ref={discountRefReturn}
                            onChange={handleDiscountChangeReturn}
                            className="bg-[#1E1E1E] text-white px-2 py-1 rounded-md"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Total Amount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{totalAfterDiscountReturn.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Customer Amount</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <input
                              type="text" // Change to text to allow formatting with commas
                              value={formatNumberReturn(customerAmountReturn.toString())} // Format the value for display
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/,/g, ''); // Remove commas for actual numeric value
                                setCustomerAmountReturn(parseFloat(numericValue) || 0); // Update state with the numeric value
                              }}
                              className="bg-[#1E1E1E] text-white px-2 py-1 rounded-md"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">
                        <div className="mt-2">
                          <p>Balance</p>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="mt-1">
                          <p>{balanceReturn.toFixed(2)}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    className="bg-[#5356EC] p-2"
                    onClick={saveOrderReturn}
                  >
                    Confirm Payment
                  </button>
                  <button className="border-2 border-[#5356EC] p-2 bg-[#343434]">
                    Cancel Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }

};

export default ProceedPayment;
