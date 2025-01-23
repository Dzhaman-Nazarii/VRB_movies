import { AxiosInstance } from "axios";

export interface ThunkConfig {
	extra: {
		api: AxiosInstance;
	};
	rejectValue: string;
}
