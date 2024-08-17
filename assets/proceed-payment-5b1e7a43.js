import{r as c,j as e}from"./mui-core-8430a145.js";import{T as R}from"./topNavbar-62e82537.js";import{a as C}from"./axios-dd1c8fc2.js";import{b as D}from"./utill-834e5e31.js";import{S as x}from"./sweetalert2.all-4a184b36.js";import{a as Ce,b as De}from"./index-e2260fdc.js";const _e=q=>{console.log(q);const{orderType:k}=Ce(),w=De(),{wholesalePhones:j,wholesaleItems:N,shopName:_,shopId:K,shopContactNumber:A,outstanding:m,address:M,shopEmail:$,shopOwnerNic:L,shopCreditLimit:Q}=w.state||{wholesalePhones:[],wholesaleItems:[],shopName:"",shopContactNumber:"",shopId:"",outstanding:0,address:"",shopEmail:"",shopOwnerNic:"",shopCreditLimit:0},{phones:y,items:b,customerName:W,contactNumber:O,customerId:z,customerOutstanding:f}=w.state||{phones:[],items:[],customerName:"",contactNumber:"",customerId:"",customerOutstanding:""},{returnPhones:v,shopNameReturn:F,shopIdReturn:G,shopContactNumberReturn:P,outstandingReturn:T}=w.state||{returnPhones:[],shopNameReturn:"",shopIdReturn:"",shopContactNumberReturn:"",outstandingReturn:""};switch(k){case"retail-order":const H=c.useRef(null),[o,J]=c.useState(0),[U,X]=c.useState(0),[Y,Z]=c.useState(0),[ee,se]=c.useState(0),[h,te]=c.useState(0);c.useEffect(()=>{B(o,h)},[o,h,y,b,f]);const ae=s=>{const l=parseFloat(s.target.value)||0;J(l)},B=(s,l)=>{const a=y.reduce((d,i)=>d+(parseFloat(i.price)||0),0),t=b.reduce((d,i)=>d+i.price*i.qty,0),r=a+t-f,n=r-s,u=l-n;return X(r),Z(n),se(u),{subtotal:r,totalAfterDiscount:n}},le=async()=>{console.log("Saving order with discount");const{subtotal:s}=B(o,h);console.log("SubTotal : "+s+"  Discount : "+o+"  Customer Amount : "+h+"  Total After Discount : "+(s-o));const l={retail_order_id:1,discount:o,actual_price:s,total_amount:s-o,date:new Date().toISOString(),is_deleted:!1,customer:{customer_id:z,name:W,contact_phone:O,outstanding_balance:f},items:b.map(a=>({item_id:a.item_id,category:a.category,brand:a.brand,name:a.name,colour:a.colour,warranty_period:a.warranty_period,qty:a.qty,price:a.price})),imeis:y.map(a=>({id:a.id,model:a.modelName,imei:a.imei,storage:a.storage,colour:a.colour,ios_version:a.ios_version,battery_health:a.battery_health,price:a.price,warranty:a.warranty}))};try{const a=await C.post(`${D}/api/retailOrder`,l);/*!// Create a new jsPDF instance
                  const doc = new jsPDF();
            // Constants for layout
                  const topMargin = 20;
                  const sectionMargin = 10; // Margin between sections
                  const rowHeight = 10; // Height of each row
                  const pageWidth = 210; // A4 page width in mm
                  const pageHeight = 297; // A4 page height in mm
                  const leftMargin = 10; // Increased margin for content to fit within page
                  const rigthMargin = 140; // Increased margin for content to fit within page
                  const leftInsideMargin = 20;
                  const marginTop = 20;


                  doc.setDrawColor(0, 0, 0); // Black color for border
                  doc.rect(leftMargin, topMargin, pageWidth - 2 * leftMargin, pageHeight - 2 * topMargin);


                  const headerY = topMargin + 10;
                  doc.setFontSize(18);
                  doc.setTextColor(0, 0, 255); // Blue color for header text
                  doc.text('INVOICE', pageWidth / 2, headerY, null, null, 'center');
                  doc.setFontSize(12);
                  doc.setTextColor(0, 0, 0); // Black color for other text
                  doc.text('I MOBILE CRAZY', pageWidth / 2, headerY + 10, null, null, 'center');
                  doc.text('NO.22, Kaluthara road', pageWidth / 2, headerY + 15, null, null, 'center');
                  doc.text('Bandaragama, Western 12530, Sri Lanka', pageWidth / 2, headerY + 20, null, null, 'center');
                  doc.text('Phone: 0777-234075', pageWidth / 2, headerY + 25, null, null, 'center');
                  doc.text('Fax: uldkrg@gmail.com', pageWidth / 2, headerY + 30, null, null, 'center');

            // Draw header border with rounded corners
                  doc.setDrawColor(0, 0, 0); // Black color for border
                  //doc.roundedRect(leftMargin, headerY - 10, pageWidth - 2 * leftMargin, 50, 5, 5); // x, y, width, height, rx, ry

            // Customer and Invoice Details
                  const customerY = headerY + 50;
                  doc.setFontSize(12);
                  doc.setTextColor(0, 0, 0); // Black color for text
                  doc.text('BILL TO:', leftInsideMargin, customerY);
                  doc.text(order.customer.name, leftInsideMargin, customerY + 5);
                  doc.text(order.customer.contact_phone, leftInsideMargin, customerY + 10);

                  doc.text(`Invoice Number: ${order.retail_order_id}`, rigthMargin, customerY);
                  doc.text(`Invoice Date: ${new Date(order.date).toLocaleDateString()}`, rigthMargin, customerY + 5);
                  doc.text(`Payment Due: ${new Date(order.date).toLocaleDateString()}`, rigthMargin, customerY + 10);


            // Table headers
                  const tableHeaderY = customerY +20 + marginTop;
                  const headers = ['Items', 'Quantity', 'Price', 'Amount'];
                  const headerWidths = [60, 40, 40, 50]; // Widths of each column
                  const headerStartX = [leftInsideMargin, leftMargin + 80, leftMargin + 120, leftMargin + 150]; // X positions for each column

                  doc.setFillColor(0, 0, 128);
                  doc.setTextColor(255, 255, 255);

                  doc.rect(leftMargin, tableHeaderY - rowHeight, pageWidth - 2 * leftMargin, rowHeight, 'F');

                  doc.setFontSize(12);

            // Center text in the header row
                  headers.forEach((header, index) => {
                    const x = headerStartX[index] + 2; // Apply the left margin
                    const y = tableHeaderY - (rowHeight / 2) + 4; // Adjust y to center text
                    doc.text(header, x, y, null, null, 'left');
                  });

            // Reset text color for table content
                  doc.setTextColor(0, 0, 0); // Black text

            // Draw table header border
                  doc.rect(leftMargin, tableHeaderY - rowHeight, pageWidth - 2 * leftMargin, rowHeight); // x, y, width, height

            // Start Y for items
                  let startY = tableHeaderY + rowHeight;

            // Include item data only if available
                  if (order.items.length > 0) {
                    order.items.forEach((item, index) => {
                      doc.text(`${item.name} - ${item.warranty_period} WARRANTY`, leftInsideMargin, startY + index * 10);
                      doc.text(`${item.qty}`, leftMargin + 80, startY + index * 10);
                      doc.text(`₨${item.price.toFixed(2)}`, leftMargin + 120, startY + index * 10);
                      doc.text(`₨${(item.qty * item.price).toFixed(2)}`, leftMargin + 150, startY + index * 10);
                    });

                    // Draw items border with rounded corners
                    doc.roundedRect(leftMargin, tableHeaderY - rowHeight, pageWidth - 2 * leftMargin, startY - tableHeaderY + order.items.length * 10, 5, 5); // x, y, width, height, rx, ry

                    // Update Y for IMEIs
                    startY = startY + order.items.length * 10 + sectionMargin;
                  }

            // Include IMEI data only if available
                  if (order.imeis.length > 0) {
                    doc.text('Phones', leftMargin, startY);
                    order.imeis.forEach((imei, index) => {
                      doc.text(`${imei.model} - ${imei.imei} - ${imei.warranty}`, leftMargin, startY + (index + 1) * 10);
                    });

                    // Draw IMEIs border with rounded corners
                    doc.roundedRect(leftMargin, tableHeaderY - rowHeight, pageWidth - 2 * leftMargin, startY - tableHeaderY + order.imeis.length * 10 + 10, 5, 5); // x, y, width, height, rx, ry

                    // Update Y for totals
                    startY = startY + order.imeis.length * 10 + 10 + sectionMargin;
                  }

            // Total
                  doc.text(`Subtotal: ₨${order.actual_price.toFixed(2)}`, leftMargin + 130, startY);
                  doc.text(`Discount: ₨${order.discount.toFixed(2)}`, leftMargin + 130, startY + 10);
                  doc.text(`Total: ₨${order.total_amount.toFixed(2)}`, leftMargin + 130, startY + 20);



                  doc.roundedRect(leftMargin, startY - 10, pageWidth - 2 * leftMargin, 40, 5, 5); // x, y, width, height, rx, ry

                  const notesY = startY + 50 + sectionMargin;
                  doc.text('Notes / Terms', leftMargin, notesY);
                  doc.setFontSize(10);
                  doc.text('* Warranty covers only manufacturer\'s defects. Damages or defects due to negligence, misuse, improper operation,', leftMargin, notesY + 10);
                  doc.text('  power fluctuation, lightning, natural disasters, sabotage, or accidents are EXCLUDED from this warranty.', leftMargin, notesY + 15);
                  doc.text('* Repairs or replacements necessitated by such causes are not covered by the warranty and are subject to charges.', leftMargin, notesY + 20);
                  doc.text('* PLEASE SUBMIT THE INVOICE FOR WARRANTY CLAIMS.', leftMargin, notesY + 25);
                  doc.text('* All communication after sales will be based on the prevailing market.', leftMargin, notesY + 30);

                  doc.roundedRect(leftMargin, notesY - 10, pageWidth - 2 * leftMargin, 60, 5, 5); // x, y, width, height, rx, ry

                  doc.save(`${order.customer.name}.bill.pdf`);*/await x.fire({title:"Success!",text:"Order saved successfully",icon:"success",confirmButtonText:"OK"}),console.log("Order saved successfully:",a.data)}catch(a){await x.fire({title:"Error!",text:"Error saving order",icon:"error",confirmButtonText:"OK"}),console.error("Error saving order:",a)}};return e.jsxs("div",{className:"m-4 w-full",children:[e.jsx("div",{className:"m-4",children:e.jsx(R,{})}),e.jsxs("div",{className:"bg-[#14141E] rounded-md p-3 text-white",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mr-4",children:"Cash Payment"}),e.jsx("button",{children:"Card Payment"})]}),e.jsx("div",{children:e.jsx("p",{className:"text-3xl text-[#5386ED]",children:"#00000253"})})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"flex-1 p-4",children:[e.jsxs("table",{className:"w-full ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-2 ",children:"Customer"}),e.jsx("th",{className:"font-bold px-6 py-2 ",children:"Contact Number"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2 ",children:W}),e.jsx("td",{className:"px-6 py-2 ",children:O})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Model Name"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Imei Number"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Price"})]})}),e.jsx("tbody",{children:y.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:s.modelName}),e.jsx("td",{className:"px-6 py-2",children:s.imei}),e.jsx("td",{className:"px-6 py-2",children:s.price})]},l))})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Item Name"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Quantity"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Price"})]})}),e.jsx("tbody",{children:b.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:s.name}),e.jsx("td",{className:"px-6 py-2",children:s.qty}),e.jsx("td",{className:"px-6 py-2",children:s.price})]},l))})]})]})]}),e.jsx("div",{children:e.jsx("div",{className:"h-full w-1 bg-[#717171] mx-5"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-[#5386ED] text-xl py-2 px-4",children:"Make Payment"}),e.jsx("th",{className:"py-2 px-4"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Subtotal"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:U.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-red-500",children:"OutStanding"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{className:"text-red-500",children:f.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Discount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{type:"number",ref:H,onChange:ae,className:"bg-[#1E1E1E] text-white px-2 py-1 rounded-md"})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Total Amount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:Y.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Customer Amount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{type:"number",value:h,onChange:s=>te(parseFloat(s.target.value)||0),className:"bg-[#1E1E1E] text-white px-2 py-1 rounded-md"})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Balance"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:ee.toFixed(2)})})})]})]})]}),e.jsxs("div",{className:"flex flex-col gap-2 mt-3",children:[e.jsx("button",{className:"bg-[#5356EC] p-2",onClick:le,children:"Confirm Payment"}),e.jsx("button",{className:"border-2 border-[#5356EC] p-2 bg-[#343434]",children:"Cancel Payment"})]})]})]})]})]});case"wholesale-order":const ce=c.useRef(null),[p,re]=c.useState(0),[ne,de]=c.useState(0),[ie,oe]=c.useState(0),[xe,me]=c.useState(0),[g,he]=c.useState(0);c.useEffect(()=>{I(p,g)},[p,g,j,N,m]);const pe=s=>{const l=parseFloat(s.target.value)||0;re(l)},I=(s,l)=>{const a=j.reduce((d,i)=>d+(i.price||0),0),t=N.reduce((d,i)=>d+(i.price*i.qty||0),0),r=a+t-m,n=r-s,u=l-n;return de(r),oe(n),me(u),{subtotalWholesale:r,totalAfterDiscountWholesale:n}},ue=async()=>{console.log("Saving order...");const{subtotalWholesale:s,totalAfterDiscountWholesale:l}=I(p,g),a={discount:p,actual_price:s,total_amount:l,date:new Date().toISOString(),is_deleted:!1,shop:{shop_id:K,shop_name:_,address:M,email:$,contact_number:A,outstanding_balance:m,owner_nic:L,credit_limit:Q},items:N.map(t=>({item_id:t.item_id,category:t.category,brand:t.brand,name:t.name,colour:t.colour,warranty_period:t.warranty_period,qty:t.qty,price:t.price})),imeis:j.map(t=>({id:t.id,imei:t.imei,storage:t.storage,colour:t.colour,ios_version:t.ios_version,battery_health:t.battery_health,price:t.price,status:t.status,isDeleted:t.isDeleted}))};try{const t=await C.post(`${D}/api/wholesaleOrder`,a);await x.fire({title:"Success!",text:"Wholesale order saved successfully",icon:"success",confirmButtonText:"OK"}),console.log("Wholesale order saved successfully:",t.data)}catch(t){await x.fire({title:"Error!",text:"Error saving wholesale order",icon:"error",confirmButtonText:"OK"}),console.error("Error saving wholesale order:",t)}};return e.jsxs("div",{className:"m-4 w-full",children:[e.jsx("div",{className:"m-4",children:e.jsx(R,{})}),e.jsxs("div",{className:"bg-[#14141E] rounded-md p-3 text-white",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mr-4",children:"Cash Payment"}),e.jsx("button",{children:"Card Payment"})]}),e.jsx("div",{children:e.jsx("p",{className:"text-3xl text-[#5386ED]",children:"#00000253"})})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"flex-1 p-4",children:[e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-2",children:"Shop Name"}),e.jsx("th",{className:"font-bold px-6 py-2",children:"Shop Number"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:_}),e.jsx("td",{className:"px-6 py-2",children:A})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Model Name"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Imei Number"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Price"})]})}),e.jsx("tbody",{children:j.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:s.modelName}),e.jsx("td",{className:"px-6 py-2",children:s.imei}),e.jsx("td",{className:"px-6 py-2",children:s.price})]},l))})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Item Name"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Quantity"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Price"})]})}),e.jsx("tbody",{children:N.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:s.name}),e.jsx("td",{className:"px-6 py-2",children:s.qty}),e.jsx("td",{className:"px-6 py-2",children:s.price})]},l))})]})]})]}),e.jsx("div",{children:e.jsx("div",{className:"h-full w-1 bg-[#717171] mx-5"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-[#5386ED] text-xl py-2 px-4",children:"Make Payment"}),e.jsx("th",{className:"py-2 px-4"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Subtotal"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:ne.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-red-500",children:"Outstanding"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsxs("p",{className:"text-red-500",children:["-",m.toFixed(2)]})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Discount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{ref:ce,type:"number",placeholder:"0.00",className:"bg-[#14141E] border border-[#3A3A3A] text-[#717171] p-1 rounded-lg",value:p,onChange:pe})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-[#5386ED]",children:"Total"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{className:"text-[#5386ED]",children:ie.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Customer Amount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{type:"number",placeholder:"0.00",className:"bg-[#14141E] border border-[#3A3A3A] text-[#717171] p-1 rounded-lg",value:g,onChange:s=>he(parseFloat(s.target.value))})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Balance"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:xe.toFixed(2)})})})]})]})]}),e.jsx("div",{className:"mt-4 flex justify-center",children:e.jsx("button",{onClick:ue,className:"bg-[#5386ED] rounded-lg text-white px-4 py-2",children:"Save"})})]})]})]})]});case"return-order":const je=c.useRef(null),[E,Ne]=c.useState(0),[ye,be]=c.useState(0),[fe,ve]=c.useState(0),[ge,Ee]=c.useState(0),[S,Se]=c.useState(0);c.useEffect(()=>{V(E,S)},[E,S,v,T]);const we=s=>{const l=parseFloat(s.target.value)||0;Ne(l)},V=(s,l)=>{const t=v.reduce((u,d)=>u+(parseFloat(d.price)||0),0)-(parseFloat(m)||0),r=t-s,n=l-r;return be(t),ve(r),Ee(n),{subtotalReturn:t,totalAfterDiscountReturn:r}},Re=async()=>{console.log("Saving order...");const{subtotalReturn:s,totalAfterDiscountReturn:l}=V(E,S),a={discount:E,actual_price:s,total_amount:l,date:new Date().toISOString(),is_deleted:!1,shop:{shop_id:G,shop_name:F,contact_number:P},imeis:v.map(t=>({id:t.id,imei:t.imei,storage:t.storage,colour:t.colour,price:t.price}))};try{const t=await C.post(`${D}/api/returnOrder`,a);await x.fire({title:"Success!",text:"Return order saved successfully",icon:"success",confirmButtonText:"OK"}),console.log("Return order saved successfully:",t.data)}catch(t){await x.fire({title:"Error!",text:"Error saving return order",icon:"error",confirmButtonText:"OK"}),console.error("Error saving wholesale order:",t)}};return e.jsxs("div",{className:"m-4 w-full",children:[e.jsx("div",{className:"m-4",children:e.jsx(R,{})}),e.jsxs("div",{className:"bg-[#14141E] rounded-md p-3 text-white",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mr-4",children:"Cash Payment"}),e.jsx("button",{children:"Card Payment"})]}),e.jsx("div",{children:e.jsx("p",{className:"text-3xl text-[#5386ED]",children:"#00000253"})})]}),e.jsx("hr",{className:"my-3"}),e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"flex-1 p-4",children:[e.jsxs("table",{className:"w-full ",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-2 ",children:"Shop Name"}),e.jsx("th",{className:"font-bold px-6 py-2 ",children:"Shop Number"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2 ",children:F}),e.jsx("td",{className:"px-6 py-2 ",children:P})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Model Name"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Imei Number"}),e.jsx("th",{className:"font-bold px-6 py-4 text-left",children:"Price"})]})}),e.jsx("tbody",{children:v.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-2",children:s.modelName}),e.jsx("td",{className:"px-6 py-2",children:s.imei}),e.jsx("td",{className:"px-6 py-2",children:s.price})]},l))})]}),e.jsx("hr",{className:"my-3"})]})]}),e.jsx("div",{children:e.jsx("div",{className:"h-full w-1 bg-[#717171] mx-5"})}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("table",{className:"w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-[#5386ED] text-xl py-2 px-4",children:"Make Payment"}),e.jsx("th",{className:"py-2 px-4"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Subtotal"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:ye.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-red-500",children:"OutStanding"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{className:"text-red-500",children:T.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Discount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{type:"number",ref:je,onChange:we,className:"bg-[#1E1E1E] text-white px-2 py-1 rounded-md"})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Total Amount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:fe.toFixed(2)})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Customer Amount"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("input",{type:"number",value:S,onChange:s=>Se(parseFloat(s.target.value)||0),className:"bg-[#1E1E1E] text-white px-2 py-1 rounded-md"})})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-2",children:e.jsx("p",{children:"Balance"})})}),e.jsx("td",{className:"py-2 px-4",children:e.jsx("div",{className:"mt-1",children:e.jsx("p",{children:ge.toFixed(2)})})})]})]})]}),e.jsxs("div",{className:"flex flex-col gap-2 mt-3",children:[e.jsx("button",{className:"bg-[#5356EC] p-2",onClick:Re,children:"Confirm Payment"}),e.jsx("button",{className:"border-2 border-[#5356EC] p-2 bg-[#343434]",children:"Cancel Payment"})]})]})]})]})]})}return e.jsx("div",{children:"Error: Invalid order type"})},Be=_e;export{Be as default};
