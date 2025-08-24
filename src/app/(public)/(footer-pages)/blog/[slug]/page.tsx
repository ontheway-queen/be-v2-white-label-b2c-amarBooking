import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { Metadata } from 'next';
import BlogDetails from '../_components/blog-details';
import { IBlogList } from '../page';

interface IProps {
  params: Promise<{ slug: string }>;
}

export interface IBlogDetails {
  title: string;
  summary: string;
  content: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  cover_image: string;
  created_date: string;
  author: string;
  author_photo: null;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await fetchRequest<IBlogDetails>(`${API_ENDPOINTS.BLOG_LIST}/${slug}`);

  return {
    title: data?.meta_title || '',
    description: data?.meta_description || '',
  };
}

const page = async ({ params }: IProps) => {
  const { slug } = await params;

  const { data } = await fetchRequest<IBlogDetails>(`${API_ENDPOINTS.BLOG_LIST}/${slug}`);
  const { data: blog_list } = await fetchRequest<IBlogList[]>(API_ENDPOINTS.BLOG_LIST);

  const related_list = blog_list?.slice(0, 6);

  return <BlogDetails data={data} related_list={related_list} />;
};

export default page;
