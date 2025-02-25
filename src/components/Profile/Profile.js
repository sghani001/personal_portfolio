import { Typography } from "@mui/material";
import React from "react";
import CustomTimeline, { CustomTimelineSeparator } from "../Timeline/Timeline";
import "./Profile.css";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import resumeData from "../../utils/resumeData";
import { TimelineContent } from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import Button from "../Button/Button";
import GetAppIcon from '@mui/icons-material/GetApp';

const CustomTimelineItem = ({ title, text, link }) => (
  <TimelineItem>
    <CustomTimelineSeparator />
    <TimelineContent className="timeline_content">
      {link ? (
        <Typography className="timelineItem_text">
          <span className="profile_title">{title}:</span>{" "}
          <a href={link} target="_blank" rel="noreferrer">
            {text}
          </a>
        </Typography>
      ) : (
        <Typography className="timelineItem_text">
          <span className="profile_title">{title}:</span> {text}
        </Typography>
      )}
    </TimelineContent>
  </TimelineItem>
);

const Profile = () => {
  return (
    <div className="profile container_shadow">
      <div className="profile_name">
        <Typography className="name">{resumeData.name}</Typography>
        <Typography className="title">{resumeData.title}</Typography>
      </div>
      <figure className="profile_image">
        <img src={require("../../assets/images/syed_ghani.jpg")} alt=""></img>
      </figure>
      <div className="profile_info">
        <CustomTimeline icon={<PersonOutlineOutlined />}>
          <CustomTimelineItem title="Name" text={resumeData.name} />
          <CustomTimelineItem title="Title" text={resumeData.title} />
          <CustomTimelineItem title="Birthday" text={resumeData.birthday} />
          <CustomTimelineItem title="Job" text={resumeData.job} />
          {Object.keys(resumeData.socials).map((key) => (
            <CustomTimelineItem
              title={key}
              text={resumeData.socials[key].text}
              link={resumeData.socials[key].link}
            />
          ))}
        </CustomTimeline>
        <div className="btn_container">
          <Button text={'Download CV'} icon={<GetAppIcon/>}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
