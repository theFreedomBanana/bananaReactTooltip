import classnames from "classnames";
import React, { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

// #region TYPES
export interface BananaTooltipProps {
	/**
	 * An optionnal animation to when the tooltip appears
	 */
	readonly animation?: "ease-in" | "ease-out" | "linear";
	/**
	 * The element to apply the tooltip
	 */
	readonly children: JSX.Element;
	/**
	 * An element to display when hovering the tooltip children
	 */
	readonly content: JSX.Element;
	/**
	 * A delay in milliseconds before the components shows
	 */
	readonly delay?: number;
	/**
	 * Defines where the tooltip should be displayed according to the children position
	 */
	readonly position?: "bottom" | "bottomEnd" | "bottomStart" | "left" | "leftEnd" | "leftStart" | "right" | "rightEnd" | "rightStart" | "top" | "topEnd" | "topStart";
}
// #endregion

// #region CONSTANTS
const useStyles = createUseStyles({
	"@keyframes enter": {
		"0%": {
			opacity: 0.1,
			transform: "scale(0)",
		},
		"100%": {
			opacity: 1,
			transform: "scale(1)",
		},
	},
	component__container: {
		"&:hover": {
			"& $tooltip": { cursor: "pointer", display: "block" },
			"& $tooltip--animated": { "animation-duration": "0.2s", "animation-name": "$enter" },
			"& $tooltip--easeIn": { "animation-timing-function": "ease-in" },
			"& $tooltip--easeOut": { "animation-timing-function": "ease-out" },
			"& $tooltip--linear": { "animation-timing-function": "linear" },
		},
		position: "relative",
	},
	tooltip: { display: "none", position: "absolute", width: "fit-content" },
	"tooltip--animated": {},
	"tooltip--linear": {},
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
	({ animation, children, content, delay, position }: BananaTooltipProps) => {
		const childElement = React.Children.only(children);
		const contentElement = React.Children.only(content);
		const childRef = useRef<HTMLElement>(null);
		const rerender = useState(false)[1];
		const [isTimeoutOver, setTimeoutOver] = useState<boolean>(delay ? false : true);
		const childPosition = childRef?.current?.getBoundingClientRect();
		const classes = useStyles();

		useEffect(
			() => {
				// We need a rerender after component initialization in order to have a reference of parent div.
				rerender(true);
			},
			[rerender],
		);

		const timeoutBeforeDisplay = useCallback(
			(timeout: number) => {
				setTimeout(
					() => {
						setTimeoutOver(true);
					},
					timeout,
				);
			},
			[setTimeoutOver],
		);

		// #region RENDERING
		return (
			<div className={classes.component__container} >
				{React.cloneElement(
					childElement,
					{
						onMouseEnter: () => {
							if (delay) {
								timeoutBeforeDisplay(delay);
							}
						},
						onMouseLeave: () => {
							if (delay) {
								setTimeoutOver(false);
							}
						},
						ref: childRef,
					}
				)}
				{childPosition && isTimeoutOver && (
					React.cloneElement(
						contentElement,
						{
							className: classnames(
								classes.tooltip,
								contentElement.props.className,
								animation ? classes["tooltip--animated" as keyof typeof classes] : "",
								animation ? `${classes["tooltip--animated"]} ${classes[(`tooltip--${animation}` as keyof typeof classes)]}` : "",
							),
							style: childRef ? tooltipPosition(childRef, position) : {},
						}
					)
				)}
			</div>
		);
		// #endregion
	},
);
// #endregion

