"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import Generalinformation from "./generalinformation";
import { FormValues } from "@/types/types";
import styles from "./application.module.css";

const getValidationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required.")
    .min(2, "Full Name must be between 2 and 100 characters.")
    .max(100, "Full Name must be between 2 and 100 characters.")
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      "Full Name can only contain letters and spaces."
    )
    .test(
      "no-special-chars",
      "Full Name should not contain numbers or special characters.",
      (value) => !/[\d@#$%^&*()_+=[\]{};':"\\|,.<>/?~`-]/.test(value || "")
    ),
  dateOfBirth: Yup.string()
    .required("Date of Birth is required.")
    .test("valid-date", "Please enter a valid date.", (value) => {
      if (!value) return false;
      const date = new Date(value.split("/").reverse().join("-"));
      return !isNaN(date.getTime()); // Returns true if the date is valid
    })
    .test(
      "not-future-date",
      "Date of Birth cannot be a future date.",
      (value) => {
        if (!value) return true; // If no value, it's considered valid
        const today = new Date();
        const date = new Date(value.split("/").reverse().join("-"));
        return date <= today; // Returns true if the date is not in the future
      }
    ),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be between 5 and 255 characters")
    .max(255, "Address must be between 5 and 255 characters")
    .matches(
      /^[a-zA-Z0-9\s,.-/]+$/,
      "Address should not contain special characters such as @, #, &, or *."
    )
    .matches(
      /^[\w\s,.-/]+$/,
      "Please use valid punctuation in the address (e.g., commas, periods, hyphens)."
    ),
  city: Yup.string().required("City is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  education: Yup.string().required("Education is required"),
  experience: Yup.string()
    .required("Experience is required")
    .matches(/^[A-Za-z0-9\s.]+$/, "Please enter a valid experience details."),
  organization: Yup.string()
    .required("Organization is required")
    .min(2, "Current organization name must be between 2 and 100 characters")
    .max(100, "Current organization name must be between 2 and 100 characters"),
  currentCtc: Yup.number()
    .required("Current/Last CTC is required")
    .min(1000, "Please enter a CTC value between ₹1,000 and ₹1,00,00,000.")
    .max(1000000, "Please enter a CTC value between ₹1,000 and ₹1,00,00,000.")
    .typeError("Current CTC must be a valid number"),
  notice: Yup.number()
    .required("Notice period is required")
    .min(0, "Notice period cannot be a negative number"),
  position: Yup.string().required("Position is required"),
  referredBy: Yup.string().required(
    "Please enter Referral/Vendor/Consultant details."
  ),
  // skills: Yup.array()
  //   .min(1, "At least one skill is required")
  //   .of(Yup.string().required()),
  pastExperience: Yup.array()
    .min(1, "At least one is required")
    .of(Yup.string().required()),
  reference: Yup.string().required("Reference is required."),
  otherReference: Yup.string().when("reference", {
    is: "Other",
    then: (schema) =>
      schema.required("Please specify the reference details."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Application: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues: FormValues = {
    fullName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    education: "",
    experience: "",
    pastExperience: [],
    organization: "",
    currentCtc: "",
    notice: "",
    skills: [],
    position: "",
    reference: "",
    otherReference: "",
    referredBy: "",
    otherSkill: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log("here in submit");
    setLoading(true);
    setErrorMessage(null);

    if (values.reference === "Other" && values.otherReference) {
      values.reference = values.otherReference;
    }

    if (values.skills.includes("Other") && values.otherSkill) {
      values.skills = values.skills.filter((skill) => skill !== "Other");
      values.skills.push(values.otherSkill);
    }

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        actions.resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "There was an issue submitting your form. Please try again."
      );
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
      router.push("/thankyou");
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div
        className={`${styles.jobcontainer} bg-white rounded shadow-md mx-auto pt-4`}
      >
        <h2 className="text-lg font-bold text-black pb-2 text-center border-b">
          Job Application
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={`${styles.formcontainer} relative`}>
              <div className={`${styles.formsubcontainer} overflow-y-auto p-6`}>
                <Generalinformation errors={errors} touched={touched} />
              </div>
              <div className="flex justify-end gap-4 absolute bottom-0 left-0 w-full px-10 py-2 bg-white z-9 border-t">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default Application;
