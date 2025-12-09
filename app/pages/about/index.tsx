import React from 'react'
import { SectionHeader, Hero, MetaInfo } from '@/components';
import styles from './About.module.css'


const About = () => {

  return (
    <>
      <div className={styles.wrapper}>
        <Hero />
        <article>

          <section>
            <SectionHeader title="Our Story" />
            <h3>Why we built Bandwidth Melbourne.</h3>
            <p>
              We started Bandwidth because we felt like there was a gap in how Melbourne's live music scene was being represented online. While other platforms focus either on big acts and mainstream venues, or on RSLs or cover bands, we wanted to shine a light on the grassroots artists, real venues, and emerging talent that make this city's music scene so special. We believe that artists shouldn't need a marketing team to be discovered, and that every music lover should have an easy way to find their next favorite band.
            </p>
            <p>
              Our mission is simple: to create a platform where Melbourne's incredible musical diversity can flourish. We're building more than just another event listing site—we're creating a community hub where artists can connect with venues, fans can discover their new obsessions, and the underground scene gets the recognition it deserves.
            </p>
          </section>

          <section>
            <SectionHeader title="Melbourne's Live Music Scene" />
            <h3>Supporting Local Artists.</h3>
            <p>
              Melbourne’s live music scene is one of the best in the world. Any night of the week you can wander into a pub’s front room, a packed bandroom, or a grand concert hall, and stumble into something unforgettable. Punk bands share bills with experimental jazz trios. Indie rock acts play alongside electronic producers. Singer-songwriters open for heavy metal bands. It’s messy in all the right ways; a scene built on community, creativity, and the thrill of discovering something new.</p>
            <p>
              The scene thrives because of its community-driven spirit. Local promoters, venue owners, sound engineers, and music lovers work together to keep live music accessible and vibrant. It's this grassroots foundation that Bandwidth Melbourne wants to celebrate and support, ensuring that the city's musical heritage continues to evolve and inspire for generations to come.
            </p>
          </section>

          <section>
            <SectionHeader title="Countdown to Launch" />
            <h3>We're Still Under Development.</h3>
            <p>
              We have big plans to turn this platform into the resource that artists and live music lovers deserve—but we're taking it one step at a time. Working towards <em>Version 1.0</em>, we're focused on nailing the essentials: helping you discover the best events, artists, and venues across Melbourne.
            </p>
            <p>
              We're working through our launch checklist as quickly as possible—because once it's done, we're ready to go live!
            </p>
            <ul>
              <li>
                <strong>A Fresh Coat of Paint</strong><br />
                We clearly didn't have a designer on the team during development. Now that the core functionality is solid enough, we're working on getting our logo, branding, and UI/UX properly sorted.
              </li>
              <li>
                <strong>Artwork by Actual Artists</strong><br />
                The current header image was hastily created in Canva during a late-night procrastination session—but you deserve better than that. We're reaching out to talented local artists to create proper artwork for the site.
              </li>
              <li>
                <strong>Fill Up The Database</strong><br />
                Most of what you see is placeholder data from development. We need to dedicate time to gathering real venue, artist, and event information to populate the site properly—and then maintain it from there.
              </li>
              <li>
                <strong>Bug Fixes & Polish</strong><br />
                Don't worry, we know there's a lot that's still wrong with the site. While it won't be perfect at launch, we're dealing with the worst bugs before launch.
              </li>
            </ul>
            <h3>When will it be ready?</h3>
            <p>
              Very soon! The main blocker is finding the right designer and giving them time to nail the branding. Once we've found our creative partner, we'll set a firm launch date. Check back soon for updates!
            </p>
          </section>

          <section>
            <SectionHeader title="Development By" />
            <div className={styles.teamProfiles}>
              <div className={styles.profile}>
                <img src="https://avatar.iran.liara.run/public/3" alt="Matthew Cross Avatar (Placeholder)" className={styles.profileImage} />
                <div className={styles.profileContent}>
                  <h4>Matthew Cross</h4>
                  <h5>Web Developer & Bass Player</h5>
                  <p>
                    I've always been frustrated with needing to rely on social media and Google searches to find and promote shows. I decided to build this platform to make it easier to discover local artists and gigs. Get in touch if you have any thoughts on how we can make this platform more useful!
                  </p>
                  <div className={styles.contactOptions}>
                    <a href="mailto:matthew.cross@bandwidthmelbourne.com">
                      <img className={styles.linkIcon} src="/icons/email.svg" alt="Email Icon" />
                      Email
                    </a>
                    <a href="www.linkedin.com/in/matthew-cross-b02b9a268" target="_blank" rel="noopener noreferrer">
                      <img className={styles.linkIcon} src="/icons/linkedin.svg" alt="LinkedIn Icon" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/MatthewLeigh" target="_blank" rel="noopener noreferrer">
                      <img className={styles.linkIcon} src="/icons/github.svg" alt="GitHub Icon" />
                      GitHub
                    </a>
                    <a href="https://bandwidthmelbourne.com/artist/96071829-3a4b-5c6d-7e8f-901223344556">
                      <img className={styles.linkIcon} src="/icons/musician.svg" alt="Band Icon" />
                      Band
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </section>

          <section>
            <SectionHeader title="Other Places You Can Find Bandwidth" />

            <ul className={styles.cards}>
              <li>
                <a
                  className={styles.card}
                  href="https://instagram.com/bandwidthmelbourne"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.cardIcon} src="./icons/instagram-color.svg" />
                  <h4>Instagram</h4>
                  <p>Follow for updates and a weekly curated list of upcoming events.</p>
                </a>
              </li>

              <li>
                <a
                  className={styles.card}
                  href="https://facebook.com/bandwidthmelbourne"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.cardIcon} src="./icons/facebook-color.svg" />
                  <h4>Facebook</h4>
                    <p>Like Instagram,<br />but for millennials.</p>
                </a>
              </li>

              <li>
                <a
                  className={styles.card}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.cardIcon} src="./icons/discord-color.svg" />
                  <h4>Discord</h4>
                  <p>The best place to chat with local artists and music lovers.</p>
                </a>
              </li>

              <li>
                <a
                  className={styles.card}
                  href="https://github.com/bandwidth-gig-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={styles.cardIcon} src="./icons/github-color.svg" />
                  <h4>GitHub</h4>
                  <p>Check out the project’s development, if you're into that kinda thing.</p>
                </a>
              </li>
            </ul>
          </section>



        </article>
      </div>

      <MetaInfo
        pageType="about"
        title="About Bandwidth Melbourne - Supporting Local Music Artists"
        description="Learn about Bandwidth Melbourne's mission to connect local artists with venues and audiences. Discover how we're building Melbourne's music community and supporting emerging talent."
        url="https://bandwidthmelbourne.com/about"
      />
    </>
  );
};

export default About;
