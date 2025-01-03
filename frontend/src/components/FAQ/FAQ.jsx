const FAQ = () => {
    const faqs = [
      {
        question: 'What is Quickie?',
        answer:
          'Quickie is a thrift e-commerce platform where buyers and sellers can connect to trade unique and sustainable products.',
      },
      {
        question: 'How do I become a vendor?',
        answer:
          'Sign up as a vendor during registration or contact our support team for assistance.',
      },
      {
        question: 'What payment methods are supported?',
        answer: 'We accept major credit cards, PayPal, and other secure payment options.',
      },
    ];
  
    return (
      <div className="p-6 bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-green-600 dark:text-yellow-400 mb-6">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-2">{faq.question}</h2>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FAQ;
  