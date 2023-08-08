import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import AdminSideNav from "@/components/_App/AdminSideNav";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import LoadingSpinner from "@/utils/LoadingSpinner";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import TopBanner from "@/components/TopBanner/TopBanner";
import io from "socket.io-client";

const CreateNotification = ({ user }) => {
  const router = useRouter();
  const { elarniv_users_token } = parseCookies();
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    link: "",
    icon:"",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  // const socket = io('http://localhost:4000');


  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/students`);
        setUsers(response.data.students);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // ...

  const handleUserChange = (e) => {
    const { value } = e.target;
    setSelectedUser(value);
  };

  const handleSendToAllChange = (e) => {
    const { checked } = e.target;
    setSendToAll(checked);
    setSelectedUser(checked ? "" : "all");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/notifications/new`;
      const payload = {
        headers: { Authorization: elarniv_users_token },
      };
      const payloadData = { ...notification, userId: selectedUser };
      // console.log(payloadData, selectedUser);
      const response = await axios.post(url, payloadData, payload);

      // socket.emit('notification', payloadData)

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
      router.push("/admin/notifications");
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
    } finally {
      setLoading(false);
    }
  };

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
                      <a>Notificaciones</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/notifications/create/">
                      <a className="active">Create</a>
                    </Link>
                  </li>
                </ul>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label fw-semibold">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={notification.title}
                          onChange={handleChange}
                          placeholder="Notification Title"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label fw-semibold">
                          Message
                        </label>
                        <textarea
                          className="form-control"
                          name="message"
                          value={notification.message}
                          onChange={handleChange}
                          placeholder="Notification Message"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label fw-semibold">Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="link"
                          value={notification.link}
                          onChange={handleChange}
                          placeholder="Notification Link"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label fw-semibold">Icon</label>
                        <input
                          type="text"
                          className="form-control"
                          name="icon"
                          value={notification.icon}
                          onChange={handleChange}
                          placeholder="Notification icon"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label fw-semibold">
                          User ID
                        </label>
                        {sendToAll ? (
                          <div>
                            <input
                              type="checkbox"
                              checked={sendToAll}
                              onChange={handleSendToAllChange}
                            />
                            <span>Send to all users</span>
                          </div>
                        ) : (
                          <select
                            className="form-control"
                            name="userId"
                            value={selectedUser}
                            onChange={handleUserChange}
                            disabled={sendToAll}
                          >
                            <option value="">Select user</option>
                            <option value="all">All users</option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.first_name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="default-btn">
                        Save
                        <span></span>
                        {loading && <LoadingSpinner />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateNotification;
