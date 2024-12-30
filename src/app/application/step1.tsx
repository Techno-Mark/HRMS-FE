import React from 'react';
import { Field, FormikErrors, FormikProps, FormikTouched, useFormikContext } from 'formik';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box } from '@mui/material';
import { countryStateCityData } from '@/static/locationdata';


interface Step1Props {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

interface FormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  birthPlace: string;
  maritalStatus: string;
  currentSalary: number;
  expectedSalary: number;
  skillName: string;
  interests: string;
  email: string;
  phone: string;
  skype: string;
  linkedIn: string;
  housenumber: string;
  building: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  profilePic: File | null;
  cv: File | null;
}

const Step1: React.FC<Step1Props> = ({ errors, touched }) => {
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
      <InputLabel>{label}</InputLabel>
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
      <div className="w-full md:w-1/2 pr-4">
        <p className="text-lg font-bold text-black mb-5">General Information</p>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {renderTextField('firstName', 'First Name')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('lastName', 'Last Name')}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="dateOfBirth"
                as={TextField}
                label="Date of Birth"
                type="date"
                variant="standard"
                fullWidth
                error={!!touched['dateOfBirth'] && !!errors['dateOfBirth']}
                helperText={touched['dateOfBirth'] && errors['dateOfBirth']}
                inputProps={{
                  max: today, // Prevent selecting today's date and future dates
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderSelectField('gender', 'Gender', ['Male', 'Female', 'Other'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('birthPlace', 'Birth Place')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderSelectField('maritalStatus', 'Marital Status', ['Single', 'Married'])}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('currentSalary', 'Current Salary (in lpa)', 'number')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('expectedSalary', 'Expected Salary (in lpa)', 'number')}
            </Grid>
            <Grid item xs={12}>
              {renderSelectField('skillName', 'Skill Name', ['Frontend', 'Backend'])}
            </Grid>
            <Grid item xs={12}>
              {renderTextField('interests', 'Interests')}
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className="w-full md:w-1/2 pr-4">
        <p className="text-lg font-bold text-black mb-5">Contact Information</p>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {renderTextField('email', 'Email', 'email')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('phone', 'Phone', 'tel')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('skype', 'Skype')}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderTextField('linkedIn', 'LinkedIn')}
            </Grid>
            <Grid item xs={12}>
              <p className="text-lg font-bold text-black mt-10 mb-5">Permanent Address</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={values.country || ''}
                  onChange={(event) => {
                    setFieldValue('country', event.target.value);
                    setFieldValue('state', ''); // Reset state when country changes
                    setFieldValue('city', '');  // Reset city when country changes
                  }}
                  error={!!touched.country && !!errors.country}
                >
                  {Object.keys(countryStateCityData).map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth >
                <InputLabel>State</InputLabel>
                <Select
                  value={values.state || ''}
                  onChange={(event) => {
                    setFieldValue('state', event.target.value);
                    setFieldValue('city', ''); // Reset city when state changes
                  }}
                  error={!!touched.state && !!errors.state}
                >
                  {values.country &&
                    Object.keys(countryStateCityData[values.country]).map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" fullWidth >
                <InputLabel>City</InputLabel>
                <Select
                  value={values.city || ''}
                  onChange={(event) => setFieldValue('city', event.target.value)}
                  error={!!touched.city && !!errors.city}
                >
                  {values.state &&
                    countryStateCityData[values.country][values.state].map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {[
              { name: 'housenumber', label: 'House Number' },
              { name: 'building', label: 'Building Name' },
              { name: 'street', label: 'Street Name' },
              { name: 'area', label: 'Area' },
              { name: 'zipcode', label: 'Zipcode' },
            ].map(({ name, label }) => (
              <Grid key={name} item xs={12} sm={6}>
                {renderTextField(name as keyof FormValues, label)}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Field name="profilePic">
                {({ form }: { form: FormikProps<FormValues> }) => (
                  <TextField
                    label="Profile Picture"
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ accept: 'image/*' }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      form.setFieldValue('profilePic', file);
                    }}
                    fullWidth
                    error={!!touched.profilePic && !!errors.profilePic}
                    helperText={touched.profilePic && errors.profilePic}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="cv">
                {({ form }: { form: FormikProps<FormValues> }) => (
                  <TextField
                    label="Candidate CV"
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ accept: 'application/pdf' }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      form.setFieldValue('cv', file);
                    }}
                    fullWidth
                    error={!!touched.cv && !!errors.cv}
                    helperText={touched.cv && errors.cv}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Step1;
