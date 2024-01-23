import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { DeleteEmployeeDetails } from "../../../action/CANDIDATES/CandidateDeleteAddfield";
import { getSummery } from "../../../action/CANDIDATES/CandidateSummery";

const WorkingExp = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const { userData } = useSelector((state) => state.summery);
    const { loading: empLoading } = useSelector((state) => state.deleteEmp);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getSummery(""));
    }, [empLoading]);

    const [projects, setProjects] = useState(
      allData.projects !== undefined && allData.projects !== null
        ? allData.projects
        : userData?.UserBioDtails?.projects || ""
    );
    const [removedWorkingExperienceFields, setRemovedWorkingExperienceFields] =
      useState(allData.removedWorkingExperienceFields || []);

    const EmplyeeDetails = Array.isArray(userData.WorkHistoryList)
      ? userData.WorkHistoryList.map((item) => {
          const FromYear = item.FromYear
            ? dayjs(item.FromYear, "M/D/YYYY h:mm:ss A")
            : null;
          const ToYear = item.ToYear
            ? dayjs(item.ToYear, "M/D/YYYY h:mm:ss A")
            : null;
          return {
            FromYear,
            ToYear,
            Designation: item.Designation || null,
            CompanyAddress: item.CompanyAddress || null,
            CompanyName: item.CompanyName || null,
            WorkhistoryDetailsId: item.WorkhistoryDetailsId || null,
          };
        })
      : userData.WorkHistoryList
      ? [
          {
            FromYear: userData.WorkHistoryList.FromYear
              ? dayjs(userData.WorkHistoryList.FromYear, "M/D/YYYY h:mm:ss A")
              : null,
            toYear: userData.WorkHistoryList.toYear
              ? dayjs(userData.WorkHistoryList.toYear, "M/D/YYYY h:mm:ss A")
              : null,
            Designation: userData.WorkHistoryList.Designation || null,
            CompanyAddress: userData.WorkHistoryList.CompanyAddress || null,
            CompanyName: userData.WorkHistoryList.CompanyName || null,
            WorkhistoryDetailsId: userData.WorkhistoryDetailsId || null,
          },
        ]
      : [];

    const [workingExperience, setWorkingExperience] = useState(
      allData.workingExperience && allData.workingExperience.length > 0
        ? allData.workingExperience
        : userData.WorkHistoryList && userData.WorkHistoryList.length > 0
        ? EmplyeeDetails
        : []
    );
    const initialFieldValidations = allData.fieldValidations || [];
    const initialValidations = workingExperience.map((experience) => ({
      CompanyName:
        experience.CompanyName && experience.CompanyName.trim().length > 0,
      Designation:
        experience.Designation && experience.Designation.trim().length > 0,
      CompanyAddress:
        experience.CompanyAddress &&
        experience.CompanyAddress.trim().length > 0,
      FromYear: experience.FromYear !== null,
      ToYear: experience.ToYear !== null,
      WorkhistoryDetailsId:
        experience.WorkhistoryDetailsId &&
        experience.WorkhistoryDetailsId.trim().length > 0,
    }));
    const [fieldValidations, setFieldValidations] = useState(
      initialFieldValidations.length > 0
        ? initialFieldValidations
        : initialValidations
    );

    const [fieldCounters, setFieldCounters] = useState(
      workingExperience.map((_, index) => index + 1)
    );
    const validate = () => {
      const isFieldsValid = fieldValidations.every((validation) =>
        Object.values(validation).every((value) => value === true)
      );

      const isFormValid = isFieldsValid;
      onValidationChange(isFormValid);
      return isFormValid;
    };

    const handleAddField = () => {
      setWorkingExperience((prevExperience) => [
        ...prevExperience,
        {
          CompanyName: "",
          Designation: "",
          CompanyAddress: "",
          FromYear: null,
          ToYear: null,
        },
      ]);

      setFieldValidations((prevValidations) => [
        ...prevValidations,
        {
          CompanyName: false,
          Designation: false,
          CompanyAddress: false,
          FromYear: false,
          ToYear: false,
        },
      ]);

      setFieldCounters((prevCounters) => [
        ...prevCounters,
        prevCounters.length + 1,
      ]);
    };
    console.log("removedField", userData.EmplyeeDetails);
    const handleRemoveField = (index) => {
      const employeedetails_id = workingExperience[index].WorkhistoryDetailsId;

      const removedField = { id: employeedetails_id };

      const data = new FormData();
      data.append("Jsonlist", JSON.stringify([{ id: employeedetails_id }]));

      dispatch(DeleteEmployeeDetails(data));
      setRemovedWorkingExperienceFields([
        ...removedWorkingExperienceFields,
        removedField,
      ]);
      const updatedFields = [...workingExperience];
      updatedFields.splice(index, 1);
      setWorkingExperience(updatedFields);

      const updatedValidations = [...fieldValidations];
      updatedValidations.splice(index, 1);
      setFieldValidations(updatedValidations);
    };
    console.log("removedFieldsList", removedWorkingExperienceFields);

    /// handle change in every component /////
    const handleFieldChange = (index, field, value) => {
      const updatedFields = [...workingExperience];

      if (updatedFields[index]) {
        if (field === "FromYear" || field === "ToYear") {
          // Handle date values
          updatedFields[index][field] = value || null;
        } else {
          updatedFields[index][field] = value;
        }

        setWorkingExperience(updatedFields);

        const updatedValidations = [...fieldValidations];

        if (updatedValidations[index]) {
          if (field === "FromYear" || field === "ToYear") {
            updatedValidations[index][field] = value !== null;
          } else {
            updatedValidations[index][field] = value.trim().length > 0;
          }
          setFieldValidations(updatedValidations);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            projects,
            workingExperience,
            fieldValidations,
            removedWorkingExperienceFields,
          };
          saveData(data);
        }
      },
    }));

    const errorColor = "red";

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          4. Employment History (Please start with the present employment)
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          4.1 Employer Details
        </Typography>
        {workingExperience.map((experience, index) => (
          <Grid container spacing={3} key={index} style={{ marginTop: "1px" }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                4.1.{fieldCounters[index]}
              </Typography>
              <TextField
                required
                label="Name of the Employer"
                value={experience?.CompanyName}
                onChange={(e) =>
                  handleFieldChange(index, "CompanyName", e.target.value)
                }
                fullWidth
                autoComplete={`CompanyName-${index}`}
                helperText={
                  !fieldValidations[index]?.CompanyName && (
                    <span style={{ color: errorColor }}>
                      This field is required
                    </span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                label="Designation"
                value={experience.Designation}
                onChange={(e) =>
                  handleFieldChange(index, "Designation", e.target.value)
                }
                fullWidth
                autoComplete={`designation-${index}`}
                helperText={
                  !fieldValidations[index]?.Designation && (
                    <span style={{ color: errorColor }}>
                      This field is required
                    </span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                label="Address of the Employer"
                value={experience.CompanyAddress}
                onChange={(e) =>
                  handleFieldChange(index, "CompanyAddress", e.target.value)
                }
                fullWidth
                autoComplete={`CompanyAddress-${index}`}
                helperText={
                  !fieldValidations[index]?.CompanyAddress && (
                    <span style={{ color: errorColor }}>
                      This field is required
                    </span>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <FormControl fullWidth>
                    <DatePicker
                      label="From (Year)"
                      onChange={(date) =>
                        handleFieldChange(index, "FromYear", date)
                      }
                      value={experience.FromYear}
                      views={["year", "month", "day"]}
                      required
                    />
                    {!fieldValidations[index]?.FromYear && (
                      <Typography
                        variant="body2"
                        color="error"
                        component="span"
                        style={{ color: errorColor, fontSize: "0.75rem" }}
                      >
                        This field is required
                      </Typography>
                    )}
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "DatePicker", "DatePicker"]}
                >
                  <FormControl fullWidth>
                    <DatePicker
                      label="To (Year)"
                      onChange={(date) =>
                        handleFieldChange(index, "ToYear", date)
                      }
                      value={experience.ToYear}
                      views={["year", "month", "day"]}
                      required
                    />
                    {!fieldValidations[index]?.ToYear && (
                      <Typography
                        variant="body2"
                        color="error"
                        component="span"
                        style={{ color: errorColor, fontSize: "0.75rem" }}
                      >
                        This field is required
                      </Typography>
                    )}
                  </FormControl>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => handleRemoveField(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginBottom: "10px",
                }}
                startIcon={<DeleteIcon />}
              >
                Remove Field
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddField}
            style={{ marginTop: "1px", width: "165px" }}
            startIcon={<AddIcon />}
          >
            Add Field
          </Button>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "40px" }}>
          4.2 Projects
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="projects"
              name="projects"
              label="Significant Projects Involved."
              multiline
              rows={2}
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
              fullWidth
              autoComplete="projects"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);

export default WorkingExp;
