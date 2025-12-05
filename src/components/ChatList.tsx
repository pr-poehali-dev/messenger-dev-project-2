import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

type ChatListProps = {
  activeTab: string;
  chats: Chat[];
  contacts: Contact[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  newGroupName: string;
  setNewGroupName: (name: string) => void;
  selectedMembers: string[];
  setSelectedMembers: (members: string[]) => void;
  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (open: boolean) => void;
  handleCreateGroup: () => void;
  toggleMemberSelection: (contactId: string) => void;
};

export default function ChatList({
  activeTab,
  chats,
  contacts,
  selectedChat,
  setSelectedChat,
  searchQuery,
  setSearchQuery,
  newGroupName,
  setNewGroupName,
  selectedMembers,
  isCreateGroupOpen,
  setIsCreateGroupOpen,
  handleCreateGroup,
  toggleMemberSelection
}: ChatListProps) {
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
  );
}
