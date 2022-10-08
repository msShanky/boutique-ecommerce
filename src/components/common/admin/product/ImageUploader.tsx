import { Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons";
import React, { FunctionComponent, useRef, useState } from "react";
import { nanoid } from "nanoid";

type ImageUploaderProps = {
  isDisabled: boolean;
  type?: string;
  handleImageSuccess: (images: string) => void;
  code: string | number;
};

const ImageUploader: FunctionComponent<ImageUploaderProps> = (props) => {
  const { isDisabled, handleImageSuccess, code, type } = props;
  const openRef = useRef<() => void>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  // TODO: Upload the product image to the desired folder in supabase
  const handleFileUpload = async (files: File[]) => {
    const storage = type || "product-image";
    setLoading(true);
    if (!code) {
      setLoading(false);
      return;
    }
    // Always upload the first file
    const imageFile = files[0];
    const fileExt = imageFile.type.split("/")[1];
    const imageName = `assets/${code}/${nanoid()}.${fileExt}`;
    const { data } = await supabaseClient.storage
      .from(storage)
      .upload(imageName, imageFile);
    if (data) {
      handleImageSuccess(data?.Key ?? "");
    }
    setLoading(false);
  };

  return (
    <div className="relative mb-10">
      <Dropzone
        openRef={openRef}
        disabled={isDisabled}
        onDrop={handleFileUpload}
        loading={isLoading}
        className={`border-2 ${
          !type &&
          isDisabled &&
          "cursor-not-allowed bg-error text-white  hover:bg-error hover:bg-opacity-80 hover:text-white group"
        }`}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={50} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>
          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>
              File format/size does not meet requirements
            </Dropzone.Reject>
            <Dropzone.Idle>
              {!type && isDisabled
                ? "Generate Product Code"
                : "Upload product image"}
            </Dropzone.Idle>
          </Text>
          {!type && isDisabled ? (
            <Text className="text-white" align="center" size="sm" mt="xs">
              Please generate a product code to upload product images
            </Text>
          ) : (
            <Text className="text-black " align="center" size="sm" mt="xs">
              Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
              <i>.png</i>, <i>.jpg</i>, <i>.webp</i>, files that are less than
              2mb in size.
            </Text>
          )}
        </div>
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
