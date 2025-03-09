import React, { useState } from 'react';

function TextToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const teamMembers = [
    { name: "Ngọc Maii", role: "Mentor", image: "./public/Members/team-member-1.jpg" },
    { name: "Trần Khuyến", role: "Takecare", image: "./public/Members/team-member-1.jpg" },
    { name: "Ngọc Mai", role: "Takecare", image: "./public/Members/team-member-1.jpg" },
    { name: "Nguyễn Dũng", role: "Takecare", image: "./public/Members/team-member-1.jpg" },
    { name: "Đặng Cường", role: "Frontend-Leader", image: "./public/Members/team-member-1.jpg" },
    { name: "Trần Dũng", role: "Backend-TechLead", image: "./public/Members/team-member-1.jpg" },
    { name: "Nguyễn Hiệp", role: "Backend", image: "./public/Members/team-member-1.jpg" },
    { name: "Quốc Anh", role: "Frontend", image: "./public/Members/team-member-1.jpg" },
    { name: "Hoàng Thảo", role: "Frontend", image: "./public/Members/team-member-1.jpg" },
    { name: "Lưu Kiên", role: "Frontend", image: "./public/Members/team-member-1.jpg" },
  ];

  return (
    <div>
      <div className='flex justify-center items-center my-3 font-KumbhSans'>
        <button className='py-3 px-6 rounded-full text-black bg-pornhub-200 hover:bg-pornhub-300 font-semibold' onClick={toggleText}>More details</button>
      </div>
      {isExpanded && (
        <div>
          <div className='flex items-center justify-center font-medium max-w-5xl mx-auto mb-3'>
            <p>
              We are BoyFóur from Team 4 JS Club. With Libhub, we bridge technology and education, helping students access academic materials anytime, anywhere. Meet our team!
            </p>
          </div>
          <hr className='border-x border-pornhub-200 my-4 mx-auto w-28 ' />
          <div>
            <div className='flex justify-center gap-10'>
              {teamMembers.slice(0, 4).map((member, index) => (
                <div key={index} className='text-center'>
                  <img src={member.image} alt={member.name} className='ct-avatar' />
                  <p className='text-xs font-bold text-gray-600 mt-1'>{member.name}</p>
                  <p className='text-xs font-semibold text-gray-400'>{member.role}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-center gap-10 mt-1'>
              {teamMembers.slice(4).map((member, index) => (
                <div key={index + 4} className='text-center'>
                  <img src={member.image} alt={member.name} className='ct-avatar' />
                  <p className='text-xs font-bold text-gray-600 mt-1'>{member.name}</p>
                  <p className='text-xs font-semibold text-gray-400'>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextToggle;