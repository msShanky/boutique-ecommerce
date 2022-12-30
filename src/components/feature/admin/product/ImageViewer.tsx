import { ActionIcon, Image, Modal, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import React, { FunctionComponent, useState } from "react";
import { DeleteWarningModal } from "@/components/feature/admin/warning";

type ImageViewerProps = {
	productImages: Array<string>;
	handleImageDelete: (index: number) => void;
};

const baseUrl = process.env.NEXT_PUBLIC_CDN;

const ImageViewer: FunctionComponent<ImageViewerProps> = (props) => {
	const { productImages, handleImageDelete } = props;
	const [opened, setOpened] = useState(false);
	const [imageIndex, setImageIndex] = useState<number | null>(null);

	const deleteUserConfirmation = () => {
		handleImageDelete(imageIndex as number);
		setTimeout(() => {
			setOpened(false);
		}, 150);
	};

	const handleDelete = (imageIndex: number) => {
		setOpened(true);
		setImageIndex(imageIndex);
	};

	return (
		<div className="h-[40vh] overflow-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
			<DeleteWarningModal
				modelType="product"
				onDelete={deleteUserConfirmation}
				opened={opened}
				toggleOpen={setOpened}
			/>
			{/* Product Images should be draggable so the priority of the cover image changes */}
			{productImages.map((image, index) => {
				const imageUrl = image.includes("https://assets") ? image : `${baseUrl}/${image}`;
				const imageText = image.includes("https://assets") ? image.split("/images")[1] : image.split("assets/")[1];
				return (
					<div
						className="flex items-center justify-between w-full p-4 mb-4 rounded-md bg-violet-light"
						key={`IMAGE PRINT ${index + 8}`}
					>
						<Image
							fit="cover"
							radius={"sm"}
							className="object-top"
							width={50}
							height={75}
							src={imageUrl}
							alt="Product Image"
						/>
						<Text className="w-8/12 overflow-hidden text-sm text-ellipsis">{imageText}</Text>
						<ActionIcon
							className="text-white bg-error bg-opacity-80 hover:bg-error hover:bg-opacity-40"
							onClick={() => handleDelete(index)}
						>
							<IconTrash size={18} />
						</ActionIcon>
					</div>
				);
			})}
		</div>
	);
};

export default ImageViewer;
