const About = () => {
  const header =
    "Hi, I'm Kaw, a software engineer with experience in data science and machine learning. I have worked for various companies such as Osotspa, EATLAB, and Omniscien Technologies, and also completed an internship at Data Wow. Throughout my career, I have gained expertise in developing data pipeline automation, machine translation, text classification, people detection, and cost optimization in cloud services. I have also created several tools for text translation tasks, internal data labeling, and even a keyword-based emoji search application.";

  const contacts = [
    {
      name: "Email",
      url: "mailto:kaw@hedgehoglet.dev",
      icon: "/images/contacts/email.png",
    },
    {
      name: "GitHub",
      url: "https://github.com/kawaeee",
      icon: "/images/contacts/github.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kasidech-kaw",
      icon: "/images/contacts/linkedin.png",
    },
    {
      name: "Medium",
      url: "https://kawae.medium.com",
      icon: "/images/contacts/medium.png",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-6">
      {/* Header Section */}
      <div className="text-center px-4">
        <h2 className="text-base sm:text-lg md:text-lg lg:text-lg font-normal mb-4 text-gray-300 leading-relaxed">
          {header}
        </h2>
      </div>

      {/* Contact Section */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
        {contacts.map(({ name, url, icon }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-md bg-gray-200 transition-transform duration-200 hover:scale-110 shadow-md hover:shadow-lg"
            aria-label={`Link to ${name}`}
          >
            <img
              src={icon}
              alt={name}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default About;
