import React from "react";

interface EmailAvatarProps {
  email: string;
}

const colors = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
  "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
];

const getColor = (email: string) => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const EmailAvatar: React.FC<EmailAvatarProps> = ({ email }) => {
  const firstChar = email.charAt(0).toUpperCase();
  const bgColor = getColor(email);

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold ${bgColor}`}
    >
      {firstChar}
    </div>
  );
};

export default EmailAvatar;
