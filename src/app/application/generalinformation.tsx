import React from 'react';
import { Field, FieldArray, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box, Checkbox, FormControlLabel, FormGroup, RadioGroup, Radio } from '@mui/material';

interface GeneralinformationProps {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const referenceOptions = ["LinkedIn", "Friend", "Job Portal", "Other"];

export type FormValues = {
  fullName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  education: string;
  experience: string;
  pastExperience: string[];
  organization: string;
  currentCtc: string;
  notice: string;
  skills: string[]
  position: string;
  reference: string;
  otherReference: string;
  referredBy: string;
  otherSkill: string;
};

const Generalinformation: React.FC<GeneralinformationProps> = ({ errors, touched }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format

  // Helper function to render a text field
  const renderTextField = (
    name: keyof FormValues,
    label: string,
    type: string = 'text',
  ) => (
    <Field
      name={name}
      as={TextField}
      label={label}
      type={type}
      variant="standard"
      fullWidth
      error={!!touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );

  // Helper function to render a select field
  const renderSelectField = (name: keyof FormValues, label: string, options: string[]) => (
    <FormControl variant="standard" fullWidth>
      <InputLabel sx={{ color: !!touched[name] && !!errors[name] ? 'error.main' : 'text.primary', }}>
        {label}
      </InputLabel>
      <Field as={Select} name={name} error={!!touched[name] && !!errors[name]}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Field>
      {touched[name] && errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </FormControl>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full pr-4">
        <p className="text-lg font-bold text-black mb-5">General Information</p>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={8}>
              {renderTextField('fullName', 'Full Name*')}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name="dateOfBirth"
                as={TextField}
                label="Date of Birth*"
                type="date"
                variant="standard"
                fullWidth
                error={!!touched['dateOfBirth'] && !!errors['dateOfBirth']}
                helperText={touched['dateOfBirth'] && errors['dateOfBirth']}
                inputProps={{
                  max: today,
                }}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: !!touched['dateOfBirth'] && !!errors['dateOfBirth'] ? 'error.main' : 'text.primary', // Error color for label
                  },
                }}
                InputProps={{
                  sx: {
                    color: !!touched['dateOfBirth'] && !!errors['dateOfBirth'] ? 'error.main' : 'text.primary', // Error color for input text
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              {renderTextField('address', 'Address*')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderSelectField('city', 'City*', ['Ahmedabad', 'Mumbai', 'Hyderabad'])}
            </Grid>
            <Grid item xs={12} sm={3}>
              {renderTextField('phone', 'Phone*', 'tel')}
            </Grid>
            <Grid item xs={12} sm={3}>
              {renderTextField('email', 'Email*', 'email')}
            </Grid>
            <Grid item xs={12} sm={3}>
              {renderTextField('education', 'Education*')}
            </Grid>
            <Grid item xs={12} sm={3}>
              {renderTextField('experience', 'Experience*')}
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <p className="text-lg font-bold text-black mb-5">Past Experience*</p>
                <FieldArray name="pastExperience">
                  {({ remove, push }) => (
                    <div className="grid md:grid-cols-3">
                      {[
                        "International Accounting",
                        "Indian Accounting",
                        "Fresher",
                      ].map((option) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              checked={values.pastExperience.includes(option)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  push(option);
                                } else {
                                  const index = values.pastExperience.indexOf(option);
                                  remove(index);
                                }
                              }}
                            />
                          }
                          label={option}
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              color: '#000000',
                            },
                          }}
                        />
                      ))}
                    </div>
                  )}
                </FieldArray>
                {errors.pastExperience && touched.pastExperience && (
                  <p className="text-red-500 text-sm">{errors.pastExperience}</p>
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderTextField('organization', 'Organization*')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderTextField('currentCtc', 'Current/Last CTC (Monthly salary)*', 'number')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderTextField('notice', 'Notice period(In days)*', 'number')}
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <p className="text-lg font-bold text-black mb-5">skills*</p>
                <FieldArray name="skills">
                  {({ remove, push }) => (
                    <div className="grid md:grid-cols-3">
                      {[
                        "MS Excel",
                        "QuickBooks",
                        "SAP Finance",
                        "Xero",
                        "Tally ERP",
                        "Other"
                      ].map((option) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              checked={values.skills.includes(option)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  push(option);
                                } else {
                                  const index = values.skills.indexOf(option);
                                  remove(index);
                                }
                              }}
                            />
                          }
                          label={option}
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              color: '#000000',
                            },
                          }}
                        />
                      ))}
                      {values.skills.includes("Other") && (
                        <div className="mt-3">
                          <TextField
                            name="otherSkill"
                            label="Please specify"
                            variant="standard"
                            fullWidth
                            value={values.otherSkill}
                            onChange={(e) => setFieldValue("otherSkill", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </FieldArray>
                {errors.skills && touched.skills && (
                  <p className="text-red-500 text-sm">{errors.skills}</p>
                )}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderSelectField('position', 'Position*', ['Staff accountant', 'Senior accountant', 'Team Leader'])}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <p className="text-lg font-bold text-black mb-5">Source of information about Walk-In*</p>
                <RadioGroup
                  name="reference"
                  value={values.reference}
                  onChange={(e) => setFieldValue("reference", e.target.value)}
                  
                >
                  <div className="grid md:grid-cols-3">
                    {referenceOptions.map((ref) => (
                      <FormControlLabel
                        key={ref}
                        value={ref}
                        control={<Radio />}
                        label={ref}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: '#000000',
                          },
                        }}
                      />
                    ))}
                  </div>
                </RadioGroup>
                {values.reference === "Other" && (
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Please specify"
                    value={values.otherReference}
                    onChange={(e) => setFieldValue("otherReference", e.target.value)}
                    sx={{ mt: 2 }}
                  />
                )}
                {errors.reference && touched.reference && (
                  <p className="text-red-500 text-sm">{errors.reference}</p>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderTextField('referredBy', 'referredBy*')}
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Generalinformation;
