import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Meetup } from "../../types/types";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetup: Meetup) => {
    // API internal call to the file under the api folder in this project
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);
    router.push("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
};
export default NewMeetupPage;
