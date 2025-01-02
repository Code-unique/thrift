import { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { AuthContext } from '../../context/AuthContext';
import VendorList from './VendorList';
import MessageList from './MessageList';
import ThemeToggle from '../common/ThemeToggle';
import SkeletonLoader from '../common/SkeletonLoader';
import API from '../../utils/api';
import { FaUserAlt, FaRegSmile, FaSearch } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const selectVendor = async (vendor) => {
    setSelectedVendor(vendor);
    try {
      const response = await API.post('/api/chat', {
        participants: [user._id, vendor._id],
      });
      const messagesRes = await API.get(`/api/chat/${response.data._id}/messages`);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error fetching chat or messages:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', {
        chatId: selectedVendor._id,
        sender: user._id,
        content: message,
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-gradient-to-r from-yellow-400 to-orange-500 dark:bg-gradient-to-r from-yellow-500 to-orange-600 shadow-md">
        <h1 className="text-2xl font-bold text-white">Quickie Chat</h1>
        <ThemeToggle />
      </header>

      <div className="flex flex-1">
        {/* Vendor List */}
        <aside className="w-1/4 bg-gray-100 dark:bg-gray-900 p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Vendors <FaSearch size={18} className="inline ml-2 text-gray-600 dark:text-gray-300" />
          </h2>
          {loading ? (
            <SkeletonLoader count={5} />
          ) : (
            <VendorList vendors={vendors} onSelectVendor={selectVendor} />
          )}
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
          {selectedVendor ? (
            <>
              <div className="flex flex-col space-y-4 overflow-y-auto max-h-[80%]">
                <MessageList messages={messages} user={user} />
              </div>

              <div className="p-4 flex items-center space-x-4 border-t border-gray-300 dark:border-gray-700">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message"
                  className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  onClick={sendMessage}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow-md transition duration-300"
                >
                  <IoIosSend size={24} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <h2 className="text-gray-800 dark:text-gray-200 text-lg">
                Select a vendor to start chatting
              </h2>
            </div>
          )}
        </main>
      </div>

      {/* Footer with Smile Icon */}
      <footer className="p-4 bg-gradient-to-r from-orange-400 to-yellow-500 dark:bg-gradient-to-r from-orange-500 to-yellow-600 text-center text-white">
        <FaRegSmile size={24} />
        <p className="mt-2 text-sm">Let's keep the chat fun! 😄</p>
      </footer>
    </div>
  );
};

export default Chat;
