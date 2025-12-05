import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileEditor from './ProfileEditor';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
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
        
        <button
          onClick={() => setActiveTab('nft')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            activeTab === 'nft' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'
          }`}
        >
          <Icon name="Gem" size={24} />
        </button>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <Icon name="Settings" size={24} />
        </button>
        
        <Avatar 
          onClick={() => setIsProfileOpen(true)}
          className="w-12 h-12 ring-2 ring-primary cursor-pointer hover:scale-110 transition-transform"
        >
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
            ВЫ
          </AvatarFallback>
        </Avatar>
      </div>

      <ProfileEditor isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}