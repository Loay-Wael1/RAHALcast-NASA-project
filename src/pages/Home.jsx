import React, { useEffect, useRef } from 'react';
import './Home.css';
import { FaFileDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { MdInsights } from 'react-icons/md';
import { initVideoSlider, initSwiper } from './myScript.js';
import { Link } from 'react-router-dom';
import { RiRobot3Fill } from 'react-icons/ri';

export default function Home() {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        initVideoSlider();
        const swiper = initSwiper();

        const videoButtons = document.querySelectorAll(".video-btn");
        let currentVideoIndex = 0;
        const videoElement = videoRef.current;

        const switchVideo = async () => {
            if (!videoElement || videoButtons.length === 0) return;

            videoButtons[currentVideoIndex].classList.remove("blue");
            currentVideoIndex = (currentVideoIndex + 1) % videoButtons.length;
            videoButtons[currentVideoIndex].classList.add("blue");

            const newSrc = videoButtons[currentVideoIndex].getAttribute("data-src");

            try {
                videoElement.pause();
                videoElement.src = newSrc;
                videoElement.load();

                // Wait for video to be ready before playing
                await videoElement.play();
            } catch (error) {
                // Silently handle autoplay errors - don't log to console
                // This is expected behavior on some browsers/devices
                if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                    console.warn("Video play failed:", error.name);
                }
            }
        };

        // Initial play attempt
        if (videoElement) {
            videoElement.play().catch((error) => {
                // Silently handle initial autoplay block
                if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                    console.warn("Initial video play failed:", error.name);
                }
            });
        }

        // Start interval for switching videos
        intervalRef.current = setInterval(switchVideo, 7000);

        if (swiper && swiper.autoplay) swiper.autoplay.start();

        // Cleanup function
        return () => {
            const vidBtn = document.querySelectorAll(".video-btn");
            vidBtn.forEach((slide) => slide.removeEventListener("click", slide.onclick));
            if (swiper) swiper.destroy();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (videoElement) {
                videoElement.pause();
            }
        };
    }, []);

    return (
        <>
            <div className="allHome">
                {/* <!-- videos --> */}
                <section className="home" id="home">
                    <div className="content">
                        <h3>Ready to take on the weather?</h3>
                        <p>Your journey starts with one question: will it rain?</p>
                        <Link to="/checkweather" style={{ color: '#fff', textDecoration: "none" }}>
                            <button className='btnn'>Check weather</button>
                        </Link>
                    </div>
                    <div className="controls">
                        <span className="video-btn blue" data-src="./vid-1.mp4"></span>
                        <span className="video-btn" data-src="./vid-5.mp4"></span>
                        <span className="video-btn" data-src="./vid-3.mp4"></span>
                        <span className="video-btn" data-src="./vid-4.mp4"></span>
                        <span className="video-btn" data-src="./vid-2.mp4"></span>
                    </div>
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            src="./vid-1.mp4"
                            id="video-slider"
                            loop
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                        />
                    </div>
                </section>
                <div className='all'>
                    {/* <!-- how it works --> */}
                    <br /><br /><br /><br />
                    <h1 className="hidden">
                        <div className="how">
                            <span>H</span>
                            <span>O</span>
                            <span>W</span>
                        </div>
                        <div className="it">
                            <span>I</span>
                            <span>T</span>
                        </div>
                        <div className="works">
                            <span>W</span>
                            <span>O</span>
                            <span>R</span>
                            <span>K</span>
                            <span>S</span>
                        </div>
                    </h1>
                    <div className="posts">
                        <div className="post">
                            <FaMapMarkerAlt size={50} />
                            <h2>1. Choose location</h2>
                            <p>type in a city ,region, or simply drop a pin on our interactive map</p>
                        </div>
                        <div className="post">
                            <BsFillCalendarDateFill size={50} />
                            <h2>2. pick date</h2>
                            <p>Select the month and year you plan to travel, up to years in advance</p>
                        </div>
                        <div className="post">
                            <MdInsights size={50} />
                            <h2>3. get insights</h2>
                            <p>Receive Probabilities for extreme weather and smart recommendations</p>
                        </div>
                        <div className="post">
                            <RiRobot3Fill size={50} />
                            <h2>4. Receive AI Recommendations</h2>
                            <p>Get personalized advice on preparation and equipment</p>
                        </div>
                        <div className="post">
                            <FaFileDownload size={50} />
                            <h2>5. Download Data</h2>
                            <p>Export insights in CSV or JSON format for your records</p>
                        </div>
                    </div>

                    {/* <!-- powerful features --> */}
                    <h1 className="hidden">
                        <div className="how">
                            <span>P</span>
                            <span>O</span>
                            <span>W</span>
                            <span>R</span>
                            <span>F</span>
                            <span>U</span>
                            <span>L</span>
                        </div>
                        <div className="it">
                            <span>F</span>
                            <span>E</span>
                            <span>A</span>
                            <span>T</span>
                            <span>U</span>
                            <span>R</span>
                            <span>E</span>
                            <span>S</span>
                        </div>
                    </h1>
                    <div className="nasa">
                        <div className="nasaImg"></div>
                        <div className="data">
                            <h2>NASA earth data</h2>
                            <h4>Built on a foundation of reliable, scientific data from NASA's Earth observation missions</h4>
                        </div>
                    </div>
                    <div className="nasa">
                        <div className="data">
                            <h2>Long-Term analysis</h2>
                            <h4>Analyzes historical climate patterns to give you a probabilistic outlook, not just a 7-day forecast</h4>
                        </div>
                        <div className="calenderImg"></div>
                    </div>
                    <div className="nasa">
                        <div className="dashImg"></div>
                        <div className="data">
                            <h2>interactive dashboard</h2>
                            <h4>Visualize weather probabilities with intuitive graphs, charts, and maps</h4>
                        </div>
                    </div>
                    <div className="nasa">
                        <div className="data">
                            <h2>AI-Powered chatbot</h2>
                            <h4>Get smart, personalized travel recommendations based on your activity and destination</h4>
                        </div>
                        <div className="chatImg"></div>
                    </div>

                    {/* <!-- who benefits--> */}
                    <div className="hidden">
                        <div className="how">
                            <span>W</span>
                            <span>H</span>
                            <span>O</span>
                        </div>
                        <div className="how">
                            <span>B</span>
                            <span>E</span>
                            <span>N</span>
                            <span>E</span>
                            <span>F</span>
                            <span>I</span>
                            <span>T</span>
                            <span>S</span>
                        </div>
                        <span>?</span>
                    </div>

                    {/* <!-- Target Users --> */}
                    <section className="target-users">
                        <div className="container">
                            <div className="users-grid">
                                <div className="user-card">
                                    <div className="user-icon">🧳</div>
                                    <h3>Tourists</h3>
                                    <p>Plan comfortable sightseeing months ahead and avoid weather surprises during your vacation</p>
                                </div>
                                <div className="user-card">
                                    <div className="user-icon">🎣</div>
                                    <h3>Fishermen</h3>
                                    <p>Identify safe days with low wind probability for the best fishing experiences</p>
                                </div>
                                <div className="user-card">
                                    <div className="user-icon">🏔️</div>
                                    <h3>Mountain Climbers</h3>
                                    <p>Avoid dangerous conditions with tailored safety advice and weather insights</p>
                                </div>
                                <div className="user-card">
                                    <div className="user-icon">🎪</div>
                                    <h3>Event Organizers</h3>
                                    <p>Reduce risks for outdoor events and festivals with advance weather planning</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- team Users --> */}
                    <section id="team" className="team">
                        <div className="container">
                            <div className="section-header">
                                <h2>Meet Our Expert Team</h2>
                                <p>Diverse skills combining AI, development, design, and multimedia expertise</p>
                            </div>
                            <div className="team-grid">
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/hossam.jpeg)' }} aria-label="Photo of Hossam Salah"></div>
                                    <h3>Hossam Salah</h3>
                                    <p className="member-role">Team Leader | AI & Data Analysis</p>
                                    <p className="member-desc">Coordinates project workflow and designs AI-powered recommendation engine</p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/loay.jpeg)' }} aria-label="Photo of Loay Wael"></div>
                                    <h3>Loay Wael</h3>
                                    <p className="member-role">Backend Developer</p>
                                    <p className="member-desc">Manages backend infrastructure and NASA data service connections</p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/rahma.jpeg)' }} aria-label="Photo of Rahma Hany"></div>
                                    <h3>Rahma Hany</h3>
                                    <p className="member-role">Web Developer</p>
                                    <p className="member-desc">Handles frontend logic and real-time data integration</p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/amira.jpeg)' }} aria-label="Photo of Amira Amgad"></div>
                                    <h3>Amira Amgad</h3>
                                    <p className="member-role">Web Developer</p>
                                    <p className="member-desc">Enhances interactivity and chatbot integration</p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/rana.jpeg)' }} aria-label="Photo of Rana Sameh"></div>
                                    <h3>Rana Sameh</h3>
                                    <p className="member-role">UI/UX Designer</p>
                                    <p className="member-desc">Designs intuitive user interface and prepares presentations</p>
                                </div>
                                <div className="team-member">
                                    <div className="member-avatar" style={{ backgroundImage: 'url(/members/alyaa.jpeg)' }} aria-label="Photo of Alyaa Elsayed"></div>
                                    <h3>Alyaa Elsayed</h3>
                                    <p className="member-role">Video Editor & Demo Lead</p>
                                    <p className="member-desc">Creates multimedia content and oversees final demo</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="Visualize">
                        <h2>Visualize Weather Probabilities Like Never Before</h2>
                        <p>Our dashboard transforms complex climate data into clear, actionable insights, helping you understand potential conditions at a glance</p>
                        <Link to="/checkweather" style={{ color: '#fff', textDecoration: "none" }}>
                            <button className='btnn'>Check weather</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}