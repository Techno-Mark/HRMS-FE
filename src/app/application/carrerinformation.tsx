import React, { useState } from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { TextField, Button, Grid, Box, Snackbar, Alert } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik'; // Import necessary types
import { FormValues } from '@/types/types';

// Define the WorkDetail type to make sure we're using the correct structure
interface WorkDetail {
  workFromDate: string;
  workToDate: string;
  workCompany: string;
  workPosition: string;
  workContactPerson: string;
  workSalary: string;
  workReasonLeaving: string;
  workJobDescription: string;
}

interface EduDetail {
  eduFromDate: string;
  eduToDate: string;
  eduCourse: string;
  eduTrainingPlace: string;
  eduSpecialized: string;
  eduPercentage: string;
}

interface carrerinformationProps {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const today = new Date().toISOString().split('T')[0];
const Carrerinformation: React.FC<carrerinformationProps> = ({ errors, touched }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  return (
    <div>
      {/* Work Details */}
      <FieldArray name="workDetails">
        {({ push, remove, form }) => (
          <Box>
            {form.values.workDetails.map((workDetail: WorkDetail, index: number) => (
              <Box key={index}>
                <p className="text-lg font-bold text-black my-5">
                  {`Work Experience Detail ${index + 1}`}
                </p>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workFromDate`}
                      label="Work From Date"
                      type="date"
                      fullWidth
                      variant="standard"
                      inputProps={{ max: today }}
                      InputLabelProps={{ shrink: true }}
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workFromDate && touched.workDetails?.[index]?.workFromDate)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workFromDate`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workToDate`}
                      label="Work To Date"
                      type="date"
                      fullWidth
                      variant="standard"
                      inputProps={{ max: today }}
                      InputLabelProps={{ shrink: true }}
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workToDate && touched.workDetails?.[index]?.workToDate)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workToDate`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workCompany`}
                      label="Company"
                      fullWidth
                      variant="standard"
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workCompany && touched.workDetails?.[index]?.workCompany)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workCompany`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workPosition`}
                      label="Position"
                      fullWidth
                      variant="standard"
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workPosition && touched.workDetails?.[index]?.workPosition)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workPosition`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workContactPerson`}
                      label="Contact Person"
                      fullWidth
                      variant="standard"
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workContactPerson && touched.workDetails?.[index]?.workContactPerson)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workContactPerson`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workSalary`}
                      label="Salary"
                      fullWidth
                      variant="standard"
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workSalary && touched.workDetails?.[index]?.workSalary)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workSalary`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workReasonLeaving`}
                      label="Reason for Leaving"
                      fullWidth
                      variant="standard"
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workReasonLeaving && touched.workDetails?.[index]?.workReasonLeaving)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workReasonLeaving`} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name={`workDetails[${index}].workJobDescription`}
                      label="Job Description"
                      fullWidth
                      variant="standard"
                      multiline
                      error={!!(errors.workDetails?.[index] && (errors.workDetails[index] as FormikErrors<WorkDetail>).workJobDescription && touched.workDetails?.[index]?.workJobDescription)}
                      helperText={<ErrorMessage name={`workDetails[${index}].workJobDescription`} />}
                    />
                  </Grid>
                </Grid>
                <div className="my-5">
                  <Button
                    variant="contained"
                    onClick={() => remove(index)}
                    disabled={form.values.workDetails.length === 1}
                    className={`my-5`}
                  >
                    Remove Work Experience
                  </Button>
                </div>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const lastWorkDetail = form.values.workDetails[form.values.workDetails.length - 1];
                const isLastEntryFilled = Object.values(lastWorkDetail as WorkDetail).every(
                  (value) => typeof value === 'string' && value.trim() !== ''
                );
                if (isLastEntryFilled) {
                  push({
                    workFromDate: '',
                    workToDate: '',
                    workCompany: '',
                    workPosition: '',
                    workContactPerson: '',
                    workSalary: '',
                    workReasonLeaving: '',
                    workJobDescription: ''
                  });
                } else {
                  setSnackbar({
                    open: true,
                    message: 'Please fill all fields in the current work experience before adding a new one.',
                  });
                }
              }}
            >
              Add Work Experience
            </Button>

          </Box>
        )}
      </FieldArray>

      {/* Educational Details */}
      <FieldArray name="educationalDetails">
        {({ push, remove, form }) => (
          <Box>
            {form.values.educationalDetails.map((educationalDetails: EduDetail, index: number) => (
              <Box key={index}>
                <p className="text-lg font-bold text-black my-5">
                  {`Educational Detail ${index + 1}`}
                </p>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduFromDate`}
                      label="Edu From Date"
                      type="date"
                      fullWidth
                      variant="standard"
                      inputProps={{ max: today }}
                      InputLabelProps={{ shrink: true }}
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduFromDate && touched.educationalDetails?.[index]?.eduFromDate)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduFromDate`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduToDate`}
                      label="Edu To Date"
                      type="date"
                      fullWidth
                      variant="standard"
                      inputProps={{ max: today }}
                      InputLabelProps={{ shrink: true }}
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduToDate && touched.educationalDetails?.[index]?.eduToDate)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduToDate`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduCourse`}
                      label="Course"
                      fullWidth
                      variant="standard"
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduCourse && touched.educationalDetails?.[index]?.eduCourse)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduCourse`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduTrainingPlace`}
                      label="Training Place"
                      fullWidth
                      variant="standard"
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduTrainingPlace && touched.educationalDetails?.[index]?.eduTrainingPlace)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduTrainingPlace`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduSpecialized`}
                      label="Specialization"
                      fullWidth
                      variant="standard"
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduSpecialized && touched.educationalDetails?.[index]?.eduSpecialized)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduSpecialized`} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      name={`educationalDetails[${index}].eduPercentage`}
                      label="Percentage"
                      fullWidth
                      variant="standard"
                      error={!!(errors.educationalDetails?.[index] && (errors.educationalDetails[index] as FormikErrors<EduDetail>).eduPercentage && touched.educationalDetails?.[index]?.eduPercentage)}
                      helperText={<ErrorMessage name={`educationalDetails[${index}].eduPercentage`} />}
                    />
                  </Grid>
                </Grid>
                <div className="my-5">
                  <Button
                    variant="contained"
                    onClick={() => remove(index)}
                    disabled={form.values.educationalDetails.length === 1}
                  >
                    Remove Educational Detail
                  </Button>
                </div>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const lastEduDetail = form.values.educationalDetails[form.values.educationalDetails.length - 1];
                const isLastEntryFilled = Object.values(lastEduDetail as EduDetail).every(
                  (value) => typeof value === 'string' && value.trim() !== ''
                );
                if (isLastEntryFilled) {
                  push({
                    eduFromDate: '',
                    eduToDate: '',
                    eduCourse: '',
                    eduTrainingPlace: '',
                    eduSpecialized: '',
                    eduPercentage: ''
                  });
                } else {
                  setSnackbar({
                    open: true,
                    message: 'Please fill all fields in the current educational detail before adding a new one.',
                  });
                }
              }}
            >
              Add Educational Detail
            </Button>

          </Box>
        )}
      </FieldArray>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: '' })} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Carrerinformation;
