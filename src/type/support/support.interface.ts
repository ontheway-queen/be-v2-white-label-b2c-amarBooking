import { supportFormSchema } from '@/app/(private)/(profile)/my-account/support/_components/create-support';
import { replyTicketSchema } from '@/app/(private)/(profile)/my-account/support/_components/reply-support';

import z from 'zod';

export type ICreateSupport = z.infer<typeof supportFormSchema>;
export type IReplySupport = z.infer<typeof replyTicketSchema>;

export interface ISupportList {
  id: number;
  support_no: string;
  subject: string;
  priority: string;
  status: string;
  ref_type: string;
  username: string;
  name: string;
  email: string;
  photo: string;
  last_message: string;
  reply_by: string;
  last_message_created_at: string;
  created_at: string;
}

export interface ISupportDetails {
  id: number;
  support_no: string;
  ref_type: string;
  close_date: string;
  closed_by: string;
  reopen_date: string;
  reopen_by: string;
  created_by_user_id: number;
  created_by: string;
  ref_id: string;
  subject: string;
  status: string;
  username: string;
  name: string;
  email: string;
  photo: string;
  created_at: string;
  conversations: ISupportConversation[];
}

export interface ISupportConversation {
  id: number;
  support_ticket_id: string;
  sender_id: string;
  sender_name: string;
  sender_photo: string;
  message: string;
  attachments: string[];
  reply_by: string;
  created_at: Date;
}
