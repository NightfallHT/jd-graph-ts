import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import solutionArray from "./SolutionArray";
import Latex from "react-latex";

export interface ItemProps {
  // id: number;
  header: string;
  explanation: string;
  solution: string[];
}
interface CarouselProps {
  itemArr: ItemProps[];
}

export default function SolutionCarousel(props: CarouselProps) {
  return (
    <Carousel
      autoPlay={false}
      animation={"slide"}
      cycleNavigation={false}
      navButtonsAlwaysVisible={true}
      height={"800px"}
    >
      {props.itemArr.map((item, i) => (
        <Item
          key={i}
          header={item.header}
          explanation={item.explanation}
          solution={item.solution}
        />
      ))}
    </Carousel>
  );
}

function Item(props: ItemProps) {
  return (
    <div className="MuiPaper-root">
      <h2>{props.header}</h2>
      <p>{props.explanation}</p>
      {props.solution.map((item, i) => (
        <div key={i}>
          {" "}
          <Latex>{item}</Latex> <br></br>
        </div>
      ))}
    </div>
  );
}
