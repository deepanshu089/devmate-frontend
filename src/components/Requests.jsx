import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { useToast } from "../context/ToastContext";
import confetti from "canvas-confetti";

const formatTimeAgo = (date) => {
  const now = new Date();
  const requestDate = new Date(date);
  const diff = now - requestDate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const relativeTime = days > 0 ? `${days} day${days === 1 ? '' : 's'} ago`
    : hours > 0 ? `${hours} hour${hours === 1 ? '' : 's'} ago`
    : minutes > 0 ? `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    : `${seconds} second${seconds === 1 ? '' : 's'} ago`;

  const exactTime = requestDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return { relativeTime, exactTime };
};

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      
      if (status === "accepted") {
        showToast("You are now friends!", "success");
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 }
        });
      } else if (status === "rejected") {
        showToast("Request rejected", "info");
      }
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, fName, lName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div key={_id} className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl bg-base-100 shadow-lg border border-base-300/50 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-base-200 flex-shrink-0">
                <img alt="photo" className="w-full h-full object-cover" src={photoUrl} />
              </div>

              <div className="flex-grow text-center sm:text-left space-y-3 sm:space-y-2">
                <h2 className="text-lg sm:text-xl font-bold truncate">{fName + " " + lName}</h2>
                {age && gender && (
                  <p className="text-sm sm:text-base text-base-content/70">{age + ", " + gender}</p>
                )}
                <p className="text-sm sm:text-base text-base-content/80 line-clamp-2">{about}</p>
                <div className="flex flex-col text-sm text-base-content/60 items-center sm:items-start gap-1">
                  <span>{formatTimeAgo(request.createdAt).relativeTime}</span>
                  <span className="text-xs">{formatTimeAgo(request.createdAt).exactTime}</span>
                </div>
                <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto">
                  <button
                    className="btn btn-sm sm:btn-md btn-outline hover:btn-error flex-1 sm:flex-initial"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-sm sm:btn-md btn-primary flex-1 sm:flex-initial"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;