import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import agent from "../src/assets/pic.png"
import {
  CheckCheck,
  CheckCheckIcon,
  EllipsisVertical,
  Paperclip,
  Phone,
  Send,
  SendHorizontalIcon,
} from "lucide-react";
import CallToAction from "./components/CallToAction";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [finalMessage, setFinalMessage] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialMessages = [
      {
        text: "Hey there! 👋",
        sender: "bot",
      },
      {
        text: "Emily this side, and I've got great news about a special Final Expense Benefit that could save you serious cash! 💰",
        sender: "bot",
      },
      {
        text: "Want to see if you qualify for the $40,000 Final Expense Benefit? It only takes 2 minutes! Tap 'Yes' to get started! 👇",
        sender: "bot",
        options: ["Yes! Show me how to claim"],
      },
    ];
    addMessagesWithDelay(initialMessages);
  }, []);

  const addMessagesWithDelay = (botResponses) => {
    let delay = 0;
    setIsTyping(true);
    botResponses.forEach((response, index) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { ...response, lastInSequence: index === botResponses.length - 1 },
        ]);
        if (index === botResponses.length - 1) {
          setIsTyping(false);
          if (response.options) setCurrentOptions(response.options);
          if (response.input) setShowInput(true);
        }
      }, (delay += 1500));
    });
  };

  const handleOptionClick = (option) => {
    if (option === "Yes! Show me how to claim") {
      setMessages((prev) => [...prev, { text: "Yes", sender: "user" }]);
    } else {
      setMessages((prev) => [...prev, { text: option, sender: "user" }]);
    }
    setShowInput(false);
    setCurrentOptions([]);
    let botResponses = [];

    if (option === "Yes! Show me how to claim") {
      botResponses = [
        {
          text: "Awesome! Let's get you the benefit ASAP. I just need to ask you a couple of quick questions.",
          sender: "bot",
        },
        {
          text: "Are you over the age of 50?",
          sender: "bot",
          options: ["Yes! I am over 50 years old", "No, I am 49 or younger"],
        },
      ];
    } else if (
      option === "Yes! I am over 50 years old" ||
      option === "No, I am 49 or younger"
    ) {
      botResponses = [
        {
          text: "Do you live in the United States?",
          sender: "bot",
          options: ["Yes", "No"],
        },
      ];
    } else if (option === "Yes" || option === "No") {
      botResponses = [
        {
          text: "🎉 Fantastic news! You're one step closer to securing your benefit",
          sender: "bot",
        },
        {
          text: "Based on what you've told me, you might qualify for the $40,000 Final Expense Benefit! Once approved, you'll never have to pay it back 💸",
          sender: "bot",
        },
      ];
      setTimeout(() => {
        setFinalMessage(true);
      }, 4000);
    }
    addMessagesWithDelay(botResponses);
  };

  const handleSendInput = () => {
    if (inputValue.trim() === "") return;
    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
    setInputValue("");
    setShowInput(false);
    let botResponses = [
      { text: `Nice to meet you, ${inputValue}!`, sender: "bot" },
      {
        text: "Let's begin your Soulmate Portrait.",
        sender: "bot",
        options: ["Start"],
      },
    ];
    addMessagesWithDelay(botResponses);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, finalMessage]);
  

  return (
    <div
      className="w-full h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
      }}
    >
      <div className="bg-[#005e54] text-white p-4 flex items-center gap-2 shadow-md sticky top-0 right-0 left-0 z-10 h-16">
        <img
          src={agent}
          alt="Psychic Master"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-bold">Burial Protection Helpline</p>
            <p className="text-sm italic">online</p>
          </div>
          <div className="flex items-center gap-6">
            <Phone className="w-6 h-6 text-white" />
            <Paperclip className="w-6 h-6 text-white" />
            <EllipsisVertical className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto flex flex-col mt-[5%] scroll-mt-10">
        {messages.map((msg, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "bot" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex relative ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && msg.lastInSequence && (
                <img
                  src={agent}
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 absolute bottom-0"
                />
              )}
              <motion.div
                initial={{ width: 0, height: 15 }}
                animate={{ width: "auto", height: "auto" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`p-2 rounded-lg text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-[#dcf8c6] text-gray-800"
                    : "bg-white text-gray-800 ms-10"
                }`}
                style={{ minWidth: "50px", overflow: "hidden" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {msg.text}
                </motion.span>
                {msg.sender === "user" && (
                  <span className="flex flex-row-reverse">
                    <CheckCheck className="h-3 w-3 text-blue-600" />
                  </span>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <img
              src={agent}
              alt="Bot"
              className="w-8 h-8 rounded-full"
            />
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-xs p-2 rounded-lg text-sm bg-white text-gray-800 flex items-center gap-1"
            >
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            </motion.div>
          </motion.div>
        )}
        {showInput && (
          <div className="mt-2 flex items-center gap-2 justify-end">
            <input
              type="text"
              className="border w-[60vw] p-4 rounded-2xl"
              placeholder="Type your name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="px-5 py-4 bg-[#005e54] text-white rounded-2xl"
              onClick={handleSendInput}
            >
              <SendHorizontalIcon className="w-6 h-6" />
            </button>
          </div>
        )}
        {currentOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 items-center justify-start ms-10">
            {currentOptions.map((option, i) => (
              <button
                key={i}
                className="px-6 py-2 bg-[#005e54] text-white rounded-full text-sm"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {finalMessage && <CallToAction finalMessage={finalMessage} />}

        <div  ref={messagesEndRef} />
      </div>
    </div>
  );
}
