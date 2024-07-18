import React from "react";
import linkdenicon from "../../assets/linden.svg";
import fbicon from "../../assets/facebook.svg";
import messageicon from "../../assets/message.svg";
function TeamCard({ data }) {
  return (
    <>
      {/* {CardData.map((data, index) => { */}
      <div className="space-y-3 mx-10">
        <img loading="lazy" className=" object-postion" src={data.img} alt="" />
        <div>
          <h2 className="text-3xl font-semibold">{data.name}</h2>

          <h3 className="text-base font-bold text-green-400 uppercase">
            {data.designation}
          </h3>
        </div>
        <p className="text-lg font-medium gray max-w-[90%]">{data.des}</p>
        <div className="h-7 flex gap-5">
          <span>
            <img loading="lazy" className="h-full" src={linkdenicon} alt="" />
          </span>
          <span>
            <img loading="lazy" className="h-full" src={fbicon} alt="" />
          </span>
          <span>
            <img loading="lazy" className="h-full" src={messageicon} alt="" />
          </span>
        </div>
      </div>
      ;{/* })} */}
      <style>
        {`
            .object-postion{
            object-fit: cover;
            object-position:top center;
            border-radius: 12px;
            min-width: 100%;
            height: 300px;
            min-height: 300px;
            max-height: 300px;
    
}
            }
            `}
      </style>
    </>
  );
}

export default TeamCard;
