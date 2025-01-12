import { useState, useEffect, useMemo, useCallback } from "react";
import TopNavbar from "../topNavbar";
import Combobox from "../combobox/combobox";
import Button from "../crudbuttons/buttons";
import Swal from "sweetalert2";
import axios from "axios";
import { backend_url } from "../../utill/utill";
import editIcon from '../../assets/icons/Update Btn.svg';
import addIcon from '../../assets/icons/Add Btn.svg';
import deleteIcon from '../../assets/icons/Delete Btn.svg'

interface Phone {
  id: number;
  name: string;
  description: string;
  qty: number;
  model: string;
  imeiNumber: string;
  storage: string;
  iosversion: string;
  batteryHealth: string;
  colour: string;
  stock?: {
    id: number;
  };
}

interface NewPhone {
  name: string;
  description: string;
  qty: number;
  models: PhoneModel[];
}

interface PhoneModel {
  name: string;
  stockAddedDate: string;
  imeiNumbers: ImeiNumberPhone[];
}

interface ImeiNumberPhone {
  imei: string;
  storage: string;
  colour: string;
  iosversion: string;
  batteryHealth: string;
}

export default function StockPhones() {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const time = useMemo(() => new Date().toTimeString().split(" ")[0], []);
  const combinedDateTime = `${today}T${time}`;
// @ts-ignore
  const [date, setDate] = useState(today);
  // @ts-ignore
  const [timeValue, setTimeValue] = useState(time);

  const [stockName, setStockName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [model, setModel] = useState("");
  const [imeiNumber, setImeiNumber] = useState("");
  const [storage, setStorage] = useState("");
  const [iosversion, setIosversion] = useState("");
  const [batteryHealth, setBatteryHealth] = useState("");
  const [colour, setColour] = useState("");
  const [phones, setPhones] = useState<Phone[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [modelsTable, setModelsTable] = useState<PhoneModel[]>([]);
  const [isPushDisabled, setIsPushDisabled] = useState(false);
  const token = useMemo(() => localStorage.getItem("authToken"), []);

  const colourOptions = [
    { value: "Gold", label: "Gold" },
    { value: "Rose Gold", label: "Rose Gold" },
    { value: "Silver", label: "Silver" },
    { value: "White", label: "White" },
    { value: "Black", label: "Black" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Grey", label: "Grey" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "Purple", label: "Purple" },
    { value: "Graphite", label: "Graphite" },
    { value: "MidNight Blue", label: "MidNight Blue" },
    { value: "Deep Purple", label: "Deep Purple" },
  ];

  const storageOptions = [
    { value: "64GB", label: "64GB" },
    { value: "128GB", label: "128GB" },
    { value: "256GB", label: "256GB" },
    { value: "512GB", label: "512GB" },
    { value: "1TB", label: "1TB" },
  ];

  const validateString = (value: string) => /^[a-zA-Z0-9\s]+$/.test(value);
  const validateNumber = (value: Number, max: Number) =>
    /^\d+$/.test(value.toString()) && value <= max;

  const validateNumber2 = (value: number | string, max: number): boolean => {
    return /^\d+$/.test(value.toString()) && Number(value) <= max;
  };


  const handleInputChange = (
    setter: any,
    validator: any,
    value: any,
    max: any,
    errorMessage: any
  ) => {
    setter(value);
    if (!validator(value, max)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: errorMessage,
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const regexPatterns = {
    stockName: /^[a-zA-Z0-9\s]+$/,
    description: /^[a-zA-Z0-9\s]+$/,
    quantity: /^\d+$/,
    model: /^[a-zA-Z0-9\s]+$/,
    imeiNumber: /^\d+$/,
    storage: /^(64GB|128GB|256GB|512GB|1TB)$/,
    iosversion: /^\d+(\.\d+)*$/,
    batteryHealth: /^\d+$/,
    colour: /^(Gold|White|Red|Black|Silver|Rose Gold|Blue|Grey|Green|Yellow|Purple|Graphite|MidNight Blue|Deep Purple)$/,
  };
  const validateForm = (): boolean => {
    // Validate stockName
    if (!regexPatterns.stockName.test(stockName)) {
      Swal.fire({
        title: "Error!",
        text: "Stock name is invalid. Only letters, numbers, and spaces are allowed.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate description
    if (!regexPatterns.description.test(description)) {
      Swal.fire({
        title: "Error!",
        text: "Description is invalid. Only letters, numbers, and spaces are allowed.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate quantity
    if (
      !regexPatterns.quantity.test(quantity) ||
      parseInt(quantity, 10) > 500
    ) {
      Swal.fire({
        title: "Error!",
        text: "Quantity is invalid. It must be a number and cannot exceed 500.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate model
    if (!regexPatterns.model.test(model)) {
      Swal.fire({
        title: "Error!",
        text: "Model is invalid. Only alphanumeric characters and spaces are allowed.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate imeiNumber
    if (!regexPatterns.imeiNumber.test(imeiNumber)) {
      Swal.fire({
        title: "Error!",
        text: "IMEI Number is invalid. It must be exactly 15 digits.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate storage
    if (!regexPatterns.storage.test(storage)) {
      Swal.fire({
        title: "Error!",
        text: "Storage is invalid. Choose a valid option.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate iosversion
    if (!regexPatterns.iosversion.test(iosversion)) {
      Swal.fire({
        title: "Error!",
        text: "iOS Version is invalid. It must be a number.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate batteryHealth
    if (
      !regexPatterns.batteryHealth.test(batteryHealth) ||
      parseInt(batteryHealth, 10) > 100
    ) {
      Swal.fire({
        title: "Error!",
        text: "Battery Health is invalid. It must be a number and cannot exceed 100.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    // Validate colour
    if (!regexPatterns.colour.test(colour)) {
      Swal.fire({
        title: "Error!",
        text: "Colour is invalid. Choose a valid option.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };

  const fetchItems = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backend_url}/api/stock`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setPhones(response.data.data);
      } else {
        console.error(
          "Invalid data format received from server:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [token]);

  const handleTableRowClick = (phone: Phone) => {
    setSelectedPhone(phone);
    setStockName(phone.name);
    setDescription(phone.description);
    setQuantity(phone.qty.toString());
    setIsPushDisabled(true);
    fetchPhoneModels(phone.id);
  };

  const handleAddPhone = useCallback(() => {
    const stockQuantity = parseInt(quantity, 10);
    if (modelsTable.length >= stockQuantity) {
      Swal.fire({
        icon: "error",
        title: "Stock Limit Exceeded",
        text: "You cannot add more models than the available stock quantity.",
      });
      return;
    }
    if (!validateForm()) return;

    const newPhoneModel: PhoneModel = {
      name: model,
      stockAddedDate: combinedDateTime,
      imeiNumbers: [
        {
          imei: imeiNumber,
          storage: storage,
          colour: colour,
          iosversion: iosversion,
          batteryHealth: batteryHealth,
        },
      ],
    };

    setPhoneModels((prev) => [...prev, newPhoneModel]);
    setModelsTable((prev) => [...prev, newPhoneModel]);
    setModel("");
    setImeiNumber("");
    setStorage("");
    setColour("");
    setIosversion("");
    setBatteryHealth("");
  }, [combinedDateTime, colour, imeiNumber, iosversion, model, storage, batteryHealth, quantity, modelsTable]);


  const fetchPhoneModels = useCallback(async (phoneId: number) => {
    try {
      const response = await axios.get(`${backend_url}/api/stock/models/${phoneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setModelsTable(response.data);
      } else {
        console.error("Invalid data format received from server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching phone models:", error);
    }
  }, [token]);


  const handlePushOnClick = useCallback(async () => {
    const newPhone: NewPhone = {
      name: stockName,
      description: description,
      qty: parseInt(quantity),
      models: phoneModels,
    };

    try {
      const response = await axios.post(`${backend_url}/api/stock`, newPhone, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Phone added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setPhones((prev) => [...prev, response.data.data]);
        setStockName("");
        setDescription("");
        setQuantity("");
        setPhoneModels([]);
        setModelsTable([]);
      }
    } catch (error) {
      console.error("Error adding phone:", error);
      Swal.fire({ title: "Error!", text: "Failed to add phone", icon: "error", confirmButtonText: "OK" });
    }
  }, [stockName, description, quantity, phoneModels, token]);

  const handleItemUpdateOnClick = async () => {
    if (!selectedPhone) return;
    const updatedPhoneModels = modelsTable
      .filter((model) => model && model.imeiNumbers.length > 0)
      .map((model) => ({
        name: model.name,
        imeiNumbers: model.imeiNumbers,
      }));

    const updatedPhone = {
      id: selectedPhone.id,
      name: stockName,
      qty: parseInt(quantity),
      description: description,
      models: updatedPhoneModels,
    };

    try {
      const response = await axios.put(
        `${backend_url}/api/stock/${selectedPhone.id}`,
        updatedPhone,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", "Phone updated successfully", "success");
        fetchItems();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        Swal.fire("Error", "Failed to update phone", "error");
      }
    } catch (error) {
      console.error("Failed to update phone:", error);
      Swal.fire("Error", "An error occurred while updating the phone", "error");
    }
  };

  const handleItemDeleteOnClick = async () => {
    if (!selectedPhone) return;
    const selectedStockId = selectedPhone.id;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/stock/imei/delete/${selectedStockId}/16`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedPhones = phones.filter(
          (phone) => phone.id !== selectedPhone.id
        );
        const updatedModelsTable = modelsTable.filter(
          (model: any) => model.stockId !== selectedStockId
        );
        const updatedPhoneModels = phoneModels.filter(
          (model: any) => model.stockId !== selectedStockId
        );
        setPhones(updatedPhones);
        setModelsTable(updatedModelsTable);
        setPhoneModels(updatedPhoneModels);
        setSelectedPhone(null);

        Swal.fire({
          title: "Success!",
          text: "Phone deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      console.error("Error deleting phone:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete phone",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeletePhoneModel = (index: number) => {
    const updatedModelsTable = modelsTable.filter((_, i) => i !== index);
    setModelsTable(updatedModelsTable);
  };

  const handleModelTableRowClick = (
    model: PhoneModel,
    event: React.MouseEvent
  ) => {
    if ((event.target as HTMLElement).tagName === "BUTTON") {
      return;
    }
    setModel(model.name);
    if (model.imeiNumbers.length > 0) {
      const imeiData = model.imeiNumbers[0];
      setImeiNumber(imeiData.imei);
      setStorage(imeiData.storage);
      setColour(imeiData.colour);
      setIosversion(imeiData.iosversion);
      setBatteryHealth(imeiData.batteryHealth);
    }
  };

  useEffect(() => {
    if (selectedPhone) {
      console.log("Phone selected:", selectedPhone);
      if (selectedPhone.stock?.id) {
        console.log("Stock associated with phone:", selectedPhone.stock);
      }
    }
  }, [selectedPhone]);

  return (
    <div className="m-4 w-full">
      <div className="m-4">
        <TopNavbar />
      </div>
      {/* Inputs row */}
      <div className="m-4 text-white font-semibold">
        <div className="mt-5 flex flex-col sm:flex-row justify-between">
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={stockName}
            onChange={(ev) =>
              handleInputChange(
                setStockName,
                validateString,
                ev.target.value,
                null,
                "Stock name must be a string"
              )
            }
            placeholder="   Stock Name"
          />
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={description}
            onChange={(ev) =>
              handleInputChange(
                setDescription,
                validateString,
                ev.target.value,
                null,
                "Description must be a string"
              )
            }
            placeholder="   Description"
          />
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={quantity}
            onChange={(ev) =>
              handleInputChange(
                setQuantity,
                validateNumber,
                ev.target.value,
                500,
                "Quantity cannot exceed 500"
              )
            }
            placeholder="   Quantity"
          />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row justify-between ">
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={model}
            onChange={(ev) => setModel(ev.target.value)}
            placeholder="   Model"
          />
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={imeiNumber}
            onChange={(ev) => setImeiNumber(ev.target.value)}
            placeholder="   IMEI Number"
          />
          <Combobox
            value={storage}
            onChange={(ev) => setStorage(ev.target.value)}
            options={storageOptions}
            placeholder="Storage"
          />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row justify-between">
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={iosversion}
            onChange={(ev) =>
              handleInputChange(
                setIosversion,
                  validateNumber2,
                ev.target.value,
                50,
                "iOS version must be a number"
              )
            }
            placeholder="   IOS Version"
          />
          <input
            className="text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1"
            value={batteryHealth}
            onChange={(ev) =>
              handleInputChange(
                setBatteryHealth,
                validateNumber,
                ev.target.value,
                100,
                "Battery health cannot exceed 100"
              )
            }
            placeholder="   Battery Health"
          />
          <Combobox
            value={colour}
            onChange={(ev) => setColour(ev.target.value)}
            options={colourOptions}
            placeholder="Colour"
          />
        </div>
      </div>
      {/* Second table (list of phone models) */}
      <div
        className="m-4 mt-5 text-white"
        style={{ height: "35vh", overflowY: "auto" }}
      >
        <h2 className="text-xl font-semibold mb-4">Phone Models</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">ID</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Model Name
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Stock Added Date
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  IMEI Number
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Storage</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  iOS Version
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Battery Health
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Colour</th>
                <th className="py-2 px-4 border-b border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {modelsTable.map((model, index) =>
                model ? (
                  <tr
                    key={index}
                    onClick={(event) => handleModelTableRowClick(model, event)}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <td className="py-2 px-4 border-b border-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.stockAddedDate}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.imeiNumbers.map((imei) => imei.imei).join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.imeiNumbers.map((imei) => imei.storage).join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.imeiNumbers
                        .map((imei) => imei.iosversion)
                        .join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.imeiNumbers
                        .map((imei) => imei.batteryHealth)
                        .join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      {model.imeiNumbers.map((imei) => imei.colour).join(", ")}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-700">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeletePhoneModel(index);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}></tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="m-4 flex mt-5 gap-x-[3vw] justify-end">
        <Button
          onClick={handleAddPhone}
          className="buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc={addIcon}
          iconAlt="add icon"
        >
          ADD
        </Button>
        <Button
          onClick={handleItemDeleteOnClick} // Directly use the handler
          className="buttons-styles bg-red-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc={deleteIcon}
          iconAlt="delete icon"
        >
          DELETE
        </Button>

        <Button
          onClick={handleItemUpdateOnClick}
          className="buttons-styles bg-blue-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center"
          iconSrc={editIcon}
          iconAlt="update icon"
        >
          UPDATE
        </Button>
        <Button
          onClick={handlePushOnClick}
          className={`buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center ${
            isPushDisabled ? "hidden" : ""
          }`}
          iconSrc={addIcon}
          iconAlt="add icon"
        >
          PUSH
        </Button>
      </div>
      {/* First table (list of phones) */}
      <div className="m-4 mt-5 text-white">
        <h2 className="text-xl font-semibold mb-4">List of Stocks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white table-styles">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">ID</th>
                <th className="py-2 px-4 border-b border-gray-700">Name</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Description
                </th>
                <th className="py-2 px-4 border-b border-gray-700">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {phones.length > 0 ? (
                phones.map((phone, index) =>
                  phone ? (
                    <tr
                      key={phone.id || index}
                      onClick={() => handleTableRowClick(phone)}
                      className="cursor-pointer hover:bg-gray-700"
                    >
                      <td className="py-2 px-4 border-b border-gray-700">
                        {phone.id}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {phone.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {phone.description}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {phone.qty}
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan={4} className="py-2 px-4 text-center">
                    No stocks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
