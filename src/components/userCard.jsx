import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useToast } from "../context/ToastContext";

const UserCard = ({ user }) => {
  const { _id, fName, lName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (status === "interested") {
        showToast("Connection Request Sent", "success");
      }
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden border border-base-300/50 hover:shadow-2xl transition-all duration-300">
      <div className="aspect-square w-full relative overflow-hidden bg-base-200">
        <img
          src={photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fName}`}
          alt={`${fName}'s photo`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {fName} {lName}
          </h2>
          {age && gender && (
            <p className="text-base-content/70 text-sm font-medium mt-1">
              {age} years • {gender}
            </p>
          )}
        </div>

        {about && (
          <p className="text-base-content/80 text-sm line-clamp-2 text-center">
            {about}
          </p>
        )}

        {skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            className="btn btn-outline hover:btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserCard;