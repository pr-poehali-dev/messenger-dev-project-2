import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
};

type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  isGroup: boolean;
  members?: string[];
};

type Contact = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  isOnline: boolean;
};

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Команда разработки',
    avatar: '👨‍💻',
    lastMessage: 'Готово! Деплой прошёл успешно',
    timestamp: '14:32',
    unread: 3,
    isOnline: true,
    isGroup: true,
    members: ['Алексей', 'Мария', 'Дмитрий', 'Елена']
  },
  {
    id: '2',
    name: 'Алексей Петров',
    avatar: '😎',
    lastMessage: 'Созвон в 15:00?',
    timestamp: '13:45',
    unread: 1,
    isOnline: true,
    isGroup: false
  },
  {
    id: '3',
    name: 'Дизайн-студия',
    avatar: '🎨',
    lastMessage: 'Отправил макеты',
    timestamp: 'Вчера',
    unread: 0,
    isOnline: false,
    isGroup: true,
    members: ['Анна', 'Игорь', 'Ольга']
  },
  {
    id: '4',
    name: 'Мария Смирнова',
    avatar: '👩‍💼',
    lastMessage: 'Спасибо за помощь!',
    timestamp: 'Вчера',
    unread: 0,
    isOnline: true,
    isGroup: false
  }
];

const initialContacts: Contact[] = [
  { id: '1', name: 'Алексей Петров', avatar: '😎', status: 'В сети', isOnline: true },
  { id: '2', name: 'Мария Смирнова', avatar: '👩‍💼', status: 'В сети', isOnline: true },
  { id: '3', name: 'Дмитрий Козлов', avatar: '🧑‍💻', status: 'Был 2 часа назад', isOnline: false },
  { id: '4', name: 'Елена Волкова', avatar: '👩‍🎨', status: 'В сети', isOnline: true },
  { id: '5', name: 'Анна Федорова', avatar: '👱‍♀️', status: 'Был 1 час назад', isOnline: false },
  { id: '6', name: 'Игорь Соколов', avatar: '🧔', status: 'В сети', isOnline: true }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('chats');
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [contacts] = useState<Contact[]>(initialContacts);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Привет! Как дела с проектом?', sender: 'Дмитрий', timestamp: '14:20', isOwn: false },
    { id: '2', text: 'Всё отлично! Уже на финальной стадии', sender: 'Вы', timestamp: '14:25', isOwn: true },
    { id: '3', text: 'Готово! Деплой прошёл успешно', sender: 'Елена', timestamp: '14:32', isOwn: false }
  ]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'Вы',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    setChats(chats.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: messageText, timestamp: 'Сейчас' }
        : chat
    ));
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || selectedMembers.length < 2) return;

    const newGroup: Chat = {
      id: Date.now().toString(),
      name: newGroupName,
      avatar: '👥',
      lastMessage: 'Группа создана',
      timestamp: 'Сейчас',
      unread: 0,
      isOnline: true,
      isGroup: true,
      members: selectedMembers
    };

    setChats([newGroup, ...chats]);
    setNewGroupName('');
    setSelectedMembers([]);
    setIsCreateGroupOpen(false);
  };

  const toggleMemberSelection = (contactId: string) => {
    setSelectedMembers(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <ChatList
        activeTab={activeTab}
        chats={chats}
        contacts={contacts}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        isCreateGroupOpen={isCreateGroupOpen}
        setIsCreateGroupOpen={setIsCreateGroupOpen}
        handleCreateGroup={handleCreateGroup}
        toggleMemberSelection={toggleMemberSelection}
      />
      
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
