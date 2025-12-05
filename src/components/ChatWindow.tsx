import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

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

type ChatWindowProps = {
  selectedChat: Chat | null;
  messages: Message[];
  messageText: string;
  setMessageText: (text: string) => void;
  handleSendMessage: () => void;
};

export default function ChatWindow({
  selectedChat,
  messages,
  messageText,
  setMessageText,
  handleSendMessage
}: ChatWindowProps) {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="text-8xl mb-6 animate-scale-in">💬</div>
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Выберите чат
        </h2>
        <p className="text-muted-foreground text-lg">
          Начните общение с друзьями и коллегами
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
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
    </div>
  );
}
