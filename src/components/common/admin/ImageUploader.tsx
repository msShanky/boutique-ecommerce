import { Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons";
import React, { FunctionComponent, useRef, useState } from "react";

// TODO: Add props and their information

type ImageUploaderProps = {
	isDisabled: boolean;
};

const ImageUploader: FunctionComponent<ImageUploaderProps> = (props) => {
	const { isDisabled } = props;
	const openRef = useRef<() => void>(null);
	const [isLoading, setLoading] = useState<boolean>(false);

	// TODO: Upload the product image to the desired folder in supabase
	const handleFileUpload = async (files: File[]) => {
		console.log(" File has been uploaded  ", files);
		setLoading(true);
		const imageFile = files[0];
		const { data, error } = await supabaseClient.storage
			.from("product-image")
			.upload(`assets/${imageFile.name}`, imageFile);
		console.log(data, "Data fetched from the API for file upload");
		console.log(error, "ERROR: File Upload");
		setLoading(false);
	};

	return (
		<div className="relative mb-10">
			<Dropzone
				openRef={openRef}
				disabled={isDisabled}
				onDrop={handleFileUpload}
				loading={isLoading}
				className={`border-2 ${isDisabled && "cursor-not-allowed hover:bg-error hover:text-white bg-opacity-25 group"}`}
				radius="md"
				accept={IMAGE_MIME_TYPE}
				maxSize={30 * 1024 ** 2}
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
						<Dropzone.Reject>File format/size does not meet requirements</Dropzone.Reject>
						<Dropzone.Idle>Upload product image</Dropzone.Idle>
					</Text>
					{}
					<Text className="group-hover:text-white text-violet-subtext" align="center" size="sm" mt="xs">
						Drag&apos;n&apos;drop files here to upload. We can accept only <i>.png</i>, <i>.jpg</i>, <i>.webp</i>, files
						that are less than 2mb in size.
					</Text>
				</div>
			</Dropzone>
		</div>
	);
};

export default ImageUploader;
