import React, { CSSProperties, memo, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

// #region TYPES
export interface BananaTooltipProps {
	/**
	 * The element to apply the tooltip
	 */
	children: JSX.Element;
	/**
	 * An element to display when hovering the tooltip children
	 */
	content: JSX.Element;
	/**
	 * Defines where the tooltip should be displayed according to the children position
	 */
	position?: "bottom" | "bottomEnd" | "bottomStart" | "left" | "leftEnd" | "leftStart" | "right" | "rightEnd" | "rightStart" | "top" | "topEnd" | "topStart";
}
// #endregion

// #region CONSTANTS
const useStyles = createUseStyles({
	component__container: {
		"&:hover": {
			"& $tooltip__container": { display: "block" },
			cursor: "pointer",
		},
		position: "relative",
	},
	tooltip__container: { display: "none", position: "absolute", width: "fit-content" },
});

// So sad I didn't find how to pass "containedPosition" as a useStyles prop :(
const tooltipPosition = (elementReference: React.RefObject<HTMLElement>, position: BananaTooltipProps["position"]) => {
	const elementPosition: DOMRect | undefined = elementReference.current?.getBoundingClientRect();
	const computedStyle = elementReference.current ? window.getComputedStyle(elementReference.current) : undefined;

	if (elementPosition && computedStyle) {
		switch (position) {
		case "topStart":

			return {
				bottom: `calc(${elementPosition.height + 10}px + ${computedStyle.marginBottom})`,
				left: computedStyle.marginLeft,
			};
		case "top":

			return {
				bottom: `calc(${elementPosition.height + 10}px + ${computedStyle.marginBottom})`,
				left: `calc(-100% + ${computedStyle.marginLeft})`,
				margin: "auto",
				right: `calc(-100% + ${computedStyle.marginRight}`,
				textAlign: "center" as CSSProperties["textAlign"],
			};
		case "topEnd":

			return {
				bottom: `calc(${elementPosition?.height + 10}px + ${computedStyle.marginBottom})`,
				right: computedStyle.marginRight,
				textAlign: "right" as CSSProperties["textAlign"],
			};
		case "rightStart":

			return {
				left: `calc(${computedStyle.marginLeft} + ${elementPosition.width + 10}px)`,
				top: computedStyle.marginTop,
			};
		case "right":

			return {
				left: `calc(${computedStyle.marginLeft} + ${elementPosition.width + 10}px)`,
				top: "50%",
				transform: "translate(0, -50%)",
			};
		case "rightEnd":

			return {
				bottom: computedStyle.marginBottom,
				left: `calc(${computedStyle.marginLeft} + ${elementPosition.width + 10}px)`,
			};
		case "bottomEnd":

			return {
				right: computedStyle.marginRight,
				top: `calc(${computedStyle.marginTop} + ${elementPosition.height + 10}px)`,
			};
		case "bottom":

			return {
				left: `calc(-100% + ${computedStyle.marginLeft})`,
				margin: "auto",
				right: `calc(-100% + ${computedStyle.marginRight})`,
				textAlign: "center" as CSSProperties["textAlign"],
				top: `calc(${computedStyle.marginTop} + ${elementPosition.height + 10}px)`,
			};
		case "bottomStart":

			return {
				left: computedStyle.marginLeft,
				top: `calc(${computedStyle.marginTop} + ${elementPosition.height + 10}px)`,
			};
		case "leftEnd":

			return {
				bottom: computedStyle.marginBottom,
				right: `calc(${computedStyle.marginRight} + ${elementPosition.width + 10}px)`,
			};
		case "left":

			return {
				right: `calc(${computedStyle.marginRight} + ${elementPosition.width + 10}px)`,
				top: "50%",
				transform: "translate(0, -50%)",
			};
		case "leftStart":

			return {
				right: `calc(${computedStyle.marginRight} + ${elementPosition.width + 10}px)`,
				top: computedStyle.marginTop,
			};
		default:

			return {
				bottom: `calc(${elementPosition.height + 10}px + ${computedStyle.marginBottom})`,
				left: `calc(-100% + ${computedStyle.marginLeft})`,
				margin: "auto",
				right: `calc(-100% + ${computedStyle.marginRight}`,
				textAlign: "center" as CSSProperties["textAlign"],
			};
		}
	} else {

		return {};
	}
};
// #endregion

// #region COMPONENT
/**
 * A simple React tooltip component
 */
export const BananaTooltip = memo(
	({ children, content, position }: BananaTooltipProps) => {
		const childElement = React.Children.only(children);
		const ref = useRef<HTMLElement>(null);
		const rerender = useState(false)[1];
		const childPosition = ref?.current?.getBoundingClientRect();
		const classes = useStyles();

		useEffect(
			() => {
				// We need a rerender after component initialization in order to have a reference of parent div.
				rerender(true);
			},
			[rerender],
		);

		// #region RENDERING
		return (
			<div className={classes.component__container} >
				{React.cloneElement(childElement, { ref: ref })}
				{childPosition && (
					<div
						className={classes.tooltip__container}
						style={ref ? tooltipPosition(ref, position) : {}}
					>
						{content}
					</div>
				)}
			</div>
		);
		// #endregion
	},
);
// #endregion
