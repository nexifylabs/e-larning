import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import toast from "react-hot-toast";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { parseCookies } from "nookies";
import GeneralLoader from "@/utils/GeneralLoader";
import { confirmAlert } from "react-confirm-alert";
import { FaTrash } from "react-icons/fa"; // Importa el icono de eliminación aquí
import TopBanner from "@/components/TopBanner/TopBanner";
import io from "socket.io-client";

const index = ({ user }) => {
  const { elarniv_users_token } = parseCookies();
  const [loading, setLoading] = useState(true);
  const [uniqueNotifications, setUniqueNotifications] = useState([]);
  // const socket = io('http://localhost:4000');

  const fetchNotification = () => {
    // Agarra el JWT de la sesión, que tiene toda tu info actual
    const { elarniv_users_token } = parseCookies();
    const url = `${baseUrl}/api/notifications/get-all`;

    const payload = {
      headers: { Authorization: elarniv_users_token },
    };

    axios.get(url, payload).then((res) => {
      // console.log(res.data.payload);
      const notifications = res.data.payload;

      // Filtra las notificaciones duplicadas por mensaje
      const uniqueNotifications = Array.from(
        new Set(notifications.map((notification) => notification.message))
      ).map((message) => {
        return notifications.find(
          (notification) => notification.message === message
        );
      });

      setUniqueNotifications(uniqueNotifications);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  // ...

  const confirmDelete = (message) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this notification?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(message),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = async (message) => {
    // Cambiar el parámetro a "id" en lugar de "notificationId"
    try {
      const payload = {
        headers: { Authorization: elarniv_users_token },
        params: { notificationMessage: message },
      };
      const response = await axios.delete(
        `${baseUrl}/api/notifications`,
        payload
      );

      // socket.emit('notification', "asdfasdf")

      toast.success(response.data.message, {
        style: {
          border: "1px solid #4BB543",
          padding: "16px",
          color: "#4BB543",
        },
        iconTheme: {
          primary: "#4BB543",
          secondary: "#FFFAEE",
        },
      });
      fetchNotification();
    } catch (err) {
      let {
        response: {
          data: { message },
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
    }
  };

  // ...

  return (
    <>
      <TopBanner />

      <Navbar user={user} />

      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <AdminSideNav user={user} />
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="main-content-box">
                {/* Nav */}
                <ul className="nav-style1">
                  <li>
                    <Link href="/admin/notifications/">
                      <a className="active">Notificaciones</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/notifications/create/">
                      <a>Create</a>
                    </Link>
                  </li>
                </ul>

                {loading ? (
                  <GeneralLoader />
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle fs-14">
                      <tbody>
                        {uniqueNotifications.length > 0 ? (
                          uniqueNotifications.map((notification) => (
                            <tr key={notification.id}>
                              <td>
                                <a href={notification.link}>
                                  {notification.message}
                                </a>
                              </td>
                              <td>
                                <FaTrash
                                  onClick={() =>
                                    confirmDelete(notification.message)
                                  }
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center py-3">
                              Empty!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default index;
