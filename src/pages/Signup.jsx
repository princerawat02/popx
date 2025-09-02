import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  company: "",
  isAgency: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const isButtonDisabled =
    isSubmitting || Object.values(form).some((val) => !val);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async signup
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/account");
    }, 1000);
  };

  return (
    <div className="aspect-[9/16] h-full flex flex-col items-start justify-between pt-10 bg-[#f7f8f9] p-6">
      <div className="top w-full">
        <p className="text-3xl font-bold max-w-3/5 mb-6">
          Create your PopX account
        </p>
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              placeholder: "Enter full name",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              placeholder: "Enter phone number",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Enter email address",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter password",
            },
            {
              label: "Company Name",
              name: "company",
              type: "text",
              placeholder: "Enter company name",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div className="mb-6 relative" key={name}>
              <div className="border border-gray-400 rounded-md px-3 pt-3 pb-2 focus-within:border-[#4285F4]">
                <label
                  className="absolute -top-2.5 left-3 px-1 bg-[#f7f8f9] text-purple-700 text-sm font-medium"
                  htmlFor={name}
                  style={{ pointerEvents: "none" }}
                >
                  {label}
                  {label !== "Company Name" && (
                    <span style={{ color: "red" }}> *</span>
                  )}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className="w-full border-none outline-none text-gray-900 px-0 bg-transparent"
                  value={form[name]}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
            </div>
          ))}
          <label className="block mb-1">
            Are you an Agency?
            <span style={{ color: "red" }}> *</span>
          </label>
          <div className="flex items-center gap-6 mt-1 mb-6">
            {["yes", "no"].map((val) => (
              <label
                key={val}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <input
                  type="radio"
                  name="isAgency"
                  value={val}
                  checked={form.isAgency === val}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className={`text-white font-semibold w-full text-center bg-[#6c25ff] hover:bg-[#5d0ec0] p-2 rounded-md mb-2 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
