import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    console.log("useCurrencyInfo rendered");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.10.13/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => {
                setData(res[currency]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
                setLoading(false);
            });
        console.log(data);
    }, [currency]);

    console.log(data);
    return { data, loading, error };
}

export default useCurrencyInfo;
