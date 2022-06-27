import { Appwrite } from "appwrite";
import { Server } from "../utils/config";

let api = {
	sdk: null,
	provider: () => {
		if (api.sdk) {
			return api.sdk;
		}
		let appwrite = new Appwrite();
		appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
		// @ts-ignore
		api.sdk = appwrite;
		return appwrite;
	},

	createAccount: (email: string, password: string, name: string | undefined) => {
		return api.provider().account.create("unique()", email, password, name);
	},

	getAccount: () => {
		return api.provider().account.get();
	},

	createSession: (email: string, password: string) => {
		return api.provider().account.createSession(email, password);
	},

	deleteCurrentSession: () => {
		return api.provider().account.deleteSession("current");
	},

	createDocument: (collectionId: string, data: object, read: string[] | undefined, write: string[] | undefined) => {
		return api.provider().database.createDocument(collectionId, "unique()", data, read, write);
	},

	listDocuments: (collectionId: string) => {
		return api.provider().database.listDocuments(collectionId);
	},

	updateDocument: (collectionId: string, documentId: string, data: object, read: string[] | undefined, write: string[] | undefined) => {
		return api.provider().database.updateDocument(collectionId, documentId, data, read, write);
	},

	deleteDocument: (collectionId: string, documentId: string) => {
		return api.provider().database.deleteDocument(collectionId, documentId);
	},
};

export default api;
