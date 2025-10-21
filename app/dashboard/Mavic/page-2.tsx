"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import "./Style_MAA.css";

export default function Page() {
  // ✅ Refs for son and daughter ages
  const sonRef = useRef(null);
  const daughterRef = useRef(null);

  // ✅ Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Function to calculate age correctly
  const calculateAge = (birthYear) => new Date().getFullYear() - birthYear;

  // ✅ Set ages on component mount
  useEffect(() => {
    if (sonRef.current) sonRef.current.textContent = calculateAge(2016);
    if (daughterRef.current) daughterRef.current.textContent = calculateAge(2021);
  }, []);
  

  // ✅ Apply or remove dark mode class on body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // ✅ Toggle dark mode button
  const handleToggle = () => setDarkMode((prev) => !prev);

  return (
    <>
      <Head>
        <title>My Personal Webpage</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

      {/* Navigation */}
      <nav>
        <h1>WELCOME</h1>
        <p className="subtitle typewriter">
          <b>creativity and innovation</b>
        </p>
        <button
          id="darkModeToggle"
          onClick={handleToggle}
          className="dark-toggle-btn"
        >
          <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
        </button>
      </nav>

      {/* Profile Section */}
      <div className="profile">
        <img src="Images/picture.jpg" alt="Profile Picture" />
        <h1>Marivic Alcantara</h1>
        <p>
          <b>Student at Batanes State College</b>
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid-container">
        {/* About Me */}
        <div className="box about">
          <h2>About Me</h2>
          <p>
            <span className="bold-text">Full Name:</span> Marivic Arca Alcantara
          </p>
          <p>
            <span className="bold-text">BirthDate:</span> June 20, 1993
          </p>
          <p>
            <span className="bold-text">Gender:</span> Female
          </p>
          <p>
            <span className="bold-text">Civil Status:</span> Married
          </p>
          <p>
            I am currently studying at Batanes State College, taking up Bachelor
            of Science in Information Management.
          </p>
          <p>
            I am willing to learn and explore new skills and knowledge. In my
            free time, I enjoy reading, exploring new programming languages, and
            spending time with my family.
          </p>
        </div>

        {/* Education */}
        <div className="box education">
          <h2>
            <i className="fas fa-graduation-cap"></i> Education
          </h2>

          <div className="edu-item">
            <i className="fas fa-school"></i>
            <h3>Elementary and High School</h3>
            <p>Itbud Integrated School</p>
          </div>

          <div className="edu-item">
            <i className="fas fa-university"></i>
            <h3>BSED (Major in Mathematics)</h3>
            <p>Saint Dominic College (Undergraduate)</p>
          </div>

          <div className="edu-item">
            <i className="fas fa-laptop-code"></i>
            <h3>Bachelor of Science in Information Technology</h3>
            <p>Batanes State College (2023 - Present)</p>
          </div>
        </div>

        {/* Family */}
        <div className="box family">
          <h2>My Family</h2>
          <p>
            <span className="bold-text">Parents:</span>
          </p>
          <ul>
            <li>
              <span className="bold-text">Father:</span> Marcelino Arca
            </li>
            <li>
              <span className="bold-text">Mother:</span> Emma Arca
            </li>
          </ul>
          <p>
            <span className="bold-text">Husband:</span> Jophie Alcantara
          </p>

          <p>
            <span className="bold-text">Children:</span>
          </p>
          <ul>
            <li>
              <span className="bold-text">Son:</span> Dion Drei Alcantara - Age{" "}
              <span ref={sonRef}></span>
            </li>
            <li>
              <span className="bold-text">Daughter:</span> Hazuki Ayame
              Alcantara - Age <span ref={daughterRef}></span>
            </li>
          </ul>

          <p>
            My family is my biggest inspiration and support system. I love
            spending time with them, whether it’s enjoying outdoor activities or
            simply sharing stories at home.
          </p>
          <p>
            My parents and siblings have also played a significant role in
            shaping who I am today, always encouraging me to pursue my dreams
            and work hard for success.
          </p>
        </div>

        {/* Personality */}
        <section className="box personality">
          <h2>My Personality</h2>
          <ul>
            <li>💡 Curious and eager to learn</li>
            <li>🤝 Friendly and approachable</li>
            <li>🎯 Goal-oriented and determined</li>
            <li>💬 Good communicator and listener</li>
            <li>🧘 Patient and understanding</li>
            <li>⚡ Adaptable and open to challenges</li>
          </ul>
          <p>
            I believe in continuous learning and self-improvement. My
            personality helps me navigate both personal and professional
            challenges with a positive attitude.
          </p>
        </section>

        {/* Skills */}
        <div className="box skills">
          <h2>My Skills</h2>
          <ul>
            <li>Making friends</li>
            <li>Good listener</li>
            <li>Effective Communication</li>
            <li>Computer literate</li>
            <li>HTML/CSS</li>
            <li>Cooking</li>
          </ul>
        </div>

        {/* Hobbies */}
        <div className="box hobbies">
          <h2>My Hobbies</h2>
          <ul>
            <li>📖 Reading books</li>
            <li>💻 Exploring new web design trends</li>
            <li>🍳 Cooking and trying new recipes</li>
            <li>👨‍👩‍👧‍👦 Spending quality time with family</li>
            <li>😴 Sleeping</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="box contacts">
          <h2>Contact Me</h2>
          <p>
            <i className="fa-solid fa-envelope"></i> Email:{" "}
            <a href="mailto:marivicarcaalcantara@gmail.com">
              marivicarcaalcantara@gmail.com
            </a>
          </p>
          <p>
            <i className="fa-brands fa-facebook"></i> Facebook:{" "}
            <a
              href="https://www.facebook.com/marivic.arca.288968"
              target="_blank"
            >
              Marivic Arca
            </a>
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> Phone:{" "}
            <a href="tel:+639387649470">09387649470</a>
          </p>
          <p>
            <i className="fa-solid fa-map-marker-alt"></i> Address:{" "}
            <a
              className="address-link"
              href="https://maps.google.com/?q=Kayvaluganan, Basco, Batanes"
              target="_blank"
            >
              Kayvaluganan, Basco, Batanes
            </a>
          </p>
        </div>

        {/* Projects */}
        <section id="projects" className="box projects">
          <h2>Sample Projects</h2>
          <div className="project-grid">
            {[
              "project8",
              "project2",
              "project3",
              "project4",
              "project5",
              "project6",
            ].map((p, i) => (
              <div className="project-card" key={i}>
                <img src={`Images/${p}.png`} alt={`Project ${p}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Resume */}
        <div className="resume">
          <a
            href="/Profile_HTML/Activity5_MAA.html"
            download
            className="resume-btn"
          >
            Download Resume
          </a>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 Marivic Alcantara</p>
      </footer>
    </>
  );
}
