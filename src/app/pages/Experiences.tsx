import React from "react";

const experiences = {
  osotspa: {
    role: "Data Scientist",
    location: "Osotspa",
    duration: "July 2022 - Present",
    detail: [
      "💻🔍 Created Cleaning + PII hashing data pipeline automation on Google Cloud Platform",
      "🏷️🛠️ Setup an internal data labeling tool for machine learning project",
      "🚀📊✨ Initiated, developed, and deployed the SearchTrend project, including pipeline creation and base dashboard development",
      "🤖💡🔗 Built multi-agent RAG workflow using DSPY and LangGraph",
    ],
    icon: "/images/experiences/osotspa.png",
    isCurrentJob: true,
  },
  hedgehoglet: {
    role: "Software Engineer",
    location: "Hedgehoglet",
    duration: "July 2022 - Present",
    detail: [
      "🐱🍲 Worked on <a href='https://github.com/hedgehoglet/cat-food' target='_blank'>cat-food</a> python template",
      "🛠️ Built <a href='https://sandbox.hedgehoglet.dev' target='_blank'>sandbox</a> project for public data sharing site",
      "🚇🗺️ Developing the Bangkok Transit project to visualize public transportation routes and stations across Bangkok, with a planned release in Q2 2025.",
    ],
    icon: "/images/experiences/hedgehoglet.png",
    // isCurrentJob: true,
  },
  eatlab: {
    role: "Machine Learning Engineer",
    location: "EATLAB",
    duration: "September 2021 - June 2022",
    detail: [
      "📈👥 Implemented a data pipeline automation to run people detection, tracking, and count amount of people in and out of a specific area",
      "🌎🍔 Applied multilingual model to tackle food category classification task",
      "💰💻 Reduced cloud costs on AWS S3 and AWS Sagemaker",
    ],
    icon: "/images/experiences/eatlab.png",
  },
  omniscien: {
    role: "Machine Learning Engineer",
    location: "Omniscien Technologies",
    duration: "April 2020 – September 2021",
    detail: [
      "🤖🚀 Coded WARC Processor data processing pipeline from idea to production",
      "📖🗣️ Created various types of text translation tasks-related tools: NER, n-gram, etc",
      "⚙️💡 Setup back-translation module using AWS EC2 Spot instances",
      "🤝🌍 Supported ParaCrawl team on <a href='https://paracrawl.eu/manufactured-data' target='_blank'>ParaCrawl Synthesized Data (Release 2)</a>",
    ],
    icon: "/images/experiences/omniscien.png",
  },
  datawow: {
    role: "Data Science Intern",
    location: "Data Wow",
    duration: "June 2019 – July 2019",
    detail: [
      "📊🔍 Implemented and benchmarked Pantip tags text classifier with different approaches: Multinomial, LinearSVC, Bag of Words, fastText, and thai2fit",
      "🔎😀 Developed keyword-based emoji search web application called EmojiSearch",
    ],
    icon: "/images/experiences/datawow.png",
  },
  kmutt: {
    role: "Computer Science Student",
    location: "SIT, King Mongkut's University of Technology Thonburi",
    duration: "June 2016 - January 2020",
    detail: [
      "💇‍♂️💻📱 Implemented <a href='https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43' target='_blank'>iStylist: Hairstyle Recommender</a> mobile application",
      "✋✌️👊🧠 Worked on <a href='https://github.com/Kawaeee/RPS_classification' target='_blank'>Rock-Paper-Scissors hand gestures classification</a> using Keras",
      "☕️💻💰 Built <a href='https://github.com/Kawaeee/Starbucks' target='_blank'>fake Starbucks website</a> using PHP and MySQL database",
    ],
    icon: "/images/experiences/kmutt.png",
  },
};

const Experiences = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className="space-y-6 overflow-y-auto"
        style={{
          maxHeight: "80vh", // Adjust as needed for the scrollable container
          overflowX: "hidden", // Hide horizontal overflow
        }}
      >
        {Object.keys(experiences).map((key) => {
          const { role, location, duration, detail, icon, isCurrentJob } =
            experiences[key];
          return (
            <div
              key={key}
              className="bg-gray-800 rounded-lg shadow-lg p-5 hover:shadow-xl transition-all duration-300 transform hover:scale-95"
            >
              {/* First row: Icon and company details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 mx-auto">
                  <img
                    src={icon}
                    alt={location}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white flex items-baseline">
                    {role}
                    {isCurrentJob && (
                      <span
                        className="ml-2 text-red-400 text-sm sm:text-base md:text-md animate-pulse"
                        style={{ animationDuration: "1.5s" }}
                      >
                        (Current Job)
                      </span>
                    )}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-gray-400">
                    {location}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-2">
                    {duration}
                  </p>
                </div>
              </div>

              {/* Second row: Task list */}
              <ul className="experience-list list-disc pl-4 text-gray-300 space-y-1 text-sm sm:text-base md:text-md mt-4">
                {detail.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experiences;
