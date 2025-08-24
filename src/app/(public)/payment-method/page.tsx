import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSiteInfo } from '@/lib/APIs/config-api';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { getImageLink } from '@/lib/helper';
import {
  AlertCircle,
  Banknote,
  Building,
  CheckCircle,
  Clock,
  CreditCard,
  Hash,
  Landmark,
  Shield,
} from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSiteInfo();
  const api_data = data?.site_data;

  return {
    title: `Payment Methods | ${api_data?.site_name}`,
    description: `Secure and convenient payment options for ${api_data?.site_name}. Multiple banking partners and payment methods available for seamless transactions.`,
  };
}

export interface IPaymentMethod {
  id: number;
  account_name: string;
  account_number: string;
  branch: string;
  routing_no: string;
  status: boolean;
  swift_code: string;
  bank_name: string;
  bank_type: string;
  bank_logo: string;
}

const page = async () => {
  const { data } = await fetchRequest<IPaymentMethod[]>(API_ENDPOINTS.PAYMENT_METHOD);
  const activeAccounts = data?.filter((account) => account.status) || [];
  const inactiveAccounts = data?.filter((account) => !account.status) || [];

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/5 via-from-primary/10 to-from-primary/20'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4'>
            <Shield className='w-4 h-4' />
            Secure Payment Methods
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Trusted Payment Partners</h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Choose from our verified banking partners for secure and convenient transactions. All
            payment methods are regularly monitored for your safety and peace of mind.
          </p>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center'>
            <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
            <div className='text-2xl font-bold text-gray-900 mb-1'>{activeAccounts.length}</div>
            <div className='text-sm text-muted-foreground'>Active Payment Methods</div>
          </div>

          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center'>
            <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <Shield className='w-6 h-6 text-blue-600' />
            </div>
            <div className='text-2xl font-bold text-gray-900 mb-1'>100%</div>
            <div className='text-sm text-muted-foreground'>Secure Transactions</div>
          </div>

          <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center'>
            <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3'>
              <Clock className='w-6 h-6 text-purple-600' />
            </div>
            <div className='text-2xl font-bold text-gray-900 mb-1'>24/7</div>
            <div className='text-sm text-muted-foreground'>Support Available</div>
          </div>
        </div>

        {/* Active Payment Methods */}
        {activeAccounts.length > 0 && (
          <div className='mb-12'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                <CheckCircle className='w-5 h-5 text-green-600' />
              </div>
              <h2 className='text-2xl font-semibold text-gray-900'>Available Payment Methods</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {activeAccounts.map((account) => (
                <Link href={`my-account/deposit/add?account=${account.id}`} key={account.id}>
                  <Card
                    key={account.id}
                    className='group bg-white shadow-sm border border-gray-200 rounded-2xl hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden gap-0! cursor-pointer'
                  >
                    <CardHeader className='bg-gradient-to-r from-gray-50 to-blue-50 pb-4'>
                      <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100'>
                          {account.bank_logo ? (
                            <Image
                              src={getImageLink(account.bank_logo)}
                              alt={`${account.bank_name}`}
                              width={40}
                              height={40}
                              className='rounded-lg object-contain'
                            />
                          ) : (
                            <Landmark className='w-7 h-7 text-blue-600' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <CardTitle className='text-xl font-semibold text-gray-900 mb-1'>
                            {account.bank_name}
                          </CardTitle>
                          <div className='flex items-center gap-2'>
                            <span className='text-sm text-muted-foreground capitalize'>
                              {account.bank_type}
                            </span>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='text-xs text-green-600 font-medium'>Active</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className='p-6 space-y-4'>
                      <div className='grid grid-cols-1 gap-3'>
                        <div className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
                          <CreditCard className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
                          <div className='flex-1'>
                            <div className='text-xs text-gray-500 uppercase tracking-wide mb-1'>
                              Account Name
                            </div>
                            <div className='font-medium text-gray-900'>{account.account_name}</div>
                          </div>
                        </div>

                        <div className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
                          <Hash className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <div className='flex-1'>
                            <div className='text-xs text-gray-500 uppercase tracking-wide mb-1'>
                              Account Number
                            </div>
                            <div className='font-mono font-medium text-gray-900 tracking-wider'>
                              {account.account_number}
                            </div>
                          </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                          <div className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Building className='w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0' />
                            <div className='flex-1'>
                              <div className='text-xs text-gray-500 uppercase tracking-wide mb-1'>
                                Branch
                              </div>
                              <div className='font-medium text-gray-900 text-sm'>
                                {account.branch}
                              </div>
                            </div>
                          </div>

                          <div className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Banknote className='w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0' />
                            <div className='flex-1'>
                              <div className='text-xs text-gray-500 uppercase tracking-wide mb-1'>
                                Routing
                              </div>
                              <div className='font-mono font-medium text-gray-900 text-sm'>
                                {account.routing_no}
                              </div>
                            </div>
                          </div>
                        </div>

                        {account.swift_code && (
                          <div className='flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100'>
                            <Landmark className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
                            <div className='flex-1'>
                              <div className='text-xs text-blue-600 uppercase tracking-wide mb-1'>
                                SWIFT Code
                              </div>
                              <div className='font-mono font-medium text-blue-900'>
                                {account.swift_code}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Payment Methods */}
        {inactiveAccounts.length > 0 && (
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                <AlertCircle className='w-5 h-5 text-gray-500' />
              </div>
              <h2 className='text-xl font-semibold text-gray-700'>Temporarily Unavailable</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {inactiveAccounts.map((account) => (
                <Card
                  key={account.id}
                  className='bg-gray-50 shadow-sm border border-gray-200 rounded-2xl opacity-75'
                >
                  <CardHeader className='bg-gray-100 pb-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-200 grayscale'>
                        {account.bank_logo ? (
                          <Image
                            src={getImageLink(account.bank_logo)}
                            alt={`${account.bank_name} logo`}
                            width={40}
                            height={40}
                            className='rounded-lg object-contain'
                          />
                        ) : (
                          <Landmark className='w-7 h-7 text-gray-400' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <CardTitle className='text-lg font-semibold text-gray-700 mb-1'>
                          {account.bank_name}
                        </CardTitle>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-gray-500'>{account.bank_type}</span>
                          <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
                          <span className='text-xs text-gray-500 font-medium'>Inactive</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center'>
          <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <Shield className='w-8 h-8 text-blue-600' />
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Secure & Reliable</h3>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            All payment methods are verified and monitored for security. For assistance with
            transactions or account verification, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
