import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Camera, User, Calendar, MapPin, Briefcase, MessageSquare } from "lucide-react";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    fName: user?.fName || "",
    lName: user?.lName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills?.join(", ") || "",
    location: user?.location || "",
    photoUrl: user?.photoUrl || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formattedData = { ...formData };

      Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === "") {
          delete formattedData[key];
        }
      });

      if (formattedData.skills) {
        formattedData.skills = formattedData.skills
          .split(",")
          .map(skill => skill.trim())
          .filter(skill => skill !== "");
      }

      if (formattedData.age) {
        formattedData.age = parseInt(formattedData.age);
      }

      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        formattedData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess(response.data.message);
      dispatch(addUser(response.data.data));
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please check your input and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 p-4 pt-20 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="border-none shadow-[0_0_50px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.3)] backdrop-blur-sm bg-base-100/80 dark:bg-base-100/90 mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">Edit Profile</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="h-8 w-8 hover:bg-base-200/50 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </CardHeader>
        </Card>

        {/* Main Form */}
        <Card className="border border-base-300/50 shadow-[0_0_50px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.3)] backdrop-blur-sm bg-base-100/80 dark:bg-base-100/90">
          <CardContent className="p-4">
            {error && (
              <div className="mb-3 p-2 bg-red-50/50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-3 p-2 bg-green-50/50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-md text-sm text-green-600 dark:text-green-400 font-medium">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Photo Section */}
              <div className="md:col-span-2 flex items-center space-x-4">
                <div className="relative group">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20 dark:ring-primary/40 transition-all duration-300 group-hover:ring-primary/40 dark:group-hover:ring-primary/60">
                    <AvatarImage src={formData.photoUrl || "https://via.placeholder.com/150"} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 dark:bg-primary/20 font-medium">
                      {formData.fName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 shadow-lg shadow-primary/20 dark:shadow-primary/40 transition-all duration-300 group-hover:shadow-primary/40 dark:group-hover:shadow-primary/60">
                    <Camera className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <Label htmlFor="photoUrl" className="text-sm text-base-content/80 font-medium tracking-tight">Profile Photo URL</Label>
                  <div className="relative">
                    <Input
                      id="photoUrl"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium placeholder:font-normal"
                    />
                    <Camera className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="space-y-1">
                <Label htmlFor="fName" className="text-sm text-base-content/80 font-medium tracking-tight">First Name</Label>
                <div className="relative">
                  <Input
                    id="fName"
                    name="fName"
                    value={formData.fName}
                    onChange={handleChange}
                    required
                    className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium"
                  />
                  <User className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="lName" className="text-sm text-base-content/80 font-medium tracking-tight">Last Name</Label>
                <div className="relative">
                  <Input
                    id="lName"
                    name="lName"
                    value={formData.lName}
                    onChange={handleChange}
                    required
                    className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium"
                  />
                  <User className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="space-y-1">
                <Label htmlFor="age" className="text-sm text-base-content/80 font-medium tracking-tight">Age</Label>
                <div className="relative">
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium"
                  />
                  <Calendar className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="gender" className="text-sm text-base-content/80 font-medium tracking-tight">Gender</Label>
                <Select name="gender" value={formData.gender} onValueChange={(value) => handleChange({ target: { name: 'gender', value } })}>
                  <SelectTrigger className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium">
                    <User className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Select gender" className="font-medium" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-800/50 border-base-300/50 font-medium">
                    <SelectItem value="Male" className="font-medium">Male</SelectItem>
                    <SelectItem value="Female" className="font-medium">Female</SelectItem>
                    <SelectItem value="Other" className="font-medium">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* About */}
              <div className="md:col-span-2 space-y-1">
                <Label htmlFor="about" className="text-sm text-base-content/80 font-medium tracking-tight">About</Label>
                <div className="relative">
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    className="h-20 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium leading-relaxed placeholder:font-normal"
                  />
                  <MessageSquare className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <Label htmlFor="skills" className="text-sm text-base-content/80 font-medium tracking-tight">Skills</Label>
                <div className="relative">
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium placeholder:font-normal"
                  />
                  <Briefcase className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <Label htmlFor="location" className="text-sm text-base-content/80 font-medium tracking-tight">Location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Your location"
                    className="h-8 pl-8 text-sm bg-white dark:bg-zinc-800/50 border-base-300/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 font-medium placeholder:font-normal"
                  />
                  <MapPin className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center">
                <Button 
                  type="submit" 
                  className="h-8 px-6 text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 dark:shadow-primary/40 hover:shadow-primary/40 dark:hover:shadow-primary/60 transition-all duration-300 font-medium tracking-wide"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileForm; 