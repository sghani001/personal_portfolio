import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import resumeData from "../../utils/resumeData";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Capitalize Name Input
    if (name === "name") {
      value = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setFormData({ ...formData, [name]: value });
  };

  const mailtoLink = `mailto:syedghani001@gmail.com?subject=Contact from ${encodeURIComponent(
    formData.name
  )}&body=Name: ${encodeURIComponent(
    formData.name
  )}%0AEmail: ${encodeURIComponent(formData.email)}%0A%0A${encodeURIComponent(
    formData.message
  )}`;

  return (
    <>
      <Grid container spacing={5} className="pb_45">
        <Grid item xs={12} lg={6}>
          <Grid container className="section pb_45">
            <Grid item className="section_title mb_30">
              <span></span>
              <Typography variant="h6" className="section_title_text">
                Contact Form
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="standard"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="E-mail"
                    variant="standard"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="message"
                    label="Message"
                    variant="standard"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <a href={mailtoLink} style={{ textDecoration: "none" }}>
                    <Button text="Submit" />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Grid container className="section">
            <Grid item className="section_title mb_30">
              <span></span>
              <Typography variant="h6" className="section_title_text">
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography className="contactInfo_item">
                    <span>Address:</span> {resumeData.address}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className="contactInfo_item">
                    <span>Email:</span> {resumeData.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className="contactInfo_item">
                    <span>Phone:</span> {resumeData.phone}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className="contactInfo_item">
                    <span>Job:</span> {resumeData.job}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container className="contactInfo_socialsContainer">
                {Object.keys(resumeData.socials).map((key) => (
                  <Grid item className="contactInfo_social" key={key}>
                    <a href={resumeData.socials[key].link}>
                      {resumeData.socials[key].icon}
                    </a>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="section pb_45">
            <Grid item className="section_title">
              <span></span>
              <Typography variant="h6" className="section_title_text">
                Location
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <div style={{ width: "100%", height: "400px" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d326588.32602844586!2d74.17762558527206!3d31.582045759969622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM0JzUyLjYiTiA3NMKwMTAnMjkuMiJF!5e0!3m2!1sen!2s!4v1712030400000"
              ></iframe>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
