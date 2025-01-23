import { ChangeEvent, FC } from "react";
import { NavLink } from "react-router-dom";
import logoVRB from "../../../shared/assets/images/logo.png";
import css from "./Header.module.scss";

interface HeaderProps {
	onSearch: (query: string) => void;
	searchQuery: string;
}

export const Header: FC<HeaderProps> = ({ onSearch, searchQuery }) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;
		onSearch(query);
	};

	return (
		<header className={css.header}>
			<NavLink to="/">
				<img className={css.logo} src={logoVRB} alt="Movies VRB Logo" />
			</NavLink>
			<input
				className={css.search}
				type="text"
				value={searchQuery}
				onChange={handleInputChange}
				placeholder="Search movies..."
			/>
			<nav className={css.nav}>
				<ul>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? `${css.navLink} ${css.active}` : css.navLink
							}>
							All movies
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/favorites"
							className={({ isActive }) =>
								isActive ? `${css.navLink} ${css.active}` : css.navLink
							}>
							Favorites
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/add"
							className={({ isActive }) =>
								isActive ? `${css.navLink} ${css.active}` : css.navLink
							}>
							Add movie
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};
