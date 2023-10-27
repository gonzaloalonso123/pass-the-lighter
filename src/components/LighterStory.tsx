import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import HistoryIcon from "@mui/icons-material/History";
import Map from "../components/Map";
import LigtherPlaceholder from "../assets/images/lighter-placeholder.png";
import { Verified } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LighterContext } from "../context/LighterContext";

export const LighterStory = () => {
  const { lighter } = useContext(LighterContext);
  return lighter ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        color="black"
      >
        <Typography
          sx={{
            color: "black",
            fontSize: "1.5em",
            fontWeight: "bold",
            display: "flex",
            gap: ".6rem",
            alignItems: "center",
          }}
        >
          <HistoryIcon />
          My story
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ color: "black" }}>
          <Map log={lighter.log} />
          {lighter.log.map((log, i) => (
            <Card className="flex my-4" elevation={2} key={i}>
              <div className="w-24 h-24 md:w-32 md:h-32">
                <img
                  src={log.image || LigtherPlaceholder}
                  alt=""
                  className="h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full p-2 px-4">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg font-black">{log.nickname}</p>
                  <p className="text-sm">{log.when}</p>
                </div>
                <p className="text-xs">
                  {log.where.name}{" "}
                  {log.where.verified && (
                    <label
                      className="text-green-500"
                      style={{ fontSize: ".7em" }}
                    >
                      <Verified style={{ fontSize: "1.2em" }} />
                      Verified
                    </label>
                  )}
                </p>
                <p className="text-sm mt-4">{log.message}</p>
              </div>
            </Card>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  ) : (
    <></>
  );
};
