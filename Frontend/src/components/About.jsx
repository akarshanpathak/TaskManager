import React from 'react';

const About = () => {
  return (
    <div className="p-6 font-sans text-gray-700 leading-relaxed">
      <h1 className="text-4xl mb-6 text-gray-900">About Task Manager</h1>
      <p className="text-lg mb-4">
        Welcome to Task Manager, your ultimate solution for managing tasks efficiently and effectively. This application is designed to help you keep track of your tasks, set priorities, and ensure that nothing falls through the cracks.
      </p>
      <h2 className="text-2xl mt-6 mb-4 text-gray-900">Features</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>User authentication (signup, signin, signout)</li>
        <li>Create, update, delete, and retrieve tasks</li>
        <li>View tasks specific to each user</li>
        <li>Get statistics on your tasks</li>
      </ul>
      <h2 className="text-2xl mt-6 mb-4 text-gray-900">Technologies Used</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Front-end: React.js</li>
        <li>Back-end: Node.js, Express.js</li>
        <li>Database: MongoDB</li>
        <li>Authentication: JSON Web Tokens (JWT)</li>
      </ul>
      <p className="text-lg mb-4">
        Task Manager is built with a focus on simplicity and efficiency. Whether you are managing personal tasks or collaborating with a team, our application provides the tools you need to stay organized and productive.
      </p>
      <h2 className="text-2xl mt-6 mb-4 text-gray-900">About the Author</h2>
      <p className="text-lg mb-4">
        This application was created by Akarshan Pathak, a passionate MERN Stack Developer. For any queries or feedback, feel free to contact at <a href="mailto:akarshanpathak79@gmail.com" className="text-blue-500">akarshanpathak79@gmail.com</a>.
      </p>
    </div>
  );
};

export default About;
