'use client';

import React from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SubmitAllButton = () => {
    return (
        <Button type="button" variant="default" onClick={() => {}}>
            <Send className="h-4 w-4" />
            Send to Submit
        </Button>
    );
};

export default SubmitAllButton;
