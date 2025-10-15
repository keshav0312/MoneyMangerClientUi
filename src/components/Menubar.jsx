import React, { useState, useContext } from "react";
import { LogOut, User, Menu, X, Bell, TrendingUp, Settings, CreditCard, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.jpg";

export const MenuBar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const closeSideMenu = () => {
    setOpenSideMenu(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl border-b border-white/20 backdrop-blur-sm relative z-40">
        <div className="flex justify-between items-center h-16 px-6 w-full">
          {/* Left Side with Enhanced Logo */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-10 rounded-xl shadow-2xl relative z-10 border-2 border-white/30 transform group-hover:scale-110 transition-all duration-300" 
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white z-20 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white drop-shadow-lg">Money Manager</span>
              <span className="text-xs text-white/70 font-medium">Smart Finance Control</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            {/* Quick Stats Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              <span className="text-white text-sm font-medium">Active</span>
            </div>

            {/* Notifications Bell */}
            <button className="hidden md:flex relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white group">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-purple-600 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-purple-600"></div>
            </button>

            {/* Enhanced Profile Image with Fixed Menu */}
            <div className="relative group hidden md:block">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl border-2 border-white/40 group-hover:border-white/80 group-hover:scale-110 transition-all duration-300"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>

              {/* Active Status Dot */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>

              {/* Profile Popup - Fixed to stay open until clicked outside */}
              {showProfileMenu && (
                <>
                  {/* Backdrop to close when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  
                  {/* Menu Content */}
                  <div className="absolute right-0 top-full mt-2 w-72 bg-gradient-to-br from-white to-gray-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Profile Header */}
                    <div className="px-5 pb-3 border-b border-gray-200/60">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-lg">
                          {user?.profileImageUrl ? (
                            <img
                              src={user.profileImageUrl}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{user?.fullName}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-600 font-medium">Online</span>
                      </div>
                    </div>
                    
                    {/* Menu Options */}
                    <div className="space-y-1 px-2 pt-2">
                      <button
                        onClick={() => {
                          navigate("/income");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 rounded-xl transition-all duration-200 group"
                      >
                        <User className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                        <span>My Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 rounded-xl transition-all duration-200 group"
                      >
                        <PieChart className="h-4 w-4 text-gray-400 group-hover:text-purple-500" />
                        <span>Dashboard</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/expense");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50/80 hover:text-green-600 rounded-xl transition-all duration-200 group"
                      >
                        <CreditCard className="h-4 w-4 text-gray-400 group-hover:text-green-500" />
                        <span>Transactions</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate("/income");
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50/80 hover:text-orange-600 rounded-xl transition-all duration-200 group"
                      >
                        <Settings className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                        <span>Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-200/60 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200 group"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Enhanced Hamburger menu for mobile */}
            <button
              onClick={toggleSideMenu}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white md:hidden group"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeSideMenu}
          />
          
          {/* Enhanced Sidebar Container */}
          <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-purple-900/30 to-gray-800 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Enhanced Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={logo} alt="Logo" className="h-10 w-10 rounded-xl shadow-lg" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-purple-600"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">Money Manager</span>
                  <span className="text-xs text-white/70">Navigation</span>
                </div>
              </div>
              <button 
                onClick={closeSideMenu}
                className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Enhanced Mobile Profile Section */}
            <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-lg">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm truncate">{user?.fullName}</p>
                  <p className="text-gray-300 text-xs truncate mt-1">{user?.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400">Active</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigate("/profile");
                    closeSideMenu();
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm py-2.5 rounded-xl transition-all duration-200 font-medium"
                >
                  My Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm py-2.5 rounded-xl transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Enhanced Navigation Items for Mobile */}
            <div className="p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-400" />
                Quick Access
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Dashboard', icon: PieChart, color: 'from-blue-500 to-cyan-500' },
                  { name: 'category', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
                  { name: 'income', icon: Settings, color: 'from-purple-500 to-pink-500' },
                  { name: 'expense', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
                  { name: 'filter', icon: Settings, color: 'from-gray-500 to-gray-700' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(`/${item.name.toLowerCase()}`);
                      closeSideMenu();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r hover:scale-105 transform transition-all duration-200 shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-md`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};