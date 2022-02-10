import { Meetup } from "../../types/types";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

interface IMeetupListProps {
  meetups: Meetup[];
}

function MeetupList(props: IMeetupListProps) {
  const { meetups } = props;

  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
