'use client';

import Loading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getImageLink } from '@/lib/helper';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useSupportMessagesQuery } from '../_api/support-api';

type Props = { id: string; name: string | undefined };

const SupportMessages = ({ id, name }: Props) => {
  const { data, isLoading } = useSupportMessagesQuery({ id });

  const messages = data?.data;

  if (isLoading) return <Loading />;

  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MessageSquare className='w-5 h-5' />
          Conversation ({messages?.length})
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {messages?.map((conversation) => (
          <div key={conversation.id}>
            <div className=''>
              <div className='flex gap-2 items-center'>
                <Avatar className='w-10 h-10 flex-shrink-0'>
                  <AvatarFallback className='bg-primary/15 text-primary font-medium'>
                    {(conversation?.sender_name || name!)
                      .split(' ')
                      .map((n: any) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-medium text-xs'>{conversation?.sender_name || name}</h4>
                    <span className='text-xs text-primary'>({conversation.reply_by})</span>
                  </div>
                  <span className='text-xs text-muted-foreground'>
                    {formatDate(conversation.created_at)}
                  </span>
                </div>
              </div>

              <div className='flex-1'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <p className='text-gray-800 leading-relaxed'>{conversation.message}</p>
                </div>

                {conversation?.attachments && conversation?.attachments?.length > 0 && (
                  <div className='space-y-2'>
                    <div className='flex gap-2 justify-end flex-wrap'>
                      {conversation?.attachments?.map((attachment, attIndex) => (
                        <div
                          key={attIndex}
                          className='flex items-center gap-2 border rounded overflow-hidden'
                        >
                          <a
                            href={getImageLink(attachment)}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Image
                              src={getImageLink(attachment)}
                              alt='attachment'
                              width={150}
                              height={75}
                              className='object-contain transition-all opacity-0 duration-[2s] group-hover:scale-105 blur-md'
                              onLoadingComplete={(image) =>
                                image.classList.remove('opacity-0', 'blur-md')
                              }
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SupportMessages;
