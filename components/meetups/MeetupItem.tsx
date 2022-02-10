/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

interface IMeetupItemProps {
  id?: string;
  image?: string;
  title?: string;
  address?: string;
}

function MeetupItem(props: IMeetupItemProps) {
  const { id, image, title, address } = props;

  const router = useRouter();

  const showDetailHandler = () => {
    router.push("/" + id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
