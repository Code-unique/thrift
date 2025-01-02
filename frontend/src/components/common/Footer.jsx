const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Quickie. All rights reserved.</p>
          <p>Quickie is your trusted thrift e-commerce platform for unique finds and sustainable shopping.</p>
          <div className="space-x-4 mt-2">
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
  