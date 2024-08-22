import {useEffect,useState} from "react";

export default function AboutUs() {
    const [activeSection, setActiveSection] = useState('');
    console.log(activeSection)
    console.log("aman")
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);
    return (
        <section className="px-10 py-8 flex text-gray-800">
            <div>
                <h1 id="chatgram" className="text-3xl font-bold mb-4">ChatGram</h1>
                <p className="mb-4">
                    ChatGram is a cutting-edge social networking platform crafted to foster meaningful connections
                    in a rapidly evolving digital world. Whether you're chatting with close friends, sharing life
                    updates, or expanding your social circle, ChatGram provides a vibrant and engaging space that
                    puts communication at the forefront. Designed with a user-first approach, ChatGram ensures that
                    every interaction is smooth, secure, and personalized.
                </p>
                <p className="mb-6">
                    In today's connected world, the need for instant communication and content sharing has never
                    been greater. ChatGram addresses this need by offering an integrated platform where users can
                    seamlessly interact in real-time, manage their social presence, and maintain strong connections
                    with friends and family. From secure user authentication to real-time messaging and a fully
                    responsive design, ChatGram is engineered to deliver an exceptional user experience across all
                    devices.
                </p>
                <h1 id="why-chatgram" className="text-3xl font-bold mb-4">Why ChatGram?</h1>
                <p className="mb-6">
                    At ChatGram, we believe in the power of connection. Our platform is more than just a social
                    network; it's a hub where relationships are built, stories are shared, and communities thrive.
                    We understand that privacy and security are paramount, which is why ChatGram employs advanced
                    technologies like JWT for authentication and WebSocket for real-time communication. This ensures
                    that your data is protected, your conversations are private, and your experience is
                    uninterrupted.
                </p>
                <h1 id="key-features" className="text-3xl font-bold mb-4">Key Features</h1>
                <div className="mb-6">
                    <h3 id="user-authentication" className="text-xl font-semibold mb-2">User Authentication:</h3>
                    <p className="mb-4">
                        ChatGram employs secure JWT-based authentication to protect your personal
                        data and maintain the integrity of user sessions. Every login is secure, and your information is
                        encrypted to ensure privacy.
                    </p>
                    <h3 id="real-time-chat" className="text-xl font-semibold mb-2">Real-Time Chat:</h3>
                    <p className="mb-4">
                        Experience the thrill of instant communication with ChatGram's real-time
                        chat feature. Powered by WebSocket, our messaging system allows you to send and receive
                        messages instantaneously, keeping your conversations flowing without delay.
                    </p>
                    <h3 id="post-management" className="text-xl font-semibold mb-2">Post Management:</h3>
                    <p className="mb-4">
                        Whether it's a status update, a photo, or an article, ChatGram lets
                        you easily create, edit, and manage your posts. Share your thoughts and experiences with
                        your friends and the wider community, and engage with content that matters to you.
                    </p>
                    <h3 id="friend-connections" className="text-xl font-semibold mb-2">Friend Connections:</h3>
                    <p className="mb-4">
                        Building and nurturing relationships is at the heart of ChatGram.
                        Connect with friends, family, and new acquaintances effortlessly. Our intuitive friend
                        management system lets you control who you connect with, ensuring that your social
                        network is as close-knit or as expansive as you desire.
                    </p>
                    <h3 id="responsive-design" className="text-xl font-semibold mb-2">Responsive Design:</h3>
                    <p className="mb-6">
                        ChatGram is designed to be fully responsive, providing an optimal
                        user experience across all devices. Whether you're accessing the platform from a
                        desktop, tablet, or smartphone, you'll enjoy a seamless and visually appealing
                        interface.
                    </p>
                </div>
                <h1 id="technology-stack" className="text-3xl font-bold mb-4">Technology Stack</h1>
                <div className="mb-6">
                    <h3 id="backend" className="text-xl font-semibold mb-2">Backend:</h3>
                    <p className="mb-4">
                        The robust Java Spring framework powers ChatGram's backend, ensuring
                        reliability, scalability, and performance. This solid foundation allows the platform to
                        handle high volumes of users and data with ease.
                    </p>
                    <h3 id="frontend" className="text-xl font-semibold mb-2">Frontend:</h3>
                    <p className="mb-4">
                        ChatGram's frontend is built using React, offering a dynamic and interactive
                        user interface. React's component-based architecture allows for smooth navigation, quick
                        updates, and a responsive design that adapts to any screen size.
                    </p>
                    <h3 id="database" className="text-xl font-semibold mb-2">Database:</h3>
                    <p className="mb-4">
                        PostgreSQL serves as the backbone for data storage, providing a powerful and
                        efficient relational database system. It ensures that your data is stored securely and
                        can be retrieved quickly whenever needed.
                    </p>
                    <h3 id="authentication" className="text-xl font-semibold mb-2">Authentication:</h3>
                    <p className="mb-4">
                        Secure user authentication is a priority at ChatGram. By utilizing JWT
                        (JSON Web Tokens), the platform ensures that every user session is secure, and that your
                        data remains private and protected from unauthorized access.
                    </p>
                    <h3 id="real-time-communication" className="text-xl font-semibold mb-2">Real-Time
                        Communication:</h3>
                    <p className="mb-6">
                        ChatGram's real-time chat is powered by WebSocket, a protocol
                        that enables instant, bidirectional communication between the client and server. This
                        ensures that messages are delivered in real-time, providing a smooth and responsive
                        chatting experience.
                    </p>
                </div>
                <h1 id="our-vision" className="text-3xl font-bold mb-4">Our Vision</h1>
                <p className="mb-6">
                    ChatGram is not just a platform—it's a community. We envision a world where technology
                    brings people closer together, fostering genuine connections and enabling meaningful
                    interactions. As we continue to evolve, our goal is to provide users with the tools they
                    need to stay connected, express themselves, and build lasting relationships in an
                    increasingly digital world.
                </p>
                <h1 id="getting-started-with-chatgram" className="text-3xl font-bold mb-4">Getting Started with
                    ChatGram</h1>
                <p className="mb-6">
                    Joining ChatGram is easy and straightforward. With a few simple steps, you can create an
                    account, connect with friends, and start sharing your moments with the world. Our
                    platform is designed to be user-friendly, whether you're tech-savvy or new to social
                    networking. The secure and intuitive interface ensures that everyone can enjoy the full
                    range of features ChatGram has to offer.
                </p>
                <h1 id="community-and-collaboration" className="text-3xl font-bold mb-4">Community and
                    Collaboration</h1>
                <p className="mb-6">
                    At ChatGram, we believe in the power of community and collaboration. We're constantly
                    looking for ways to improve the platform, and we welcome feedback from our users.
                    Whether it's a new feature idea, a bug report, or a suggestion for improvement, your
                    input helps us make ChatGram better for everyone. Join our growing community and be a
                    part of something special.
                </p>
                <h1 id="license-and-contributions" className="text-3xl font-bold mb-4">License and Contributions</h1>
                <p className="mb-6">
                    ChatGram is an open-source project, and we welcome contributions from developers around
                    the world. Our source code is available under the MIT license, allowing anyone to use,
                    modify, and distribute it freely. If you're interested in contributing, check out our
                    GitHub repository for more information on how to get involved.
                </p>
            </div>

            <div className="pl-10 w-[800px]">
                <nav className="sticky top-20">
                    <h2 className="text-lg font-semibold mb-4">Contents</h2>
                    <ul className="flex flex-col gap-2 text-gray-600 hover:text-blue-600">
                        <li ><a href="#chatgram" className={activeSection==='chatgram'?"text-blue-600":"text-gray-600 hover:text-blue-600"}>ChatGram</a></li>
                        <li ><a href="#why-chatgram" className={activeSection==='why-chatgram'?"text-blue-600":"text-gray-600 hover:text-blue-600"}>Why ChatGram?</a></li>
                        <li ><a href="#key-features" className="text-gray-600 hover:text-blue-600">Key Features</a></li>
                        <ul className='ml-4 flex flex-col gap-1'>
                            <li ><a href="#user-authentication" className="text-gray-600 hover:text-blue-600">User Authentication</a></li>
                            <li ><a href="#real-time-chat" className="text-gray-600 hover:text-blue-600">Real-Time Chat</a></li>
                            <li ><a href="#post-management" className="text-gray-600 hover:text-blue-600">Post Management</a></li>
                            <li ><a href="#friend-connections" className="text-gray-600 hover:text-blue-600">Friend Connections</a></li>
                            <li ><a href="#responsive-design" className="text-gray-600 hover:text-blue-600">Responsive Design</a></li>
                        </ul>
                        <li ><a href="#technology-stack" className="text-gray-600 hover:text-blue-600">Technology Stack</a></li>
                        <ul className='ml-4 flex flex-col gap-1'>
                            <li ><a href="#backend" className="text-gray-600 hover:text-blue-600">Backend</a></li>
                            <li ><a href="#frontend" className="text-gray-600 hover:text-blue-600">Frontend</a></li>
                            <li ><a href="#database" className="text-gray-600 hover:text-blue-600">Database</a></li>
                            <li ><a href="#authentication" className="text-gray-600 hover:text-blue-600">Authentication</a></li>
                            <li ><a href="#real-time-communication" className="text-gray-600 hover:text-blue-600">Real-Time Communication</a></li>
                        </ul>
                        <li ><a href="#our-vision" className="text-gray-600 hover:text-blue-600">Our Vision</a></li>
                        <li ><a href="#getting-started-with-chatgram" className="text-gray-600 hover:text-blue-600">Getting Started with ChatGram</a></li>
                        <li ><a href="#community-and-collaboration" className="text-gray-600 hover:text-blue-600">Community and Collaboration</a></li>
                        <li ><a href="#license-and-contributions" className="text-gray-600 hover:text-blue-600">License and Contributions</a></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
