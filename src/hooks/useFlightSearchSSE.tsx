import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { sseSearchParamsFormatter } from '@/lib/flight/search-params-formatter';
import { setFlightForExtractFilter } from '@/lib/redux/slice/flight/extract-flight-filter-slice';
import {
  setError,
  setIsResponseEnd,
  setLoading,
} from '@/lib/redux/slice/flight/flight-search-status-slice';
import { baseURL } from '@/request';
import { SITE_INFO } from '@/site-config';
import { IFlightSearchQueryParams } from '@/type/flight/flight.interface';
import { IFlightList, ISearchInfo } from '@/type/flight/flight.search.interface';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useFlightSearch = (searchParams: IFlightSearchQueryParams) => {
  const dispatch = useDispatch();

  const [flightData, setFlightData] = useState<IFlightList[]>([]);
  const [searchInfo, setSearchInfo] = useState<ISearchInfo | null>(null);

  useEffect(() => {
    // Reset flight data when search params change
    dispatch(setIsResponseEnd(false));
    if (flightData.length) setFlightData([]);
  }, [searchParams]);

  useEffect(() => {
    dispatch(setIsResponseEnd(false));
    dispatch(setLoading(true));

    const query = sseSearchParamsFormatter(searchParams);

    const eventSource = new EventSource(
      `${baseURL}/${API_ENDPOINTS.SSE_FLIGHT_SEARCH}?${query}&token=${SITE_INFO.token}`,
    );

    eventSource.addEventListener('search_info', (event) => {
      try {
        const searchInfo = JSON.parse(event.data);
        setSearchInfo(searchInfo);
      } catch (err) {
        console.log('Search_INFO' + err);

        dispatch(setError(true));
      }
    });

    eventSource.onmessage = (event) => {
      try {
        const newData: IFlightList = JSON.parse(event.data);
        setFlightData((prevData) => {
          const updatedData = [...prevData, newData];
          updatedData.sort((a, b) => Number(a?.fare?.payable || 0) - Number(b?.fare?.payable || 0));
          return updatedData;
        });
      } catch (err) {
        console.log('ALL' + err);

        dispatch(setError(true));
      }
    };

    eventSource.addEventListener('end', () => {
      setTimeout(() => {
        dispatch(setIsResponseEnd(true));
        dispatch(setLoading(false));
      }, 1000);
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [searchParams]);

  useEffect(() => {
    if (flightData.length) {
      dispatch(setLoading(false));

      dispatch(
        setFlightForExtractFilter({
          flightResult: flightData,
          searchInfo: searchInfo,
        }),
      );
    }
  }, [flightData]);

  return { flightData, searchInfo };
};

export default useFlightSearch;
