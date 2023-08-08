import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Select from "react-dropdown-select";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";

const StudentsRaw = (purchase) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`${baseUrl}/api/get-courses-recommend`);
      const data = response.data;
      setCourses(data.courses);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const dropdownOptions = courses.map((course) => ({
    value: course.id,
    label: course.title,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };


  return (
    <tr>
      <td>{purchase.buyerName}</td>
      <td>{purchase.buyerEmail}</td>
      <td>{purchase.buyerPhoneNumber ? purchase.buyerPhoneNumber : "N/A"}</td>
      <td>{purchase.items.length > 0 && purchase.items[0].type === 'sub' ? purchase.items[0].type.toUpperCase() : "No"}</td>
      <td>{purchase.items.map(e => <div style={{ marginBottom: '5px' }}>{e.name}</div>)}</td>
      <td>{purchase.paymentState === "SUCCESS" ? "PAGADO" : "N/A"}</td>
        <td>{purchase.paymentType}</td>
        <td>{new Date(purchase.updated_at).toLocaleDateString()}</td>
      {/* <td>
                <div className='max-300px max-height-60'>
                    {bio ? bio : 'N/A'}
                </div>
            </td> */}
      {/*<td>*/}
      {/*  <div>*/}
      {/*    {loading ? (*/}
      {/*      <div>Loading...</div>*/}
      {/*    ) : (*/}
      {/*      <Select*/}
      {/*        options={dropdownOptions}*/}
      {/*        value={selectedOptions}*/}
      {/*        multi*/}
      {/*        onChange={handleSelectChange}*/}
      {/*        closeMenuOnSelect={false}*/}
      {/*        clearable={false}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</td>*/}
      {/*<td>*/}
      {/*  <button*/}
      {/*    onClick={handleSubmit}*/}
      {/*    style={{*/}
      {/*      backgroundColor: "#CE4F88",*/}
      {/*      border: "none",*/}
      {/*      color: "white",*/}
      {/*      padding: "10px 20px",*/}
      {/*      textAlign: "center",*/}
      {/*      textDecoration: "none",*/}
      {/*      display: "inline-block",*/}
      {/*      fontSize: "13px",*/}
      {/*      margin: "4px 2px",*/}
      {/*      cursor: "pointer",*/}
      {/*      borderRadius: "20px",*/}
      {/*      height: "40px",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {!loading ? <div>Apply</div> : <LoadingSpinner />}*/}
      {/*  </button>*/}
      {/*</td>*/}
    </tr>
  );
};

export default StudentsRaw;