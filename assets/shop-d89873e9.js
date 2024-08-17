import{r,j as t}from"./index-22430338.js";import{T as A}from"./topNavbar-8a7575ae.js";import{S as s}from"./sweetalert2.all-bcf0cdbb.js";import{a as c}from"./axios-dd1c8fc2.js";import{b as o}from"./utill-834e5e31.js";function U(){const[C,S]=r.useState([]),[l,d]=r.useState(""),[m,x]=r.useState(""),[p,u]=r.useState(""),[n,h]=r.useState(""),[i,f]=r.useState(""),[w,g]=r.useState(""),[y,j]=r.useState(null);async function _(){try{const e=v();await c.post(`${o}/api/shop`,{...e}),await s.fire({title:"Success!",text:"Shop saved successfully",icon:"success",confirmButtonText:"OK"}),b()}catch(e){console.log(e)}}async function N(){const e=await c.get(`${o}/api/shop`);S(e.data.data)}async function E(){try{const e=v(),a=await c.put(`${o}/api/shop/${y}`,{...e});console.log(a.data),await s.fire({title:"Success!",text:"Shop update successfully",icon:"success",confirmButtonText:"OK"}),b()}catch(e){await s.fire({title:"Something happen!",text:"Can not update shop",icon:"error",confirmButtonText:"OK"}),console.log(e)}}async function k(){s.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(e=>{c.delete(`${o}/api/shop/${y}`).then(()=>{s.fire({title:"Deleted!",text:"Your file has been deleted.",icon:"success"}),N()}),e.isConfirmed&&console.log(e)})}function b(){d(""),x(""),u(""),h(""),f(""),g(""),j(null),N()}function B(e){d(e.shop_name),x(e.address),u(0+e.contact_number.toString()),h(e.email),f(e.owner_nic),g(e.credit_limit),j(e.shop_id)}function v(){if(!l&&!m&&!p&&!n&&!i&&!w)throw s.fire({title:"Error!",text:"Please fill all fields",icon:"error",confirmButtonText:"OK"}),new Error("please fill the form");$(n),I(i);const e=T(p),a=O(w);return{shop_name:l,address:m,email:n,contact_number:e,owner_nic:i,credit_limit:a,is_deleted:!1}}function O(e){if(/^-?\d+$/.test(e))return parseInt(e,10);if(/^-?\d+\.\d+$/.test(e))return parseFloat(e);throw s.fire({title:"Error!",text:"Please enter the valid Numbers",icon:"error",confirmButtonText:"OK"}),new Error("Not a valid number")}function T(e){if(!/^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(e))throw s.fire({title:"Error!",text:"Please enter the valid contact number",icon:"error",confirmButtonText:"OK"}),new Error("please fill the form");return Number.parseInt(e)}function I(e){if(!/^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/.test(e))throw s.fire({title:"Error!",text:"Please enter the valid NIC number",icon:"error",confirmButtonText:"OK"}),new Error("please fill the form")}function $(e){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))throw s.fire({title:"Error!",text:"Please enter the valid email",icon:"error",confirmButtonText:"OK"}),new Error("please fill the form")}function D(e,a){console.log(e),console.log(a),B(a)}return r.useEffect(()=>{N()},[0]),t.jsxs("div",{className:"m-4 w-full",children:[t.jsx("div",{className:"m-4",children:t.jsx(A,{})}),t.jsx("div",{className:"m-4",children:t.jsxs("div",{className:"text-white font-semibold",children:[t.jsxs("div",{className:"mt-5 flex justify-between",children:[t.jsx("input",{className:"text-feild",value:l,onChange:e=>d(e.target.value),placeholder:"shop name"}),t.jsx("input",{className:"text-feild",value:m,onChange:e=>x(e.target.value),placeholder:"adddress"}),t.jsx("input",{className:"text-feild",value:p,onChange:e=>u(e.target.value),placeholder:"contact number"})]}),t.jsxs("div",{className:"mt-4 flex justify-between",children:[t.jsx("input",{className:"text-feild",value:n,onChange:e=>h(e.target.value),placeholder:"email"}),t.jsx("input",{className:"text-feild",value:i,onChange:e=>f(e.target.value),placeholder:"owner nic"}),t.jsx("input",{className:"text-feild",value:w,onChange:e=>g(e.target.value),placeholder:"credit limit"})]}),t.jsx("div",{className:"mt-[8vh]",children:t.jsxs("div",{className:"flex justify-end",children:[t.jsxs("button",{onClick:_,className:"mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center",children:[t.jsx("img",{src:"src/assets/icons/Add Btn.svg",className:"mr-[0.3vw]",alt:"add icon"}),"ADD"]}),t.jsxs("button",{onClick:k,className:"mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center",children:[t.jsx("img",{src:"src/assets/icons/Delete Btn.svg",className:"mr-[0.3vw]",alt:"delete icon"}),"DELETE"]}),t.jsxs("button",{onClick:E,className:"buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center",children:[t.jsx("img",{src:"src/assets/icons/Update Btn.svg",className:"mr-[0.3vw]",alt:"update icon"}),"UPDATE"]})]})})]})}),t.jsx("div",{className:"mx-4 mt-5",children:t.jsxs("table",{className:"min-w-full divide-y table-styles",children:[t.jsx("thead",{children:t.jsxs("tr",{className:"",children:[t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Shop Id"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Name"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Address"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Contact Number"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Email"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Owner NIC"}),t.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Credit Limit"})]})}),t.jsx("tbody",{children:C.map(e=>t.jsxs("tr",{className:" text-white font-semibold hover:bg-gray-50",onClick:()=>D(e.shop_id,e),children:[t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500",children:e.shop_id}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.shop_name}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.address}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.contact_number}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.email}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.owner_nic}),t.jsx("td",{className:"px-6 py-2 whitespace-nowrap text-sm text-gray-500",children:e.credit_limit})]},e.shop_id))})]})})]})}export{U as default};
