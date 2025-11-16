import { Button } from "./ui/button";
import { Inbox, Bookmark, Activity } from "lucide-react";
import { UserProfile, Screen } from "../App";
import BottomNav from "./BottomNav";

interface DashboardProps {
  profile: UserProfile;
  savedCount: number;
  onNavigate: (screen: Screen) => void;
}

export default function Dashboard({
  profile,
  savedCount,
  onNavigate,
}: DashboardProps) {
  const avatarSource = profile.avatar || profile.photoUrl;
  const isImageAvatar =
    !!avatarSource &&
    (avatarSource.startsWith("http") ||
      avatarSource.startsWith("blob:") ||
      avatarSource.startsWith("data:"));

  const firstName = profile.name?.split(" ")[0] || "Friend";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <button className="px-5 py-2 rounded-full border border-gray-200 text-gray-800 font-semibold shadow-sm text-sm">
            Stop Agent
          </button>
          <span className="text-sm text-gray-500">Welcome back,</span>
        </div>

        <h3 className="text-center text-xl font-semibold text-gray-900 mt-0 mb-3">
          {firstName}
        </h3>

        {/* AVATAR + STATUS */}
        <div className="flex flex-col items-center mt-2">
          {/* Avatar */}
          <div className="w-40 h-40 mb-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl overflow-hidden">
              {isImageAvatar ? (
                <img
                  src={avatarSource}
                  alt="Agent avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl text-white">
                  {profile.avatar || "🙂"}
                </span>
              )}
            </div>
          </div>

          {/* Agent Active badge UNDER the image */}
          <div className="mt-3 bg-white px-4 py-1 rounded-full shadow-md border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-700">Agent Active</p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 mt-3 mb-4">
            Ready to discover opportunities?
          </p>
        </div>

        {/* STATS + SUMMARY */}
        <div className="mt-5 space-y-5">
          {/* Three stats cards */}
          <div className="flex justify-between gap-3">
            {/* Saved */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mb-2 mx-auto">
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 leading-none">
                {savedCount}
              </div>
              <div className="text-xs text-gray-500 mt-1">Saved</div>
            </div>

            {/* Inbox */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-50 mb-2 mx-auto">
                <Inbox className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 leading-none">
                8
              </div>
              <div className="text-xs text-gray-500 mt-1">Inbox</div>
            </div>

            {/* Actions */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 mb-2 mx-auto">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 leading-none">
                24
              </div>
              <div className="text-xs text-gray-500 mt-1">Actions</div>
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-gray-100">
            <div className="text-sm text-gray-800">
              <span className="font-medium">{savedCount} saved</span> •{" "}
              <span className="font-medium">8 in inbox</span> •{" "}
              <span className="font-medium">127 scanned</span>
            </div>
          </div>
        </div>

        {/* CTA + TIP */}
        <div className="space-y-4 mt-6">
          <Button
            onClick={() => onNavigate("inbox")}
            className="w-full rounded-full py-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-base text-white shadow-md font-semibold tracking-wide"
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <div className="text-lg font-bold leading-tight">
                  Open My Inbox
                </div>
              </div>
              <Inbox className="w-6 h-6" />
            </div>
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900 text-center">
              💡
              <span className="ml-1">
                Clear your inbox regularly to receive new opportunities
              </span>
            </p>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
