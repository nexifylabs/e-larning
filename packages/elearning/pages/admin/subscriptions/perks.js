import React, {useState, useEffect} from 'react';
import Navbar from '@/components/_App/Navbar';
import Footer from '@/components/_App/Footer';
import AdminSideNav from '@/components/_App/AdminSideNav';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import {parseCookies} from 'nookies';
import GeneralLoader from '@/utils/GeneralLoader';
import CourseRow from '@/components/Admin/CourseRow';
import TopBanner from '@/components/TopBanner/TopBanner';
import PerkRow from "@/components/Admin/PerkRow";
import subscriptions from "./index";
import SearchPerk from "@/components/_App/SearchPerk";

const Index = ({user}) => {
    const {elarniv_users_token} = parseCookies();
    const [courses, setCourses] = useState([]);
    const [perks, setPerks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const payload = {
                headers: {Authorization: elarniv_users_token},
            };
            const response = await axios.get(
                `${baseUrl}/api/subscriptions`,
                payload
            );
            // console.log(response.data.subs);

            const perk_response = await axios.get(`${baseUrl}/api/subscriptions/`, payload);
            // console.log(perk_response.data.perks);

            setCourses(response.data.subs);
            setPerks(perk_response.data.perks);

            setLoading(false);
        } catch (err) {
            let {
                response: {
                    data: {message},
                },
            } = err;
            toast.error(message, {
                style: {
                    border: '1px solid #ff0033', padding: '16px', color: '#ff0033',
                }, iconTheme: {
                    primary: '#ff0033', secondary: '#FFFAEE',
                },
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        <TopBanner/>

        <Navbar user={user}/>

        <div className='main-content'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4'>
                        <AdminSideNav user={user}/>
                    </div>


                    <div className='col-lg-9 col-md-8'>
                        <div className='main-content-box'>
                            <SearchPerk setPerks={setPerks} subs={courses} fetchData={fetchData}/>

                            <ul className='nav-style1'>
                                <li>
                                    <Link href='/admin/subscriptions/'>
                                        <a>Subscriptions</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/admin/subscriptions/new-arrival/'>
                                        <a className='active'>
                                            New Arrival
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/admin/subscriptions/perks/'>
                                        <a className='active'>
                                            Perks
                                        </a>
                                    </Link>
                                </li>

                            </ul>
                            {loading ? (<GeneralLoader/>) : (<div className='table-responsive'>
                                <table className='table align-middle table-hover fs-14'>
                                    <thead>
                                    <tr>
                                        <th scope='col'>Subscription</th>
                                        <th scope='col'>Text</th>
                                        <th scope='col'>
                                            Value
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {perks.length > 0 ? (perks.map((course) => (<PerkRow
                                        key={course.id}
                                        subscriptionId={course.subscriptionId}
                                        subscriptions={courses}
                                        {...course}
                                    />))) : (<tr>
                                        <td
                                            colSpan='7'
                                            className='text-center py-3'
                                        >
                                            Empty!
                                        </td>
                                    </tr>)}
                                    </tbody>
                                </table>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </>);
};

export default Index;
