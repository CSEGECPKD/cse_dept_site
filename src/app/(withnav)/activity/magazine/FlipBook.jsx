'use client';

import React, { useEffect, useRef } from 'react';

const FlipBook = ({ pdf }) => {
    const flipbookRef = useRef(null);

    useEffect(() => {
        let dflipScript;
        const cssLinks = [];
        const loadScripts = async () => {
            try {
                const loadCss = (href) => {
                    return new Promise((resolve) => {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = href;
                        link.onload = resolve;
                        link.onerror = resolve;
                        document.head.appendChild(link);
                        cssLinks.push(link);
                    });
                };

                // Load CSS files
                await loadCss('/dflip/css/dflip.min.css');
                await loadCss('/dflip/css/themify-icons.min.css');
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
            cssLinks.forEach((link) => {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            });
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
