import Image from "next/image";
import {
  Link,
  GithubLogo,
  TwitterLogo,
  WhatsappLogo,
  LinkedinLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import Head from "next/head";
import webserver from '../infra/webserver.js';

const webserverHost = webserver.host;

export async function getServerSideProps() {
  const githubData = await fetch(
    `https://api.github.com/users/${process.env.BOHR_REPO_OWNER}`
  );
  const { name, login, html_url, avatar_url, twitter_username, bio } =
    await githubData.json();

  const bohrData = await fetch(
    `https://bohr.io/api/public/user/projects/${process.env.BOHR_REPO_OWNER}`
  );
  const projects_borh = await bohrData.json();
  return {
    props: {
      name,
      login,
      html_url,
      avatar_url,
      twitter_username,
      projects_borh,
      bio
    },
  };
}
export default function Index(props) {
  const {
    name,
    login,
    html_url,
    avatar_url,
    twitter_username,
    projects_borh,
    bio,
  } = props;

  return (
    <>
      <header className="header">
        <Head>
          <title>{`Portifólio - ${name}`}</title>
          <meta content={`Portifolio - ${name}`} property="og:title" />
          <meta content={bio} name="description" />
          <meta content={bio} property="og:description" />
          <meta property="og:image" content={`https://feat_nextjs-mzl-template-b2evandro.bohr.io/api/mata_infos?username=${login}&bio=${bio}`} key="og:image" />

        </Head>
        <div className="header__container">
          <div
            className="user__infos"
            data-bohr-cms
            data-bohr-file="public/index.html"
            data-bohr-index="1"
            data-bohr-dist-file="index.html"
            data-bohr-dist-index="1"
          >
            <div className="user__infos_img">
              <img src={avatar_url} alt="Developer's profile image" />
            </div>

            <div className="user__infos_text">
              <h1>{name}</h1>
              <p>{bio}</p>
            </div>

            <div className="user__infos_social">
              <a target="_blank" href={`https://github.com/${login}`}>
                <GithubLogo size={32} />
              </a>
              <a target="_blank" className="ph-linkedin-logo-thin">
                <LinkedinLogo size={32} />
              </a>
              <a target="_blank" className="ph-whatsapp-logo-thin">
                <WhatsappLogo size={32} />
              </a>
              <a target="_blank" className="ph-instagram-logo-thin">
                <InstagramLogo size={32} />
              </a>
              <a
                target="_blank"
                href={`https://twitter.com/${twitter_username}`}
              >
                <TwitterLogo size={32} />
              </a>
              <a target="_blank" className="ph-discord-logo-thin">
                &nbsp;
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="main">
        <section id="projects">
          <h1>Projects</h1>

          <div className="projects">
            {projects_borh &&
              projects_borh.map((project) => {
                return (
                  <div className="project" key={project.url}>
                    <img src={project.imageUrl} />
                    <div className="project__info">
                      <div className="project__info_text">
                        <img
                          src={project.favicon || "assets/bohr_logo.png"}
                          className="project__info_favicon"
                        />
                        <h2>{project.name}</h2>
                        <div className="project__links">
                          <a href={project.url} target="_blank">
                            <Link size={32} />
                          </a>
                          <a href={project.githubUrl} target="_blank">
                            <GithubLogo size={32} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        <section id="skills">
          <h1>Skills</h1>

          <div className="skills">
            <div className="skill">
              <img src="assets/html-icon.svg" alt="Html" />
            </div>
            <div className="skill">
              <img src="assets/css-icon.svg" alt="Css" />
            </div>
            <div className="skill">
              <img src="assets/javascript-icon.svg" alt="Javascript" />
            </div>
            <div className="skill">
              <img src="assets/react-icon.svg" alt="React" />
            </div>
          </div>
        </section>
      </div>

      <footer>
        <a href="https://bohr.io" target="_blank">
          powered by <img src="assets/bohr_logo.png" alt="" />
        </a>
      </footer>
    </>
  );
}
