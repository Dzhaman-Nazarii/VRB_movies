import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import "./app/styles/index.scss";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
