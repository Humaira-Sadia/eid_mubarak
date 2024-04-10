import React, { useEffect, useState } from "react";
import { chatData } from "./constants.js";

const App = () => {
  const [displayedChatData, setDisplayedChatData] = useState([]);
  const [initialMessageDisplayed, setInitialMessageDisplayed] = useState(false);
  const [hideChatItem, setHideChatItem] = useState(false); // State to control chatItem visibility

  useEffect(() => {
    const displayMessagesWithDelay = () => {
      let delay = 0;
      const displayedMessages = [];
      chatData.forEach((item, index) => {
        delay += 3000;
        setTimeout(() => {
          displayedMessages.unshift(item);
          setDisplayedChatData([...displayedMessages]);
        }, delay);
      });

      setTimeout(() => {
        setInitialMessageDisplayed(true);
      }, 5000);

      setTimeout(() => {
        setHideChatItem(true);
      }, 20000);
    };

    displayMessagesWithDelay();
  }, []);

  return (
    <div className="sm:hidden font-ubuntu h-screen flex flex-col">
      <div className={`chatItem flex flex-col-reverse items-end overflow-y-auto ${hideChatItem ? 'hidden' : ''}`}>
        {displayedChatData.map((item, index) => (
          <div
            key={index}
            className={
              item.sentByMe
                ? "me p-2 m-4 border rounded-3xl me_grad sm:w-1/2 w-2/3 self-end"
                : "other p-2 m-4 border rounded-3xl other_grad sm:w-1/2 w-2/3 self-start"
            }
          >
            <p>{item.mesg}</p>
          </div>
        ))}
      </div>
      {initialMessageDisplayed && displayedChatData.length > 0 && displayedChatData[0].sentByMe && (
        <div className="mesg_field w-16 mt-auto mb-16 mx-4 p-3 border rounded-3xl flex justify-evenly">
          <div className="circle w-2 h-2 bg-white rounded-3xl"></div>
          <div className="circle w-2 h-2 bg-white rounded-3xl"></div>
          <div className="circle w-2 h-2 bg-white rounded-3xl"></div>
        </div>
      )}
      {displayedChatData.length === chatData.length && (
        <DelayedVideo className="h-screen" src="eid_mubarak.mp4" delay={3000} autoPlay muted />
      )}
    </div>
  );
};

const DelayedVideo = ({ src, delay, ...props }) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showVideo ? <video src={src} {...props}></video> : null;
};

export default App;
