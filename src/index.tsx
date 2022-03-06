import React, { memo, useEffect, useRef, useState } from "react";
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
// #endregion

// #region COMPONENT
/**
 * A simple React tooltip component
 */
export const BananaTooltip = memo(
	({ children, content }: BananaTooltipProps) => {
		const childElement = React.Children.only(children);
		const ref = useRef<HTMLElement>(null);
		const rerender = useState(false)[1];
		const elementPosition = ref?.current?.getBoundingClientRect();
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
				{elementPosition && (
					<div
						className={classes.tooltip__container}
						style={{
							bottom: `${elementPosition.height + 10}px`,
							left: 0,
						}}
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
