import { useEffect, useRef } from "react";
import "../common/css/component/chatBubble.css";

const ChatBubble = () => {
  const lastMessage = useRef(null);

  useEffect(() => {
    lastMessage.current?.scrollIntoView();
  }, []);

  return (
    <>
      <div class="imessage">
        <p class="from-them">
          <span>Derrick</span>
          It was loud. We just laid there and said is this an earthquake? I
          think this is an earthquake.It’s more like “this is an earthquake.
          Check the Internet. Yup. Earthquake. This is the size. This is the
          epicenter. Check social media. Make sure the East Coast knows I’m
          alive. Okay, try and go back to sleep.”
        </p>
        <p class="from-me">
          <span>Derrick</span>Like is this an earthquake just go back to sleep
        </p>
      </div>
      <div ref={lastMessage} />
    </>
  );
};

export default ChatBubble;
