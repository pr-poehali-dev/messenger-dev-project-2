import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

type ProfileEditorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileEditor({ isOpen, onClose }: ProfileEditorProps) {
  const [profileData, setProfileData] = useState({
    name: 'Владимир Иванов',
    username: '@vladimir_ivanov',
    bio: 'Full-stack разработчик | React + Python',
    phone: '+7 (999) 123-45-67',
    email: 'vladimir@example.com',
    avatar: '🧑‍💻',
    status: 'В сети'
  });

  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    readReceipts: true,
    lastSeen: true,
    privateProfile: false
  });

  const avatarOptions = ['🧑‍💻', '😎', '👨‍💼', '👩‍💼', '🎨', '🚀', '⚡', '🌟', '💡', '🎯', '🔥', '✨'];

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Редактор профиля
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl cursor-pointer hover:scale-105 transition-transform">
                {profileData.avatar}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon name="Camera" size={24} className="text-white" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setProfileData({ ...profileData, avatar: emoji })}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${
                    profileData.avatar === emoji
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="User" size={20} className="text-primary" />
              Личная информация
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="bg-muted border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="bg-muted border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">О себе</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="bg-muted border-border resize-none"
                rows={3}
                placeholder="Расскажите о себе..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="bg-muted border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="bg-muted border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={profileData.status}
                onValueChange={(value) => setProfileData({ ...profileData, status: value })}
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="В сети">🟢 В сети</SelectItem>
                  <SelectItem value="Не беспокоить">🔴 Не беспокоить</SelectItem>
                  <SelectItem value="Нет на месте">🟡 Нет на месте</SelectItem>
                  <SelectItem value="Невидимка">⚫ Невидимка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Settings" size={20} className="text-primary" />
              Настройки приватности
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Уведомления</p>
                    <p className="text-sm text-muted-foreground">Показывать уведомления о новых сообщениях</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Звуки</p>
                    <p className="text-sm text-muted-foreground">Воспроизводить звуки сообщений</p>
                  </div>
                </div>
                <Switch
                  checked={settings.sounds}
                  onCheckedChange={(checked) => setSettings({ ...settings, sounds: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="CheckCheck" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Отметки о прочтении</p>
                    <p className="text-sm text-muted-foreground">Показывать статус прочтения сообщений</p>
                  </div>
                </div>
                <Switch
                  checked={settings.readReceipts}
                  onCheckedChange={(checked) => setSettings({ ...settings, readReceipts: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="Eye" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Последний раз в сети</p>
                    <p className="text-sm text-muted-foreground">Показывать время последнего входа</p>
                  </div>
                </div>
                <Switch
                  checked={settings.lastSeen}
                  onCheckedChange={(checked) => setSettings({ ...settings, lastSeen: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-3">
                  <Icon name="Lock" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">Приватный профиль</p>
                    <p className="text-sm text-muted-foreground">Скрыть профиль от незнакомых пользователей</p>
                  </div>
                </div>
                <Switch
                  checked={settings.privateProfile}
                  onCheckedChange={(checked) => setSettings({ ...settings, privateProfile: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
            >
              <Icon name="Check" size={20} className="mr-2" />
              Сохранить изменения
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-border hover:bg-muted"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
