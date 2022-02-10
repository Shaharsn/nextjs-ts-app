import { ReactNode } from "react";
import classes from "./Card.module.css";

interface ICardProps {
  children: ReactNode;
}

const Card = (props: ICardProps) => {
  const { children } = props;

  return <div className={classes.card}>{children}</div>;
};

export default Card;
