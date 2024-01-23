import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";

export default function SummaryModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.summery);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  const policeStations = [
    { station: "Colombo", value: 0 },
    { station: "Gampaha", value: 1 },
    { station: "Negambo", value: 2 },
    { station: "jaffna", value: 3 },
    { station: "Kandy", value: 4 },
    { station: "Galle", value: 5 },
    { station: "ja-ela", value: 6 },
    { station: "Ragama", value: 7 },
  ];
  const electorateOptions = [
    { station: "Colombo", value: 0 },
    { station: "Gampaha", value: 1 },
    { station: "Negambo", value: 2 },
    { station: "jaffna", value: 3 },
    { station: "Kandy", value: 4 },
    { station: "Galle", value: 5 },
    { station: "ja-ela", value: 6 },
    { station: "Ragama", value: 7 },
  ];
  const districtOptions = [
    { station: "Colombo", value: 0 },
    { station: "Gampaha", value: 1 },
    { station: "Negambo", value: 2 },
    { station: "jaffna", value: 3 },
    { station: "Kandy", value: 4 },
    { station: "Galle", value: 5 },
    { station: "ja-ela", value: 6 },
    { station: "Ragama", value: 7 },
  ];
  const gen = [
    { gender: "Male", value: 0 },
    { gender: "Female", value: 1 },
  ];
  const maritalStatus = [
    { status: "Single", value: 0 },
    { status: "Married", value: 1 },
  ];
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

  const maritalStatusValue = maritalStatus.find(
    (status) =>
      status.value === parseInt(userData?.UserBioDtails?.marital_status)
  );
  const genValue = gen.find(
    (status) => status.value === parseInt(userData?.UserBioDtails?.gender)
  );
  const policeStationsValue = policeStations.find(
    (status) =>
      status.value === parseInt(userData?.UserBioDtails?.police_station)
  );
  const electorateOptionsValue = electorateOptions.find(
    (status) => status.value === parseInt(userData?.UserBioDtails?.electorate)
  );
  const districtOptionsValue = districtOptions.find(
    (status) => status.value === parseInt(userData?.UserBioDtails?.district)
  );
  const mbrValue = mbr.find(
    (status) => status.value === parseInt(userData?.UserBioDtails?.membership)
  );
  const sinhalaValue = skl.find(
    (status) =>
      status.value === parseInt(userData?.UserBioDtails?.sinhala_level)
  );
  const tamilValue = skl.find(
    (status) => status.value === parseInt(userData?.UserBioDtails?.tamil_level)
  );
  const englishValue = skl.find(
    (status) =>
      status.value === parseInt(userData?.UserBioDtails?.english_level)
  );

  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle>History Details</DialogTitle> */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <React.Fragment>
          <Typography variant="h3" style={{ paddingTop: "15px" }}>
            Summary
          </Typography>
          <br />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">1. Curriculum Vitae</Typography>
            <br />
            <Typography>
              CV name : {userData?.UserBioDtails?.cv_path}
              <br />
            </Typography>
            <br />
            <Typography variant="h5">2. Personal Info</Typography>
            <br />
            <Typography>
              Name with Initials : {userData?.UserBioDtails?.initial}
              <br />
              Names Denoted by Initials :{" "}
              {userData?.UserBioDtails?.initial_name}
              <br />
              Permanent Address : {userData?.UserBioDtails?.permanent_address}
              <br />
              Contact Address : {userData?.UserBioDtails?.contact_address}
              <br />
              Mobile : {userData?.UserBioDtails?.mobile}
              <br />
              Mobile Other : {userData?.UserBioDtails?.mobile_2}
              <br />
              Email: {userData?.UserBioDtails?.email}
              <br />
              Date of Birth : {userData?.UserBioDtails?.dob}
              <br />
              Age : {userData?.UserBioDtails?.age}
              <br />
              Marital Status : {maritalStatusValue?.status}
              <br />
              Gender : {genValue?.gender}
              <br />
              Nationality : {userData?.UserBioDtails?.nic_passport}
              <br />
              NIC : {userData?.UserBioDtails?.initial_name}
              <br />
              Passport Number : {userData?.UserBioDtails?.passport}
              <br />
              Police Station : {policeStationsValue?.station}
              <br />
              Electorate : {electorateOptionsValue?.station}
              <br />
              District : {districtOptionsValue?.station}
            </Typography>
            <br />
            <Typography variant="h5">3. Educational Qualifications</Typography>
            <br />
            <Typography sx={{ mt: 2, mb: 1 }} style={{ fontWeight: "bold" }}>
              3.1 GCE O/L
            </Typography>
            <Typography>
              Year : {userData?.UserBioDtails?.ol_year}
              <br />
              School Attended : {userData?.UserBioDtails?.ol_school}
              <br />
              Index No : {userData?.UserBioDtails?.ol_index}
              <br />
              O/L Best Results : {userData?.UserBioDtails?.ol_result}
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
              Year : {userData?.UserBioDtails?.al_year}
              <br />
              School Attended : {userData?.UserBioDtails?.al_school}
              <br />
              Index No : {userData?.UserBioDtails?.al_index}
              <br />
              A/L Best Results : {userData?.UserBioDtails?.al_result}
              <br />
            </Typography>
            <br />
            <Typography
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              style={{ fontWeight: "bold" }}
            >
              3.3 Higher Educational Qualifications
            </Typography>

            {userData?.HigherEducationaldetails &&
            userData.HigherEducationaldetails.length > 0 ? (
              userData.HigherEducationaldetails.map((field, index) => (
                <div key={index}>
                  <Typography
                    sx={{ mt: 2, mb: 1 }}
                    style={{ fontWeight: "bold" }}
                  >
                    3.3.{index + 1} Educational Qualification
                  </Typography>
                  <Typography>
                    From (Year) : {formatDate(field.from_year)}
                    <br />
                    To (Year) : {formatDate(field.to_year)}
                    <br />
                    Name of Institution : {field.institution}
                    <br />
                    Degree / Diploma / Certificate : {field.degree}
                    <br />
                    Grade / Marks : {field.grade}
                    <br />
                    Area of Study : {field.area}
                    <br />
                  </Typography>
                  <br />
                </div>
              ))
            ) : (
              <p>No educational details available</p>
            )}

            <br />
            <Typography
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              style={{ fontWeight: "bold" }}
            >
              3.4 Professional Qualification
            </Typography>

            {userData?.ProfessionalDetails &&
            userData.ProfessionalDetails.length > 0 ? (
              userData.ProfessionalDetails.map((field, index) => (
                <div key={index}>
                  <Typography
                    sx={{ mt: 2, mb: 1 }}
                    style={{ fontWeight: "bold" }}
                  >
                    3.4.{index + 1} Professional Qualification
                  </Typography>
                  <Typography>
                    Qualification Name : {field.qualification_name}
                    <br />
                    Category : {field.category}
                    <br />
                    Level Of QualiFfication : {field.level}
                    <br />
                    NVQ Level : {field.nvq}
                    <br />
                    Completed Year : {formatDate(field.completed_year)}
                    <br />
                  </Typography>
                  <br />
                </div>
              ))
            ) : (
              <p>No Professional details available</p>
            )}
            <br />

            <Typography
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              style={{ fontWeight: "bold" }}
            >
              3.5 Computer Literacy
            </Typography>
            <Typography>
              Computer Literacy : {userData?.UserBioDtails?.computer_literacy}
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
              Other Qualifications :{" "}
              {userData?.UserBioDtails?.other_information}
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
              Membership : {mbrValue?.membership}
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
              Sinhala : {sinhalaValue?.skill}
              <br />
            </Typography>
            <Typography>Tamil :{tamilValue?.skill}</Typography>
            <Typography>
              English : {englishValue?.skill}
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
              Professional Interests & Activities :{" "}
              {userData?.UserBioDtails?.activities}
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
              Extracurricular Activities / Membership of Clubs / Awards /
              Achievements etc :{" "}
              {userData?.UserBioDtails?.extracurricular_activities}
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
              Sports : {userData?.UserBioDtails?.sports}
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

            {console.log("userData?.EmplyeeDetails", userData?.WorkHistoryList)}
            {userData?.WorkHistoryList &&
            userData?.WorkHistoryList.length > 0 ? (
              userData?.WorkHistoryList.map((experience, index) => (
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
                    Designation :{experience.Designation}
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
              ))
            ) : (
              <p>No Employer details available</p>
            )}

            <br />
            <Typography
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              style={{ fontWeight: "bold" }}
            >
              4.2 Projects
            </Typography>
            <Typography>
              Projects : {userData?.UserBioDtails?.projects}
              <br />
            </Typography>
            <br />
            <Typography variant="h5">5. Career Aspirations</Typography>
            <br />
            <Typography>
              Career Objective : {userData?.UserBioDtails?.career_objective}
              <br />
              Aspirations : {userData?.UserBioDtails?.aspirations}
              <br />
            </Typography>
            <br />
            <Typography variant="h5">6. Other Informations</Typography>
            <br />
            <Typography>
              Relatives : {userData?.UserBioDtails?.relatives}
              <br />
              Previously Worked : {userData?.UserBioDtails?.previously_worked}
              <br />
              Court Cases : {userData?.UserBioDtails?.court_cases}
              <br />
              Suspension From Work :{" "}
              {userData?.UserBioDtails?.suspension_fromwork}
              <br />
              Illneses : {userData?.UserBioDtails?.illneses}
              <br />
              Other Information :{" "}
              {userData?.UserBioDtails?.extracurricular_activities}
              <br />
            </Typography>
            <br />
            <Typography variant="h6">7. Non-related Referees</Typography>
            <br />
            <Typography
              sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              style={{ fontWeight: "bold" }}
            >
              7.1 First Non-related Referee
            </Typography>
            <Typography>
              Referee Name 1 : {userData?.UserBioDtails?.referee_name1}
              <br />
              Designation : {userData?.UserBioDtails?.referee_designation1}
              <br />
              Official Address : {userData?.UserBioDtails?.referee_address1}
              <br />
              Email : {userData?.UserBioDtails?.referee_email1}
              <br />
              Contact No : {userData?.UserBioDtails?.referee_mobile1}
              <br />
              Contact No (Other) :{" "}
              {userData?.UserBioDtails?.referee_mobileextra1}
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
              Referee Name 2 : {userData?.UserBioDtails?.referee_name2}
              <br />
              Designation : {userData?.UserBioDtails?.referee_designation2}
              <br />
              Official Address : {userData?.UserBioDtails?.referee_address2}
              <br />
              Email : {userData?.UserBioDtails?.referee_email2}
              <br />
              Contact No : {userData?.UserBioDtails?.referee_mobile2}
              <br />
              Contact No (Other) :{" "}
              {userData?.UserBioDtails?.referee_mobileextra2}
              <br />
            </Typography>
          </Box>
        </React.Fragment>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
