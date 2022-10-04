import "../common/css/component/chatBubble.css";

const ChatBubble = ({ messages }) => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div class="imessage">
        {messages?.map((message, index) => {
          return (
            <p
              class={message.user._id === userId ? "from-me" : "from-them"}
              key={index}>
              <span>{message.user.username}</span>
              {message.message}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default ChatBubble;
