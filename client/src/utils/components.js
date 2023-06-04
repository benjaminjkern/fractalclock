import { useMouseHover, useMousePress } from "./hooks";

export const ReactiveDiv = ({ reactiveStyle, style, ...props }) => {
    const { hover, hoverElementProps } = useMouseHover();
    const { press, pressElementProps } = useMousePress();

    return (
        <div
            {...hoverElementProps}
            {...pressElementProps}
            {...props}
            style={{
                ...style,
                ...(hover ? reactiveStyle.hover : null),
                ...(press ? reactiveStyle.press : null),
            }}
        />
    );
};
