import { DotLottieReact } from "@lottiefiles/dotlottie-react"

function App() {

  const chat = [
    {
      "role": "user",
      "msg": "Hey Gennie, how are you?"
    },
    {
      "role": "gennie",
      "msg": "Yo! I’m great, what about you bro?"
    },
    {
      "role": "user",
      "msg": "I'm doing fine, just working on my new project."
    },
    {
      "role": "gennie",
      "msg": "That’s lit! Need any help from your AI buddy?"
    },
    {
      "role": "user",
      "msg": "Haha maybe! Just trying to make the UI pop."
    },
    {
      "role": "gennie",
      "msg": "Say no more, I got some fire ideas 🔥"
    },
     {
      "role": "user",
      "msg": "Haha maybe! Just trying to make the UI pop."
    },
    {
      "role": "gennie",
      "msg": "Say no more, I got some fire ideas 🔥"
    }
  ]


  return (
    <div className="h-screen relative overflow-hidden bg-black " style={{ backgroundImage: "url('/background-lines.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "left top" }}>
      {/* bg radiants */}
      <div className="w-80 h-80 rounded-full bg-purple-950 backdrop-blur-4xl blur-3xl absolute -bottom-24 -left-24" />
      <div className="w-80 h-80 rounded-full bg-orange-950 backdrop-blur-4xl blur-3xl absolute -bottom-24 -right-24" />
      <div className="absolute w-60 h-60 bottom-52  ">
        <DotLottieReact
          src="https://lottie.host/52dd13f4-3a09-43dc-acc7-3b3c08258d9c/3bD8CAvgmL.lottie"
          loop
          autoplay
        /></div>

      {/* rest of the code */}
      <div className="h-screen">
        <h1 className="text-white pt-14 pb-4 font-bold text-center text-3xl " style={{ fontFamily: "poppins" }}>Lets Talk To gennie your cool genZ Robo</h1>
        <div className="w-1/2 mx-auto  h-full rounded-3xl mb-14 p-10">

          {/* chat area */}
          <div className="chat flex m-4 p-4 flex-col overflow-y-scroll gap-4 h-[75%]  text-white  scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
            {chat.map((item, index) => (
              <div key={index} className={`${item.role == "user" ? "bg-purple-950 self-end " : "bg-orange-950 self-start"} backdrop-blur-3xl p-2 max-w-[300px] rounded-2xl`}>
                  {item.msg}
              </div>
            ))}
          </div>
          <input type="text" placeholder="Ping me a Message, I'm busy playing!" className="border-purple-900 p-1 px-2  text-white placeholder:text-white border-2 rounded-2xl w-full outline-none" />
        </div>

      </div>


    </div>

  )
}

export default App
