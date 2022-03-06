import React from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";
import { BananaTooltip, BananaTooltipProps } from "../src";

// #region CONSTANTS
const useStyles = createUseStyles({
	doc__container: { display: "flex", justifyContent: "center" },
	doc__exampleContainer: { display: "flex", justifyContent: "space-between", margin: "100px 0" },
	doc__exampleTitle: { backgroundColor: "#180574", border: "1px solid #575757", borderRadius: "4px", color: "#e5e5e5", margin: "40px", padding: "30px" },
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
						<h3 className={classes.doc__exampleTitle}>Basic</h3>
					</BananaTooltip>
					<BananaTooltip
						content={
							<div className={classes.doc__exampleTooltip}>{
								`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
								Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
								when an unknown printer took a galley of type and scrambled it to make a type specimen book.
								It has survived not only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged. It was popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing software like Aldus PageMaker
								including versions of Lorem Ipsum.`
							}</div>
						}
					>
						<h3 className={classes.doc__exampleTitle}>With Style</h3>
					</BananaTooltip>
					<BananaTooltip
						content={
							<div className={classes.doc__exampleTooltip}>
								It should take some time........................................
							</div>
						}
						delay={750}
					>
						<h3 className={classes.doc__exampleTitle}>With Delay</h3>
					</BananaTooltip>
				</div>
				<div className={classes.doc__exampleContainer}>
					{(["topStart", "top", "topEnd"] as BananaTooltipProps["position"][]).map((position) => (
						<BananaTooltip
							content={<div className={classes.doc__exampleTooltip}>{position}</div>}
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
				<div className={classes.doc__exampleContainer}>
					<BananaTooltip
						animation={"ease-in"}
						content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
						position={"top"}
					>
						<h3 className={classes.doc__exampleTitle}>Ease-in</h3>
					</BananaTooltip>
					<BananaTooltip
						animation={"linear"}
						content={<div className={classes.doc__exampleTooltip}>{
							`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
								Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
								when an unknown printer took a galley of type and scrambled it to make a type specimen book.
								It has survived not only five centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged. It was popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing software like Aldus PageMaker
								including versions of Lorem Ipsum.`
						}</div>}
						position={"top"}
					>
						<h3 className={classes.doc__exampleTitle}>Linear with lots of content</h3>
					</BananaTooltip>
					<BananaTooltip
						animation={"ease-out"}
						content={<div className={classes.doc__exampleTooltip}>Hello World!</div>}
						position={"top"}
					>
						<h3 className={classes.doc__exampleTitle}>Ease-in</h3>
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
