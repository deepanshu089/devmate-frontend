import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";
import { Card, CardContent } from "./ui/card";
import { Users } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  
  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] p-4 mb-16">
        <Card className="w-full max-w-md border border-base-300/50 shadow-[0_0_50px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.3)] backdrop-blur-sm bg-base-100/80 dark:bg-base-100/90">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
              <Users className="w-8 h-8 text-base-content/70" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              No More Users
            </h2>
            <p className="text-base-content/70 text-sm max-w-sm">
              You've seen all available users for now. Check back later for new potential connections!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] p-4 mb-16">
      <div className="w-full max-w-md">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;