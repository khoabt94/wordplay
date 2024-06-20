import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function useHandleRouter() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const query = useMemo(() => {
        const res: { [key: string]: string } = {};
        searchParams.forEach((value: string, key: string) => {
            res[key] = value;
        });
        return res;
    }, [searchParams]);

    const pushQuery = (obj: { [key: string]: string }) => {
        const cloned = { ...obj };
        for (const key in obj) {
            if (obj[key]) cloned[key] = obj[key];
        }
        setSearchParams(cloned)
    };

    return { pushQuery, query, navigate }
}
