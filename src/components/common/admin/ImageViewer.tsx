import { ActionIcon, Button, Image, Modal, Text, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import React, { FunctionComponent, useState } from "react";

type ImageViewerProps = {
	productImages: Array<string>;
	handleImageDelete: (index: number) => void;
};

const baseUrl = "https://legumfivysflstxpzgou.supabase.co/storage/v1/object/public/";

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
			<Modal
				transition="slide-left"
				transitionDuration={200}
				transitionTimingFunction="ease-in-out"
				closeOnClickOutside={false}
				closeOnEscape={false}
				withCloseButton={false}
				centered
				opened={opened}
				onClose={() => setOpened(false)}
				title="Image Delete Warning !!!"
				classNames={{
					title: "text-error",
				}}
			>
				<div className="">
					<Title className="text-base font-bold text-page">Are you sure you would want to delete this image ?</Title>
					<Text className="mt-4 text-sm text-page">This action is not reversible</Text>
					<div className="flex justify-center mt-12 space-x-10">
						<Button
							className="text-black bg-violet-light border-violet hover:bg-transparent"
							onClick={() => setOpened(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={deleteUserConfirmation}
							className=" bg-error bg-opacity-80 hover:bg-transparent hover:border-error hover:border hover:text-error"
						>
							Confirm
						</Button>
					</div>
				</div>
			</Modal>
			{/* Product Images should be draggable so the priority of the cover image changes */}
			{productImages.map((image, index) => {
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
							src={`${baseUrl}${image}`}
							alt="Product Image"
						/>
						<Text className="text-ellipsis overflow-hidden text-sm w-8/12">{image.split("assets/")[1]}</Text>
						<ActionIcon
							className="bg-error bg-opacity-80 hover:bg-error hover:bg-opacity-40 text-white"
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
