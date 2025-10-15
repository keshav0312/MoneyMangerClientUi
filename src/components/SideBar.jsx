import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { SIDE_NAV_DATA } from "../assets/assets";

const SideBar = ({ onMobileItemClick }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    // Close mobile sidebar when an item is clicked
    if (onMobileItemClick && window.innerWidth < 768) {
      onMobileItemClick();
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white h-full shadow-2xl flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white via-transparent to-white"></div>
      
      {/* Enhanced User Profile Section */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt={user?.firstName || "User"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-2xl">
                  {(user?.firstName?.[0] || user?.email?.[0] || "U").toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-lg truncate drop-shadow-md bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {user?.fullName || "Welcome Back!"}
            </h2>
            <p className="text-gray-300 text-sm truncate mt-1">
              {user?.email || "Ready to manage your finances"}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-medium">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced App Title */}
      <div className="p-5 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm relative z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            💰 Money Manager Pro
          </h1>
          <p className="text-gray-400 text-xs mt-2 font-medium tracking-wide">
            CONTROL • ANALYZE • GROW
          </p>
        </div>
      </div>

      {/* Enhanced Navigation Items */}
      <nav className="p-4 space-y-3 flex-1 relative z-10">
        {SIDE_NAV_DATA.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 ease-out cursor-pointer group relative overflow-hidden border ${
                isActive 
                  ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 shadow-2xl scale-[1.02] border-cyan-400/50 backdrop-blur-sm" 
                  : "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-blue-500/10 hover:to-purple-500/10 hover:shadow-xl hover:scale-[1.01] border-transparent hover:border-cyan-400/30 backdrop-blur-sm"
              }`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500 -z-10 ${
                isActive ? "opacity-20" : "opacity-0 group-hover:opacity-10"
              }`}></div>
              
              {/* Icon with enhanced styling */}
              <div className={`p-3 rounded-xl transition-all duration-500 shadow-lg ${
                isActive 
                  ? "bg-white/20 backdrop-blur-sm transform rotate-12" 
                  : "bg-white/5 group-hover:bg-white/20 group-hover:transform group-hover:rotate-12"
              }`}>
                <item.icon 
                  size={22} 
                  className={`transition-all duration-500 ${
                    isActive 
                      ? "text-cyan-300 scale-110 drop-shadow-lg" 
                      : "text-gray-400 group-hover:text-cyan-300 group-hover:scale-110"
                  }`} 
                />
              </div>
              
              {/* Label with enhanced styling */}
              <span className={`font-semibold transition-all duration-500 flex-1 ${
                isActive 
                  ? "text-cyan-100 translate-x-2 drop-shadow-md" 
                  : "text-gray-300 group-hover:text-cyan-100 group-hover:translate-x-2"
              }`}>
                {item.label === "/category" ? "Categories" : 
                 item.label === "filtered" ? "Filters & Reports" : 
                 item.label.charAt(0).toUpperCase() + item.label.slice(1)}
              </span>
              
              {/* Active indicator / Hover arrow */}
              {isActive ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              ) : (
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-500">
                  <svg className="w-5 h-5 text-cyan-400 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Enhanced Active Status Panel */}
      <div className="p-5 border-t border-white/10 bg-gradient-to-r from-slate-800/50 to-purple-900/50 backdrop-blur-sm relative z-10">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          Navigation Status
          <div className="ml-auto text-xs text-cyan-400 font-mono">v2.0</div>
        </h3>
        <div className="space-y-3 text-sm">
          {SIDE_NAV_DATA.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 transition-all duration-300 px-3 py-2 rounded-xl ${
                  isActive ? "bg-cyan-500/10 border-l-4 border-cyan-400" : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50" : "bg-gray-600"
                  }`}
                ></div>
                <span
                  className={`flex-1 transition-all duration-300 font-medium ${
                    isActive ? "text-cyan-300" : "text-gray-400"
                  }`}
                >
                  {item.label === "/category"
                    ? "Categories"
                    : item.label === "filtered"
                    ? "Filters & Reports"
                    : item.label}
                </span>
                {isActive && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Quick Stats Footer */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">Session</span>
            <span className="text-cyan-400 font-mono font-bold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;