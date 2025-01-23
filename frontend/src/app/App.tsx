import React, { useState } from "react";
import Header from "../widgets/Header";
import AppRouter from "./routes";

export const App: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	return (
		<>
			<Header onSearch={handleSearch} searchQuery={searchQuery} />
			<AppRouter searchQuery={searchQuery} />
		</>
	);
};
