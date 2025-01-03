const About = () => {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-yellow-400 mb-6">
            About Quickie
          </h1>
          <p className="text-lg leading-7 mb-6 text-justify">
            Quickie is your trusted thrift e-commerce platform, bringing unique and sustainable
            shopping options to your fingertips. We connect buyers and sellers in a vibrant
            marketplace where quality meets affordability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                To create a sustainable and accessible marketplace for everyone, promoting eco-friendly
                practices and empowering small businesses.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>
                To become the leading thrift e-commerce platform globally, fostering a community of
                conscious consumers and vendors.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  