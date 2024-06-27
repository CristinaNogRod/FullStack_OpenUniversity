import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const courseParts: CoursePart[] = props.courseParts;
  return (
    <div>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  );
};

export default Content;
