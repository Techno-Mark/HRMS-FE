"use client";
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { FormValues } from "@/types/types";

const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        dateOfBirth: Yup.date()
          .required("Date of Birth is required")
          .max(new Date(), "Date cannot be in the future"),
        gender: Yup.string().required("Gender is required"),
        birthPlace: Yup.string().required("Birth Place is required"),
        maritalStatus: Yup.string().required("Marital Status is required"),
        currentSalary: Yup.number()
          .required("Current Salary is required")
          .positive("Must be a positive number"),
        expectedSalary: Yup.number()
          .required("Expected Salary is required")
          .positive("Must be a positive number"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
          .required("Phone is required"),
        skype: Yup.string().required("Skype Id is required"),
        linkedIn: Yup.string()
          .required("LinkedIn URL is required")
          .matches(/^https:\/\/in\.linkedin\.com\//, "LinkedIn URL must start with https://in.linkedin.com/"),
        profilePic: Yup.mixed<File>()
          .nullable()
          .test(
            "fileSize",
            "File size should be less than 1MB",
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test(
            "fileFormat",
            "Unsupported format. Upload an image file (JPG, PNG).",
            (value) =>
              !value ||
              (value &&
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
          ),
        cv: Yup.mixed<File>()
          .nullable()
          .test(
            "fileSize",
            "File size should be less than 1MB",
            (value) => !value || (value && value.size <= 1024 * 1024)
          )
          .test(
            "fileFormat",
            "Unsupported format. Please upload a PDF file.",
            (value) => !value || (value && value.type === "application/pdf")
          ),
      });
    case 2:
      return Yup.object({
        jobRole: Yup.string().required("Job Role is required"),
        coverLetter: Yup.string().required("Cover Letter is required"),
        referredBy: Yup.array()
          .min(1, "At least one referral method is required")
          .of(Yup.string().required()),
        relationship: Yup.string().required("Relationship is required"),
        referenceName: Yup.string().required("Reference Name is required"),
        referenceDob: Yup.date()
          .required("Reference Date of Birth is required")
          .max(new Date(), "Date cannot be in the future"),
        referenceJob: Yup.string().required("Reference Job is required"),
        referenceAddress: Yup.string().required("Reference Address is required"),
        referencePhone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
          .required("Phone is required"),
      });
    case 3:
      return Yup.object({
        workDetails: Yup.array()
          .of(
            Yup.object({
              workFromDate: Yup.date().required("Work From Date is required"),
              workToDate: Yup.date().required("Work To Date is required"),
              workCompany: Yup.string().required("Company Name is required"),
              workPosition: Yup.string().required("Position is required"),
              workContactPerson: Yup.string().required(
                "Contact Person is required"
              ),
              workSalary: Yup.number()
                .required("Salary is required")
                .positive("Must be a positive number"),
              workReasonLeaving: Yup.string().required(
                "Reason for leaving is required"
              ),
              workJobDescription: Yup.string().required(
                "Job Description is required"
              ),
            })
          )
          .min(1, "At least one work experience is required"),
        educationalDetails: Yup.array()
          .of(
            Yup.object({
              eduFromDate: Yup.date().required("Education From Date is required"),
              eduToDate: Yup.date().required("Education To Date is required"),
              eduCourse: Yup.string().required("Course is required"),
              eduTrainingPlace: Yup.string().required(
                "Training Place is required"
              ),
              eduSpecialized: Yup.string().required("Specialization is required"),
              eduPercentage: Yup.number()
                .required("Percentage is required")
                .min(0, "Minimum 0%")
                .max(100, "Maximum 100%"),
            })
          )
          .min(1, "At least one education detail is required"),
      });
  }
};

const Application: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    birthPlace: "",
    maritalStatus: "",
    currentSalary: "",
    expectedSalary: "",
    skillName: "",
    interests: "",
    email: "",
    phone: "",
    skype: "",
    linkedIn: "",
    profilePic: null,
    cv: null,
    housenumber: "",
    building: "",
    street: "",
    area: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    referredBy: [],
    jobRole: "",
    coverLetter: "",
    relationship: "",
    referenceName: "",
    referenceDob: "",
    referenceJob: "",
    referenceAddress: "",
    referencePhone: "",
    workDetails: [
      {
        workFromDate: "",
        workToDate: "",
        workCompany: "",
        workPosition: "",
        workContactPerson: "",
        workSalary: "",
        workReasonLeaving: "",
        workJobDescription: "",
      },
    ],
    educationalDetails: [
      {
        eduFromDate: "",
        eduToDate: "",
        eduCourse: "",
        eduTrainingPlace: "",
        eduSpecialized: "",
        eduPercentage: "",
      },
    ],
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/submit",
        values
      );
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an issue submitting your form. Please try again.");
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
      window.location.href = "/thankyou";
    }
  };

  const handleNext = async (
    values: FormValues,
    validateForm: (values: FormValues) => Promise<FormikErrors<FormValues>>,
    setTouched: (touched: { [key: string]: boolean }) => void
  ) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    } else {
      const fields = Object.keys(errors);
      const touchedFields = fields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setTouched(touchedFields);
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="max-w-[80%] bg-white rounded shadow-md mx-auto pt-4">
        <h2 className="text-lg font-bold text-black pb-2 text-center border-b">
          Job Application
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(step)}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            setTouched,
            validateForm,
            values,
          }) => (
            <Form className="relative h-[86vh]">
              <div className="max-h-[80vh] overflow-y-auto p-6">
                {step === 1 && <Step1 errors={errors} touched={touched} />}
                {step === 2 && <Step2 errors={errors} touched={touched} />}
                {step === 3 && <Step3 errors={errors} touched={touched} />}
              </div>
              <div className="flex justify-end gap-4 absolute bottom-0 left-0 w-full px-10 py-2 bg-white z-9 border-t">
                {step > 1 && (
                  <Button variant="outlined" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleNext(values, validateForm, setTouched)
                    }
                  >
                    Next
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                )}
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
      />
    </div>
  );
};

export default Application;