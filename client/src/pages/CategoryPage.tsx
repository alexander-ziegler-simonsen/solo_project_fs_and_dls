// import React from 'react'

import { useEffect, useState } from "react"
import { getData } from "../helpers/HandleApiCalls";

type ApiResponse = {
  message: string;
  timestamp: number;
};

function CategoryPage() {

  const [data, setData] = useState<ApiResponse | null>(null);;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getData("item").then((res) => {
      //return res.json();
    })
  })

  return (
    <div>
        <h1>CategoryPage</h1>
        <p>here will be able to see all the products, sorted or filtered after which category they come from.</p>
    </div>
  )
}

export default CategoryPage