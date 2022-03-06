import React, { memo, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

// #region TYPES
interface BananaTooltipProps {
	/**
	 * The element to apply the tooltip
	 */
	children: JSX.Element;
	/**
	 * An element to display when hovering the tooltip children
	 */
	content: JSX.Element;
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
	tooltip__container: { display: "none", position: "absolute" },
});
// #endregion

// #region COMPONENT
/**
 * A simple React tooltip component
 */
export const BananaTooltip = memo(
	({ children, content }: BananaTooltipProps) => {
		const classes = useStyles();
		const ref = useRef<HTMLDivElement | null>(null);
		const rerender = useState(false)[1];
		const containerPosition = ref?.current?.getBoundingClientRect();

		useEffect(
			() => {
				// We need a rerender after component initialization in order to have a reference of parent div.
				rerender(true);
			},
			[rerender],
		);

		// #region RENDERING
		return (
			<div className={classes.component__container} ref={ref}>
				{children}
				{containerPosition && (
					<div className={classes.tooltip__container}>{content}</div>
				)}
			</div>
		);
		// #endregion
	},
);
// #endregion
