import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Edit, Share2, Users, MessageSquare, MapPin } from "lucide-react";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 p-4 pt-20 font-sans antialiased flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Main Profile Card */}
        <Card className="border border-base-300/50 shadow-[0_0_50px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_0_rgba(0,0,0,0.3)] backdrop-blur-sm bg-base-100/80 dark:bg-base-100/90">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Left Side - Photo */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-lg overflow-hidden ring-2 ring-primary/20 dark:ring-primary/40 transition-all duration-300 hover:ring-primary/40 dark:hover:ring-primary/60">
                  <img
                    src={user?.photoUrl || "https://thumbs.dreamstime.com/b/default-profile-picture-icon-high-resolution-high-resolution-default-profile-picture-icon-symbolizing-no-display-picture-360167031.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 flex justify-center gap-3 max-w-md mx-auto">
                  <Link to="/edit-profile" className="flex-1">
                    <Button 
                      className="w-full h-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 dark:shadow-primary/40 hover:shadow-primary/40 dark:hover:shadow-primary/60 transition-all duration-300 font-medium"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-10 text-base border-base-300/50 hover:bg-base-200/50 transition-all duration-300 font-medium"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 min-w-0 w-full md:w-auto">
                {/* Profile Header */}
                <div className="mb-6 text-center md:text-left">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                    {user?.fName} {user?.lName}
                  </h1>
                  <p className="text-base-content/70 text-base font-medium mt-2">{user?.email}</p>
                </div>

                {/* Bio Section */}
                <Card className="mb-6 border-base-300/50 bg-white/50 dark:bg-zinc-800/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-primary tracking-tight">About Me</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base-content/80 text-base leading-relaxed font-medium">
                      {user?.about || "No bio available yet. Click edit to add your bio."}
                    </p>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center space-x-3 text-base text-base-content/70 font-medium">
                    <MapPin className="h-5 w-5" />
                    <span>{user?.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-base text-base-content/70 font-medium">
                    <MessageSquare className="h-5 w-5" />
                    <span>{user?.skills?.join(", ") || "No skills added"}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-base-300/50 bg-white/50 dark:bg-zinc-800/50">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-secondary tracking-tight">0</p>
                      <p className="text-sm text-base-content/70 font-medium uppercase tracking-wide">Following</p>
                    </CardContent>
                  </Card>
                  <Card className="border-base-300/50 bg-white/50 dark:bg-zinc-800/50">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-accent tracking-tight">0</p>
                      <p className="text-sm text-base-content/70 font-medium uppercase tracking-wide">Followers</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile
