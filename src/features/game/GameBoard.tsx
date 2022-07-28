import * as React from "react";
import * as Konva from "react-konva";
import { Box } from "@mui/material";
import ShapeFactory from "./shapes";
import useEventListener from "../../hooks/useEventListener";
import useTimeout from "../../hooks/useTimeout";
import { useAppDispatch } from "../../app/hooks";
import { nextPhase, setSide } from "./game.slice";
import { Size } from "../../interfaces";
import { error } from "../alert/alert.slice";

export default function GameBoard() {
    const ref = React.useRef<HTMLElement>(null);
    const [size, setSize] = React.useState<Size | null>(null);
    const dispatch = useAppDispatch();

    const shape = React.useCallback(() => {
        const createdShape = new ShapeFactory(size?.height, size?.width).create();
        dispatch(setSide(createdShape.getSide(window.innerWidth)));
        return createdShape.draw();
    }, [ref, size]);

    React.useEffect(() => {
        if (ref.current) {
            setSize({ height: ref.current?.clientHeight, width: ref.current?.clientWidth });
        }
    }, [ref]);

    const handleResize = React.useCallback(() => {
        if (ref.current) {
            setSize({ height: ref.current?.clientHeight, width: ref.current?.clientWidth });
        }
    }, [ref]);

    useEventListener("resize", handleResize);

    useTimeout(() => {
        dispatch(error("Too Late"));
        dispatch(nextPhase());
    }, 1000);

    return (
        <Box height="60vh" ref={ref} border={2}>
            {size && (
                <Konva.Stage height={size.height} width={size.width}>
                    <Konva.Layer>
                        {shape()}
                        <Konva.Line
                            x={size.width / 2}
                            y={0}
                            points={[0, 0, 0, size.height]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    </Konva.Layer>
                </Konva.Stage>
            )}
        </Box>
    );
}
