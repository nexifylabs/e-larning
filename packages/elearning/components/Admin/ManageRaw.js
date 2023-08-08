import React, {useEffect, useState} from "react";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Select from "react-dropdown-select";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import {v4} from "uuid";

const StudentsRaw = ({
                         id,
                         first_name,
                         last_name,
                         email,
                         phone,
                         bio,
                         email_confirmed,
                         role,
                         onAdmin = null,
                         course,
                     }) => {
    const [courses, setCourses] = useState([]);
    const [subs, setSubs] = useState([]);
    const [selectedSub, setSelectedSub] = useState("");
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

    useEffect(() => {
        const fetchSubs = async () => {
            const response = await axios.get(`${baseUrl}/api/subscriptions`);
            const data = response.data;
            setSubs(data.subs);
            setLoading(false);
        };
        fetchSubs();
    }, []);

    const dropdownOptions = courses.map((course) => ({
        value: course.id,
        label: course.title,
    }));

    const dropdownSubsOptions = subs.map((sub) => ({
        value: sub.id,
        label: sub.title,
    }));

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isntSuscriber, setIsntSuscriber] = useState(false);

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
        setIsntSuscriber(selected.length > 0 ? true : false)
    };

    function handleSelectSubsChange(selected) {
        setSelectedOptions(dropdownOptions);
        setSelectedSub(selected[0])
        // console.log(selected[0])
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${baseUrl}/api/admin/manage-user-courses`,
                {
                    userId: id,
                    courses: selectedOptions,
                }
            );

            const selectedCourses = selectedOptions.map(e => {
                return courses.find(a => a.id === e.value)
            })

            const selectedSubscription = selectedSub && subs.find(e => e.id === selectedSub.value)


            const items = !selectedSub ? selectedCourses.map(e => {
                return {
                    id: e.id,
                    sku: "",
                    name: e.title,
                    image: e.image,
                    value: e.latest_price,
                    quantity: 1,
                    instructor: "Francisco Sant'Ana",
                    description: e.short_desc,
                }
            }) : [{
                id: selectedSubscription.id,
                sku: "",
                name: selectedSubscription.title,
                image: selectedSubscription.image,
                value: selectedSubscription.price,
                quantity: 1,
                instructor: "Francisco Sant'Ana",
                description: "",
                type: "sub"
            }]


            const purchase = {
                id: v4(),
                userId: id,
                amount: items.map(e => e.value).reduce((a, b) => a + b),
                buyerEmail: email,
                buyerName: `${first_name} ${last_name}`,
                buyerPhoneNumber: phone,
                items: items,
                paymentState: "SUCCESS",
                buyerDocType: "-",
                buyerDocNumber: "-",
                buyerAdressStreetNumber: "-",
                buyerAdressStreet: "-",
                buyerAdressNeighborhood: "-",
                buyerAdressCity: "-",
                buyerAdressState: "-",
                buyerAdressZipCode: "-",
                buyerCountry: "-",
            }

            await axios.post(
                `${baseUrl}/api/admin/purchases`,
                {
                    purchase,
                }
            );

            setLoading(false);
            toast.success("Enroled successfully.")
        } catch (err) {
            console.log(err)
            let {
                response: {
                    data: {message},
                },
            } = err;
            toast.error(message, {
                style: {
                    border: "1px solid #ff0033",
                    padding: "16px",
                    color: "#ff0033",
                },
                iconTheme: {
                    primary: "#ff0033",
                    secondary: "#FFFAEE",
                },
            });
            setLoading(false);
        }
    };


    return (
        <tr>
            <td>{`${first_name} ${last_name}`}</td>
            <td>{email}</td>
            <td>{phone ? phone : "N/A"}</td>
            <td>{email_confirmed ? "Yes" : "No"}</td>
            {/* <td>
                <div className='max-300px max-height-60'>
                    {bio ? bio : 'N/A'}
                </div>
            </td> */}
            <td>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <Select
                            disabled={isntSuscriber}
                            onChange={handleSelectSubsChange}
                            options={dropdownSubsOptions}
                            value={selectedOptions}
                            closeMenuOnSelect={false}
                            clearable={true}
                        />
                    )}
                </div>
            </td>
            <td>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <Select
                            disabled={selectedSub}
                            onChange={handleSelectChange}
                            options={dropdownOptions}
                            value={selectedOptions}
                            multi
                            closeMenuOnSelect={false}
                            clearable={true}
                        />
                    )}
                </div>
            </td>

            <td>
                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#CE4F88",
                        border: "none",
                        color: "white",
                        padding: "10px 20px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "13px",
                        margin: "4px 2px",
                        cursor: "pointer",
                        borderRadius: "20px",
                        height: "40px",
                    }}
                >
                    {!loading ? <div>Apply</div> : <LoadingSpinner/>}
                </button>
            </td>
        </tr>
    );
};

export default StudentsRaw;
