import { Card, CardContent } from '@/components/ui/card';
import { formatDate, getImageLink } from '@/lib/helper';
import { Calendar, Clock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IBlogDetails } from '../[slug]/page';
import { IBlogList } from '../page';

interface IProps {
  data: IBlogDetails | undefined;
  related_list: IBlogList[] | undefined;
}

const BlogDetails = ({ data, related_list }: IProps) => {
  const readingTime = Math.ceil((data?.content?.split(' ')?.length || 0) / 200);
  return (
    <div className='min-h-screen'>
      <div className='bg-white/40'>
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
          {/* Hero Section */}
          <div className='mb-8'>
            <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
              {data?.title}
            </h1>

            <p className='md:text-xl text-gray-600 mb-6 leading-relaxed'>{data?.summary}</p>

            {/* Meta Information */}
            <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4' />
                <span className='font-medium text-gray-700'>{data?.author}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                <span>{formatDate(data?.created_date)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <Card className='mb-8 overflow-hidden border-none relative h-96 lg:min-h-[500px]'>
            <Image
              src={getImageLink(data?.cover_image)}
              alt={data?.title!}
              fill
              objectFit='cover'
            />
          </Card>

          {/* Main Content */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
            {/* Article Content */}
            <div className='lg:col-span-3'>
              <Card className='border-none'>
                <CardContent>
                  <div className='prose prose-lg max-w-none'>
                    <div dangerouslySetInnerHTML={{ __html: data?.content! }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-24 space-y-6'>
                {/* Related Topics */}
                <Card className='border-none'>
                  <CardContent className='space-y-4 p-0'>
                    <h2 className='text-lg font-semibold mb-4 pl-3'>Related Topics</h2>
                    {related_list?.map((item, index) => (
                      <Link
                        href={`/blog/${item.slug}`}
                        key={index}
                        className='group flex gap-3 px-3 rounded-lg  cursor-pointer items-center '
                      >
                        <div className='flex-shrink-0 '>
                          <Image
                            src={getImageLink(item?.cover_image)}
                            alt={item.title}
                            width={300}
                            height={300}
                            className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md'
                          />
                        </div>

                        <div className='flex-1 min-w-0 w-full'>
                          <h4 className='font-semibold text-xs line-clamp-4 group-hover:text-primary transition-colors duration-200 leading-tight mb-2'>
                            {item.title}
                          </h4>
                          <div className='flex items-center gap-2 text-xs text-gray-500'>
                            <Calendar className='w-3 h-3' />
                            <span className='truncate text-xs'>
                              {formatDate(item.created_date)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
