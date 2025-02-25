import React from "react";
import "./Resume.css";
import { Grid, Icon, Paper, Typography } from "@mui/material";
import resumeData from "../../utils/resumeData";
import "../../App.css";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import CustomTimeline, {
  CustomTimelineSeparator,
} from "../../components/Timeline/Timeline";
import '../../components/Timeline/Timeline.css'
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SchoolIcon from '@mui/icons-material/School';

const Resume = () => {
  return (
    <>
      <Grid container className="section pb_45">
        <Grid item className="section_title mb_30">
          <span></span>
          <Typography variant="h6" className="section_title_text">
            About Me
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className="about_me_text">
            {resumeData.aboutMe}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="section pb_45">
        <Grid item className="section_title mb_30">
          <span></span>
          <Typography variant="h6" className="section_title_text">
            Resume
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="resume_timeline">
            <Grid item sm={12} md={6}>
              <CustomTimeline
                title="Work History"
                icon={<WorkHistoryIcon />}>
                {resumeData.workHistory.map(work => (
                  <TimelineItem>
                    <CustomTimelineSeparator/>
                    <TimelineContent className="timeline_content">
                      <Typography className="timeline_title">{work.position}</Typography>
                      <Typography variant="caption" className="timeline_date">{work.duration}</Typography>
                      <Typography variant="body2" className="timeline_description">{work.responsibilities}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </CustomTimeline>
            </Grid>
            <Grid item sm={12} md={6}>
              <CustomTimeline
                title="Education History"
                icon={<SchoolIcon />}>
                {resumeData.educationHistory.map(education => (
                  <TimelineItem>
                    <CustomTimelineSeparator/>
                    <TimelineContent className="timeline_content">
                      <Typography className="timeline_title">{education.degree}</Typography>
                      <Typography variant="caption" className="timeline_date">{education.duration}</Typography>
                      <Typography variant="body2" className="timeline_description">{education.institution}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </CustomTimeline>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="section pb_45">
        <Grid item className="section_title mb_30">
          <span></span>
          <Typography variant="h6" className="section_title_text">
            My Services
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} justify='space-around'>
            {resumeData.myServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div className="card">
                  <div className='card_icon'>{service.icon}</div>
                  <Typography className="card_title" variant="h6 ">{service.service}</Typography>
                  <Typography className="card_description" variant="body2">{service.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="section pb_45">
        <Grid item className="section_title mb_30">
          <span></span>
          <Typography variant="h6" className="section_title_text">
            My Skills
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} justify="space-around">
            {resumeData.skills.map((skill) => (
              <Grid item xs={12} sm={6} key={skill.title}>
                <div className="card">
                  <CustomTimeline title={skill.title} icon={skill.icon} className='card_title'>
                    {skill.description.map((item, index) => (
                      <TimelineItem key={index}>
                        <CustomTimelineSeparator />
                        <TimelineContent className="timeline_content">
                          <Typography className="timeline_title">{item}</Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </CustomTimeline>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Resume;
