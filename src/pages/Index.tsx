import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl animate-pulse-glow">
          💬
        </div>
        
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('chats')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              activeTab === 'chats' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="MessageCircle" size={24} />
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              activeTab === 'contacts' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="Users" size={24} />
          </button>
          
          <button
            onClick={() => setActiveTab('calls')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              activeTab === 'calls' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="Phone" size={24} />
          </button>
          
          <button
            onClick={() => setActiveTab('status')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              activeTab === 'status' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
            }`}
          >
            <Icon name="CircleDot" size={24} />
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
            <Icon name="Settings" size={24} />
          </button>
          
          <Avatar className="w-12 h-12 ring-2 ring-primary cursor-pointer hover:scale-110 transition-transform">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
              ВЫ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="w-96 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {activeTab === 'chats' ? 'Чаты' : activeTab === 'contacts' ? 'Контакты' : activeTab === 'calls' ? 'Звонки' : 'Статусы'}
            </h1>
            
            {activeTab === 'chats' && (
              <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogTrigger asChild>
                  <Button size="icon" className="rounded-xl bg-primary hover:bg-primary/90 transition-all hover:scale-110">
                    <Icon name="Plus" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Создать группу
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Название группы</Label>
                      <Input
                        id="groupName"
                        placeholder="Введите название..."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="bg-muted border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Добавить участников (минимум 2)</Label>
                      <ScrollArea className="h-64 rounded-xl border border-border bg-muted p-2">
                        <div className="space-y-2">
                          {contacts.map(contact => (
                            <div
                              key={contact.id}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-background/50 cursor-pointer transition-colors"
                              onClick={() => toggleMemberSelection(contact.name)}
                            >
                              <Checkbox
                                checked={selectedMembers.includes(contact.name)}
                                onCheckedChange={() => toggleMemberSelection(contact.name)}
                              />
                              <div className="text-2xl">{contact.avatar}</div>
                              <div className="flex-1">
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.status}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                    
                    {selectedMembers.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedMembers.map(member => (
                          <Badge key={member} variant="secondary" className="gap-1">
                            {member}
                            <Icon
                              name="X"
                              size={14}
                              className="cursor-pointer hover:text-destructive"
                              onClick={() => toggleMemberSelection(member)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button
                      onClick={handleCreateGroup}
                      disabled={!newGroupName.trim() || selectedMembers.length < 2}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                    >
                      Создать группу
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={activeTab === 'chats' ? 'Поиск чатов...' : 'Поиск контактов...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border rounded-xl"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {activeTab === 'chats' && (
            <div className="p-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-muted/50 animate-fade-in mb-2 ${
                    selectedChat?.id === chat.id ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                        {chat.avatar}
                      </div>
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{chat.name}</h3>
                          {chat.isGroup && (
                            <Badge variant="secondary" className="text-xs px-2 py-0">
                              <Icon name="Users" size={12} className="mr-1" />
                              {chat.members?.length}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="bg-primary text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-muted/50 animate-fade-in mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.status}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20">
                        <Icon name="MessageCircle" size={20} />
                      </Button>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20">
                        <Icon name="Phone" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-6xl mb-4 animate-scale-in">📞</div>
              <h3 className="text-xl font-semibold mb-2">История звонков</h3>
              <p className="text-muted-foreground">Здесь появятся ваши звонки</p>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-6xl mb-4 animate-scale-in">✨</div>
              <h3 className="text-xl font-semibold mb-2">Статусы</h3>
              <p className="text-muted-foreground">Делитесь моментами с друзьями</p>
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="h-20 bg-card border-b border-border flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{selectedChat.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.isGroup ? `${selectedChat.members?.length} участников` : selectedChat.isOnline ? 'В сети' : 'Не в сети'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20 transition-all hover:scale-110">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20 transition-all hover:scale-110">
                  <Icon name="Video" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20 transition-all hover:scale-110">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                      {!message.isOwn && (
                        <p className="text-xs text-muted-foreground mb-1 ml-3">{message.sender}</p>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-sm'
                            : 'bg-muted text-foreground rounded-bl-sm'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 bg-card border-t border-border">
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20 transition-all hover:scale-110">
                  <Icon name="Paperclip" size={20} />
                </Button>
                
                <Input
                  placeholder="Введите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-muted border-border rounded-xl"
                />
                
                <Button size="icon" variant="ghost" className="rounded-xl hover:bg-primary/20 transition-all hover:scale-110">
                  <Icon name="Smile" size={20} />
                </Button>
                
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-110"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="text-8xl mb-6 animate-scale-in">💬</div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Выберите чат
            </h2>
            <p className="text-muted-foreground text-lg">
              Начните общение с друзьями и коллегами
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
