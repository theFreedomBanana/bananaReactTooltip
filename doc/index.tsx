import React from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { BananaTooltip } from "../src";

// #region CONSTANTS
const useStyles = createUseStyles({
	doc__container: { display: "flex", justifyContent: "center" },
});
// #endregion

const DocApp = () => {
	const classes = useStyles();

	return (
		<div className={classes.doc__container}>
			<div>
				<h1>Documentation</h1>
				<div>
					<BananaTooltip
						content={<div>Hello World!</div>}
					>
						<div>
							<h3>Basic</h3>
						</div>
					</BananaTooltip>
				</div>
			</div>
		</div>
	);
};

ReactDOM.render(
	<DocApp />,
	document.getElementById("root"),
);
