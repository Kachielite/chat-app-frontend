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
          It was loud. We just laid there and said is this an earthquake?
          I think this is an earthquake.
        </p>
        <p class="from-me">Like is this an earthquake just go back to sleep</p>
        <p class="from-them margin-b_one">
          Its more like this is an earthquake. Check the Internet.
          Yup. Earthquake. This is the size. This is the epicenter. Check social
          media. Make sure the East Coast knows Im alive. Okay, try and
          go back to sleep.
        </p>
        <p class="from-me">Glad youre safe</p>
        <p class="from-me">Time to write some code where I left off</p>
        <p class="from-me no-tail margin-b_none">Previously...</p>
        <p class="from-me no-tail">
          Brock went to the hospital to check on Cyntheeah...
        </p>
        <p class="from-me no-tail">
          Notice the pretentious spelling of Cyntheeah...
        </p>
        <p class="from-me no-tail">
          While in her hospital room, Diego is standing outside looking through
          the door window and can hear the entire conversation because he has
          super hearing.
        </p>
        <p class="from-me margin-b_none">
          Elsewhere, Biff has plans to take down the entire Caspian family with
          his secret about how Roger Caspian used to be...REGINA Caspian!
        </p>
        <p class="from-them margin-b_one margin-t_one">Haha</p>
        <p class="from-me no-tail">
          And the budding romance between teens Erika and Johnny bloom
        </p>
        <p class="from-me">
          Back at the hospital, cuz who doesnt hang out at hospitals in
          their free time, amirite...
        </p>
        <p class="from-me no-tail margin-b_none">Previously...</p>
        <p class="from-me no-tail">
          Brock went to the hospital to check on Cyntheeah...
        </p>
        <p class="from-me no-tail">
          Notice the pretentious spelling of Cyntheeah...
        </p>
        <p class="from-me no-tail">
          While in her hospital room, Diego is standing outside looking through
          the door window and can hear the entire conversation because he has
          super hearing.
        </p>
        <p class="from-me margin-b_none">
          Elsewhere, Biff has plans to take down the entire Caspian family with
          his secret about how Roger Caspian used to be...REGINA Caspian!
        </p>
        <p class="from-them margin-b_one margin-t_one">Haha</p>
        <p class="from-me no-tail">
          And the budding romance between teens Erika and Johnny bloom
        </p>
        <p class="from-me">
          Back at the hospital, cuz who doesnt hang out at hospitals in
          their free time, amirite...
        </p>
      </div>
      <div ref={lastMessage} />
    </>
  );
};

export default ChatBubble;
