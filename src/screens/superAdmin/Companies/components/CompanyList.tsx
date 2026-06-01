import React from 'react';
import { View } from 'react-native';
import { companies } from '../constants/companiesData';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  return (
    <View>
      {companies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </View>
  );
};

export default CompanyList;
