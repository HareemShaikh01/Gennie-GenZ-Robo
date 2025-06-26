import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function App() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", msg: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://gennie-gen-z-robo.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: input }),
      });

      const data = await res.json();
      const gennieMsg = { role: "gennie", msg: data.reply };
      setChat((prev) => [...prev, gennieMsg]);
    } catch (err) {
      console.error("Gennie error:", err);
      setChat((prev) => [
        ...prev,
        { role: "gennie", msg: "Oops! Gennie broke down 😵" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen relative overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/background-lines.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
      }}
    >
      {/* Background Glows */}
      <div className="w-80 h-80 rounded-full bg-purple-950 backdrop-blur-4xl blur-3xl absolute -bottom-24 -left-24" />
      <div className="w-80 h-80 rounded-full bg-orange-950 backdrop-blur-4xl blur-3xl absolute -bottom-24 -right-24" />

      {/* Bot Animation */}
      <div className="absolute w-60 h-60 bottom-52">
        <DotLottieReact
          src="https://lottie.host/52dd13f4-3a09-43dc-acc7-3b3c08258d9c/3bD8CAvgmL.lottie"
          loop
          autoplay
        />
      </div>

      {/* Chat App UI */}
      <div className="h-screen">
        <h1
          className="text-white pt-14 pb-4 font-bold text-center text-3xl"
          style={{ fontFamily: "poppins" }}
        >
          Talk to Gennie – your GenZ Robo 🕹️
        </h1>

        <div className="w-1/2 mx-auto h-full rounded-3xl mb-14 p-10">
          {/* Chat Display */}
          <div className="chat flex m-4 p-4 flex-col overflow-y-scroll gap-4 h-[75%] text-white scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.role === "user"
                    ? "bg-purple-950 self-end"
                    : "bg-orange-950 self-start"
                } backdrop-blur-3xl p-2 max-w-[300px] rounded-2xl whitespace-pre-line`}
              >
                {item.msg}
              </div>
            ))}
            {loading && (
              <div className="bg-orange-950 self-start backdrop-blur-3xl p-2 max-w-[300px] rounded-2xl">
                Typing<span className="animate-pulse">...</span>
              </div>
            )}
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ping me a Message, I'm busy playing!"
            className="border-purple-900 p-1 px-2 text-white placeholder:text-white border-2 rounded-2xl w-full outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
