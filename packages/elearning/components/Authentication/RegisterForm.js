import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { handleLogin } from "@/utils/auth";
import LoadingSpinner from "@/utils/LoadingSpinner";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const INITIAL_USER = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${baseUrl}/api/users/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data.elarniv_users_token, router);
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
      {isMounted && (
        <div className="register-form">
          <h2>
            {t("registerpage-register", {
              defaultValue: "Register",
            })}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                {t("registerpage-firstname", {
                  defaultValue: "Name",
                })}
              </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                {t("registerpage-lastname", {
                  defaultValue: "Last Name",
                })}
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                {t("registerpage-phonenumber", {
                  defaultValue: "Phone Number",
                })}
              </label>
              <PhoneInput
                type="tel"
                className="form-control"
                name="phone"
                value={user.phone}
                onChange={(value) => {
                  setUser((prevState) => ({
                    ...prevState,
                    ["phone"]: value,
                  }));
                }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                {t("registerpage-password", {
                  defaultValue: "Password",
                })}
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <p className="description">
              {t("registerpage-description", {
                defaultValue:
                  "The password should be at least eight characters long. To make it stronger, use upper and lower case letters, numbers, and symbols",
              })}
            </p>

            <motion.button
              type="submit"
              disabled={disabled}
              whileTap={{ scale: 0.9 }}
              className="register-btn-hover"
            >
              {t("registerpage-regster", {
                defaultValue: "Register",
              })}
              {loading ? <LoadingSpinner /> : ""}
            </motion.button>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
