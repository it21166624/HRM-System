import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteHigherEducationDetails,
  DeleteProfessionalDetails,
} from "../../../action/CANDIDATES/CandidateDeleteAddfield";
import { getSummery } from "../../../action/CANDIDATES/CandidateSummery";

const EducationalInfo = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const { loading: hedLoading } = useSelector((state) => state.deleteHedu);
    const { loading: ProLoading } = useSelector((state) => state.deleteProfe);
    const { userData } = useSelector((state) => state.summery);
    const dispatch = useDispatch();
    const skl = [
      { skill: "Very Good", value: 0 },
      { skill: "Good", value: 1 },
      { skill: "Fair", value: 2 },
    ];
    const qul = [
      { qualification: "Degree", value: 0 },
      { qualification: "Diploma", value: 1 },
      { qualification: "Certificate", value: 2 },
    ];
    const mbr = [
      { membership: "None", value: 0 },
      { membership: "IEEE", value: 1 },
      { membership: "Test", value: 2 },
      { membership: "Test2", value: 3 },
    ];

    useEffect(() => {
      dispatch(getSummery(""));
    }, [hedLoading, ProLoading]);

    const [removedHigherEducationalFields, setRemovedHigherEducationalFields] =
      useState(allData.removedHigherEducationalFields || []);
    const [removedProfessionalFields, setRemovedProfessionalFields] = useState(
      allData.removedHigherEducationalFields || []
    );

    var userMembershipValue = parseInt(userData?.UserBioDtails?.membership);
    var userData_membership = mbr.find(function (obj) {
      return obj.value === userMembershipValue;
    });

    var userSinhala_levelValue = parseInt(
      userData?.UserBioDtails?.sinhala_level
    );
    var userData_sinhala_level = skl.find(function (obj) {
      return obj.value === userSinhala_levelValue;
    });
    var userTamil_levelValue = parseInt(userData?.UserBioDtails?.tamil_level);
    var userData_tamil_level = skl.find(function (obj) {
      return obj.value === userTamil_levelValue;
    });
    var userEnglish_levelValue = parseInt(
      userData?.UserBioDtails?.english_level
    );
    var userData_english_level = skl.find(function (obj) {
      return obj.value === userEnglish_levelValue;
    });

    //edu field display
    const HigherEducationaldetails = Array.isArray(
      userData.HigherEducationaldetails
    )
      ? userData.HigherEducationaldetails.map((item) => {
          const fromYear = item.from_year
            ? dayjs(item.from_year, "M/D/YYYY h:mm:ss A")
            : null;
          const toYear = item.to_year
            ? dayjs(item.to_year, "M/D/YYYY h:mm:ss A")
            : null;

          // Find the corresponding qualification value from the `qul` array
          const qualificationValue =
            qul.find((q) => q.qualification === item.degree)?.value || null;

          return {
            fromYear,
            institution: item.institution || null,
            marks: item.grade || null,
            qualifications: {
              qualification: item.degree || null,
              value: qualificationValue,
            },
            studyArea: item.area || null,
            toYear,
            HigherEducational_id: item.higher_educational_id || null,
          };
        })
      : userData.HigherEducationaldetails
      ? [
          {
            fromYear: userData.HigherEducationaldetails.from_year
              ? dayjs(
                  userData.HigherEducationaldetails.from_year,
                  "M/D/YYYY h:mm:ss A"
                )
              : null,
            institution: userData.HigherEducationaldetails.institution || null,
            marks: userData.HigherEducationaldetails.grade || null,
            HigherEducational_id: userData.higher_educational_id || null,

            // Find the corresponding qualification value from the `qul` array
            qualifications: {
              qualification: userData.HigherEducationaldetails.degree || null,
              value:
                qul.find(
                  (q) =>
                    q.qualification === userData.HigherEducationaldetails.degree
                )?.value || null,
            },

            studyArea: userData.HigherEducationaldetails.area || null,
            toYear: userData.HigherEducationaldetails.to_year
              ? dayjs(
                  userData.HigherEducationaldetails.to_year,
                  "M/D/YYYY h:mm:ss A"
                )
              : null,
          },
        ]
      : [];

    const ProfessionalDetails = Array.isArray(userData.ProfessionalDetails)
      ? userData.ProfessionalDetails.map((item) => {
          const completedYear = item.completed_year
            ? dayjs(item.completed_year, "M/D/YYYY h:mm:ss A")
            : null;

          return {
            completedYear,
            category: item.category || null,
            level: item.level || null,
            nvqLevel: item.nvq || null,
            qualificationName: item.qualification_name || null,
            Professional_id: item.prof_qualification_id || null,
          };
        })
      : userData.ProfessionalDetails
      ? [
          {
            completedYear: userData.ProfessionalDetails.completed_year
              ? dayjs(
                  userData.ProfessionalDetails.completed_year,
                  "M/D/YYYY h:mm:ss A"
                )
              : null,
            category: userData.ProfessionalDetails.category || null,
            level: userData.ProfessionalDetails.level || null,
            nvqLevel: userData.ProfessionalDetails.nvq || null,
            qualificationName:
              userData.ProfessionalDetails.qualification_name || null,
            Professional_id: userData.prof_qualification_id || null,
          },
        ]
      : [];

    const [ol_year, setOL_year] = useState(
      allData.ol_year || userData?.UserBioDtails?.ol_year || ""
    );
    const [ol_school, setOL_school] = useState(
      allData.ol_school || userData?.UserBioDtails?.ol_school || ""
    );
    const [ol_index, setOL_index] = useState(
      allData.ol_index || userData?.UserBioDtails?.ol_index || ""
    );
    const [al_year, setAL_year] = useState(
      allData.al_year || userData?.UserBioDtails?.al_year || ""
    );
    const [al_school, setAL_school] = useState(
      allData.al_school || userData?.UserBioDtails?.al_school || ""
    );
    const [al_index, setAL_index] = useState(
      allData.al_index || userData?.UserBioDtails?.al_index || ""
    );

    const [olbest_results, setOLbest_Results] = useState(
      allData.olbest_results || userData?.UserBioDtails?.ol_result || ""
    );
    const [albest_results, setALbest_Results] = useState(
      allData.albest_results || userData?.UserBioDtails?.al_result || ""
    );
    const [computer_literacy, setComputer_Literacy] = useState(
      allData.computer_literacy ||
        userData?.UserBioDtails?.computer_literacy ||
        ""
    );
    const [training_programmes, setTraining_programmes] = useState(
      allData.training_programmes ||
        userData?.UserBioDtails?.training_programmes ||
        ""
    );
    const [membership, setMembership] = React.useState(
      allData.membership  || userData_membership || null
    );
    const [activities, setActivities] = useState(
      allData.activities || userData?.UserBioDtails?.activities || ""
    );
    // const [other, setOther] = useState(
    //   allData.other || userData?.UserBioDtails?.other_information || ""
    // );
    const [extracurricular_activities, setExtracurricular_activities] =
      useState(
        allData.extracurricular_activities !== undefined &&
          allData.extracurricular_activities !== null
          ? allData.extracurricular_activities
          : userData?.UserBioDtails?.extracurricular_activities || ""
      );
    const [skillsinhala, setSkillsinhala] = React.useState(
      allData.skillsinhala  || userData_sinhala_level || null
    );
    const [skilltamil, setSkilltamil] = React.useState(
      allData.skilltamil  || userData_tamil_level || null
    );
    const [skillenglish, setSkillenglish] = React.useState(
      allData.skillenglish  || userData_english_level || null
    );
    const [sports, setSports] = useState(
      allData.sports || userData?.UserBioDtails?.sports || ""
    );
    const [additionalFields, setAdditionalFields] = useState(
      allData.additionalFields && allData.additionalFields.length > 0
        ? allData.additionalFields
        : userData.HigherEducationaldetails &&
          userData.HigherEducationaldetails.length > 0
        ? HigherEducationaldetails
        : []
    );
    const [professionalFields, setProfessionalFields] = useState(
      allData.professionalFields && allData.professionalFields.length > 0
        ? allData.professionalFields
        : userData.ProfessionalDetails &&
          userData.ProfessionalDetails.length > 0
        ? ProfessionalDetails
        : []
    );
    const [fieldCounters, setFieldCounters] = useState(
      additionalFields.map((_, index) => index + 1)
    );
    const [fieldProfessionalCounters, setFieldProfessionalCounters] = useState(
      professionalFields.map((_, index) => index + 1)
    );
    const initialAdditionalFieldsErrors = additionalFields.map(() => ({
      fromYearError: false,
      toYearError: false,
      institutionError: false,
      qualificationsError: false,
      degreeError: false,
      marksError: false,
      studyAreaError: false,
    }));

    const [additionalFieldsErrors, setAdditionalFieldsErrors] = useState(
      initialAdditionalFieldsErrors
    );

    const initialProfessionalFieldsErrors = professionalFields.map(() => ({
      categoryError: false,
      levelError: false,
      nvqLevelError: false,
      qualificationNameError: false,
      completedYearError: false,
    }));
    const [professionalFieldsErrors, setProfessionalFieldsErrors] = useState(
      initialProfessionalFieldsErrors
    );

    const [olYearError, setOlYearError] = useState(false);
    const [olSchoolError, setOlSchoolError] = useState(false);
    const [olYearNumberError, setOlYearNumberError] = useState(false);
    const [alYearError, setAlYearError] = useState(false);
    const [alSchoolError, setAlSchoolError] = useState(false);
    const [alYearNumberError, setAlYearNumberError] = useState(false);
    const [skillErrorsinhala, setSkillErrorsinhala] = useState(false);
    const [skillErrortamil, setSkillErrortamil] = useState(false);
    const [skillErrorenglish, setSkillErrorenglish] = useState(false);
    const [membershipError, setMembershipError] = useState(false);
    const [olresultsError, setOLresultsError] = useState(false);
    const [alresultsError, setALresultsError] = useState(false);

    const handleAddField = () => {
      setAdditionalFields([
        ...additionalFields,
        {
          fromYear: null,
          toYear: null,
          institution: "",
          qualifications: null,
          marks: "",
          studyArea: "",
        },
      ]);

      setAdditionalFieldsErrors([
        ...additionalFieldsErrors,
        {
          fromYearError: false,
          toYearError: false,
          institutionError: false,
          qualificationsError: false,
          degreeError: false,
          marksError: false,
          studyAreaError: false,
        },
      ]);
      setFieldCounters((prevCounters) => [
        ...prevCounters,
        prevCounters.length + 1,
      ]);
    };

    const handleAddProfessionalField = () => {
      setProfessionalFields([
        ...professionalFields,
        {
          category: "",
          level: "",
          nvqLevel: "",
          qualificationName: "",
          completedYear: null,
        },
      ]);
      setProfessionalFieldsErrors([
        ...professionalFieldsErrors,
        {
          categoryError: false,
          levelError: false,
          nvqLevelError: false,
          qualificationNameError: false,
          completedYearError: false,
        },
      ]);
      setFieldProfessionalCounters((prevCounters) => [
        ...prevCounters,
        prevCounters.length + 1,
      ]);
    };
    const handleRemoveField = (index) => {
      const HigherEducational_id = additionalFields[index].HigherEducational_id;

      const removedField = { id: HigherEducational_id };
      // const data = [{ id: HigherEducational_id }];

      const data = new FormData();
      data.append("Jsonlist", JSON.stringify([{ id: HigherEducational_id }]));

      dispatch(DeleteHigherEducationDetails(data));
      setRemovedHigherEducationalFields([
        ...removedHigherEducationalFields,
        removedField,
      ]);

      const updatedFields = [...additionalFields];
      updatedFields.splice(index, 1);
      setAdditionalFields(updatedFields);

      const updatedErrors = [...additionalFieldsErrors];
      updatedErrors.splice(index, 1);
      setAdditionalFieldsErrors(updatedErrors);
    };
    const handleAdditionalFieldChange = (index, field, value) => {
      const updatedFields = [...additionalFields];
      updatedFields[index][field] = value;

      // Perform date validation
      if (field === "fromYear" || field === "toYear") {
        const fromYear = updatedFields[index].fromYear;
        const toYear = updatedFields[index].toYear;

        if (fromYear && toYear && fromYear > toYear) {
          setAdditionalFieldsErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index].fromYearError = true;
            newErrors[index].toYearError = true;
            return newErrors;
          });
        } else {
          setAdditionalFieldsErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index].fromYearError = false;
            newErrors[index].toYearError = false;
            return newErrors;
          });
        }
      }

      setAdditionalFields(updatedFields);

      if (field === "qualifications") {
        const updatedErrors = [...additionalFieldsErrors];
        updatedErrors[index].qualificationsError = value === null;
        setAdditionalFieldsErrors(updatedErrors);
      }
    };

    const handleRemoveProfessionalField = (index) => {
      const Professional_id = professionalFields[index].Professional_id;

      const removedField = { id: Professional_id };

      const data = new FormData();
      data.append("Jsonlist", JSON.stringify([{ id: Professional_id }]));

      dispatch(DeleteProfessionalDetails(data));

      setRemovedProfessionalFields([
        ...removedProfessionalFields,
        removedField,
      ]);

      const updatedFields = [...professionalFields];
      updatedFields.splice(index, 1);
      setProfessionalFields(updatedFields);

      const updatedErrors = [...professionalFieldsErrors];
      updatedErrors.splice(index, 1);
      setProfessionalFieldsErrors(updatedErrors);
    };
    const handleProfessionalFieldChange = (index, field, value) => {
      const updatedFields = [...professionalFields];
      updatedFields[index][field] = value;

      if (field === "completedYear") {
        const completedYear = updatedFields[index].completedYear;

        if (completedYear) {
          setProfessionalFieldsErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index].completedYearError = true;
            return newErrors;
          });
        } else {
          setProfessionalFieldsErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[index].completedYearError = false;
            return newErrors;
          });
        }
      }
      setProfessionalFields(updatedFields);
    };

    const SkillProps = {
      options: skl,
      getOptionLabel: (option) => option.skill,
      getOptionValue: (option) => option.value,
    };

    const QulProps = {
      options: qul,
      getOptionLabel: (option) => option.qualification,
      getOptionValue: (option) => option.value,
    };

    const MemberProps = {
      options: mbr,
      getOptionLabel: (option) => option.membership,
      getOptionValue: (option) => option.value,
    };

    const validate = React.useCallback(() => {
      let isValid =
        ol_year.length === 4 &&
        /^\d{4}$/.test(ol_year) &&
        ol_school.length > 0 &&
        olbest_results.length > 0 &&
        al_year.length === 4 &&
        /^\d{4}$/.test(al_year) &&
        al_school.length > 0 &&
        albest_results.length > 0 &&
        membership !== null &&
        skillsinhala !== null &&
        skilltamil !== null &&
        skillenglish !== null;

      setOlYearError(ol_year.length === 0);
      setOlYearNumberError(!/^\d{4}$/.test(ol_year));
      setOlSchoolError(ol_school.length === 0);
      setAlYearError(al_year.length === 0);
      setAlYearNumberError(!/^\d{4}$/.test(al_year));
      setAlSchoolError(al_school.length === 0);
      setSkillErrorsinhala(!skillsinhala || skillsinhala.length === 0);
      setSkillErrortamil(!skilltamil || skilltamil.length === 0);
      setSkillErrorenglish(!skillenglish || skillenglish.length === 0);
      setMembershipError(!membership || membership.length === 0);
      setOLresultsError(olbest_results.length === 0);
      setALresultsError(albest_results.length === 0);

      additionalFields.forEach((field, index) => {
        const hasError =
          field.fromYear === null ||
          field.toYear === null ||
          field.qualifications === null ||
          field.institution?.trim().length === 0 ||
          field.marks?.trim().length === 0 ||
          field.studyArea?.trim().length === 0;

        const updatedErrors = [...additionalFieldsErrors];
        updatedErrors[index] = {
          fromYearError: field.fromYear === null,
          toYearError: field.toYear === null,
          qualificationsError: field.qualifications === null,
          institutionError: field.institution?.trim().length === 0,
          marksError: field.marks?.trim().length === 0,
          studyAreaError: field.studyArea?.trim().length === 0,
        };
        setAdditionalFieldsErrors(updatedErrors);
        isValid = isValid && !hasError;
      });

      professionalFields.forEach((field, index) => {
        const hasError =
          field.completedYear === null ||
          field.category?.trim().length === 0 ||
          field.level?.trim().length === 0 ||
          field.nvqLevel?.trim().length === 0 ||
          field.qualificationName?.trim().length === 0;

        const updatedErrors = [...professionalFieldsErrors];
        updatedErrors[index] = {
          completedYearError: field.completedYear === null,
          categoryError: field.category?.trim().length === 0,
          levelError: field.level?.trim().length === 0,
          nvqLevelError: field.nvqLevel?.trim().length === 0,
          qualificationNameError: field.qualificationName?.trim().length === 0,
        };
        setProfessionalFieldsErrors(updatedErrors);
        isValid = isValid && !hasError;
      });

      return isValid;
    });

    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
    }, [
      ol_year,
      ol_school,
      ol_index,
      al_year,
      al_school,
      al_index,
      computer_literacy,
      training_programmes,
      membership,
      additionalFields,
      professionalFields,
      activities,
      extracurricular_activities,
      skillsinhala,
      skilltamil,
      skillenglish,
      sports,
      olbest_results,
      albest_results,
      onValidationChange,
      validate,
    ]);

    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            ol_year,
            ol_school,
            ol_index,
            al_year,
            al_school,
            al_index,
            computer_literacy,
            training_programmes,
            membership,
            additionalFields,
            professionalFields,
            activities,
            extracurricular_activities,
            skillsinhala,
            skilltamil,
            skillenglish,
            sports,
            olbest_results,
            albest_results,
            removedHigherEducationalFields,
            removedProfessionalFields,
          };

          saveData(data);
        }
      },
    }));

    const errorColor = "red";

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
          3. Educational Qualifications
        </Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.1 GCE O/L
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} md={3}>
            <TextField
              required
              id="ol_year"
              label="Year"
              value={ol_year}
              onChange={(e) => setOL_year(e.target.value)}
              fullWidth
              autoComplete="ol_year"
              inputProps={{
                maxLength: 4,
              }}
              helperText={
                (olYearError || olYearNumberError) && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Year must be a 4-digit number, Ex: 2023
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              required
              id="ol_school"
              label="School Attended"
              value={ol_school}
              onChange={(e) => setOL_school(e.target.value)}
              fullWidth
              autoComplete="ol_school"
              helperText={
                olSchoolError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="ol_index"
              label="Index No"
              value={ol_index}
              onChange={(e) => setOL_index(e.target.value)}
              fullWidth
              autoComplete="ol_index"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              id="olbest_results"
              label="O/L Best Results"
              value={olbest_results}
              onChange={(e) => setOLbest_Results(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="olbest_results"
              helperText={
                olresultsError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.2 GCE A/L
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} md={3}>
            <TextField
              required
              id="al_year"
              label="Year"
              value={al_year}
              onChange={(e) => setAL_year(e.target.value)}
              fullWidth
              autoComplete="al_year"
              inputProps={{
                maxLength: 4,
              }}
              helperText={
                (alYearError || alYearNumberError) && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    Year must be a 4-digit number, Ex: 2023
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              required
              id="al_school"
              label="School Attended"
              value={al_school}
              onChange={(e) => setAL_school(e.target.value)}
              fullWidth
              autoComplete="al_school"
              helperText={
                alSchoolError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              //required
              id="al_index"
              label="Index No"
              value={al_index}
              onChange={(e) => setAL_index(e.target.value)}
              fullWidth
              autoComplete="al_index"
              // helperText={
              //   alIndexError && (
              //     <Typography
              //       variant="body2"
              //       color="error"
              //       component="span"
              //       style={{ color: errorColor, fontSize: "0.75rem" }}
              //     >
              //       This field is required
              //     </Typography>
              //   )
              // }
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              id="albest_results"
              label="A/L Best Results"
              value={albest_results}
              onChange={(e) => setALbest_Results(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="albest_results"
              helperText={
                alresultsError && (
                  <Typography
                    variant="body2"
                    color="error"
                    component="span"
                    style={{ color: errorColor, fontSize: "0.75rem" }}
                  >
                    This field is required
                  </Typography>
                )
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.3 Higher Educational Qualifications
        </Typography>
        {additionalFields.map((field, index) => (
          <Grid container spacing={3} key={index} style={{ marginTop: "1px" }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                3.3.{fieldCounters[index]}
              </Typography>
              <TextField
                required
                label="Name of Institution"
                value={field.institution}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "institution",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`institution-${index}`}
                helperText={
                  additionalFieldsErrors[index].institutionError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
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
                        handleAdditionalFieldChange(index, "fromYear", date)
                      }
                      value={field.fromYear}
                      views={["year", "month", "day"]}
                      required
                    />
                    {additionalFieldsErrors[index].fromYearError && (
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
                      // onChange={handleAdditionalFieldChange}
                      onChange={(date) =>
                        handleAdditionalFieldChange(index, "toYear", date)
                      }
                      value={field.toYear}
                      views={["year", "month", "day"]}
                      required
                    />
                    {additionalFieldsErrors[index].toYearError && (
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
            <Grid item xs={12} sm={5}>
              <Autocomplete
                {...QulProps}
                value={field.qualifications}
                onChange={(event, newValue) =>
                  handleAdditionalFieldChange(index, "qualifications", newValue)
                }
                renderInput={(params) => (
                  <>
                    <TextField {...params} label="Qualifications" required />
                    {additionalFieldsErrors[index].qualificationsError && (
                      <Typography
                        variant="body2"
                        color="error"
                        component="span"
                        style={{ color: errorColor, fontSize: "0.75rem" }}
                      >
                        This field is required
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                required
                label="Grade / Marks"
                value={field.marks}
                onChange={(e) =>
                  handleAdditionalFieldChange(index, "marks", e.target.value)
                }
                fullWidth
                autoComplete={`marks-${index}`}
                helperText={
                  additionalFieldsErrors[index].marksError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                label="Area of Study"
                value={field.studyArea}
                onChange={(e) =>
                  handleAdditionalFieldChange(
                    index,
                    "studyArea",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`studyArea-${index}`}
                helperText={
                  additionalFieldsErrors[index].studyAreaError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
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

        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.4 Professional Qualification
        </Typography>
        {professionalFields.map((field, index) => (
          <Grid container spacing={3} key={index} style={{ marginTop: "1px" }}>
            {/* Qualification Name */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                3.4.{fieldProfessionalCounters[index]}
              </Typography>
              <TextField
                required
                label="Qualification Name"
                value={field.qualificationName}
                onChange={(e) =>
                  handleProfessionalFieldChange(
                    index,
                    "qualificationName",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`qualificationName-${index}`}
                helperText={
                  professionalFieldsErrors[index].qualificationNameError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Category */}
              <TextField
                required
                label="Category"
                value={field.category}
                onChange={(e) =>
                  handleProfessionalFieldChange(
                    index,
                    "category",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`category-${index}`}
                helperText={
                  professionalFieldsErrors[index].categoryError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            {/* Level of Qualification */}
            <Grid item xs={12} sm={8}>
              <TextField
                required
                label="Level of Qualification"
                value={field.level}
                onChange={(e) =>
                  handleProfessionalFieldChange(index, "level", e.target.value)
                }
                fullWidth
                autoComplete={`level-${index}`}
                helperText={
                  professionalFieldsErrors[index].levelError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            {/* NVQ Level */}
            <Grid item xs={12} sm={6} style={{ marginTop: "5px" }}>
              <TextField
                required
                label="NVQ Level"
                value={field.nvqLevel}
                onChange={(e) =>
                  handleProfessionalFieldChange(
                    index,
                    "nvqLevel",
                    e.target.value
                  )
                }
                fullWidth
                autoComplete={`nvqLevel-${index}`}
                helperText={
                  professionalFieldsErrors[index].nvqLevelError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Completed Year (Date Time) */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <FormControl fullWidth>
                    <DatePicker
                      label="Completed Year"
                      onChange={(date) =>
                        handleProfessionalFieldChange(
                          index,
                          "completedYear",
                          date
                        )
                      }
                      value={field.completedYear}
                      views={["year", "month", "day"]}
                      required
                    />
                    {professionalFieldsErrors[index].completedYearError && (
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
                onClick={() => handleRemoveProfessionalField(index)}
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
            onClick={handleAddProfessionalField}
            style={{ marginTop: "1px", width: "165px" }}
            startIcon={<AddIcon />}
          >
            Add Field
          </Button>
        </Grid>
        {/* <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="technical_skills"
              label="Professional Qualification"
              value={technical_skills}
              onChange={(e) => setTechnical_skills(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="technical_skills"
            />
          </Grid>
        </Grid> */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.5 Computer Literacy
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id=" computer_literacy"
              label="Computer Literacy"
              value={computer_literacy}
              onChange={(e) => setComputer_Literacy(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="computer_literacy"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.6 Other Qualifications
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="training_programmes"
              label="Training Programmes / Seminars / Workshop Attended"
              value={training_programmes}
              onChange={(e) => setTraining_programmes(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="training_programmes"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.7 Membership
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={4}>
            <Autocomplete
              {...MemberProps}
              id="membership"
              required
              value={membership}
              onChange={(event, newValue) => {
                setMembership(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Membership" />
                  {membershipError && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.8 Linguistic Skill
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skillsinhala"
              required
              value={skillsinhala}
              onChange={(event, newValue) => {
                setSkillsinhala(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Sinhala" />
                  {skillErrorsinhala && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skilltamil"
              required
              value={skilltamil}
              onChange={(event, newValue) => {
                setSkilltamil(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Tamil" />
                  {skillErrortamil && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              {...SkillProps}
              id="skillenglish"
              required
              value={skillenglish}
              onChange={(event, newValue) => {
                setSkillenglish(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="English" />
                  {skillErrorenglish && (
                    <Typography
                      variant="body2"
                      color="error"
                      component="span"
                      style={{ color: errorColor, fontSize: "0.75rem" }}
                    >
                      This field is required
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.9 Other Personal Info
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="activities"
              label="Professional Interests & Activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="activities"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.9.2 Extracurricular Activities
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="extracurricular_activities"
              label="Extracurricular Activities / Membership of Clubs / Awards / Achievements etc"
              value={extracurricular_activities}
              // onChange={(e) => setExtracurricular_activities(e.target.value)}
              // onChange={(e) =>
              //   setExtracurricular_activities(
              //     e.target.value === undefined ? "" : e.target.value
              //   )
              // }
              onChange={(e) =>
                setExtracurricular_activities(e.target.value || null)
              }
              fullWidth
              multiline
              rows={3}
              autoComplete="extracurricular_activities"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
          3.10 Sports
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <TextField
              id="sports"
              label="Sports"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              fullWidth
              multiline
              rows={3}
              autoComplete="Sports"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default EducationalInfo;
