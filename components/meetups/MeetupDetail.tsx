/* eslint-disable @next/next/no-img-element */
import classes from "./MeetupDetail.module.css";

interface IMeetupDetailProps {
  img?: string;
  title?: string;
  address?: string;
  description?: string;
}

const MeetupDetail = (props: IMeetupDetailProps) => {
  const { img, title, address, description } = props;

  return (
    <section className={classes.detail}>
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};
export default MeetupDetail;
