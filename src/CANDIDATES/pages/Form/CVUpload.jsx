import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  rem,
  Progress,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: rem(30),
  },
  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
  control: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));
const CVUpload = forwardRef(
  ({ onValidationChange, saveData, allData }, ref) => {
    const { userData } = useSelector((state) => state.summery);
    const { classes, theme } = useStyles();
    const openRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(
      allData.uploadedFile || userData?.UserBioDtails?.cv_path || null
    );

    const [uploadedCV, setUploadCV] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadDisable, setUploadDisable] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const validate = () => {
      return uploadedFile !== null;
    };
    useEffect(() => {
      const isValid = validate();
      onValidationChange(isValid);
      setUploadDisable(userData.length === 0 ? false : true);
    }, [uploadedFile, onValidationChange]);
    const handleDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadCV(file);

      if (file) {
        // if (file.size > 5 * 1024 * 1024) {
        //   alert("File is larger than 5MB. Please select a smaller file.");
        if (file.size > 5 * 1024 * 1024) {
          Swal.fire({
            icon: "error",
            title: "File Size Error",
            text: "File is larger than 5MB. Please select a smaller file.",
          });
          return;
        }

        if (file.type !== "application/pdf") {
          // File is not in PDF format
          // alert("File is not in the correct format. Please select a PDF file.");
          Swal.fire({
            icon: "error",
            title: "File Type Error",
            text: "File is not in the correct format. Please select a PDF file.",
          });
          return;
        }
        setIsLoading(true);
        setUploadedFile(file.name);
        setIsLoading(false);
        setUploadProgress(0);
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            clearInterval(progressInterval);
          }
          setUploadProgress(progress);
        }, 50000);
      }
    };
    useImperativeHandle(ref, () => ({
      handleSave() {
        if (validate()) {
          const data = {
            uploadedFile,
            uploadedCV,
          };
          saveData(data);
        }
      },
    }));
    return (
      <div className={classes.wrapper}>
        {uploadDisable && uploadedFile && (
          <Text ta="center" fz="md" c="black">
            <b>You already uploaded a file</b>
          </Text>
        )}
        <br />
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          className={classes.dropzone}
          radius="md"
          //accept={[MIME_TYPES.pdf]}
          //maxSize={1 * 1024 ** 1}
        >
          <div style={{ pointerEvents: "none" }}>
            {isLoading ? (
              <div>
                <Text ta="center" fw={700} fz="lg" mt="xl">
                  Uploading...
                </Text>
                <Progress
                  value={uploadProgress}
                  color="blue"
                  size="xs"
                  style={{ marginTop: rem(10) }}
                />
              </div>
            ) : (
              <React.Fragment>
                <div style={{ padding: "15px" }}>
                  <Group position="center">
                    <Dropzone.Accept>
                      <IconDownload
                        size={rem(50)}
                        color={theme.colors[theme.primaryColor][6]}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        size={rem(50)}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconCloudUpload
                        size={rem(50)}
                        color={
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[0]
                            : theme.black
                        }
                        stroke={1.5}
                      />
                    </Dropzone.Idle>
                  </Group>
                  <Text ta="center" fw={700} fz="lg" mt="xl">
                    {uploadedFile ? uploadedFile : "Upload Your Resume"}
                  </Text>
                  <Text ta="center" fz="sm" mt="xs" c="dimmed">
                    Drag'n'drop files here to upload. We can accept only{" "}
                    <i>.pdf</i> files that are less than 10mb in size.
                  </Text>
                </div>
              </React.Fragment>
            )}
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current()}
          disabled={uploadDisable}
        >
          Select files
        </Button>
      </div>
    );
  }
);
export default CVUpload;
