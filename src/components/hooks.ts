import {useEffect, useState} from "react";

import { gql, useQuery } from '@apollo/client';

const GET_GREETING = gql`
  query GetGreeting($language: String!) {
    greeting(language: $language) {
      message
    }
  }
`;

