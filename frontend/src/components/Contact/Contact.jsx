const Contact = () => {
    return (
      <div className="p-6 bg-gradient-to-br from-pink-50 to-red-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-pink-600 dark:text-yellow-400 mb-6">
            Contact Us
          </h1>
          <p className="text-lg leading-7 mb-6 text-justify">
            Have questions or feedback? We’d love to hear from you! Reach out to us using the form
            below or email us directly.
          </p>
          <form className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows="5"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Contact;
  