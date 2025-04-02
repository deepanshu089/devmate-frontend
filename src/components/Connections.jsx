import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return (
    <div className="flex justify-center items-center min-h-screen pt-20 p-4 mb-16">
      <div className="w-full max-w-md border border-base-300/50 shadow-[0_0_50px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.3)] backdrop-blur-sm bg-base-100/80 dark:bg-base-100/90 rounded-xl p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-base-content/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            No Connections Yet
          </h2>
          <p className="text-base-content/70 text-sm max-w-sm">
            Start exploring and connecting with new people to build your network!
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-32 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Your Connections
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {connections.map((connection) => {
          const { _id, fName, lName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="p-4 sm:p-6 rounded-xl bg-base-100 shadow-lg border border-base-300/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-base-200 flex-shrink-0">
                  <img
                    alt="photo"
                    className="w-full h-full object-cover"
                    src={photoUrl}
                  />
                </div>

                <div className="flex-grow text-center sm:text-left space-y-1 sm:space-y-2">
                  <h2 className="text-lg sm:text-xl font-bold truncate">{fName + " " + lName}</h2>
                  {age && gender && (
                    <p className="text-sm sm:text-base text-base-content/70">{age + ", " + gender}</p>
                  )}
                  <p className="text-sm sm:text-base text-base-content/80 line-clamp-2">{about}</p>
                  <Link
                    to={"/chat/" + _id}
                    className="btn btn-sm sm:btn-md btn-primary w-full sm:w-auto mt-2"
                  >
                    Start Chat
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;