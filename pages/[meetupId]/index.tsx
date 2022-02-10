import { MongoClient, ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Meetup } from "../../types/types";

interface IMeetupDetailsProps {
  meetup: Meetup;
}

const MeetupDetails = (props: IMeetupDetailsProps) => {
  const { meetup } = props;

  return (
    <>
      <Head>
        <title>A Second meetup</title>
      </Head>

      <MeetupDetail
        img={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
};
export default MeetupDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("in getStaticPaths");
  // will run just on the server side so no problem to add credentials here
  const client = await MongoClient.connect(
    "mongodb+srv://shaharsn:shahar300688@cluster0.hxgsc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  console.log("meetups = " + JSON.stringify(meetups));

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("in getStaticProps");
  let meetupId = context.params?.meetupId;

  if (meetupId && Array.isArray(meetupId)) {
    meetupId = meetupId[0];
  }

  // will run just on the server side so no problem to add credentials here
  const client = await MongoClient.connect(
    "mongodb+srv://shaharsn:shahar300688@cluster0.hxgsc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  console.log("meetups = " + JSON.stringify(selectedMeetup));

  return {
    props: {
      meetup: {
        id: meetupId,
        image: selectedMeetup?.image,
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        description: selectedMeetup?.description,
      },
    },
  };
};
