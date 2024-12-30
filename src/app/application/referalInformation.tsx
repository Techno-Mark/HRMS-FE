import React from 'react';
import { Field, useFormikContext, FieldArray, FormikTouched, FormikErrors } from "formik";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { FormValues } from '@/types/types';

interface ReferalInformationProps {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}


const today = new Date().toISOString().split('T')[0];
const ReferalInformation: React.FC<ReferalInformationProps> = ({ errors, touched }) => {
  const { values } = useFormikContext<FormValues>();

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* Referral Information */}
        <div className="w-full md:w-1/2">
          <FormGroup>
            <p className="text-lg font-bold text-black mb-5">How were you referred to us?*</p>
            <FieldArray name="referredBy">
              {({ remove, push }) => (
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
                          checked={values.referredBy.includes(option)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              push(option);
                            } else {
                              const index = values.referredBy.indexOf(option);
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
            {errors.referredBy && touched.referredBy && (
              <p className="text-red-500 text-sm">{errors.referredBy}</p>
            )}
          </FormGroup>
        </div>

        {/* Job Role and Cover Letter */}
        <div className="w-full mt-5 md:mt-0 md:w-1/2">
          <p className="text-lg font-bold text-black mb-3">Job Role You&apos;re Applying For</p>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Job Role</InputLabel>
            <Field
              name="jobRole"
              as={Select}
              error={touched.jobRole && !!errors.jobRole}
            >
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Field>
            {touched.jobRole && errors.jobRole && (
              <p className="text-red-500 text-sm">{errors.jobRole}</p>
            )}
          </FormControl>
          <p className="text-lg font-bold text-black mt-5 mb-3">Cover Letter <span className='text-sm font-medium'>(Up to 500 characters)</span></p>
          <Field
            name="coverLetter"
            as={TextField}
            multiline
            variant="standard"
            error={touched.coverLetter && !!errors.coverLetter}
            helperText={touched.coverLetter && errors.coverLetter}
            fullWidth
          />
        </div>
      </div>

      {/* Reference Information */}
      <p className="text-lg font-bold text-black mt-10 mb-5">Reference</p>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Field
              label="Relationship"
              name="relationship"
              as={TextField}
              variant="standard"
              fullWidth
              error={touched.relationship && !!errors.relationship}
              helperText={touched.relationship && errors.relationship}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              label="Name"
              name="referenceName"
              variant="standard"
              as={TextField}
              fullWidth
              error={touched.referenceName && !!errors.referenceName}
              helperText={touched.referenceName && errors.referenceName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              label="Date of Birth"
              name="referenceDob"
              type="date"
              InputLabelProps={{ shrink: true }}
              as={TextField}
              variant="standard"
              fullWidth
              inputProps={{ max: today }}
              error={touched.referenceDob && !!errors.referenceDob}
              helperText={touched.referenceDob && errors.referenceDob}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              label="Job"
              name="referenceJob"
              as={TextField}
              variant="standard"
              fullWidth
              error={touched.referenceJob && !!errors.referenceJob}
              helperText={touched.referenceJob && errors.referenceJob}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              label="Address"
              name="referenceAddress"
              as={TextField}
              variant="standard"
              fullWidth
              error={touched.referenceAddress && !!errors.referenceAddress}
              helperText={touched.referenceAddress && errors.referenceAddress}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              label="Phone"
              name="referencePhone"
              type="tel"
              as={TextField}
              variant="standard"
              fullWidth
              error={touched.referencePhone && !!errors.referencePhone}
              helperText={touched.referencePhone && errors.referencePhone}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ReferalInformation;
