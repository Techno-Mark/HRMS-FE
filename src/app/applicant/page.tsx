"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  SelectChangeEvent,
  Grid,
  Box,
} from "@mui/material";
import Thankyou from "../thankyou/page";
import { FormValues } from '@/types/types'

const Applicant: React.FC = () => {
  const [step, setStep] = useState(1);

  const [formValues, setFormValues] = useState<FormValues>({
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
    referredBy: [] as string[],
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
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isValid, setIsValid] = useState(false);

  const validateStep = () => {
    const newErrors: Partial<FormValues> = {};
    if (step === 1) {
      if (!formValues.firstName) newErrors.firstName = "First Name is required";
      if (!formValues.lastName) newErrors.lastName = "Last Name is required";
      if (!formValues.dateOfBirth)
        newErrors.dateOfBirth = "Date of Birth is required";
      if (!formValues.gender) newErrors.gender = "Gender is required";
      if (!formValues.birthPlace)
        newErrors.birthPlace = "Birth Place is required";
      if (!formValues.maritalStatus)
        newErrors.maritalStatus = "Marital Status is required";
      if (!formValues.currentSalary)
        newErrors.currentSalary = "Current Salary is required";
      if (!formValues.expectedSalary)
        newErrors.expectedSalary = "Expected Salary is required";
      if (!formValues.email) newErrors.email = "Email is required";
      if (!formValues.phone) newErrors.phone = "Phone is required";
      if (!formValues.skype) newErrors.skype = "Skype Id is required";
      if (!formValues.linkedIn) newErrors.linkedIn = "LinkedIn Id is required";
    } else if (step === 2) {
      if (formValues.referredBy.length === 0) {
        newErrors.referredBy = ["This field is required"];
      }
      if (!formValues.jobRole) newErrors.jobRole = "Job Role is required";
      if (!formValues.coverLetter)
        newErrors.coverLetter = "Cover Letter is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors({});
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as { name: string; value: string };

    console.log("here");
    setErrors((prevState) => ({
      ...prevState,
      [name]: "", // Clear error on value change
    }));

    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target; 
    const file = files?.[0];

    if (file) {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: file, // Save the file object
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log("Checkbox value:", value, "Checked:", checked);

    // Ensure referredBy is always an array
    setFormValues((prevValues) => {
      const updatedReferredBy = checked
        ? [...prevValues.referredBy, value]
        : prevValues.referredBy.filter((item) => item !== value);

      return {
        ...prevValues,
        referredBy: updatedReferredBy, // referredBy must remain an array
      };
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Custom validation: check for digits and spaces (onChange validation)
    let error = "";

    if (/\d/.test(value)) {
      error = "Only letters are allowed.";
    } else if (!value.trim()) {
      error = "This field cannot contain only spaces.";
    }

    // Update form values
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Update errors state for custom validation
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Custom validation for phone number
    let error = "";

    // Allow only digits (no spaces)
    const sanitizedValue = value.replace(/\D/g, ""); // Remove all non-digit characters

    // Validate: If the sanitized value contains non-digit characters
    if (sanitizedValue !== value) {
      error = "Only digits are allowed, and no spaces.";
    }
    // Validate length: Phone number should be 10 digits
    else if (sanitizedValue.length > 10) {
      error = "Phone number cannot be more than 10 digits.";
    } else if (sanitizedValue.length < 10) {
      error = "Phone number must be exactly 10 digits.";
    }
    // Update the form value with sanitized value
    setFormValues((prevState) => ({
      ...prevState,
      [name]: sanitizedValue, // Only store sanitized value
    }));

    // Update error state
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = "";

    // Validate: Check if the email format is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      error = "Email is required.";
    } else if (!emailRegex.test(value)) {
      error = "Please enter a valid email address.";
    }

    // Update the form value
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value, // Update with the input value
    }));

    // Update error state
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsValid(!hasErrors);
  }, [errors]);

  useEffect(() => {
    if (formValues.referredBy.length > 0) {
      validateStep();
    }
  }, [formValues.referredBy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/submit",
        formValues
      );
      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        <Thankyou />
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEducationalChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >, index: number) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedDetails = [...prevValues.educationalDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name.split("-")[0]]: value, // Strip index from the name
      };
      return { ...prevValues, educationalDetails: updatedDetails };
    });
  };

  const handleAddEducationalDetail = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      educationalDetails: [
        ...prevValues.educationalDetails,
        {
          eduFromDate: "",
          eduToDate: "",
          eduCourse: "",
          eduTrainingPlace: "",
          eduSpecialized: "",
          eduPercentage: "",
        },
      ],
    }));
  };

  const handleWorkChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedWorkDetails = [...prevValues.workDetails];
      updatedWorkDetails[index] = { ...updatedWorkDetails[index], [name]: value };
      return { ...prevValues, workDetails: updatedWorkDetails };
    });
  };
  
  const addWorkExperience = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      workDetails: [
        ...prevValues.workDetails,
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
    }));
  };
  
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 bg-gray-100 h-[100vh]">
      <h2 className="text-lg font-bold text-black mb-2 text-center">Job Application</h2>
      <div className="max-w-[80%] mx-auto">
        <form className="relative bg-white p-6 pr-0 rounded shadow-md h-[90vh]" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="flex flex-col md:flex-row gap-[24px] h-[80vh] overflow-y-scroll">
              <div className="w-full md:w-1/2 pr-[10px] ">
                <p className="text-lg font-bold text-black mb-5">General Information</p>
                <Box display="flex" alignItems="center">
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="firstName"
                        variant="standard"
                        value={formValues.firstName}
                        onChange={handleTextFieldChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        name="lastName"
                        variant="standard"
                        value={formValues.lastName}
                        onChange={handleTextFieldChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                        value={formValues.dateOfBirth}
                        onChange={handleChange}
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                        required
                        fullWidth
                        inputProps={{
                          max: today, // Prevent selecting today's date and future dates
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>Gender*</InputLabel>
                        <Select
                          name="gender"
                          value={formValues.gender}
                          onChange={handleChange}
                          error={!!errors.gender}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {errors.gender && (
                          <p className="text-red-500 text-sm">
                            {errors.gender}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Birth Place"
                        name="birthPlace"
                        variant="standard"
                        value={formValues.birthPlace}
                        onChange={handleTextFieldChange}
                        error={!!errors.birthPlace}
                        helperText={errors.birthPlace}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>Marital Status*</InputLabel>
                        <Select
                          name="maritalStatus"
                          value={formValues.maritalStatus}
                          onChange={handleChange}
                          error={!!errors.maritalStatus}
                        >
                          <MenuItem value="Single">Single</MenuItem>
                          <MenuItem value="Married">Married</MenuItem>
                        </Select>
                        {errors.maritalStatus && (
                          <p className="text-red-500 text-sm">
                            {errors.maritalStatus}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Current Salary"
                        name="currentSalary"
                        variant="standard"
                        value={formValues.currentSalary}
                        onChange={handleChange}
                        error={!!errors.currentSalary}
                        helperText={errors.currentSalary}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Expected Salary"
                        name="expectedSalary"
                        variant="standard"
                        value={formValues.expectedSalary}
                        onChange={handleChange}
                        error={!!errors.expectedSalary}
                        helperText={errors.expectedSalary}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>Skill name</InputLabel>
                        <Select
                          name="skillName"
                          value={formValues.skillName}
                          onChange={handleChange}
                          error={!!errors.skillName}
                        >
                          <MenuItem value="frontend">frontend</MenuItem>
                          <MenuItem value="backend">backend</MenuItem>
                        </Select>
                        {errors.skillName && (
                          <p className="text-red-500 text-sm">
                            {errors.skillName}
                          </p>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Interests"
                        name="interests"
                        variant="standard"
                        value={formValues.interests}
                        onChange={handleChange}
                        helperText={errors.interests}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="w-full md:w-1/2 pr-[10px] h-fit mb-5">
                <p className="text-lg font-bold text-black mb-5">Contact Information</p>
                <Box display="flex" alignItems="center">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="standard"
                        value={formValues.email}
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        variant="standard"
                        value={formValues.phone}
                        onChange={handlePhoneNumberChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Skype"
                        name="skype"
                        variant="standard"
                        value={formValues.skype}
                        onChange={handleChange}
                        error={!!errors.skype}
                        helperText={errors.skype}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="LinkedIn"
                        name="linkedIn"
                        variant="standard"
                        value={formValues.linkedIn}
                        onChange={handleChange}
                        error={!!errors.linkedIn}
                        helperText={errors.linkedIn}
                        required
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
                <p className="text-lg font-bold text-black mt-10 mb-5">Peremant Address</p>  
                <Box display="flex" alignItems="center">
                    <Grid container spacing={3}>    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="House Number"
                        name="housenumber"
                        variant="standard"
                        value={formValues.housenumber}
                        onChange={handleChange}
                        error={!!errors.housenumber}
                        helperText={errors.housenumber}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Building Name"
                        name="building"
                        variant="standard"
                        value={formValues.building}
                        onChange={handleChange}
                        error={!!errors.building}
                        helperText={errors.building}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Street Name"
                        name="street"
                        variant="standard"
                        value={formValues.street}
                        onChange={handleChange}
                        error={!!errors.street}
                        helperText={errors.street}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Area"
                        name="area"
                        variant="standard"
                        value={formValues.area}
                        onChange={handleChange}
                        error={!!errors.area}
                        helperText={errors.area}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        name="city"
                        variant="standard"
                        value={formValues.city}
                        onChange={handleChange}
                        error={!!errors.city}
                        helperText={errors.city}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="State"
                        name="state"
                        variant="standard"
                        value={formValues.state}
                        onChange={handleChange}
                        error={!!errors.state}
                        helperText={errors.state}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        name="country"
                        variant="standard"
                        value={formValues.country}
                        onChange={handleChange}
                        error={!!errors.country}
                        helperText={errors.country}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Zipcode"
                        name="zipcode"
                        variant="standard"
                        value={formValues.zipcode}
                        onChange={handleChange}
                        error={!!errors.zipcode}
                        helperText={errors.zipcode}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="profilePic"
                        label="Profile picture"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "image/*" }}
                        onChange={handleFileChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="cv"
                        label="Candidate CV"
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "application/pdf" }}
                        onChange={handleFileChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="h-[80vh] overflow-y-scroll pr-5">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <FormGroup>
                      <p className="text-lg font-bold text-black mb-5">How were you referred to us?*</p>
                      <div className="grid md:grid-cols-2">
                        {[
                          "Walk-In",
                          "Refererals",
                          "Newspaper Ad",
                          "Facebook",
                          "Twitter",
                          "LinkedIn",
                          "Other",
                        ].map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                value={option}
                                checked={formValues.referredBy.includes(option)}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label={option}
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                color: '#000000',
                              }
                            }}
                          />
                        ))}
                      </div>
                      {errors.referredBy && (
                        <p className="text-red-500 text-sm">
                          {errors.referredBy}
                        </p>
                      )}
                    </FormGroup>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-lg font-bold text-black mb-3">Job role You&apos;re applying for</p>
                    <FormControl variant="standard" fullWidth>
                    <InputLabel>Jobrole</InputLabel>
                      <Select
                        name="jobRole"
                        value={formValues.jobRole}
                        onChange={handleChange}
                        required
                        variant="standard"
                      >
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Designer">Designer</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                      </Select>
                      {errors.jobRole && (
                        <p className="text-red-500 text-sm">{errors.jobRole}</p>
                      )}
                    </FormControl>
                    <p className="text-lg font-bold text-black mt-5 mb-3">Cover Letter</p>
                    <TextField
                      name="coverLetter"
                      multiline
                      variant="standard"
                      value={formValues.coverLetter}
                      onChange={handleChange}
                      error={!!errors.coverLetter}
                      helperText={errors.coverLetter}
                      required
                      fullWidth
                    />
                </div>
              </div>
              <p className="text-lg font-bold text-black mt-10 mb-5">Reference</p>
              <Box display="flex" alignItems="center">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Relationship"
                      name="relationship"
                      variant="standard"
                      value={formValues.relationship}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name"
                      name="referenceName"
                      variant="standard"
                      value={formValues.referenceName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Date of Birth"
                      name="referenceDob"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={formValues.referenceDob}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Job"
                      name="referenceJob"
                      variant="standard"
                      value={formValues.referenceJob}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Address"
                      name="referenceAddress"
                      variant="standard"
                      value={formValues.referenceAddress}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Phone"
                      name="referencePhone"
                      type="tel"
                      variant="standard"
                      value={formValues.referencePhone}
                      onChange={handlePhoneNumberChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col h-[80vh] overflow-y-scroll pr-5 pb-5">
              <div>
                <p className="text-lg font-bold text-black">Work Experience</p>
                {formValues.workDetails.map((work, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <p className="text-lg font-bold text-black mt-5">{`Work Expereince Detail ${index + 1}`}</p>
                      </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="From Date"
                        name="workFromDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                        value={work.workFromDate}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="To Date"
                        name="workToDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                        value={work.workToDate}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Company"
                        name="workCompany"
                        variant="standard"
                        value={work.workCompany}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Position"
                        name="workPosition"
                        variant="standard"
                        value={work.workPosition}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Contact Person"
                        name="workContactPerson"
                        variant="standard"
                        value={work.workContactPerson}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Salary"
                        name="workSalary"
                        variant="standard"
                        value={work.workSalary}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Reason for Leaving Job"
                        name="workReasonLeaving"
                        multiline
                        variant="standard"
                        value={work.workReasonLeaving}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Job Description"
                        name="workJobDescription"
                        multiline
                        variant="standard"
                        value={work.workJobDescription}
                        onChange={(e) => handleWorkChange(e, index)}
                        fullWidth
                      />
                    </Grid>
                  
                  </Grid>
                </Box>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addWorkExperience}
                  style={{ marginTop: "16px" , width: "fit-content" }}
                >
                  Add More Work Experience
                </Button>
              </div>
              <div>
                <p className="text-lg font-bold text-black mt-10">Educational Qualification</p>
                {formValues.educationalDetails.map((detail, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <p className="text-lg font-bold text-black mt-5">{`Educationl Details ${index + 1}`}</p>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="From Date"
                          name="eduFromDate"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                          value={detail.eduFromDate}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="To Date"
                          name="eduToDate"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                          value={detail.eduToDate}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Course"
                          name="eduCourse"
                          variant="standard"
                          value={detail.eduCourse}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Training Place"
                          name="eduTrainingPlace"
                          variant="standard"
                          value={detail.eduTrainingPlace}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Specialized In"
                          name="eduSpecialized"
                          variant="standard"
                          value={detail.eduSpecialized}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Percentage"
                          name="eduPercentage"
                          type="number"
                          variant="standard"
                          value={detail.eduPercentage}
                          onChange={(e) => handleEducationalChange(e, index)}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddEducationalDetail}
                  style={{ marginTop: "16px" , width: "fit-content" }}
                >
                  Add More Ecucational Details
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6 gap-4 absolute bottom-0 left-0 w-full px-10 pb-2 bg-white z-9 ">
            {step > 1 && (
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!isValid}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Applicant;
