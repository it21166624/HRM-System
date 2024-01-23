import LoadingButton from "@mui/lab/LoadingButton";
import { Checkbox, FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddUpdateUserdetails,
  ApplyJob,
} from "../../../action/CANDIDATES/StepForm";
import CVUpload from "./CVUpload";
import CareerAspirations from "./CareerAspirations";
import EducationalInfo from "./EducationalInfo";
import OtherInformations from "./OtherInformations";
import PersonalInfo from "./PersonalInfo";
import References from "./References";
import WokingExp from "./WokingExp";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSummery } from "../../../action/CANDIDATES/CandidateSummery";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const formatDate = (date) => {
  if (!date) return "";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const customTheme = createTheme({
  spacing: 5,
});

export default function Checkout({ jobData }) {
  const dispatch = useDispatch();
  const [isValid, setValid] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [allData, setAllData] = React.useState({});
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleTermsCheckboxChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  // const handleResetConfirmed = () => {
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to reset the fields?"
  //   );
  //   if (userConfirmed) {
  //     handleReset();
  //   }
  // };

  const handleResetConfirmed = () => {
    Swal.fire({
      title: "Are you sure you want to reset the fields?",
      text: "You will lose all the entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleReset();
        Swal.fire("Reset!", "Your data has been reset.", "success");
      }
    });
  };

  const handleSaveInCheckout = () => {
    if (InfoRef.current) {
      InfoRef.current.handleSave();
    }
  };
  const InfoRef = React.useRef();

  const handleValidationChange = (isValid) => {
    setValid(isValid);
  };

  const handleInfoSave = (data) => {
    console.log("save ", data);
    setAllData((prevData) => {
      const newData = {
        ...prevData,
        ...data,
      };

      return newData;
    });
  };
  // console.log("allData", allData);
  console.log(allData.uploadedFile);
  const theme = useTheme();
  const steps = [
    "Upload CV",
    "Personal Info",
    "Educational Info",
    "Working Experience",
    "Career Aspirations",
    "Other Informations",
    "Referees",
  ];
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CVUpload
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
            // isUploadDisabled={isUploadDisabled}
          />
        );
      case 1:
        return (
          <PersonalInfo
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 2:
        return (
          <EducationalInfo
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 3:
        return (
          <WokingExp
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 4:
        return (
          <CareerAspirations
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 5:
        return (
          <OtherInformations
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      case 6:
        return (
          <References
            onValidationChange={handleValidationChange}
            saveData={handleInfoSave}
            ref={InfoRef}
            allData={allData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex(
            (step, i) => !(i in completed) || i === activeStep - 1
          )
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    handleSaveInCheckout();
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setAllData({});
  };
  const handleEdit = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const completedStepsCount = completedSteps();
  const totalStepsCount = totalSteps();
  const navigate = useNavigate();

  const dob = new Date(allData.dob);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDOB = dob.toLocaleDateString("en-US", options);

  const Reg_userid = "";

  const { userData } = useSelector((state) => state.summery);
  const bio_id = userData?.UserBioDtails?.biodata_id ?? "";

  const handleSaveButtonClick = async () => {
    try {
      if (!termsAccepted) {
        //   alert("Please agree to the terms and conditions before saving.");
        //   return;
        // }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please agree to the terms and conditions before saving.",
          showConfirmButton: true, // Ensure the OK button is displayed
        });
        return;
      }

      const HigherEducationDetailsList = allData.additionalFields.map(
        (field) => ({
          from_year: field.fromYear,
          to_year: field.toYear,
          institution: field.institution,
          degree: field.qualifications.qualification,
          grade: field.marks,
          area: field.studyArea,
          reg_userid: Reg_userid,
          higher_educational_id: field.HigherEducational_id
            ? field.HigherEducational_id
            : "",
        })
      );

      // const EmployeeDetailsList = allData.workingExperience.map(
      //   (experience) => ({
      //     employer_name: experience.employer,
      //     designation: experience.designation,
      //     employer_address: experience.emp_address,
      //     form_year: experience.fromYear,
      //     to_year: experience.toYear,
      //     reg_userid: Reg_userid,
      //     employeedetails_id: experience.employeedetails_id
      //       ? experience.employeedetails_id
      //       : "",
      //   })
      // );

      const EmployeeDetailsList = allData.workingExperience.map(
        (experience) => ({
          CompanyName: experience.CompanyName,
          Designation: experience.Designation,
          CompanyAddress: experience.CompanyAddress,
          FromYear: experience.FromYear,
          ToYear: experience.ToYear,
          RegUserid: Reg_userid,
          WorkhistoryDetailsId: experience.WorkhistoryDetailsId
            ? experience.WorkhistoryDetailsId
            : "",
        })
      );

      const ProfessionalQualificationsList = allData.professionalFields.map(
        (field) => ({
          qualification_name: field.qualificationName,
          category: field.category,
          level: field.level,
          nvq: field.nvqLevel,
          completed_year: field.completedYear,
          reg_userid: Reg_userid,
          prof_qualification_id: field.Professional_id
            ? field.Professional_id
            : "",
        })
      );

      allData.marital_status = allData.marital_status?.value;
      allData.gender = allData.gender?.value;
      allData.police_station = allData.police_station?.value;
      allData.electorate = allData.electorate?.value;
      allData.district = allData.district?.value;
      allData.sinhala_level = allData.skillsinhala?.value;
      allData.tamil_level = allData.skilltamil?.value;
      allData.english_level = allData.skillenglish?.value;
      allData.membership = allData.membership?.value;
      allData.biodata_id = bio_id;
      allData.cv_path = allData.uploadedFile;
      allData.ol_result = allData.olbest_results;
      allData.al_result = allData.albest_results;
      allData.suspension_fromwork = allData.suspension_from_work;
      // allData.referee_address1 = allData.referee_address_1;

      const userDataModelFormData = new FormData();

      userDataModelFormData.append(
        "HigherEducationaldetails",
        JSON.stringify(HigherEducationDetailsList)
      );
      userDataModelFormData.append(
        "ProfessionalDetails",
        JSON.stringify(ProfessionalQualificationsList)
      );
      userDataModelFormData.append(
        "EmplyeeDetails",
        JSON.stringify(EmployeeDetailsList)
      );
      userDataModelFormData.append("UserBioDetails", JSON.stringify(allData));
      userDataModelFormData.append("CvFile", allData.uploadedCV);

      if (termsAccepted) {
        console.log(allData);
        dispatch(AddUpdateUserdetails(navigate, userDataModelFormData));
        dispatch(ApplyJob(jobData.jobData.Job_id));
        dispatch(getSummery(""));
        Swal.fire({
          icon: "success",
          title: "Successfully Saved!",
          text: "Your information has been saved successfully.",
        }).then(() => {
          // Navigate to the dashboard after clicking OK in the SweetAlert
          navigate("/dashboard");
          window.location.reload();
        });
      } else {
        // Show SweetAlert for error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Bio Details not saved.Try again..",
        });
      }
    } catch (error) {
      console.error("Error during sending:", error);

      // Show SweetAlert for error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error. Please try again.",
      });
    }
  };
  //navigate("/dashboard")
  //     } else {
  //       console.log("Please accept the terms and conditions.");
  //       toast.error("Bio Details not saved.");
  //     }
  //   } catch (error) {
  //     console.error("Error during sending:", error);
  //     toast.error("There was an error. Please try again.");
  //   }
  // };
  return (
    <>
      {console.log(allData)}
      <ThemeProvider theme={customTheme}>
        <Container component="main" width="sm" sx={{ mb: 6 }}>
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 3 },
              p: { xs: 2, md: 12 },
              // minwidth: "xs",
              // alignContent: "center",
              // marginLeft: "-320px",
            }}
          >
            <Typography component="h1" variant="h4" align="center">
              Update Your Biodata
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ width: "100%", mr: 1 }}>
                <Box
                  sx={{
                    width: `${(completedStepsCount / totalStepsCount) * 100}%`, // Calculate progress percentage
                    bgcolor: "primary.main",
                    height: 8,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {`${completedStepsCount}/${totalStepsCount}`}{" "}
                  {/* Show completed steps over total steps */}
                </Typography>
              </Box>
            </Box>
            {/* <Stepper nonLinear activeStep={activeStep} sx={{ padding: "15px" }}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {isSmall ? "" : label}
                  </StepButton>
                </Step>
              ))}
            </Stepper> */}
            <Stepper nonLinear activeStep={activeStep} sx={{ padding: "15px" }}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {isSmall ? "" : label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you're finished
                  </Typography>
                  <hr />
                  <Typography variant="h3" style={{ paddingTop: "15px" }}>
                    Summary
                  </Typography>
                  <br />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5">1. Curriculum Vitae</Typography>
                    <br />
                    <Typography>
                      CV name : {allData.uploadedFile}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">2. Personal Info</Typography>
                    <br />
                    <Typography>
                      Name with Initials :{" "}
                      {allData.initial ? allData.initial : ""}
                      <br />
                      Names Denoted by Initials :{" "}
                      {allData.initial_name ? allData.initial_name : ""}
                      <br />
                      Permanent Address : {allData.permanent_address}
                      <br />
                      Contact Address : {allData.contact_address}
                      <br />
                      Mobile : {allData.mobile}
                      <br />
                      Mobile Other : {allData.mobile_2}
                      <br />
                      Email: {allData.email}
                      <br />
                      Date of Birth : {formattedDOB}
                      <br />
                      Age : {allData.age}
                      <br />
                      Marital Status : {allData?.marital_status?.status ?? ""}
                      <br />
                      Gender : {allData?.gender?.gender ?? ""}
                      <br />
                      Nationality : {allData.nationality}
                      <br />
                      NIC : {allData.nic_passport}
                      <br />
                      Passport Number : {allData.passport}
                      <br />
                      Police Station : {allData?.police_station?.station ?? ""}
                      <br />
                      Electorate : {allData?.electorate?.station ?? ""}
                      <br />
                      District : {allData?.district?.station ?? ""}
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      3. Educational Qualifications
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1 }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.1 GCE O/L
                    </Typography>
                    <Typography>
                      Year : {allData.ol_year}
                      <br />
                      School Attended : {allData.ol_school}
                      <br />
                      Index No : {allData.ol_index}
                      <br />
                      O/L Best Results : {allData.olbest_results}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.2 GCE A/L
                    </Typography>
                    <Typography>
                      Year : {allData.al_year}
                      <br />
                      School Attended : {allData.al_school}
                      <br />
                      Index No : {allData.al_index}
                      <br />
                      A/L Best Results : {allData.albest_results}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.3 Higher Educational Qualifications
                    </Typography>
                    {allData.additionalFields.map((field, index) => (
                      <div key={index}>
                        <Typography
                          sx={{ mt: 2, mb: 1 }}
                          style={{ fontWeight: "bold" }}
                        >
                          3.3.{index + 1} Educational Qualification
                        </Typography>
                        <Typography>
                          From (Year) : {formatDate(field.fromYear)}
                          <br />
                          To (Year) : {formatDate(field.toYear)}
                          <br />
                          Name of Institution : {field.institution}
                          <br />
                          Degree / Diploma / Certificate :
                          {field?.qualifications?.qualification ?? ""}
                          <br />
                          Grade / Marks : {field.marks}
                          <br />
                          Area of Study : {field.studyArea}
                          <br />
                        </Typography>
                        <br />
                      </div>
                    ))}
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.4 Professional Qualification
                    </Typography>
                    {allData.professionalFields.map((field, index) => (
                      <div key={index}>
                        <Typography
                          sx={{ mt: 2, mb: 1 }}
                          style={{ fontWeight: "bold" }}
                        >
                          3.4.{index + 1} Professional Qualification
                        </Typography>
                        <Typography>
                          Qualification Name : {field.qualificationName}
                          <br />
                          Category : {field.category}
                          <br />
                          Level Of Qualification : {field.level}
                          <br />
                          NVQ Level : {field.nvqLevel}
                          <br />
                          Completed Year : {formatDate(field.completedYear)}
                          <br />
                        </Typography>
                        <br />
                      </div>
                    ))}
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.5 Computer Literacy
                    </Typography>
                    <Typography>
                      Computer Literacy : {allData.computer_literacy}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.6 Other Qualifications
                    </Typography>
                    <Typography>
                      Other Qualifications : {allData.training_programmes}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.7 Membership
                    </Typography>
                    <Typography>
                      Membership : {allData?.membership?.membership ?? ""}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.8 Linguistic Skill
                    </Typography>
                    <Typography>
                      Sinhala : {allData?.skillsinhala?.skill ?? ""}
                      <br />
                    </Typography>
                    <Typography>
                      Tamil : {allData?.skilltamil?.skill ?? ""}
                    </Typography>
                    <Typography>
                      English : {allData?.skillenglish?.skill ?? ""}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.9 Other Personal Info
                    </Typography>
                    <Typography>
                      Professional Interests & Activities : {allData.activities}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.9.2 Extracurricular Activities
                    </Typography>
                    <Typography>
                      Extracurricular Activities / Membership of Clubs / Awards
                      / Achievements etc : {allData.extracurricular_activities}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      3.10 Sports
                    </Typography>
                    <Typography>
                      Sports : {allData.sports}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">4. Employment History</Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      4.1 Employer Details
                    </Typography>
                    {allData.workingExperience.map((experience, index) => (
                      <div key={index}>
                        <Typography
                          sx={{ mt: 2, mb: 1 }}
                          style={{ fontWeight: "bold" }}
                        >
                          4.1.{index + 1} Employer Details
                        </Typography>
                        <Typography>
                          Name of the Employer : {experience.CompanyName}
                          <br />
                          Designation : {experience.Designation}
                          <br />
                          Address of the Employer : {experience.CompanyAddress}
                          <br />
                          From (Year) : {formatDate(experience.FromYear)}
                          <br />
                          To (Year) : {formatDate(experience.ToYear)}
                          <br />
                        </Typography>
                        <br />
                      </div>
                    ))}
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      4.2 Projects
                    </Typography>
                    <Typography>
                      Projects : {allData.projects}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">5. Career Aspirations</Typography>
                    <br />
                    <Typography>
                      Career Objective : {allData.career_objective}
                      <br />
                      Aspirations : {allData.aspirations}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h5">6. Other Informations</Typography>
                    <br />
                    <Typography>
                      Relatives : {allData.relatives}
                      <br />
                      Previously Worked : {allData.previously_worked}
                      <br />
                      Court Cases : {allData.court_cases}
                      <br />
                      Suspension From Work : {allData.suspension_from_work}
                      <br />
                      Illneses : {allData.illneses}
                      <br />
                      Other Information : {allData.other_information}
                      <br />
                    </Typography>
                    <br />
                    <Typography variant="h6">
                      7. Non-related Referees
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      7.1 First Non-related Referee
                    </Typography>
                    <Typography>
                      Referee Name 1 : {allData.referee_name1}
                      <br />
                      Designation : {allData.referee_designation1}
                      <br />
                      Official Address : {allData.referee_address1}
                      <br />
                      Email : {allData.referee_email1}
                      <br />
                      Contact No : {allData.referee_mobile1}
                      <br />
                      Contact No (Other) : {allData.referee_mobileextra1}
                      <br />
                    </Typography>
                    <br />
                    <Typography
                      sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                      style={{ fontWeight: "bold" }}
                    >
                      7.2 Second Non-related Referee
                    </Typography>
                    <Typography>
                      Referee Name 2 : {allData.referee_name2}
                      <br />
                      Designation : {allData.referee_designation2}
                      <br />
                      Official Address : {allData.referee_address2}
                      <br />
                      Email : {allData.referee_email2}
                      <br />
                      Contact No : {allData.referee_mobile2}
                      <br />
                      Contact No (Other) : {allData.referee_mobileextra2}
                      <br />
                    </Typography>
                    <div>
                      <Typography
                        variant="h6"
                        component="p"
                        // sx={{
                        //   fontSize: "8px",
                        //   fontStyle: "italic",
                        //   paddingTop: "40px",
                        //   color: "ash",
                        // }}
                        style={{
                          fontSize: "16px",
                          fontStyle: "italic",
                          paddingTop: "40px",
                          color: "ash",
                        }}
                      >
                        Please ensure that all questions have been answered in
                        full, before save this application.
                      </Typography>
                      <br />
                      <Typography
                        component="h1"
                        variant="h5"
                        align="left"
                        style={{ "margin-bottom": "-30px" }}
                      >
                        Terms and Conditions
                      </Typography>
                      <Typography
                        component="p"
                        sx={{
                          fontSize: "10px",
                          paddingTop: "40px",
                        }}
                      >
                        I confirm that the information given above is true and
                        accurate to the best of my knowledge.I am aware that in
                        the event of this information being found factually
                        incorrect orior to the employment, my application is
                        liable to be rejected and if so found while in
                        employment, I am liable to be summarily dismissed
                      </Typography>
                    </div>
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleTermsCheckboxChange}
                      />
                    }
                    label="I accept the terms and conditions"
                  />

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* <Button
                      onClick={() => {
                        handleSaveButtonClick();
                      }}
                    >
                      Save
                    </Button> */}
                    <LoadingButton
                      // loading={loading} // Pass the loading state here
                      fullWidth
                      loadingIndicator="Loading…"
                      onClick={() => {
                        handleSaveButtonClick();
                      }}
                      variant="outlined"
                      // disabled={loading}
                    >
                      Save
                    </LoadingButton>
                    <Button
                      onClick={handleResetConfirmed}
                      fullWidth
                      variant="outlined"
                    >
                      Reset
                    </Button>
                    <Button onClick={handleEdit} fullWidth variant="outlined">
                      Edit
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {completed[activeStep] ? (
                      <Button onClick={handleComplete} disabled={!isValid}>
                        {isLastStep() ? "Finish" : "Already Completed"}
                      </Button>
                    ) : (
                      <Button onClick={handleComplete} disabled={!isValid}>
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}
