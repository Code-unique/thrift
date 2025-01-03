const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2025 Quickie. All rights reserved.</p>
        <p>Your trusted thrift e-commerce platform for unique finds and sustainable shopping.</p>
        <div className="space-x-4 mt-4">
          <a href="#" className="hover:text-yellow-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-400">
            Terms of Service
          </a>
          <a href="mailto:support@quickie.com" className="hover:text-yellow-400">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
