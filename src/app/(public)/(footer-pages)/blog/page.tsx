import { ImageWithLoading } from '@/components/image-with-loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { formatDate, getImageLink } from '@/lib/helper';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';

export interface IBlogList {
  id: string;
  title: string;
  summary: string;
  cover_image: string;
  slug: string;
  created_date: string;
}

const Blog = async () => {
  const { data } = await fetchRequest<IBlogList[]>(API_ENDPOINTS.BLOG_LIST);

  return (
    <section className='bg-white text-gray-800'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-primary to-primary/70'>
        <div className='container mx-auto py-20 px-4 md:px-6 h-60 flex items-end'>
          <h1 className='text-4xl font-bold text-white drop-shadow-sm'>Latest from Our Blog</h1>
        </div>
      </div>

      {/* Blog Cards */}
      <div className='container mx-auto px-4 md:px-6 py-16'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {data?.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className='block group'>
              <Card className='overflow-hidden transition hover:shadow-lg cursor-pointer h-full pt-0'>
                <div className='relative h-48 w-full overflow-hidden'>
                  <ImageWithLoading
                    src={getImageLink(post.cover_image)}
                    alt={post.title}
                    fill
                    className='object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300'
                    delay={index * 300}
                  />
                </div>
                <CardHeader>
                  <CardTitle className='text-lg group-hover:text-primary transition'>
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-sm text-muted-foreground space-y-2'>
                  <p>{post.summary}</p>
                  <div className='flex justify-between text-xs pt-2'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='w-4 h-4' />
                      <span>{formatDate(post.created_date)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
