import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Fab,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AutocompleteLocation from "../components/AutocompleteLocation";
import LigtherPlaceholder from "../assets/images/lighter-placeholder.png";
import { storage } from "../client/firebaseInit";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CurrentLog } from "../hooks/useLog";
import { Verified } from "@mui/icons-material";

export const LighterLogForm = ({
  currentLog,
  submit,
  submitLoading,
  errors,
}: {
  currentLog: CurrentLog;
  submit: () => void;
  errors: {
    nameError: boolean;
    locationError: boolean;
    dateError: boolean;
    messageError: boolean;
  };
  submitLoading: boolean;
}) => {
  const { log, setUser, setDate, setLocation, setImage, setMessage } =
    currentLog;
  const [locVal, setLocVal] = useState<any | null>(null);
  const geocoder = new google.maps.Geocoder();
  const [locationLoading, setLocationLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    if (locVal) {
      geocoder.geocode({ placeId: locVal.place_id }).then(({ results }) => {
        setLocation({
          name: locVal?.structured_formatting.main_text || "",
          id: locVal.place_id || "",
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          verified: false,
        });
        setTimeout(() => {
          console.log("location: ", log.where);
        }, 3000);
      });
    }
  }, [locVal]);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          geocoder
            .geocode({
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            })
            .then(({ results }) => {
              setLocation({
                name:
                  results[0].address_components[1].long_name +
                  ", " +
                  results[0].address_components[3].long_name,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                id: results[0].place_id,
                verified: true,
              });
              setLocationLoading(false);
            });
        },
        () => {
          alert("Could not get your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget!.files![0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const imageRef = ref(storage, `images/ + ${v4()}`);
    console.log(imageRef.fullPath);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref.fullPath))
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log("there was an error uploading the image");
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h2>
        <WhatshotIcon />
        &nbsp; Start with your location. Where did you get me? *
      </h2>
      <AutocompleteLocation
        value={locVal}
        setValue={setLocVal}
        placeholder={log.where.name}
        error={errors.locationError}
      />
      <h2
        onClick={getCurrentLocation}
        className="flex items-end gap-1 justify-between"
      >
        <div>
          <label>or &nbsp;</label>
          <label className="underline cursor-pointer">
            Get current location
          </label>
          {!locationLoading ? (
            <LocationOnIcon />
          ) : (
            <CircularProgress style={{ width: "1.2em", height: "1.2em" }} />
          )}
        </div>
        {log.where.verified && (
          <label className="text-xs text-green-500">
            <Verified />
            Verified
          </label>
        )}
      </h2>
      <h2 className="flex items-center mt-6">
        <WhatshotIcon />
        &nbsp; When did you get me? *
      </h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(v: any) => setDate(v.format("DD/MM/YYYY"))}
          sx={{
            borderColor: errors.dateError ? "#f00" : "#999",
          }}
        />
      </LocalizationProvider>
      <h2 className="flex items-center mt-6">
        <WhatshotIcon />
        &nbsp; What will be your epic username? *
      </h2>
      <TextField
        className="border-2 border-black"
        placeholder="Your name"
        error={errors.nameError}
        value={log.nickname}
        sx={{
          borderRadius: "10px",
        }}
        onChange={(e) => setUser(e.target.value)}
      />
      <h2 className="flex items-center mt-6">
        <WhatshotIcon />
        &nbsp;What is your message to the world? *
      </h2>
      <textarea
        className="rounded-md p-2 resize-none h-24 border-slate-400"
        style={{
          border: errors.messageError ? ".5px solid #f00" : ".5px solid #999",
        }}
        placeholder="Your message"
        value={log.message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <h2 className="flex items-center mt-6">
        <WhatshotIcon />
        &nbsp; Do you want to share an image?
      </h2>
      <div className="rounded-xl py-2 px-4 bg-black w-fit flex items-center gap-2">
        <input
          style={{ display: "none" }}
          accept="image/jpeg,image/png,image/tiff,image/webp"
          id="contained-button-file"
          name="logo"
          type="file"
          onChange={uploadImage}
        />

        <Avatar className="w-12" src={log.image}>
          <label htmlFor="contained-button-file">
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                alignItems: "center",
              }}
            >
              {avatarLoading ? (
                <CircularProgress />
              ) : (
                <Fab
                  component="span"
                  sx={{ backgroundColor: "white", zIndex: "0" }}
                >
                  <AddPhotoAlternateIcon />
                </Fab>
              )}
            </Box>
          </label>
        </Avatar>
        <h1 onClick={() => console.log(log.where)}>Upload</h1>
      </div>
      <div
        className="w-full bg-white rounded-sm my-4 -translate-y-2"
        style={{
          height: ".1em",
        }}
      ></div>
      <div>
        <h2 className="text-center">Preview</h2>
        <Card className="flex my-4" elevation={2}>
          <img
            src={log.image || LigtherPlaceholder}
            alt=""
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div className="flex flex-col w-full p-2 px-4">
            <div className="flex justify-between w-full items-center">
              {log.nickname === "" ? (
                <Skeleton variant="rectangular" width={210} height={10} />
              ) : (
                <p className="text-lg font-black">{log.nickname}</p>
              )}
              {log.when === "" ? (
                <Skeleton variant="rectangular" width={210} height={10} />
              ) : (
                <p className="text-sm">{log.when}</p>
              )}
            </div>
            <p className="text-xs">
              {log.where.name === "" ? (
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={5}
                  sx={{
                    marginTop: "5px",
                  }}
                />
              ) : (
                log.where.name
              )}
            </p>
            <p className="text-sm mt-4">
              {log.message === "" ? (
                <>
                  <Skeleton variant="rectangular" width={"100%"} height={10} />
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={10}
                    sx={{
                      marginTop: "5px",
                    }}
                  />
                </>
              ) : (
                log.message
              )}
            </p>
          </div>
        </Card>
      </div>
      <button
        className="std-btn w-32 mt-5 mx-auto cursor-pointer"
        onClick={submit}
      >
        {submitLoading ? (
          <CircularProgress
            style={{ width: "1.2em", height: "1.2em" }}
            sx={{ color: "white" }}
          />
        ) : (
          <h1>Submit</h1>
        )}
      </button>
    </>
  );
};
