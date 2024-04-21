import React, { useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isEmailValid = () => /\S+@\S+\.\S+/.test(email);
  const isOtpValid = () => /^\d{6}$/.test(otp);
  const isPasswordValid = () => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      lowercaseRegex.test(newPassword) &&
      uppercaseRegex.test(newPassword) &&
      specialCharacterRegex.test(newPassword)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!isEmailValid()) {
        setError("Please enter a valid email address.");
        return;
      }
      setStep(2);
      setError("");
    } else if (step === 2) {
      if (!isOtpValid()) {
        setError("Please enter a valid 6-digit OTP.");
        return;
      }
      setStep(3);
      setError("");
    } else if (step === 3) {
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }
      if (!newPassword || !confirmPassword) {
        setError("Both new password and confirm password are required.");
        return;
      }
      if (!isPasswordValid()) {
        setError(
          "Password must contain at least one lowercase letter, one uppercase letter, and one special character."
        );
        return;
      }
      setStep(1);
      navigate("/auth/login");
    }
  };

  const handleClickLoginScreen = () => {
    navigate("/auth/login");
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={style.forgot_password_container}>
      <div className={style.Keys_of_forgotpassword}>
        <p className={style.text_forgotpassword}>Forgot Password</p>

        {step === 1 && (
          <p className={style.text_forgotpassword}>
            No worries, we'll send a reset instructions to your email.
          </p>
        )}

        {step === 2 && (
          <p className={style.text_forgotpassword}>
            Please enter the OTP sent to your email for verification.
          </p>
        )}

        {step === 3 && (
          <p className={style.text_forgotpassword}>
            Set a new password for your account.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label htmlFor="email" className={style.label_forgotpassword}>
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className={style.input_Email}
              style={{ fontSize: "14px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <label htmlFor="otp" className={style.label_forgotpassword}>
              OTP: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              className={style.input_Email}
              style={{ fontSize: "14px" }}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label htmlFor="newPassword" className={style.label_forgotpassword}>
              New Password: <span style={{ color: "red" }}>*</span>
            </label>
            <div className={style.password_input_container}>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                className={style.input_Email}
                style={{ fontSize: "14px" }}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <i
                className={`${style["password-toggle-icon"]} ${
                  showNewPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }`}
                onClick={handleToggleNewPasswordVisibility}
              ></i>
            </div>

            <label
              htmlFor="confirmPassword"
              className={style.label_forgotpassword}
            >
              Confirm Password: <span style={{ color: "red" }}>*</span>
            </label>
            <div className={style.password_input_container}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                className={style.input_Email}
                style={{ fontSize: "14px" }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`${style["password-toggle-icon"]} ${
                  showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }`}
                onClick={handleToggleConfirmPasswordVisibility}
              ></i>
            </div>
          </div>
        )}

        {error && <div className={style.error_message}>{error}</div>}

        <div className={style.button_verify}>
          <button type="submit" className={style.reset_button}>
            {step === 1
              ? "Verify Email"
              : step === 2
              ? "Verify OTP"
              : "Set Password"}
          </button>

          <div style={{ marginTop: "10px" }}>
            {step !== 1 && (
              <i className="fa-solid fa-arrow-left text-black"></i>
            )}
            <button
              onClick={handleClickLoginScreen}
              style={{ border: "none", fontSize: "12px", fontWeight: "bold" }}
            >
              {step === 3 ? "Back to Login" : "Cancel"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
