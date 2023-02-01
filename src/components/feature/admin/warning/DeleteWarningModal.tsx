import { Button, Modal, Text, Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import en from "@/copy/en";

type DeleteWarningModalProps = {
	opened: boolean;
	toggleOpen: (state: boolean) => void;
	onDelete: () => void;
	modelType: DeleteWarningModalTypes;
};

const DeleteWarningModal: FunctionComponent<DeleteWarningModalProps> = (props) => {
	const { onDelete, opened, toggleOpen, modelType } = props;
	return (
		<Modal
			transition="slide-left"
			transitionDuration={200}
			transitionTimingFunction="ease-in-out"
			closeOnClickOutside={false}
			closeOnEscape={false}
			withCloseButton={false}
			centered
			opened={opened}
			onClose={() => toggleOpen(false)}
			title="Image Delete Warning !!!"
			classNames={{
				title: "text-error",
			}}
		>
			<div className="">
				<Title className="text-base font-bold text-primary">{en.delete_warning[`${modelType}_delete`]}</Title>
				<Text className="mt-4 text-sm text-primary">This action is not reversible</Text>
				<div className="flex justify-center mt-12 space-x-10">
					<Button
						className="text-black bg-violet-light border-violet hover:bg-transparent"
						onClick={() => toggleOpen(false)}
					>
						Cancel
					</Button>
					<Button
						onClick={onDelete}
						className="bg-error bg-opacity-80 hover:bg-transparent hover:border-error hover:border hover:text-error"
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteWarningModal;
