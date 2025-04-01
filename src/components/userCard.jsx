import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, fName, lName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <figure className="h-40 w-full overflow-hidden">
        <img
          src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-6 text-center">
        <h2 className="card-title text-2xl font-bold text-gray-900 dark:text-gray-100">
          {fName} {lName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {age} years old, {gender}
          </p>
        )}
        {skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        {about && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {about}
          </p>
        )}
        <div className="card-actions flex justify-center gap-4 mt-4">
          <button
            className="btn btn-outline btn-primary px-6 py-2"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary px-6 py-2"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;