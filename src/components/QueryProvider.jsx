'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function QueryProvider({ children }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default QueryProvider;
