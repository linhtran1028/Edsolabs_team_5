import { searchApi } from 'api/searchApiHome';
import { CollateralAccepted } from 'app/components/Filter/CollateralAccepted';
import { Duration } from 'app/components/Filter/Duration';
import { InterestRange } from 'app/components/Filter/InterestRange';
import { LoanToken } from 'app/components/Filter/LoanToken';
import { LoanType } from 'app/components/Filter/LoanType';
import { LoanValue } from 'app/components/Filter/LoanValue';
import { SearchPawnshops } from 'app/components/Filter/SearchPawnshops';
import Footer from 'app/components/Footer/Footer';
import Header from 'app/components/Header';
import Paginations from 'app/components/Pagination';
import { Flex } from 'app/components/rootStyled';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ListSugges from '../../../app/pages/ResultOfferCrypto/SearchSuggess/OptionPersonal/index';
import filter from './filter.png';
import ListItemBorrow from './ListItemBorrow';
import {
  BoxFlex,
  BoxLeft,
  Boxright,
  Close,
  ContainerResult,
  Modal,
  Reset,
  WrapperResult,
} from './styles';
interface Props {}

export const ResultOfferCrypto = (props: Props) => {
  const history = useHistory();
  const [listData, setListData] = useState<any>({
    collateralAccepted: [],
    loanToken: [],
    LoanType: [],
    duration: [],
  });
  const handleValueFilter = (data: any, tags: any) => {
    if (tags === 'Collateral accepted') {
      if (listData.collateralAccepted.includes(data as never)) {
        const newList = listData.collateralAccepted.filter(
          item => item !== data,
        );
        setListData({ ...listData, collateralAccepted: newList });
      } else {
        setListData({
          ...listData,
          collateralAccepted: [...listData.collateralAccepted, data],
        });
      }
    }
    if (tags === 'Duration') {
      if (listData.duration.includes(data as never)) {
        const newList = listData.duration.filter(item => item !== data);
        setListData({ ...listData, duration: newList });
      } else {
        setListData({
          ...listData,
          duration: [...listData.duration, data],
        });
      }
    }
    if (tags === 'Loan Token') {
      if (listData.loanToken.includes(data as never)) {
        const newList = listData.loanToken.filter(item => item !== data);
        setListData({ ...listData, loanToken: newList });
      } else {
        setListData({
          ...listData,
          loanToken: [...listData.loanToken, data],
        });
      }
    }
    if (tags === 'Loan type') {
      if (listData.LoanType.includes(data as never)) {
        const newList = listData.LoanType.filter(item => item !== data);
        setListData({ ...listData, LoanType: newList });
      } else {
        setListData({
          ...listData,
          LoanType: [...listData.LoanType, data],
        });
      }
    }
  };

  const [status, setStatus] = useState(false);
  const handleShowFilter = () => {
    setStatus(!status);
  };
  //gọi data api render list item
  const [listApiData, setListApiData] = useState<any>([]);
  const param = queryString.parse(history.location.search);
  useEffect(() => {
    searchApi
      .getDataSearchHome(param)
      .then((res: any) => {
        setListApiData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <WrapperResult>
        <ContainerResult>
          <Flex gap={20} justifyContent="center" alignItem="flex-start">
            <BoxLeft>
              <div style={{ textAlign: 'right', cursor: 'pointer' }}>
                <img src={filter} alt="acoin" onClick={handleShowFilter} />
              </div>
              <ListSugges />
              <ListItemBorrow listApiData={listApiData}></ListItemBorrow>
              <Paginations length={listApiData.total_pages} />
            </BoxLeft>
            <Boxright check={status}>
              <BoxFlex>
                <Reset>Reset filter</Reset>
                <Close
                  onClick={handleShowFilter}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI4SURBVHgBvVexbsIwED1nYAGpdGJMED9AZ5Z0gZV+AeJLWr6k8AVlhQX+oHRHIsDEVCrBwgC95zoomCR2U9InBQd8+N27nM8XQZZYLBZlHup8+Y7juKfTCd/LQojgeDwu+X7K16xarW5t1hMmAyYEUYeJ2iAyLihEnx3psQNBql0KIdS88m2bMsDkgEgg9RWpR39DwJF6YvKZPuHoPyyXyw6TTm5ACni81jvW1CcuFLPSOgwpB7DyR1Y+vSJmUu+GSuOAsD+EWX8ONWfuc46kgKfyRkIqVmoX9A8IQy4VK7WpmM/ntNvtEucPhwOtVisyATUBo1D79TPNeL1e02QyoVKpRM1mU45RwKHxeCzHRqNBtVotbbktq65CcZ0MqFQqVCwWLwjiSGEDWwNk6QWxb7IsFArUarWuyHVS2OjRSICPUPc51B0baxCMRiPa7/dnggykspw6/OGSJbBwVHkWUoBr+D1CbXWMaR7H3v/i/3cOZ9iX7R/0Z5qUcBbEARTPspAivHEJZwM0DlbESdmrP3PYoJBYYBoSpz7nzWaTmEg6OWwtMAtrtXFLoXqhOGBPxyEkNVQtuZVc1+2GxL46EnMHyiXaIXlIqAN6SDkDasMezIl40uUhoPyANrh3diI6k2fIVfdx3kEXzR5CrpTfmrSrd5pJ7S2avje6TXvbjTZ5IZw4a3iHFoWvAWXHUIV3Gjdp8wrj8fBieXRu2W7ISTRIIrQmjjigv7R5imjLRB/0UwGtX9q+AXoFYjqElBA4AAAAAElFTkSuQmCC"
                />
              </BoxFlex>
              <SearchPawnshops />
              <InterestRange />
              <LoanValue />
              <CollateralAccepted data={handleValueFilter} value={listData} />
              <LoanToken data={handleValueFilter} />
              <LoanType data={handleValueFilter} />
              <Duration data={handleValueFilter} />
            </Boxright>
          </Flex>
        </ContainerResult>
      </WrapperResult>
      <Footer />
      <Modal check={status} onClick={handleShowFilter} />
    </div>
  );
};
