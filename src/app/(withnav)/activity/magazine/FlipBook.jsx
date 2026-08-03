'use client';

import React, { useEffect, useRef } from 'react';

// Import CSS files
import '/public/dflip/css/dflip.min.css';
import '/public/dflip/css/themify-icons.min.css';

const FlipBook = ({ pdf }) => {
    const flipbookRef = useRef(null);

    useEffect(() => {
        let dflipScript;
        const loadScripts = async () => {
            try {
                // Load jQuery if not already loaded
                if (!window.jQuery) {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = '/dflip/js/libs/jquery.min.js';
                        script.onload = resolve;
                        script.onerror = reject;
                        document.body.appendChild(script);
                    });
                }

                // Load dflip script
                await new Promise((resolve, reject) => {
                    dflipScript = document.createElement('script');
                    dflipScript.src = '/dflip/js/dflip.min.js';
                    dflipScript.onload = resolve;
                    dflipScript.onerror = reject;
                    document.body.appendChild(dflipScript);
                });

                // Wait for DFLIP to be available on the window object
                await new Promise((resolve) => {
                    const checkDFLIP = () => {
                        if (window.DFLIP) {
                            resolve();
                        } else {
                            setTimeout(checkDFLIP, 100);
                        }
                    };
                    checkDFLIP();
                });

                // Initialize flipbook
                if (window.DFLIP && flipbookRef.current) {
                    window.DFLIP.parseBooks();
                }
            } catch (error) {
                console.error('Error loading DFLIP:', error);
            }
        };

        loadScripts();

        // Cleanup function
        return () => {
            if (dflipScript && dflipScript.parentNode) {
                dflipScript.parentNode.removeChild(dflipScript);
            }
        };
    }, [pdf]);

    return (
        <div className="w-[500px] h-[500px] bg-white">
            <div
                ref={flipbookRef}
                className="_df_book"
                id="df_manual_book"
                source={pdf}
                height="500"
                webgl="true"
                backgroundcolor="white"
            />
        </div>
    );
};

export default FlipBook;
