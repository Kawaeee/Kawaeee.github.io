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
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            
            fontSize: "1rem",
            fontWeight: "regular",
            marginBottom: "0.5rem",
          }}
        >
          {header}
        </h2>
      </div>

      {/* Contact Section */}
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#1e293b", // Dark background
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      {contacts.map((contact, index) => (
        <a
          key={index}
          href={contact.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            backgroundColor: "#f1f5f9", // Light gray background
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }}
          aria-label={`Link to ${contact.name}`}
        >
          <img
            src={contact.icon}
            alt={contact.name}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </a>
      ))}
    </div>
    </div>
  );
};

export default About;
