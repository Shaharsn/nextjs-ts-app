import { MongoClient } from "mongodb";
import { GetStaticProps } from "next";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { Meetup } from "../types/types";

interface IHomePageProps {
  meetups: Meetup[];
}

const HomePage = (props: IHomePageProps) => {
  const { meetups } = props;

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list active React Meetups"
        ></meta>
      </Head>
      <MeetupList meetups={meetups}></MeetupList>
    </>
  );
};
export default HomePage;

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_LIST,
    },
  };
};
*/

// Will run on the Server Side before page load so it will be ready for the client when the page load.
export const getStaticProps: GetStaticProps = async (context) => {
  // will run just on the server side so no problem to add credentials here
  const client = await MongoClient.connect(
    "mongodb+srv://shaharsn:shahar300688@cluster0.hxgsc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: result.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
      revalidate: 10 // means that the data will be refreshed from the Server side every 10 sec as long as it been changed so the page will be up-to date( IF NEEDED)
    },
  };
};
