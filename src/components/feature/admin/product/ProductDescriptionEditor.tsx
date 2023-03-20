import React from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export const ProductDescriptionEditor = () => {
	const editor = useEditor({
		extensions: [StarterKit, Placeholder.configure({ placeholder: "This is placeholder" })],
		content: "",
	});

	return (
		<RichTextEditor editor={editor}>
			<RichTextEditor.Content />
		</RichTextEditor>
	);
};
