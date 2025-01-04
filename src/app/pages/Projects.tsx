import React from "react";

const projects = {
  corgiButtOrLoaf: {
    name: "Corgi butt or a loaf of bread?",
    description:
      "🍞🐶 A classifier that can classify between corgi butt and loaf of bread using PyTorch.",
    application_url: "https://bob-or-bread.streamlit.app",
    icon: "/images/projects/butt_or_bread.png",
    source_url: "https://github.com/Kawaeee/butt_or_bread",
  },
  scalaDS: {
    name: "Scala DS",
    description: "📊💻🔢 Scala programming language for data science!",
    application_url: "https://kawaeee.github.io/scala_ds/",
    icon: "/images/projects/scala.png",
    source_url: "https://github.com/Kawaeee/scala_ds",
  },
  iStylist: {
    name: "iStylist: Hairstyle Recommender",
    description:
      "💇‍♂️💻📱 The mobile application that helps the user to choose a hairstyle based on the user's face shape.",
    application_url:
      "https://seniorproject.sit.kmutt.ac.th/showproject/CS59-RE43",
    icon: "/images/projects/istylist.png",
    source_url: "",
  },
  pyHLEPOR: {
    name: "py-hLEPOR",
    description: "🐍📊 Python Bindings to hLEPOR metric.",
    application_url: "",
    icon: "/images/projects/blank.png",
    source_url: "https://github.com/Kawaeee/py-hLEPOR",
  },
  pHash: {
    name: "pHash",
    description: "🔍🖼️ Image de-duplication using Perceptual Hashing(pHash)",
    application_url: "",
    icon: "/images/projects/blank.png",
    source_url: "https://github.com/Kawaeee/phash",
  },
  otherProjects: {
    name: "For other projects",
    description: "📁🔍 Feel free to check out my GitHub!",
    application_url: "",
    icon: "/images/projects/github2.png",
    source_url: "https://github.com/Kawaeee/",
  },
};

const Projects = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        style={{
          maxHeight: "80vh",
          overflowX: "hidden",
        }}
      >
        {Object.keys(projects).map((key) => {
          const { name, description, application_url, icon, source_url } =
            projects[key];
          return (
            <div
              key={key}
              className="bg-gray-800 rounded-lg shadow-lg p-5 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left Column: Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 mx-auto">
                  <img
                    src={icon}
                    alt={name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "/images/projects/blank.png"; // Use a default icon if the image is missing
                    }}
                  />
                </div>

                {/* Right Column: Nested rows for name, description, and links */}
                <div className="flex flex-col justify-between">
                  {/* Project Name */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    {name}
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">
                    {description}
                  </p>

                  {/* Project Links */}
                  <div className="mt-4 flex gap-4">
                    {application_url && (
                      <a
                        href={application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Live Application
                      </a>
                    )}
                    {source_url && (
                      <a
                        href={source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
