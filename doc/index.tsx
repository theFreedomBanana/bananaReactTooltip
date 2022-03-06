import React from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { BananaTooltip, BananaTooltipProps } from "../src";

// #region CONSTANTS
const useStyles = createUseStyles({
	doc__container: { display: "flex", justifyContent: "center" },
	doc__exampleContainer: { display: "flex", justifyContent: "space-between", margin: "100px 0" },
	doc__exampleTitle: { backgroundColor: "#180574", border: "1px solid #575757", borderRadius: "4px", color: "#e5e5e5", margin: "0 60px", padding: "30px" },
	doc__exampleTooltip: { backgroundColor: "#828282", borderRadius: "6px", color: "#FFFFFF", padding: "8px" },
});
// #endregion

const DocApp = () => {
	const classes = useStyles();

	return (
		<div className={classes.doc__container}>
			<div>
				<h1>Banana Tooltip Documentation</h1>
				<div className={classes.doc__exampleContainer}>
					<BananaTooltip
						content={<div>Hello World!</div>}
					>
						<div>
							<h3 className={classes.doc__exampleTitle}>Basic</h3>
						</div>
					</BananaTooltip>
					<BananaTooltip
						content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
					>
						<div>
							<h3 className={classes.doc__exampleTitle}>With style</h3>
						</div>
					</BananaTooltip>
				</div>
				<div className={classes.doc__exampleContainer}>
					{(["topStart", "top", "topEnd"] as BananaTooltipProps["position"][]).map((position) => (
						<BananaTooltip
							content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
							key={position}
							position={position}
						>
							<h3 className={classes.doc__exampleTitle}>{position}</h3>
						</BananaTooltip>
					))}
				</div>
				<div className={classes.doc__exampleContainer}>
					{(["bottomStart", "bottom", "bottomEnd"] as BananaTooltipProps["position"][]).map((position) => (
						<BananaTooltip
							content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
							key={position}
							position={position}
						>
							<h3 className={classes.doc__exampleTitle}>{position}</h3>
						</BananaTooltip>
					))}
				</div>
				<div className={classes.doc__exampleContainer}>
					{(["leftStart", "left", "leftEnd"] as BananaTooltipProps["position"][]).map((position) => (
						<BananaTooltip
							content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
							key={position}
							position={position}
						>
							<h3 className={classes.doc__exampleTitle}>{position}</h3>
						</BananaTooltip>
					))}
				</div>
				<div className={classes.doc__exampleContainer}>
					{(["rightStart", "right", "rightEnd"] as BananaTooltipProps["position"][]).map((position) => (
						<BananaTooltip
							content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
							key={position}
							position={position}
						>
							<h3 className={classes.doc__exampleTitle}>{position}</h3>
						</BananaTooltip>
					))}
				</div>
			</div>
		</div>
	);
};

ReactDOM.render(
	<DocApp />,
	document.getElementById("root"),
);
