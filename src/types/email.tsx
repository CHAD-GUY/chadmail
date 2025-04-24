export interface Email {
  id: string;
  read: boolean;
  starred: boolean;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  time: string;
  workspace: string;
  hasAttachment: boolean;
}
